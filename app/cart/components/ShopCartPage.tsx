"use client";

import { useEffect, useState } from "react";
import useItems from "../items/useItems";
import GoodsInfo from "./GoodsBox/GoodsInfo";
import ShopCart from "./GoodsBox/ShopCart";
import ShopCartList from "./GoodsBox/ShopCartList";
import TextHandle from "./GoodsBox/subcomponents/TextHandle";

type FetchedItem = {
  id: string;
  quantity: number;
  image: string;
  name: string;
  price: number;
};

type CartItem = FetchedItem & {
  removeData: () => void;
};

const ShopCartPage = () => {
  const fetchedItems = useItems();
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(true);

  const handleRemoveData = (id: string) => {
    console.log(`${id} 삭제!`);
  };

  const cartItems: CartItem[] = fetchedItems.map((item) => ({
    ...item,
    removeData: () => handleRemoveData(item.id),
  }));

  useEffect(() => {
    setSelectedItems(cartItems);
    setIsAllChecked(true);
  }, [fetchedItems]);

  const handleAllCheckboxChange = (isChecked: boolean) => {
    setIsAllChecked(isChecked);
    setSelectedItems(isChecked ? cartItems : []);
  };

  const handleCheckboxChange = (item: CartItem, isChecked: boolean) => {
    setSelectedItems((prev) =>
      isChecked
        ? [...prev, item]
        : prev.filter((selectedItem) => selectedItem.id !== item.id)
    );
  };

  useEffect(() => {
    setIsAllChecked(cartItems.length === selectedItems.length);
  }, [selectedItems, cartItems]);

  // 선택된 항목들의 가격 합계 계산
  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col justify-center items-center min-h-screen mt-96">
      <div className="flex flex-col w-7/12 gap-6">
        <ShopCart
          shopCartText="장바구니"
          shopCartCountStyle="text-[11px] bg-black w-5 h-5 rounded-full text-white flex justify-center items-center"
          shopCartCountText={cartItems.length.toString()}
          ShopCartStlye="text-[20px]"
        />
        <GoodsInfo
          isAllChecked={isAllChecked}
          onAllCheckboxChange={handleAllCheckboxChange}
        />
        <div className="flex">
          <table className="w-full">
            <tbody>
              {cartItems.map((v, i) => (
                <tr key={i}>
                  <td>
                    <ShopCartList
                      name={v.name}
                      allPrice={v.quantity * v.price}
                      delivaryPrice=""
                      image={v.image}
                      index={i}
                      price={v.price}
                      quantity={v.quantity}
                      removeDataText=""
                      removeFunc={() => v.removeData()}
                      upHandle={() => console.log("개수 증가")}
                      downHandle={() => console.log("개수 감소")}
                      cancleHandle={() => console.log("취소")}
                      confirmHandle={() => console.log("변경 확인")}
                      onCheckboxChange={(isChecked) =>
                        handleCheckboxChange(v, isChecked)
                      }
                      isChecked={selectedItems.some((item) => item.id === v.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <TextHandle
          text={`선택된 총 금액: ￦${totalPrice.toLocaleString()}`}
          className="text-[20px] font-bold"
        />
        <TextHandle
          text={`배송비: ￦${totalPrice >= 50000 ? 0 : 3000}`}
          className="text-[20px] font-bold"
        />
        <TextHandle
          text={`최종 금액: ￦${(totalPrice >= 50000
            ? totalPrice
            : totalPrice + 3000
          ).toLocaleString()}`}
          className="text-[20px] font-bold"
        />
      </div>
    </div>
  );
};

export default ShopCartPage;
