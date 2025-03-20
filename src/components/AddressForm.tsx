"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@heroui/react";
import { updateDeliveryAddress } from "@/Action/PaymentIntent";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type IDprops = {
  id: string;
};
const AddressForm = ({ id }: IDprops) => {
    const router = useRouter()
  const [loading, setLoading] = useState(false);
  const formSchema = z.object({
    city: z.string().min(1, { message: "it is required" }),
    country: z.string().min(1, { message: "it is required" }),
    line1: z.string().min(1, { message: "it is required" }),
    line2: z.string().min(1, { message: "it is required" }),
  });
  type typeFormSchema = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeFormSchema>({
    resolver: zodResolver(formSchema),
  });
  const submit = async (value: typeFormSchema) => {
    setLoading(true);
    try {
      const { city, country, line1, line2 } = value;
      await updateDeliveryAddress({ city, country, line1, line2, id });
      toast.success("address updated successfully");
      router.push("/order")
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.5, ease: "easeIn" }}
      className="flex flex-col gap-3 "
    >
      <form
        action=""
        onSubmit={handleSubmit(submit)}
        className="flex my-10 flex-col gap-4 md:w-[50%] mx-auto"
      >
        <Input
          isInvalid={!!errors.city}
          className=""
          type="text"
          label={"city"}
          {...register("city")}
        />
        <Input
          isInvalid={!!errors.country}
          className=""
          type="text"
          label={"country"}
          {...register("country")}
        />
        <Input
          isInvalid={!!errors.line1}
          className=""
          type="text"
          label={"line1"}
          {...register("line1")}
        />
        <Input
          isInvalid={!!errors.line2}
          className=""
          type="text"
          label={"line2"}
          {...register("line2")}
        />
        {loading ? (
          <>
            <Button
              disabled
              type="button"
              className="bg-primary text-white w-full"
            >
              Loading...
            </Button>
          </>
        ) : (
          <>
            <Button type="submit" className="bg-primary text-white w-full">
              Submit
            </Button>
          </>
        )}
      </form>
    </motion.div>
  );
};

export default AddressForm;
