import { ReactElement } from "react";

export type ImageHandleProps1 = {
  image: string;
  className: string;
  changeClassName: string;
  text: string;
  delivery: number;
  price: string;
  counts: string;
  name: string;
  removeFunc: () => void;
  clickFunc: () => void;
  buy: () => void;
};

export type ChangeHandleProps = {
  clickFunc: () => void;
  text: string | ReactElement;
  className: string;
};

export type ImageHandleProps = {
  image: string;
};

export type TextHandleProps = {
  className: string;
  text: string | number | React.ReactElement;
};

export type ShopCartListProps = {
  image: string;
  goodsName: string;
  goodsNameStyle: string;
  countBtnStyle: string;
  countTextStyle: string;
  removeDataText: string | ReactElement;
  countBoxText: string;
  removeDataTextStyle: string;
  priceBtnStyle: string;
  priceBtnText: string;
  priceTextStyle: string;
  priceText: string;
  countBtnText: string;
  buyFunc: () => void;
  removeFunc: () => void;
  upDownBtn: () => void;
};

export type FetchedItem = {
  id: string;
  quantity: number;
  image: string;
  name: string;
  price: number;
};

export type CartItem = FetchedItem & {
  removeData: () => void;
};

export type Item = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type ShopCartProps = {
  ShopCartStlye: string;
  shopCartText: string;
  shopCartCountStyle: string;
  shopCartCountText: string;
};
