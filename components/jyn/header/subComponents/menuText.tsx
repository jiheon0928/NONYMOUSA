import { useState } from "react";

type LeftMenuProps = {
  text: string;
};

const MenuText = ({ text }: LeftMenuProps) => {
  const [hover, setHover] = useState("#222");
  const mouseOn = () => {
    setHover((prev) => "#999");
  };
  const mouseOut = () => {
    setHover((prev) => "#222");
  };
  return (
    <span
      onMouseEnter={mouseOn}
      onMouseLeave={mouseOut}
      style={{ color: hover }}
      className="text-xs cursor-pointer"
    >
      {text}
    </span>
  );
};
export default MenuText;
