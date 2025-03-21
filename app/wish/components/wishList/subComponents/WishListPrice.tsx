import { ProductType } from "../../wishListType";

const WishListPrice = ({ productPrice }: ProductType) => {
  return <strong className="text-sm">{productPrice}</strong>;
};
export default WishListPrice;
