import { ProductType } from "../../wishListType";

const WishListTitle = ({ productName }: ProductType) => {
  return <p className="text-sm mb-2">{productName}</p>;
};

export default WishListTitle;
