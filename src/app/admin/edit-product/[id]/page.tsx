import EditProductForm from "@/components/EditProductForm";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Edit Product",
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  console.log(id);

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
  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <div className="w-full h-screen -my-20 flex text-4xl justify-center items-center animate-pulse">
        <h1 className="text-red-600 font-semibold">You are not authourised</h1>
      </div>
    );
  }
  const productDetails = await prisma.products.findUnique({
    where: {
      id,
    },
  });
  return (
    <div>
      <EditProductForm productDetails={productDetails} />
    </div>
  );
};

export default page;
