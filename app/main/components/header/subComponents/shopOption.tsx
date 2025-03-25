import Link from "next/link";
import MenuText from "./menuText";
import Option from "./option";

type ShopOtionProps = {
  event: boolean;
};
const ShopOtion = ({ event }: ShopOtionProps) => {
  return (
    <ul
      style={{
        display: event ? "block" : "none",
        borderRadius: "3px",
        backgroundColor: "#fff",
        boxShadow: "4px 4px 12px rgba(0,0,0,0.12)",
        position: "absolute",
        bottom: "0",
        transform: "translateY(100%)",
      }}
    >
      <Option url={"/shop"} text={"all"} />
      <Option url={"/shop/cap"} text={"cap"} />
      <Option url={"/shop/accessories"} text={"accessories"} />
    </ul>
  );
};
export default ShopOtion;
