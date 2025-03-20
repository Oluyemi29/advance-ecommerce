"use client";
import React from "react";
import LatestProductCard from "./LatestProductCard";
import { motion } from "framer-motion";
// import { Products } from "./Products";

type ProductProps = {
  products: {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    price: number;
    brand: string;
    category: string;
    inStock: boolean;
    images: {
      color: string;
      colorCode: string | null;
      image: string;
    }[];
  }[];
};
const AllProduct = ({ products }: ProductProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.9, duration: 0.5, ease: "easeIn" }}
      className="w-full flex flex-col gap-3 justify-center"
    >
      <div className="text-center text-3xl">
        <span className="text-primary text-5xl font-semibold ml-2">A</span>ll
        <span className="text-primary text-5xl font-semibold ml-2">P</span>
        roduct
      </div>
      <div className="w-[70%] mx-auto grid place-content-center lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
        {products.map((product, index) => {
          return <LatestProductCard key={index} product={product} />;
        })}
      </div>
      <div className="w-[70%] mx-auto grid place-content-center lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5"></div>
    </motion.div>
  );
};

export default AllProduct;
