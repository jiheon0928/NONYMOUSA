import { ProductType } from "../productType";

const ProductPrice = ({ productPrice }: ProductType) => {
  return (
    <p className="text-center">
      <strong className="text-xs">₩{productPrice}</strong>
    </p>
  );
};
export default ProductPrice;
