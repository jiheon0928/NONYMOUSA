import React from "react";
import BaseText from "../BaseText";
type ProductBodyProps = {
  productData: string[];
  className: string;
};
const ProductBody = ({ productData, className }: ProductBodyProps) => {
  return (
    <div className="flex flex-col gap-2">
      {productData.map((v) => (
        <BaseText key="detailInfo" className={className} text={`- ${v}`} />
      ))}
    </div>
  );
};

export default ProductBody;
