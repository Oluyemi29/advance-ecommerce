"use client";
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Rating } from "@mui/material";
import Image from "next/image";
import { Button, Card, Textarea } from "@heroui/react";
import { CartContext } from "./Provider";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateReview } from "@/Action/PaymentIntent";
import toast from "react-hot-toast";
import moment from "moment";

// type ProductProps = {
//   product:
//     | {
//         id: string;
//         name: string;
//         description: string;
//         price: number;
//         brand: string;
//         category: string;
//         inStock: boolean;
//         quantity: number;
//         images: {
//           color: string;
//           colorCode: string;
//           image: string;
//         }[];
//         reviews: {
//           id: string;
//           userId: string;
//           productId: string;
//           rating: number;
//           comment: string;
//           createdDate: string;
//           user: {
//             id: string;
//             name: string;
//             email: string;
//             emailVerified: null;
//             image: string;
//             hashedPassword: null;
//             createdAt: string;
//             updatedAt: string;
//             role: string;
//           };
//         }[];
//       }
//     | undefined|null;
// };
type ProductProps = {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    brand: string;
    inStock: boolean;
    quantity: number | null;
    createdAt: Date;
    updatedAt: Date;
    images: {
      color: string;
      colorCode: string | null;
      image: string;
    }[];
    review:
      | {
          User: {
            name: string | null;
            id: string;
            email: string | null;
            image: string | null;
            role: string;
            createdAt: Date;
            updatedAt: Date;
          } | null;
          id: string;
          createdAt: Date;
          updatedAt: Date;
          userId: string | null;
          productId: string;
          rating: number;
          comment: string;
          productsId: string | null;
        }[]
      | undefined;
  } | null;
};

const ProductDetailCard = ({ product }: ProductProps) => {
  const Cart = useContext(CartContext);
  const [imageUrl, setImageUrl] = useState<string>(
    product?.images[0].image as string
  );
  const [imageIndex, setImageIndex] = useState<number>(0);
  const [ratingValue, setRatingValue] = useState<number | null>(0);

  const formSchema = z.object({
    comment: z.string().min(1, "This shouldnt be empty"),
  });
  type formSchemaType = z.infer<typeof formSchema>;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const submit = async (value: formSchemaType) => {
    const { comment } = value;
    const response = await CreateReview({
      comment,
      ratingValue,
      productId: product?.id as string,
    });
    if (response) {
      setRatingValue(0);
      toast.success("review created successfully");
      reset();
    }
  };
  function setValue(newValue: number | null) {
    console.log(newValue);
    setRatingValue(newValue as number);
  }

  const ratingCal = product?.review?.reduce((acc, rates) => {
    return rates.rating + acc;
  }, 0);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5, ease: "easeIn" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2  my-5 ">
        <div className="w-full">
          <div className="w-[75%] flex flex-col justify-center items-center gap-3">
            <Image
              src={imageUrl}
              alt="product"
              width={100}
              height={100}
              priority
              quality={95}
              className="w-[50%]"
            />
            <div className="justify-center items-center flex gap-5 mx-auto">
              {product?.images.map((image, index) => {
                return (
                  <Image
                    src={image.image}
                    key={index}
                    alt="product"
                    width={80}
                    height={80}
                    priority
                    quality={95}
                    onClick={() => {
                      setImageUrl(image.image);
                      setImageIndex(index);
                    }}
                    className={`${
                      image.image === imageUrl &&
                      "border-2 rounded-lg border-primary p-1"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <h1>{product?.price}</h1>
          <span className="text-[0.7rem] flex gap-3">
            <Rating
              value={
                product?.review && ratingCal
                  ? ratingCal / product.review?.length
                  : 0
              }
              name="half-rating-read"
              size="small"
            />
            <p>{product?.review?.length} review</p>
          </span>
          <p className="text-0.9rem">{product?.description}</p>
          <span className="font-bold flex gap-3 ">
            Category{" "}
            <p className="font-normal text-[0.9rem]">: {product?.category}</p>
          </span>
          <span className="font-bold flex gap-3 ">
            Brand{" "}
            <p className="font-normal text-[0.9rem]">: {product?.brand}</p>
          </span>
          <p className="text-primary">
            {product?.inStock ? "inStock" : "Out of Stock"}
          </p>
          <span className="font-bold flex gap-3 ">
            Quantity{" "}
            <p className="font-normal text-[0.9rem]">: {product?.quantity}</p>
          </span>
          <span className="font-bold flex gap-3 ">
            Color{" "}
            <p className="font-normal text-[0.9rem]">
              : {product?.images[imageIndex].color}
            </p>
          </span>
          <Button
            onPress={() => {
              Cart?.addToCart(
                product?.id as string,
                imageUrl as string,
                imageIndex as number,
                product?.name as string,
                product?.quantity as number,
                product?.price as number,
                product?.images[imageIndex].color as string
              );
            }}
            className="text-background w-full mt-5 bg-primary"
          >
            Add Cart
          </Button>
        </div>
        <Card className="p-5">
          <div className="mt-4">
            <h3>Product Reviews</h3>
            <form onSubmit={handleSubmit(submit)}>
              <Textarea
                {...register("comment")}
                isInvalid={!!errors.comment}
                errorMessage={errors.comment?.message}
                min={2}
                type="text"
                placeholder="Enter description"
              />
              <Rating
                value={ratingValue}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  console.log(event);
                }}
                className="mt-4"
              />
              <Button
                className="bg-primary w-full mt-10 h-12 font-semibold text-white"
                type="submit"
              >
                Submit
              </Button>
            </form>
            {product?.review?.map((item, index) => {
              return (
                <div className="my-5" key={index}>
                  <Image
                    src={item.User?.image as string}
                    alt="user"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                  <span className="text-small">{item.User?.name}</span> <br />
                  <span className="text-[0.7rem]">
                    {moment(item.createdAt).fromNow()}
                  </span>{" "}
                  <br />
                  <span className="text-small">
                    {<Rating readOnly size={"small"} value={item.rating} />}
                  </span>
                  <br />
                  <span className="text-small">{item.comment}</span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default ProductDetailCard;
