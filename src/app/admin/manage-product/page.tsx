import ManageProduct from "@/components/ManageProduct";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Manage Product",
};

const page = () => {
  return (
    <div>
      <h1 className="my-4 text-primary font-semibold text-2xl">Manage Product</h1>
      <ManageProduct />
    </div>
  );
};

export default page;
