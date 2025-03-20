import ProductDetailCard from "@/components/ProductDetailCard";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Product Detail",
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const ProductInfo = await prisma.products.findUnique({
    where: {
      id,
    },
    include: {
      review: {
        include: {
          User: true,
        },
      },
    },
  });
  return (
    <div>
      <ProductDetailCard product={ProductInfo} />
    </div>
  );
};

export default page;
