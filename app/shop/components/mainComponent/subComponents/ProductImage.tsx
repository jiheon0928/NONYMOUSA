"use client";
import Image from "next/image";
import { ProductType } from "../productType";
import { useState } from "react";

const ProductImage = ({ productImage }: ProductType) => {
  const [hoverImg, setHoverImg] = useState<number>(0);

  const hovering = () => {
    setHoverImg((prev) => 1);
  };
  const hoverOut = () => {
    setHoverImg((prev) => 0);
  };

  if (!productImage) return <>이미지없음 ㅅㄱ</>;

  return (
    <div className="imgBox relative overflow-hidden">
      <img
        className="absolute top-0 z-10 w-[100%] object-cover"
        style={{ opacity: hoverImg == 1 ? "0" : "1", transition: "all 0.3s" }}
        onMouseEnter={hovering}
        onMouseLeave={hoverOut}
        src={`${productImage[0]}`}
        alt=""
      />
      <img
        className="relative top-0 z-1 w-[100%] object-cover"
        src={`${productImage[1] ? productImage[1] : productImage[0]}`}
        alt=""
      />
    </div>
  );
};
export default ProductImage;
