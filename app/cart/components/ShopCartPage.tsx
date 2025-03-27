"use client";

import useCartStore from "@/components/zustand/cartData";
import { useEffect } from "react";
import { AiOutlineClose, AiOutlineQuestionCircle } from "react-icons/ai";
import useItems from "../items/useItems";
import GoodsInfo from "./GoodsBox/GoodsInfo";
import ImgButtonText from "./GoodsBox/ImgButtonText";
import ShopCart from "./GoodsBox/ShopCart";
import ChangeHandle from "./GoodsBox/subcomponents/ChangeHandle";
import PurchaseButtons from "./GoodsBox/subcomponents/PurchaseButtons";
import TextHandle from "./GoodsBox/subcomponents/TextHandle";
import UpDownHandle from "./GoodsBox/subcomponents/UpDownHandle";

const ShopCartPage = () => {
  const fetchedItems = useItems();
  const {
    cartItems,
    selectedItems,
    isAllChecked,
    isDialogOpen,
    selectedItemId,
    setCartItems,
    toggleAllCheckbox,
    toggleItemCheckbox,
    openDialog,
    closeDialog,
    changeQuantity,
  } = useCartStore();

  useEffect(() => {
    const itemsWithRemove = fetchedItems.map((item) => ({
      ...item,
      removeData: () => console.log(`${item.id} 삭제!`),
    }));
    setCartItems(itemsWithRemove);
  }, [fetchedItems, setCartItems]);

  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="hidden md:flex  flex-col justify-center items-center mt-64 w-2/3 ">
      <div className="w-full">
        <ShopCart
          shopCartText="장바구니"
          shopCartCountStyle="text-[11px] bg-black w-5 h-5 rounded-full text-white flex justify-center items-center"
          shopCartCountText={cartItems.length.toString()}
          ShopCartStlye="text-[20px]"
        />
        <GoodsInfo
          isAllChecked={isAllChecked}
          onAllCheckboxChange={toggleAllCheckbox}
        />
        <div className="flex">
          <table className="w-full">
            <tbody>
              {cartItems.map((v, i) => (
                <tr key={i}>
                  <td className="flex gap-4 border-r  border-t border-gray-400 py-3">
                    <input
                      className="w-4 h-4 appearance-none rounded-sm border border-gray-400 checked:bg-black checked:before:content-['✔'] checked:before:text-white relative checked:flex flex checked:items-center checked:flex-row checked:justify-center"
                      type="checkbox"
                      checked={selectedItems.some((item) => item.id === v.id)}
                      onChange={(e) => toggleItemCheckbox(v, e.target.checked)}
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
                        onQuantityChange={changeQuantity}
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
                      {totalPrice >= 50000 ? (
                        <div className="flex items-center">
                          무료 <AiOutlineQuestionCircle />
                        </div>
                      ) : (
                        "￦3000"
                      )}
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
