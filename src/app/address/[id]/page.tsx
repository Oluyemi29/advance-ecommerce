import AddressForm from "@/components/AddressForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Delivery Address",
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  console.log(id);

  return (
    <div>
      <AddressForm id={id as string} />
    </div>
  );
};

export default page;
