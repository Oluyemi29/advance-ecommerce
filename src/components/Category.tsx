"use client";
import { Select, SelectItem } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LatestProductCard from "./LatestProductCard";

export const CategoryList = [
  { key: "phone", label: "Phone" },
  { key: "laptop", label: "Laptop" },
  { key: "desktop", label: "Desktop" },
  { key: "watch", label: "Watch" },
  { key: "tv", label: "Tv" },
  { key: "accessories", label: "Accessories" },
];
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
type FilterdProductProps = {
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
};

const Category = ({ products }: ProductProps) => {
  const [value, setValue] = useState("");
  const [filteredProduct, setFilteredProduct] =
    useState<FilterdProductProps[]>();

  useEffect(() => {
    const filted = products.filter((Product) => {
      return value
        ? Product.category.toLowerCase() === value.toLowerCase()
        : products;
    });
    setFilteredProduct(filted);
  }, [value, products]);
  console.log(products);
  return (
    <motion.div>
      <div className="flex mt-10 gap-4">
        <Select
          className="max-w-xs"
          label="Favorite Categories"
          placeholder="Select a Categories"
          selectedKeys={value}
          variant="bordered"
          onSelectionChange={(value)=>{setValue(value.anchorKey as string)}}
        >
          {CategoryList.map((catelist) => (
            <SelectItem key={catelist.key}>{catelist.label}</SelectItem>
          ))}
        </Select>
        <div className="w-[80%] mx-auto grid place-content-center lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
          {filteredProduct?.map((product, index) => {
            return <LatestProductCard key={index} product={product} />;
          })}
        </div>
      </div>

      <p className="text-default-500 text-small">Selected: {value}</p>
    </motion.div>
  );
};

export default Category;
