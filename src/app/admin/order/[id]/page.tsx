import OrderDetail from "@/components/OrderDetail";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Order",
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  console.log(id);

  const orderDetails = await prisma.order.findUnique({
    where: {
      id: id,
    },
  });
  return (
    <div>
      <OrderDetail orderDetails={orderDetails} />
    </div>
  );
};

export default page;
