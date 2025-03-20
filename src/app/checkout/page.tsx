import React from "react";
import CheckOutClient from "./CheckOutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

const page = () => {
  const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY as string;

  return (
    <div>
      <CheckOutClient STRIPE_PUBLISHABLE_KEY={STRIPE_PUBLISHABLE_KEY} />
    </div>
  );
};

export default page;
