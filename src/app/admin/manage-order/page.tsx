import OrderProduct from "@/components/OrderProduct";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Manage Order",
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
    return null;
  }
  const AvailableOrder = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div>
      <OrderProduct AvailableOrder={AvailableOrder} />
    </div>
  );
};

export default page;
