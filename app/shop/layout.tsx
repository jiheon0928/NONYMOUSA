import Footer from "../main/components/footer/footer";
import Header from "./components/header/header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import "../main/css/media.css";
const HeaderLayout = ({ children }: any) => {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};
export default HeaderLayout;
