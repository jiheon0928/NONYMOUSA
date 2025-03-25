import React from "react";
import BaseText from "../BaseText";
import { ProductBodyProps } from "../types";

const ProductBody = ({ infoData, noticeData }: ProductBodyProps) => {
  return (
    <div className="flex flex-col gap-2">
      {infoData.map((v, i) => (
        <BaseText
          key={`detailInfo${i}`}
          className="text-xs text-light_Grey"
          text={v}
        />
      ))}
      {noticeData.map((v, i) => (
        <BaseText
          key={`detailNotice${i}`}
          className="text-xs font-bold text-light_Grey w-96 mt-10"
          text={v}
        />
      ))}
    </div>
  );
};

export default ProductBody;
