"use client";
import { useState } from "react";
import Link from "next/link";
import MenuText from "@/app/main/components/header/subComponents/menuText";
import ShopOtion from "@/app/main/components/header/subComponents/shopOption";

const Navigation = () => {
  const [event, setEvent] = useState<boolean>(false);

  const onMouse = () => {
    setEvent((prev) => (prev = true));
  };
  const outMouse = () => {
    setEvent((prev) => (prev = false));
  };
  return (
    <nav className="flex justify-between">
      <div
        className="left"
        style={{ position: "relative" }}
        onMouseEnter={onMouse}
        onMouseLeave={outMouse}
      >
        <MenuText text={"SHOP"} />
        <ShopOtion event={event} />
      </div>
      <div className="rignt">
        <Link href={"/wish"}>
          <MenuText text={"WISH"} />
        </Link>
        <span className="mx-4">|</span>
        <Link href={"/cart"}>
          <MenuText text={"CART"} />
        </Link>
      </div>
    </nav>
  );
};
export default Navigation;
