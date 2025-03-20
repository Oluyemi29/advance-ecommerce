"use client";
import { Button, Checkbox, Input, Textarea, Tooltip } from "@heroui/react";
import React, { useState } from "react";
import { MdPhoneAndroid } from "react-icons/md";
import { GiLaptop } from "react-icons/gi";
import { IoDesktopSharp } from "react-icons/io5";
import { TbDevicesSearch } from "react-icons/tb";
import { GiWatch } from "react-icons/gi";
import { BiSolidTv } from "react-icons/bi";
import ImageUploader from "./ImageUploader";
import type { Selection } from "@heroui/react";
import { motion } from "framer-motion";
import { Select, SelectItem } from "@heroui/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { createProduct } from "@/Action/PaymentIntent";

export const AllColor = [
  { key: "black", label: "Black" },
  { key: "silver", label: "Silver" },
  { key: "white", label: "White" },
  { key: "gray", label: "Gray" },
  { key: "red", label: "Red" },
  { key: "gold", label: "Gold" },
  { key: "blue", label: "Blue" },
  { key: "graphite", label: "Graphite" },
];

interface cloudinaryResponse {
  asset_id: string;
  public_id: string;
  secure_url: string;
}

const AddProductForm = () => {
  const formSchema = z.object({
    name: z.string().min(1, { message: "name is required" }),
    price: z
      .string()
      .refine((value) => Number(value) > 1, { message: "price too small" }),
    brand: z.string().min(1, { message: "brand is required" }),
    description: z.string().min(1, { message: "description is required" }),
    inStock: z.boolean().optional(),
  });

  type formSchemaType = z.infer<typeof formSchema>;

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const [uploadedImages, setUploadedImages] = useState<cloudinaryResponse[]>(
    []
  );
  const [category, setCategory] = useState<string | null>(null);
  const [color, setColor] = React.useState<Selection>(new Set([]));
  // const [imageUrl, setImageUrl] = useState<string[]>([]);
  let imageUrl: string[] = [];
  if (color) {
    uploadedImages.map((upImage) => {
      imageUrl.push(upImage.secure_url as string);
    });
  }

  const submit = async (value: formSchemaType) => {
    const { brand, description, name, price, inStock } = value;
    const images = Array.from(color).map((eachColor, index) => {
      return {
        color: eachColor.toString(),
        image: uploadedImages[index]?.secure_url,
      };
    });
    if (imageUrl.length < 1) {
      toast.error("kindly upload image");
      return;
    }
    if (Array.from(color).length < 1) {
      toast.error("kindly pick color");
      return;
    }
    if (Array.from(color).length !== imageUrl.length) {
      toast.error("number of color is not equal to the number of image");
      return;
    } else {
      const response = await createProduct({
        brand,
        description,
        name,
        price,
        inStock,
        category,
        images,
      });
      if (response) {
        toast.success("product created successfully");
        reset();
        setCategory("");
        setUploadedImages([]);
        setColor(new Set([]));
        imageUrl = [];
      } else {
        toast.error("error when creating product");
      }
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.5, ease: "easeIn" }}
      className="w-full md:w-[50%] flex flex-col mx-auto my-10 p-10 rounded-xl border-2 border-gray"
    >
      <h1>Add Product</h1>
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full flex flex-col gap-3 "
      >
        <Input
          {...register("name")}
          isInvalid={!!errors.name}
          errorMessage={errors?.name?.message}
          type="text"
          label="Name"
        />
        <Input
          {...register("price")}
          isInvalid={!!errors.price}
          errorMessage={errors?.price?.message}
          type="number"
          label="Price"
        />
        <Input
          {...register("brand")}
          isInvalid={!!errors.brand}
          errorMessage={errors?.brand?.message}
          type="text"
          label="Brand"
        />
        <Textarea
          {...register("description")}
          isInvalid={!!errors.description}
          errorMessage={errors?.description?.message}
          label="Description"
          type="text"
        />
        <Checkbox {...register("inStock")} color="default">
          The product is in stock
        </Checkbox>

        <h1 className="self-start font-bold text-lg">Select a Category</h1>
        <div className="grid grid-cols-3 gap-3">
          <Tooltip content="Phone">
            <Button
              onPress={() => setCategory("Phone")}
              className="text-lg font font-semibold"
            >
              <MdPhoneAndroid size={40} /> Phone
            </Button>
          </Tooltip>
          <Tooltip content="Laptop">
            <Button
              onPress={() => setCategory("Laptop")}
              className="text-lg font font-semibold"
            >
              <GiLaptop size={40} /> Laptop
            </Button>
          </Tooltip>
          <Tooltip content="Desktop">
            <Button
              onPress={() => setCategory("Desktop")}
              className="text-lg font font-semibold"
            >
              <IoDesktopSharp /> Desktop
            </Button>
          </Tooltip>
          <Tooltip content="Watch">
            <Button
              onPress={() => setCategory("Watch")}
              className="text-lg font font-semibold"
            >
              <GiWatch /> Watch
            </Button>
          </Tooltip>
          <Tooltip content="Tv">
            <Button
              onPress={() => setCategory("Television")}
              className="text-lg font font-semibold"
            >
              <BiSolidTv /> Television
            </Button>
          </Tooltip>
          <Tooltip content="Gadget">
            <Button
              onPress={() => setCategory("Gadget")}
              className="text-lg font font-semibold"
            >
              <TbDevicesSearch /> Gadget
            </Button>
          </Tooltip>
        </div>

        {/* select the image of the product */}
        <ImageUploader
          uploadedImages={uploadedImages}
          setUploadedImages={setUploadedImages}
        />

        <div>
          <h1 className="text-[0.8rem]">
            Select The available product color and upload the image
          </h1>
          <p className="text-[0.8rem]">
            You must upload an image for each of the phone selected{" "}
          </p>
          <div className="flex w-full max-w-xs flex-col gap-2">
            <Select
              className="w-full"
              label="Select the Product Color"
              placeholder="Select Color"
              selectedKeys={color}
              selectionMode="multiple"
              onSelectionChange={setColor}
            >
              {AllColor.map((color) => (
                <SelectItem key={color.key}>{color.label}</SelectItem>
              ))}
            </Select>
            <p className="text-small text-default-500">
              Selected: {Array.from(color).join(", ")}
            </p>
          </div>
        </div>
        <Button className="bg-primary text-white" type="submit">
          Add Product
        </Button>
      </form>
    </motion.div>
  );
};

export default AddProductForm;
