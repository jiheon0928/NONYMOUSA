import { ProductType } from "../../wishListType";

const WishListImage = ({ productImage }: ProductType) => {
  return (
    <div className="px-4 py-3" style={{ borderRight: "1px solid #eee" }}>
      <div className="w-32 h-32 overflow-hidden">
        <img src={`${productImage}`} alt="" />
      </div>
    </div>
  );
};
export default WishListImage;
