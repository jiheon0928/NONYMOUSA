import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { ProductType } from "../../wishListType";

type WishListButtonProps = {
  toggleHandler: (id: string) => void;
};
const WishListButton = ({
  id,
  toggleHandler,
}: ProductType & WishListButtonProps) => {
  return (
    <div className="btn" onClick={() => toggleHandler(id!)}>
      {localStorage.getItem(`isWish_${id}`) === "true" ? (
        <IoMdHeart className="text-2xl" />
      ) : (
        <IoIosHeartEmpty className="text-2xl" />
      )}
    </div>
  );
};
export default WishListButton;
