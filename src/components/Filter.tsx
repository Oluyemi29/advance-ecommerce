"use client";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import React, { useEffect, useState } from "react";
import LatestProductCard from "./LatestProductCard";

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
export const CategoryList = [
  { key: "phone", label: "Phone" },
  { key: "laptop", label: "Laptop" },
  { key: "desktop", label: "Desktop" },
  { key: "watch", label: "Watch" },
  { key: "Television", label: "Television" },
  { key: "Gadget", label: "Gadget" },
];

const Filter = ({ products }: ProductProps) => {
  // const [value, setValue] = React.useState({from : 0,to : 0});
  const [filteredProduct, setFilteredProduct] =
    useState<FilterdProductProps[]>();
  useEffect(() => {
    setFilteredProduct(products);
  }, [products]);

  const handlePriceFilter = (from: number, to: number) => {
    const filtered = products.filter((Prod) => {
      return Prod.price >= from && Prod.price <= to;
    });
    setFilteredProduct(filtered);
  };

  return (
    <div className="mt-5">
      <Card className="flex flex-row gap-10 py-5">
        <div className="w-[20%] text-foreground rounded-xl min-h-max bg-background">
          <CardHeader>Price</CardHeader>
          <CardBody className="flex flex-col gap-3">
            <Button
              className=""
              onPress={() => {
                handlePriceFilter(0, 1000);
              }}
            >
              $1000
            </Button>
            <Button
              className=""
              onPress={() => {
                handlePriceFilter(1000, 2000);
              }}
            >
              $1000 - $2000
            </Button>
            <Button
              className=""
              onPress={() => {
                handlePriceFilter(2000, 3000);
              }}
            >
              $2000 - $3000
            </Button>
            <Button
              className=""
              onPress={() => {
                handlePriceFilter(3000, 4000);
              }}
            >
              $3000 - $4000
            </Button>
            <Button
              className=""
              onPress={() => {
                handlePriceFilter(4000, 5000);
              }}
            >
              $4000 - $5000
            </Button>
            <Button
              className=""
              onPress={() => {
                handlePriceFilter(5000, 6000000); 
              }}
            >
              $5000 - $6000000
            </Button>
          </CardBody>
        </div>
        <div className="w-[80%] mx-auto grid place-content-center lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
          {filteredProduct?.map((product, index) => {
            return <LatestProductCard key={index} product={product} />;
          })}
        </div>
      </Card>
    </div>
  );
};

export default Filter;
