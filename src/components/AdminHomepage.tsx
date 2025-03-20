"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import { FaDollarSign } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type StatsProps = {
  Order: number;
  Product: number;
  User: number;
  totalProduct: number;
  SomeOrder: {
    amount: number;
    createdAt: Date;
  }[];
};
const AdminHomepage = ({
  Order,
  Product,
  User,
  totalProduct,
  SomeOrder,
}: StatsProps) => {
  //   const data = [
  //     {
  //       name: "Page A",
  //       uv: 4000,
  //       pv: 2400,
  //       amt: 2400,
  //     },
  //     {
  //       name: "Page B",
  //       uv: 3000,
  //       pv: 1398,
  //       amt: 2210,
  //     },
  //     {
  //       name: "Page C",
  //       uv: 2000,
  //       pv: 9800,
  //       amt: 2290,
  //     },
  //     {
  //       name: "Page D",
  //       uv: 2780,
  //       pv: 3908,
  //       amt: 2000,
  //     },
  //     {
  //       name: "Page E",
  //       uv: 1890,
  //       pv: 4800,
  //       amt: 2181,
  //     },
  //     {
  //       name: "Page F",
  //       uv: 2390,
  //       pv: 3800,
  //       amt: 2500,
  //     },
  //     {
  //       name: "Page G",
  //       uv: 3490,
  //       pv: 4300,
  //       amt: 2100,
  //     },
  //   ];

  const data = SomeOrder.map((eachOrder) => {
    return {
      amount: eachOrder.amount,
      date: new Intl.DateTimeFormat("en-US").format(eachOrder.createdAt),
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.5, ease: "easeIn" }}
      className=""
    >
      <Card className="bg-background p-5">
        <h1 className="text-center text-3xl my-3 font-bold text-foreground">
          STATS
        </h1>
        <div className=" grid grid-cols-1 md:grid-cols-4 gap-5">
          <Card className="p-3 bg-background flex flex-row justify-between w-full items-center">
            <div>
              <h1 className="font-bold">Total Revenue</h1>
              <p>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(totalProduct)}
              </p>
            </div>
            <FaDollarSign size={25} className="text-primary" />
          </Card>
          <Card className="p-3 bg-background flex flex-row justify-between w-full items-center">
            <div>
              <h1 className="font-bold">Total Order</h1>
              <p>{Order}</p>
            </div>
            <FaBookmark size={25} className="text-primary" />
          </Card>
          <Card className="p-3 bg-background flex flex-row justify-between w-full items-center">
            <div>
              <h1 className="font-bold">Total Products</h1>
              <p>{Product}</p>
            </div>
            <AiOutlineProduct size={25} className="text-primary" />
          </Card>
          <Card className="p-3 bg-background flex flex-row justify-between w-full items-center">
            <div>
              <h1 className="font-bold">Total User</h1>
              <p>{User}</p>
            </div>
            <FaUser size={25} className="text-primary" />
          </Card>
        </div>
        <Card className="w-full mt-5 h-[28rem]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              className="w-full h-full"
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis dataKey="amount" />
              <Tooltip />
              <Legend />
              {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" /> */}
              <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Card>
    </motion.div>
  );
};

export default AdminHomepage;
