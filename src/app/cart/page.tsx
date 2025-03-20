import CartForm from "@/components/CartForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Cart",
};
const page = async () => {
  return (
    <div>
      <CartForm />
    </div>
  );
};

export default page;
