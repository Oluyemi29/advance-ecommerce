"use client";
import React, { useContext } from "react";
import { CartContext } from "./Provider";
import Image from "next/image";
import { Button } from "@heroui/react";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";

const CartForm = () => {
  const Cart = useContext(CartContext);
  const totalPrice = Cart?.cart.reduce((acc, Prices) => {
    return Math.ceil(Prices.quantity * Prices.price + acc);
  }, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.5, ease: "easeIn" }}
      className="flex flex-col gap-3"
    >
      <h1>Item Cart</h1>
      {Cart && Cart?.cart.length > 0 ? (
        <>
          {Cart?.cart.map((Carts, index) => {
            return (
              <div
                className="odd:bg-transparent even:bg-slate-100 p-1 rounded-md"
                key={index}
              >
                <div className="flex items-center gap-1 justify-between">
                  <Image
                    src={Carts.imageUrl}
                    alt="Carts"
                    width={100}
                    height={100}
                    priority
                    quality={95}
                  />
                  <div>
                    <span>{Carts.name.substring(0, 9)}</span> <br />
                    <span>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(Carts.price)}
                    </span>{" "}
                    <br />
                    <span>{Carts.color}</span> <br />
                    <Button
                      onPress={() => Cart.removeItemed(Carts.id)}
                      className="bg-red-600 text-white"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      className="font-semibold text-xl bg-primary text-white"
                      size="sm"
                      onPress={() => Cart.increaseQuantity(Carts.id)}
                    >
                      +
                    </Button>
                    <Button className="font-semibold text-sm" size="sm">
                      {Carts?.quantity}
                    </Button>
                    <Button
                      className="font-semibold text-xl bg-red-600 text-white"
                      size="sm"
                      onPress={() => Cart.decreaseQuantity(Carts.id)}
                    >
                      -
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-between items-center">
            <Button
              onPress={() => Cart.clearAllCart()}
              className="bg-red-600 text-white"
            >
              Clear Cart
            </Button>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">
                Total :{" "}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(totalPrice as number)}
              </span>
              <Link href={"/checkout"}>
                <Button className="bg-primary text-white">Check out</Button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className="font-semibold">No Item in Cart</h1>
          <Link href={"/"}>
            <Button className="bg-primary text-white">
              Continue Shopping <IoIosArrowRoundForward />
            </Button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default CartForm;
