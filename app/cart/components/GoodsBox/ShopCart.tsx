import TextHandle from "./subcomponents/TextHandle";

type ShopCartProps = {
  ShopCartStlye: string;
  shopCartText: string;
  shopCartCountStyle: string;
  shopCartCountText: string;
};

const ShopCart = ({
  ShopCartStlye,
  shopCartText,
  shopCartCountStyle,
  shopCartCountText,
}: ShopCartProps) => {
  return (
    <div className="flex items-center">
      <TextHandle className={ShopCartStlye} text={shopCartText} />
      <TextHandle className={shopCartCountStyle} text={shopCartCountText} />
    </div>
  );
};

export default ShopCart;
