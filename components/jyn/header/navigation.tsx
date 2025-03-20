"use client";
import { useState } from "react";
import MenuText from "./subComponents/menuText";
import ShopOtion from "./subComponents/shopOption";
import Link from "next/link";

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
