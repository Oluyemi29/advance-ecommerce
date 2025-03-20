"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckItOut } from "@/Action/PaymentIntent";
import { CartContext } from "@/components/Provider";
import { Button, Card } from "@heroui/react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "@/components/CheckOutForm";
import Link from "next/link";

type STRIPE_PUBLISHABLE_KEY_PROPS = {
  STRIPE_PUBLISHABLE_KEY: string;
};

const CheckOutClient = ({
  STRIPE_PUBLISHABLE_KEY,
}: STRIPE_PUBLISHABLE_KEY_PROPS) => {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [paymentSucess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const Cart = useContext(CartContext);
  const totalPrice = Cart?.cart.reduce((acc, Prices) => {
    return Math.ceil(Prices.quantity * Prices.price + acc);
  }, 0);

  useEffect(() => {
    const getIntents = async () => {
      setLoading(true);
      try {
        const intents = await CheckItOut(totalPrice as number, Cart?.cart);
        setClientSecret(intents?.client_secret as string);
        setPaymentIntentId(intents?.id as string);

        console.log(intents);
      } catch (error) {
        console.log(error);
      }
    };
    getIntents();
    setLoading(false);
  }, [Cart?.cart, totalPrice]);

  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  const Option: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };
  const handleSetPaymentStatus = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.5, ease: "easeIn" }}
    >
      <div>
        <Card className="grid ">
          {clientSecret && (
            <Elements options={Option} stripe={stripePromise}>
              <CheckOutForm
                clientSecret={clientSecret}
                paymentIntentId={paymentIntentId}
                handleSetPaymentStatus={handleSetPaymentStatus}
              />
            </Elements>
          )}
          {loading && <div className="text-center">Loading Check Out</div>}
          {paymentSucess && (
            <div className="flex flex-col justify-center items-center gap-4">
              <div>Payment Succesfull</div>
              <div>
                <Link href={`/address/${paymentIntentId}`}>
                  <Button className="text-white bg-primary">
                    FIll Delivery Address
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Card>
      </div>
    </motion.div>
  );
};

export default CheckOutClient;
