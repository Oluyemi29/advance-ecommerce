"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import Image from "next/image";

type OrderDetailsProps = {
  orderDetails: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    amount: number;
    currency: string;
    status: string;
    deliveryStatus: string | null;
    paymentItentId: string;
    userId: string | null;
    products:
      | {
          color: string;
          id: string;
          imageIndex: number;
          imageUrl: string;
          name: string;
          price: number;
          quantity: number;
        }[]
      | undefined;
    address:
      | {
          city: string;
          country: string;
          line1: string;
          line2: string;
        }
      | null
      | undefined;
  } | null;
};
const OrderDetail = ({ orderDetails }: OrderDetailsProps) => {
  return (
    <div>
      <h1>Orders Details</h1>
      <p>Order Id : {orderDetails?.id as string}</p>
      <p>
        Total Price :{" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(orderDetails?.amount as number)}
      </p>
      <div className="flex gap-5">
        Payment Status :{" "}
        <p
          className={
            orderDetails?.status === "pending"
              ? "text-red-600 px-3 py-1 font-bold italic"
              : orderDetails?.status === "completed"
              ? " text-green-600 px-3 py-1 font-bold italic"
              : ""
          }
        >
          {orderDetails?.status}
        </p>
      </div>
      <div className="flex gap-5">
        Delivery Status :{" "}
        <p
          className={
            orderDetails?.deliveryStatus === "pending"
              ? "text-red-600 px-3 py-1 font-bold italic"
              : orderDetails?.deliveryStatus === "completed"
              ? " text-green-600 px-3 py-1 font-bold italic"
              : orderDetails?.deliveryStatus === "onDispatch"
              ? " text-yellow-600 px-3 py-1 font-bold italic"
              : ""
          }
        >
          {orderDetails?.status}
        </p>
      </div>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>IMAGE</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>PRICE</TableColumn>
          <TableColumn>QUANTITY</TableColumn>
        </TableHeader>
        <TableBody>
          <>
            {orderDetails?.products?.map((product, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <Image
                      src={product.imageUrl as string}
                      alt="product"
                      width={50}
                      height={50}
                      priority
                      quality={100}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(product.price)}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                </TableRow>
              );
            })}
          </>
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderDetail;
