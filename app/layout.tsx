import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/app/main/components/header/header";
import Footer from "@/app/main/components/footer/footer";
import "./globals.css";
import "./main/css/media.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NONYMOUSAA",
  description: "NONYMOUSAA 클론코딩",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`max-w-full ${geistSans.variable} ${geistMono.variable}`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
