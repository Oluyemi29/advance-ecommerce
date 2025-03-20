import React from "react";
import AdminHomepage from "../../components/AdminHomepage";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const metadata :Metadata ={
  title : "Summary"
}

const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return null;
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (currentUser?.role !== "ADMIN") {
    throw new Error("You are not Authorised");
  }

  const todayDate = new Date().getDate();
  const someDaysAgo = todayDate - 27;
  const someDaysAgofullDate = new Date(new Date().setDate(someDaysAgo));

  const Order = await prisma.order.findMany({});
  const Product = await prisma.products.findMany({});
  const User = await prisma.user.findMany({});
  const SomeOrder = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: someDaysAgofullDate,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
  });
  const totalProduct = Order.reduce((acc, items) => {
    return items.amount + acc;
  }, 0);
  return (
    <div>
      <AdminHomepage
        Order={Order.length}
        Product={Product.length}
        User={User.length}
        totalProduct={totalProduct}
        SomeOrder={SomeOrder}
      />
    </div>
  );
};

export default page;
