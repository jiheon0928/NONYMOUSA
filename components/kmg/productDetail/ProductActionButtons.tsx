import BaseButton from "../BaseButton";
import { ProductActionButtonsProps } from "../types";

const ProductActionButtons = ({ addToCart }: ProductActionButtonsProps) => {
  return (
    <div className="space-y-2">
      <div className="flex w-full gap-2">
        <BaseButton
          text="구매하기"
          className="bg-basic_Black text-white w-1/3 py-2 font-semibold"
        />
        <BaseButton
          text="선물하기"
          className="border border-gray-300 w-1/3 py-2"
        />
        <BaseButton
          clickFunc={addToCart}
          text="장바구니"
          className="border border-gray-300 w-1/3 py-2"
        />
      </div>

      <div className="flex w-full gap-2">
        <BaseButton
          text="N pay 구매하기"
          className="bg-[#00C73C] text-black w-full py-2 font-semibold"
        />
        <BaseButton
          text="찜"
          className="w-[40px] min-w-[40px] h-[40px] border border-gray-300 text-sm text-[#00C73C]"
        />
      </div>
    </div>
  );
};

export default ProductActionButtons;
