import { ProductType } from "../../wishListType";

const WishListPrice = ({ productPrice }: ProductType) => {
  return (
    <div>
      <strong>{productPrice}</strong>
    </div>
  );
};
export default WishListPrice;
