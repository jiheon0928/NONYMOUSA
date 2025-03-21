"use client";
import { useState } from "react";
import Toggle from "./Toggle";
import DetailInfo from "./DetailInfo";
import { TextColor } from "@/app/types/Colors";
import { productDetailData } from "../data/size";

const SizeBox = () => {
  const [isToggle, setIsToggle] = useState(false);
  const change = () => setIsToggle((prev) => !prev);
  return (
    <>
      <Toggle clickfunc={() => change()} text="Size & Fit" />
      <div>
        <DetailInfo
          boxStyle="gird grid-cols-7"
          isToggle={isToggle}
          TextclassName="border p-2 w-[130px] h-[60px] flex items-center justify-center text-center"
          color={TextColor.light_Grey}
          detailData={productDetailData.sizeAndFit.headers}
        />
        <DetailInfo
          boxStyle="gird grid-cols-7"
          isToggle={isToggle}
          TextclassName="border p-2 w-[130px] h-[60px] flex items-center justify-center text-center"
          color={TextColor.light_Grey}
          detailData={productDetailData.sizeAndFit.values}
        />
        <span
          style={{
            display: isToggle ? "block" : "none",
            color: TextColor.light_Grey,
          }}
          className="text-[13px] mt-8"
        >
          {productDetailData.sizeAndFit.notice}
        </span>
      </div>
    </>
  );
};

export default SizeBox;
