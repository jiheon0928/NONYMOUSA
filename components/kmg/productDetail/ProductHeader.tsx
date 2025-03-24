import { CiShare2 } from "react-icons/ci";
import BaseText from "../BaseText";

type ProductHeaderProps = {
  productName: string;
  productPrice: number;
};
const ProductHeader = ({ productName, productPrice }: ProductHeaderProps) => {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <BaseText
        key="productName"
        className="text-basic_Black text-xs"
        text={productName}
      />
      <div className="flex justify-between">
        <BaseText
          key="productPrice"
          className="text-basic_Black text-xs font-bold"
          text={`₩${productPrice}`}
        />
        <CiShare2 className="text-3xl text-light_Grey" />
      </div>
    </div>
  );
};

export default ProductHeader;
