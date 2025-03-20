import OrderInfo from "@/components/OrderInfo";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Metadata } from "next";
import React from "react";

export const metadata : Metadata ={
  title : "Order"
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
  const getOrder = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <OrderInfo OrderInfo={getOrder} currentUser={currentUser} />
    </div>
  );
};

export default page;
