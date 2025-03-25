import React from "react";
import BaseText from "../BaseText";
import { ProductMetaInfoProps } from "../types";

const ProductMetaInfo = ({
  basicInfo,
  basicInfoValue,
}: ProductMetaInfoProps) => {
  return (
    <div className="flex gap-1">
      <BaseText
        className="text-basic_Black font-black text-[11px]"
        text={basicInfo}
      />
      <BaseText className="text-light_Grey text-[11px]" text={basicInfoValue} />
    </div>
  );
};

export default ProductMetaInfo;
