"use client";

import { useEffect } from "react";
import useItems from "../items/useItems";
import useCartStore from "@/components/zustand/cartData";
import TextHandle from "./GoodsBox/subcomponents/TextHandle";
import { AiOutlineClose, AiOutlineQuestionCircle } from "react-icons/ai";
import ImgButtonText from "./GoodsBox/ImgButtonText";
import ChangeHandle from "./GoodsBox/subcomponents/ChangeHandle";
import MobileUpDownHandle from "./GoodsBox/subcomponents/MobileUpDownHandle";
import MobilePurchaseButtons from "./GoodsBox/subcomponents/MobilePurchaseBButton";

const MobileShopCartPage = () => {
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
    <div className="md:hidden w-screen">
      <div className="flex px-4 items-center w-full gap-3 justify-start border-b py-3 mt-48 mb-6">
        <input
          className="w-4 h-4 border border-gray-400 appearance-none rounded-sm checked:bg-black checked:before:content-['✔'] checked:before:text-white relative checked:flex flex checked:items-center checked:flex-row checked:justify-center"
          type="checkbox"
          checked={isAllChecked}
          onChange={(e) => toggleAllCheckbox(e.target.checked)}
        />
        <span>전체 선택</span>
      </div>
      {cartItems.map((v, i) => (
        <div className="px-5 mb-3" key={v.id}>
          <div className="flex gap-4">
            <input
              className="w-4 h-4 appearance-none rounded-sm border border-gray-400 checked:bg-black checked:before:content-['✔'] checked:before:text-white relative checked:flex flex checked:items-center checked:flex-row checked:justify-center"
              type="checkbox"
              checked={selectedItems.some((item) => item.id === v.id)}
              onChange={(e) => toggleItemCheckbox(v, e.target.checked)}
            />
            <div>
              <ImgButtonText
                image={v.image}
                name={v.name}
                removeDataText={<AiOutlineClose />}
                removeFunc={v.removeData}
                nameStyle="text-[18px]"
                removeFuncStyle=""
              />
              <div className="flex py-5 border-b   justify-between">
                <TextHandle
                  text={"주문금액"}
                  className="text-[14px] font-bold"
                />
                <TextHandle
                  text={`￦${(v.price * v.quantity).toLocaleString()}`}
                  className="text-[20px] font-bold"
                />
              </div>
              <div className="flex py-1  justify-between">
                <TextHandle
                  text={`상품금액(총 ${v.quantity}개)`}
                  className="text-[14px]"
                />
                <TextHandle
                  text={`￦${(v.price * v.quantity).toLocaleString()}`}
                  className="text-[15px]"
                />
              </div>
              <div className="flex py-1  justify-between">
                <TextHandle text={`배송비`} className="text-[14px]" />
                <TextHandle
                  text={
                    totalPrice >= 50000 ? (
                      <div className="flex">
                        무료 <AiOutlineQuestionCircle />
                      </div>
                    ) : (
                      "￦3000"
                    )
                  }
                  className="text-[15px]"
                />
              </div>
              <div className="flex py-1  justify-between">
                <TextHandle text={`배송수단`} className="text-[14px]" />
                <TextHandle text={`택배`} className="text-[15px]" />
              </div>

              {isDialogOpen && selectedItemId === v.id && (
                <MobileUpDownHandle
                  item={v}
                  closeDialog={closeDialog}
                  onQuantityChange={changeQuantity}
                />
              )}
              <div className="flex justify-center gap-3 py-5">
                <ChangeHandle
                  text={"옵션/수량 변경"}
                  className="text-xs border border-gray-400 w-5/12 py-2"
                  clickFunc={() => openDialog(v.id)}
                />
                <ChangeHandle
                  text={"바로 구매"}
                  className="text-xs text-white bg-black w-5/12 py-2"
                  clickFunc={() => ""}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between px-5">
        <div className="py-2 text-xs border-black">{`총 주문상품 ${cartItems.length}개`}</div>
        <TextHandle
          text={`￦${(totalPrice >= 50000
            ? totalPrice
            : totalPrice + 3000
          ).toLocaleString()}`}
          className="text-xs "
        />
      </div>
      <div className="flex items-center justify-between px-5">
        <div className="py-2 text-xs border-black">{`배송비`}</div>
        <TextHandle
          text={`${totalPrice >= 50000 ? "무료" : "￦3000"} `}
          className="text-xs "
        />
      </div>

      <div className="flex items-center justify-between px-5 ">
        <div className="py-2  border-black font-bold">{`총 주문금액`}</div>
        <TextHandle
          text={`￦${totalPrice.toLocaleString()}`}
          className="font-bold"
        />
      </div>

      <MobilePurchaseButtons />
    </div>
  );
};

export default MobileShopCartPage;
