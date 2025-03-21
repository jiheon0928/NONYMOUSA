import { ProductType } from "../wishListType";
import WishListButton from "./subComponents/WishListButton";
import WishListImage from "./subComponents/WishListImage";
import WishListPrice from "./subComponents/WishListPrice";
import WishListTitle from "./subComponents/WishListTitle";

export type WishListButtonProps = {
  toggleHandler: (id: string) => void;
};

const WishList = ({
  id,
  productImage,
  productName,
  productPrice,
  toggleHandler,
}: ProductType & WishListButtonProps) => {
  return (
    <li className="flex justify-center">
      <div className="flex">
        <WishListImage productImage={productImage} />
        <div className="px-4 py-6">
          <WishListTitle productName={productName} />
          <WishListPrice productPrice={productPrice} />
        </div>
      </div>
      <WishListButton id={id} toggleHandler={toggleHandler} />
    </li>
  );
};
export default WishList;
