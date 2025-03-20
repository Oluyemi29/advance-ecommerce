"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@heroui/react";
import { motion } from "framer-motion";
import { IoEyeSharp } from "react-icons/io5";
import Link from "next/link";

type OrderInforType = {
  OrderInfo: {
    currency: string;
    id: string;
    status: string;
    deliveryStatus: string | null;
    createdAt: Date;
    updatedAt: Date;
    amount: number;
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
  currentUser: {
    name: string | null;
    id: string;
    email: string | null;
    image: string | null;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
};

const OrderInfo = ({ OrderInfo, currentUser }: OrderInforType) => {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(OrderInfo?.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return OrderInfo?.slice(start, end);
  }, [page, OrderInfo]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.5, ease: "easeIn" }}
    >
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="name">NAME</TableColumn>
          <TableColumn key="role">AMOUNT(USD)</TableColumn>
          <TableColumn key="paymentstatus">PAYMENT STATUS</TableColumn>
          <TableColumn key="deliverystatus">DELIVERY STATUS</TableColumn>
          <TableColumn key="date">DATE</TableColumn>
          <TableColumn key="action">ACTION</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No order currently"} items={items}>
          <>
            {OrderInfo &&
              OrderInfo.map((Order, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{currentUser?.name as string}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(Order.amount)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          Order.status === "pending"
                            ? "bg-red-600 text-white px-3 py-1 rounded-md "
                            : Order.status === "completed"
                            ? "bg-green-600 text-white px-3 py-1 w-max rounded-md"
                            : Order.status === "onDispatch"
                            ? "bg-yellow-600 text-white px-3 py-1 w-max rounded-md"
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
                    <TableCell>
                      {new Intl.DateTimeFormat("en-US").format(Order.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Link href={""}>
                        <IoEyeSharp size={20} title="view Order" />
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
          </>
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default OrderInfo;
