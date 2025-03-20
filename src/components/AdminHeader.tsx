"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminHeader = () => {
  const pathName = usePathname();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 0.5, ease: "easeIn" }}
      className="flex flex-col gap-3 "
    >
      <div>
        <ul className="flex justify-center gap-10 my-3">
          <Link
            href={"/admin"}
            className={
              pathName === "/admin"
                ? "text-primary font-bold border-primary border-b-2 "
                : "text-primary font-bold "
            }
          >
            <li>Summary</li>
          </Link>
          <Link
            href={"/admin/add-product"}
            className={
              pathName === "/admin/add-product"
                ? "text-primary font-bold border-primary border-b-2 "
                : "text-primary font-bold "
            }
          >
            <li>Add Product</li>
          </Link>
          <Link
            href={"/admin/manage-product"}
            className={
              pathName === "/admin/manage-product"
                ? "text-primary font-bold border-primary border-b-2 "
                : "text-primary font-bold "
            }
          >
            <li>Manage Product</li>
          </Link>
          <Link
            href={"/admin/manage-order"}
            className={
              pathName === "/admin/manage-order"
                ? "text-primary font-bold "
                : "text-primary font-bold "
            }
          >
            <li>Manage Order</li>
          </Link>
        </ul>
      </div>
    </motion.div>
  );
};

export default AdminHeader;
