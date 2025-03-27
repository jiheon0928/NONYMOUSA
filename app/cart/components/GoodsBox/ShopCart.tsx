import { ShopCartProps } from "../../typeprops.tsx/TypeProps";
import TextHandle from "./subcomponents/TextHandle";

const ShopCart = ({
  ShopCartStlye,
  shopCartText,
  shopCartCountStyle,
  shopCartCountText,
}: ShopCartProps) => {
  return (
    <div className="flex items-center py-5">
      <TextHandle className={ShopCartStlye} text={shopCartText} />
      <TextHandle className={shopCartCountStyle} text={shopCartCountText} />
    </div>
  );
};

export default ShopCart;
