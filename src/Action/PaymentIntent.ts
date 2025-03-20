"use server";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-01-27.acacia",
});

export const CheckItOut = async (
  totalPrice: number,
  cart:
    | {
        id: string;
        imageUrl: string;
        imageIndex: number;
        name: string;
        quantity: number;
        price: number;
        color: string;
      }[]
    | undefined
) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
  }

  const orderExist = await prisma.order.findFirst({
    where: {
      userId: user?.id as string,
    },
  });
  const totPrice = Math.floor(totalPrice);
  let recentIntent;
  if (orderExist?.paymentItentId) {
    recentIntent = await stripe.paymentIntents.retrieve(
      orderExist?.paymentItentId as string
    );
  }
  if (orderExist && recentIntent?.status !== "succeeded") {
    const updateIntent = await stripe.paymentIntents.update(
      orderExist.paymentItentId,
      {
        amount: totPrice * 100,
        currency: "usd",
      }
    );
    await prisma.order.update({
      where: {
        paymentItentId: recentIntent?.id,
      },
      data: {
        amount: totPrice,
        currency: "usd",
        deliveryStatus: "pending",
        products: cart,
        status: "pending",
        userId: user.id,
      },
    });
    return { ...updateIntent };
  } else {
    //create intent
    const PaymentIntent = await stripe.paymentIntents.create({
      amount: totPrice * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    //create oder
    await prisma.order.create({
      data: {
        amount: totPrice,
        currency: "usd",
        paymentItentId: PaymentIntent.id,
        status: "pending",
        deliveryStatus: "pending",
        products: cart,
        userId: user.id,
      },
    });

    return { ...PaymentIntent };
  }
};

type OrderSecretProps = {
  paymentIntentId: string;
};
export const updateOrderDetails = async ({
  paymentIntentId,
}: OrderSecretProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  await prisma.order.update({
    where: {
      userId: user.id,
      paymentItentId: paymentIntentId,
    },
    data: {
      status: "completed",
      deliveryStatus: "onDispatch",
    },
  });
};

type AddressProps = {
  city: string;
  country: string;
  line1: string;
  line2: string;
  id: string;
};
export const updateDeliveryAddress = async ({
  city,
  country,
  line1,
  line2,
  id,
}: AddressProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  await prisma.order.update({
    where: {
      userId: user.id,
      paymentItentId: id,
    },
    data: {
      address: {
        city,
        country,
        line1,
        line2,
      },
    },
  });
};

export const DeleteCloudImage = async (id: string) => {
  await cloudinary.uploader.destroy(id);
};

type ProductProps = {
  brand: string;
  description: string;
  name: string;
  price: string;
  inStock: boolean | undefined;
  category: string | null;
  images: { color: string; image: string }[];
};

export const createProduct = async ({
  brand,
  description,
  name,
  price,
  inStock,
  category,
  images,
}: ProductProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Kindly go and login");
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new Error("You are not admin");
  }
  await prisma.products.create({
    data: {
      brand,
      category: category ?? "",
      description,
      inStock: inStock ?? false,
      name,
      price: parseFloat(price),
      images,
    },
  });
  return true;
};
type EditProductProps = {
  brand: string;
  description: string;
  name: string;
  price: string;
  inStock: boolean | undefined;
  category: string | null;
  images: { color: string; image: string }[];
  id: string | undefined;
};

export const editProduct = async ({
  brand,
  description,
  name,
  price,
  inStock,
  category,
  images,
  id,
}: EditProductProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Kindly go and login");
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new Error("You are not admin");
  }

  await prisma.products.update({
    where: {
      id: id,
    },
    data: {
      brand,
      category: category ?? "",
      description,
      inStock: inStock ?? false,
      name,
      price: parseFloat(price),
      images,
    },
  });
  return true;
};

export const getUserDetails = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return null;
  }
  const userData = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  return userData;
};

export const getAllProduct = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("Kindly login first");
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new Error("you are not an admin");
  }
  const allProduct = await prisma.products.findMany({
    orderBy: { createdAt: "desc" },
  });
  return allProduct;
};

export const deleteProduct = async (id: string) => {
  console.log(id);

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("kindly login first");
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new Error("You are not authorize");
  }
  await prisma.products.delete({
    where: {
      id,
    },
  });
  revalidatePath("/admin/manage-product");
};

export const updateDispatch = async (id: string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("kindly login first");
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new Error("You are not authorize");
  }
  await prisma.order.update({
    where: {
      id: id,
    },
    data: {
      deliveryStatus: "onDispatch",
    },
  });
  revalidatePath("/admin/manage-order");
};
export const updateDeliveryStatus = async (id: string) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("kindly login first");
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new Error("You are not authorize");
  }
  await prisma.order.update({
    where: {
      id: id,
    },
    data: {
      deliveryStatus: "completed",
    },
  });
  revalidatePath("/admin/manage-order");
};

type CreateReviewProps = {
  comment: string;
  ratingValue: number | null;
  productId: string;
};

export const CreateReview = async ({
  comment,
  ratingValue,
  productId,
}: CreateReviewProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("Kindly login first");
  }
  await prisma.review.create({
    data: {
      comment,
      productId,
      rating: ratingValue ?? 0,
      productsId: productId,
      userId: user.id,
    },
  });
  revalidatePath(`/productDetail/${productId}`);
  return true;
};
