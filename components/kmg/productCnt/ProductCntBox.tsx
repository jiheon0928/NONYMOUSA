"use client";

import { useQuantityStore } from "@/components/zustand/QuantityState";
import BaseText from "../BaseText";
import BaseButton from "../BaseButton";
import { ProductCntBoxProps } from "../types";

const ProductCntBox = ({ price }: ProductCntBoxProps) => {
  const { quantity, increase, decrease } = useQuantityStore();
  const total = price * quantity;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-basic_White border p-4 text-sm text-deep_Grey">
        {/* 수량 조절 영역 */}
        <div className=" pb-4 space-y-2">
          <div className="border-b border-dashed pb-3">
            <BaseText className="text-xs text-light_Grey" text="수량" />
          </div>

          <div className="flex justify-between items-center pt-3">
            {/* 수량 버튼 */}
            <div className="flex items-center border border-gray-300 ">
              <BaseButton
                className="px-3 py-1"
                text="－"
                clickFunc={decrease}
              />
              <BaseText
                className="w-4 text-center"
                text={quantity.toString()}
              />
              <BaseButton
                className="px-3 py-1"
                text="＋"
                clickFunc={increase}
              />
            </div>

            {/* 단가 */}
            <BaseText
              className="text-sm font-semibold"
              text={`₩${total.toLocaleString("ko-KR")}`}
            />
          </div>
        </div>
      </div>
      {/* 총 금액 */}
      <div className="flex justify-between pt-3 text-xs px-2">
        <BaseText
          className="text-light_Grey"
          text={`총 상품금액(${quantity}개)`}
        />
        <BaseText
          className="text-basic_Black font-bold"
          text={`₩${total.toLocaleString("ko-KR")}`}
        />
      </div>
    </div>
  );
};

export default ProductCntBox;
