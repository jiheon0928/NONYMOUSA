import React, { ReactNode } from "react";
import Footer from "../main/components/footer/footer";
import Header from "../main/components/header/header";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default AdminLayout;
