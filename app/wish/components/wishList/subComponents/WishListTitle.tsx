import { ProductType } from "../../wishListType";

const WishListTitle = ({ productName }: ProductType) => {
  return (
    <div>
      <p>{productName}</p>
    </div>
  );
};

export default WishListTitle;
