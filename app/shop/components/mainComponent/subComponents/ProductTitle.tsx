import { ProductType } from "../productType";

const ProductTitle = ({ productName }: ProductType) => {
  return <p className="text-xs mt-3 text-center ">{productName}</p>;
};
export default ProductTitle;
