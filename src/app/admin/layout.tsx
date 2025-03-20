import AdminHeader from "@/components/AdminHeader";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div>
    <AdminHeader />
    {children}</div>;
};

export default layout;
