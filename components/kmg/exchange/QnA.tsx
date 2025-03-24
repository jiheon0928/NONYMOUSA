import BaseText from "../BaseText";
import BaseButton from "./BaseButton";

const QnA = () => {
  return (
    <div className="m-0 m-auto py-5 flex flex-col gap-3">
      <BaseText
        key="inquiry"
        className="text-text-light_Grey"
        text="구매하시려는 상품에 대한 궁금한 점이 있으면  문의주세요."
      />
      <div className="flex gap-2">
        <BaseButton
          key="ForProduct"
          text="상품 문의"
          className="px-5 py-2 bg-black text-text-basic_White"
        />
        <BaseButton
          key="oneVsOne"
          text="1 : 1 문의"
          className="px-5 py-2 bg-white text-text-light_Grey border"
        />
      </div>
    </div>
  );
};

export default QnA;
