"use client";
import { ProductType } from "../productType";
import { useState } from "react";

const ProductImage = ({ productImage }: ProductType) => {
  const [hovered, setHovered] = useState<boolean>(false);

  if (!productImage || productImage.length === 0) return <>이미지 없음</>;

  return (
    <div className="imgBox relative overflow-hidden">
      <img
        className="absolute top-0 z-10 w-full object-cover"
        style={{ opacity: hovered ? "0" : "1", transition: "opacity 0.3s" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        src={productImage[0]}
        alt="Product Image"
      />
      <img
        className="relative top-0 z-0 w-full object-cover"
        src={productImage[1] ? productImage[1] : productImage[0]}
        alt="Product Image Hover"
      />
    </div>
  );
};

export default ProductImage;
