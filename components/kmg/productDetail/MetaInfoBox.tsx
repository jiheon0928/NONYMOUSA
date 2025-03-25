import { MetaInfoBoxProps } from "../types";
import ProductMetaInfo from "./ProductMetaInfo";

const MetaInfoBox = ({
  deliveryFee,
  deliveryMethod,
  manufacturer,
  origin,
}: MetaInfoBoxProps) => {
  return (
    <div className="flex flex-col gap- mt-16">
      <ProductMetaInfo
        key="origin"
        basicInfo="원산지"
        basicInfoValue={origin}
      />
      <ProductMetaInfo
        key="manufacturer"
        basicInfo="제조사"
        basicInfoValue={manufacturer}
      />
      <ProductMetaInfo
        key="deliveryMethod"
        basicInfo="배송 방법"
        basicInfoValue={deliveryMethod}
      />
      <ProductMetaInfo
        key="deliveryFee"
        basicInfo="배송비"
        basicInfoValue={deliveryFee}
      />
    </div>
  );
};

export default MetaInfoBox;
