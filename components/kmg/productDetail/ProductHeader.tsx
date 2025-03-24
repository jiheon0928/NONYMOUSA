import BaseText from "../BaseText";

type ProductHeaderProps = {
  productName: string;
};
const ProductHeader = ({ productName }: ProductHeaderProps) => {
  return (
    <div>
      <BaseText key="productName" className="text-text" text={productName} />
    </div>
  );
};

export default ProductHeader;
