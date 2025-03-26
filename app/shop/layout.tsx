import Footer from "../main/components/footer/footer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import "../main/css/media.css";
import Header from "../main/components/header/header";
const HeaderLayout = ({ children }: any) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
export default HeaderLayout;
