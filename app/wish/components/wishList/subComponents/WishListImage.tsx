import { ProductType } from "../../wishListType";

const WishListImage = ({ productImage }: ProductType) => {
  return (
    <div className="w-[100px]">
      <img src={`${productImage}`} alt="" />
    </div>
  );
};
export default WishListImage;
