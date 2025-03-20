"use client";
import { Card, CardBody, CardFooter } from "@heroui/react";
// import { Rating } from "@mui/material";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type ProductProps = {
  product: {
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
    // reviews: {
    //   id: string;
    //   userId: string;
    //   productId: string;
    //   rating: number;
    //   comment: string;
    //   createdDate: string;
    //   user: {
    //     id: string;
    //     name: string;
    //     email: string;
    //     emailVerified: null;
    //     image: string;
    //     hashedPassword: null;
    //     createdAt: string;
    //     updatedAt: string;
    //     role: string;
    //   };
    // }[];
  };
};

const LatestProductCard = ({ product }: ProductProps) => {
  // const ratingCal = product?.reviews?.reduce((adds, rates) => {
  //   return rates.rating + adds;
  // }, 0);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
    >
      <Link href={`/productDetail/${product?.id}`}>
        <Card className="text-foreground bg-background">
          <CardBody>
            <div className="h-60 flex flex-col justify-center items-center">
              <Image
                src={product?.images[0]?.image || "/phone1.jpg"}
                alt={"product"}
                width={100}
                height={100}
                priority
                quality={95}
                className="w-full rounded-lg"
              />
            </div>
          </CardBody>
          <CardFooter className=" flex flex-col gap-3">
            <div className="flex justify-between w-full">
              <h1>Hello Sale</h1>
              <p>
                {" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(product?.price)}
              </p>
            </div>
            {/* <Rating
              name="half-rating-read"
              defaultValue={3} 
              value={ratingCal / product?.reviews?.length}
              precision={0.5}
              size="small"
            /> */}
            <div className="line-clamp-1">{product?.description}</div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
};

export default LatestProductCard;
