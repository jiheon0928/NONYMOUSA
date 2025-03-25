"use client";

import { useEffect, useState } from "react";
import useItems from "../items/useItems";
import GoodsInfo from "./GoodsBox/GoodsInfo";
import ShopCart from "./GoodsBox/ShopCart";
import TextHandle from "./GoodsBox/subcomponents/TextHandle";
import { AiOutlineClose } from "react-icons/ai";
import ImgButtonText from "./GoodsBox/ImgButtonText";
import ChangeHandle from "./GoodsBox/subcomponents/ChangeHandle";
import UpDownHandle from "./GoodsBox/subcomponents/UpDownHandle";
import PurchaseButtons from "./GoodsBox/subcomponents/PurchaseButtons";
import { CartItem } from "../typeprops.tsx/TypeProps";

const ShopCartPage = () => {
  const fetchedItems = useItems();
  const [selectedItems, setSelectedItems] = useState<CartItem[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const handleRemoveData = (id: string) => {
    console.log(`${id} 삭제!`);
  };
  const cartItems: CartItem[] = fetchedItems.map((item) => ({
    ...item,
    removeData: () => handleRemoveData(item.id),
  }));
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
  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const initialItems = fetchedItems.map((item) => ({
      ...item,
      removeData: () => handleRemoveData(item.id),
    }));
    setSelectedItems(initialItems);
    setIsAllChecked(true);
  }, [fetchedItems]);

  const openDialog = (itemId: string) => {
    setSelectedItemId(itemId);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedItemId(null);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen mt-96 w-7/12 ">
      <div className="">
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
          <table className="w-full ">
            <tbody>
              {cartItems.map((v, i) => (
                <tr key={i}>
                  <td className="flex gap-4 border-r  border-t border-gray-400 py-3">
                    <input
                      className="w-4 h-4 appearance-none rounded-sm border border-gray-400 checked:bg-black checked:before:content-['✔'] checked:before:text-white relative checked:flex flex checked:items-center checked:flex-row checked:justify-center"
                      type="checkbox"
                      checked={selectedItems.some((item) => item.id === v.id)}
                      onChange={(e) =>
                        handleCheckboxChange(v, e.target.checked)
                      }
                    />
                    <ImgButtonText
                      image={v.image}
                      name={v.name}
                      removeDataText={<AiOutlineClose />}
                      removeFunc={v.removeData}
                      nameStyle="text-[12px]"
                      removeFuncStyle=""
                    />
                  </td>
                  <td className="text-center align-middle space-y-4 w-3/12 border-r  border-t border-gray-400">
                    <TextHandle text={v.quantity.toString()} className="" />
                    {isDialogOpen && selectedItemId === v.id && (
                      <UpDownHandle
                        item={v}
                        closeDialog={closeDialog}
                        onQuantityChange={handleQuantityChange}
                      />
                    )}

                    <ChangeHandle
                      text={"옵션/수량 변경"}
                      className="text-xs border border-gray-400 px-5 py-2"
                      clickFunc={() => openDialog(v.id)}
                    />
                  </td>
                  <td className="text-center align-middle space-y-4 w-3/12  border-r  border-t border-gray-400">
                    <TextHandle
                      text={`￦${(v.price * v.quantity).toLocaleString()}`}
                      className=""
                    />
                    <ChangeHandle
                      text={"바로 구매"}
                      className="text-xs text-white bg-black px-5 py-2"
                      clickFunc={() => ""}
                    />
                  </td>
                  {i === 0 && (
                    <td
                      rowSpan={300}
                      className="text-center align-middle space-y-4 w-2/12 border-t border-gray-400"
                    >
                      {` ${totalPrice >= 50000 ? "무료" : "￦3000"} `}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="text-left w-full border-t py-4 text-xs border-black">{`총 주문상품 ${cartItems.length}개`}</div>

        <div className="flex justify-center py-10 w-full border-t border-b border-gray-400">
          <TextHandle
            text={`￦${totalPrice.toLocaleString()}`}
            className="text-[20px] font-bold"
          />
          <TextHandle
            text={`+ ${totalPrice >= 50000 ? "무료" : "￦3000"} `}
            className="text-[20px] font-bold"
          />
          <TextHandle
            text={` = ￦${(totalPrice >= 50000
              ? totalPrice
              : totalPrice + 3000
            ).toLocaleString()}`}
            className="text-[20px] font-bold"
          />
        </div>
      </div>
      <PurchaseButtons />
    </div>
  );
};

export default ShopCartPage;
