import AddProductForm from "@/components/AddProductForm";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add Product",
};

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
  if (!currentUser || currentUser.role !== "ADMIN") {
    return (
      <div className="w-full h-screen -my-20 flex text-4xl justify-center items-center animate-pulse">
        <h1 className="text-red-600 font-semibold">You are not authourised</h1>
      </div>
    );
  }
  return (
    <div>
      <AddProductForm />
    </div>
  );
};

export default page;
