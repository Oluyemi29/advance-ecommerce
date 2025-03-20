"use client";
import { Button } from "@heroui/react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "./Provider";
import { updateOrderDetails } from "@/Action/PaymentIntent";
// import { clearPaymentIntent } from "@/Action/PaymentIntent";
type CheckOutFormProps = {
  clientSecret: string;
  paymentIntentId: string;
  handleSetPaymentStatus: (value: boolean) => void;
};

const CheckOutForm = ({
  clientSecret,
  paymentIntentId,
  handleSetPaymentStatus,
}: CheckOutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const Cart = useContext(CartContext);
  const totalPrice = Cart?.cart.reduce((acc, Prices) => {
    return Math.ceil(Prices.quantity * Prices.price + acc);
  }, 0);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
  }, [stripe, clientSecret]);
  if (!stripe || !elements) {
    return;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    const confirmPayment = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (!confirmPayment.error) {
      toast.success("checkout successfully");
      Cart?.clearAllCart();
      handleSetPaymentStatus(true);
      updateOrderDetails({ paymentIntentId });
      setPaymentDone(true);
    }
    setIsLoading(false);
  };
  return (
    <div>
      <form
        className="flex flex-col justify-center items-center"
        id="payment-form"
        onSubmit={handleSubmit}
      >
        {!paymentDone && (
          <>
            <div>
              <h1 className="font-bold my-3 text-center text-lg">
                Enter your details to complete checkout
              </h1>
              <h1 className="font-semibold my-2 text-center text-sm">
                Payment Information
              </h1>
            </div>
            <PaymentElement
              className="md:w-[40%] w-full mx-auto"
              id="payment-element"
              options={{ layout: "tabs" }}
            />
            <h1 className="text-xl text-center mt-5 font-bold">
              Total :
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(totalPrice as number)}
            </h1>
            {isLoading ? (
              <Button
                disabled
                className="text-white mt-4 md:w-[40%] w-full bg-primary"
              >
                Processing...
              </Button>
            ) : (
              <Button
                type="submit"
                className="text-white md:w-[40%] mt-4 w-full bg-primary"
              >
                Pay Now
              </Button>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default CheckOutForm;
