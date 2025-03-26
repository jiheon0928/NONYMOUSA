// ProductPrice.tsx
import React from "react";

type ProductPriceProps = {
  productPrice: number;
};

const ProductPrice: React.FC<ProductPriceProps> = ({ productPrice }) => {
  const formattedPrice = productPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return <p>{formattedPrice} 원</p>;
};

export default ProductPrice;
