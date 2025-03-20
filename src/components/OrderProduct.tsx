"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import React from "react";
import { IoReload } from "react-icons/io5";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { updateDeliveryStatus, updateDispatch } from "@/Action/PaymentIntent";
import toast from "react-hot-toast";
import Link from "next/link";

type AvailableOrderProps = {
  AvailableOrder: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    amount: number;
    currency: string;
    status: string;
    deliveryStatus: string | null;
    paymentItentId: string;
    userId: string | null;
    products: {
      color: string;
      id: string;
      imageIndex: number;
      imageUrl: string;
      name: string;
      price: number;
      quantity: number;
    }[];
    address: {
      city: string;
      country: string;
      line1: string;
      line2: string;
    } | null;
  }[];
};

const OrderProduct = ({ AvailableOrder }: AvailableOrderProps) => {
  const handleDispatch = async (id: string) => {
    await updateDispatch(id);
    console.log(id);
    toast.success("Delivery status onDispatch");
  };
  const handleDelivered = async (id: string) => {
    console.log(id);
    await updateDeliveryStatus(id);
    toast.success("Product delivered successfully");
  };
  return (
    <div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>DELIVERY STATUS</TableColumn>
          <TableColumn>PAYMENT ID</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody
          className="flex flex-col gap-3"
          emptyContent={"No order available"}
        >
          <>
            {AvailableOrder.map((Order, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{Order.id}</TableCell>
                  <TableCell>
                    <span
                      className={
                        Order.status === "pending"
                          ? "bg-red-600 text-white px-3 py-1 rounded-md "
                          : Order.status === "completed"
                          ? "bg-green-600 text-white px-3 py-1 w-max rounded-md"
                          : ""
                      }
                    >
                      {Order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        Order.deliveryStatus === "pending"
                          ? "bg-red-600 text-white px-3 py-1 rounded-md "
                          : Order.deliveryStatus === "completed"
                          ? "bg-green-600 text-white px-3 py-1 w-max rounded-md"
                          : Order.deliveryStatus === "onDispatch"
                          ? "bg-yellow-600 text-white px-3 py-1 w-max rounded-md"
                          : ""
                      }
                    >
                      {Order.deliveryStatus}
                    </span>
                  </TableCell>
                  <TableCell>{Order.paymentItentId}</TableCell>
                  <TableCell>
                    <div className="flex gap-5">
                      <IoReload
                        onClick={() => handleDispatch(Order.id)}
                        size={20}
                        className="cursor-pointer"
                      />{" "}
                      <IoIosCheckmarkCircleOutline
                        onClick={() => handleDelivered(Order.id)}
                        className="cursor-pointer"
                        size={20}
                      />{" "}
                      <Link href={`/admin/order/${Order.id}`}>
                        <FaEye className="cursor-pointer" size={20} />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderProduct;
