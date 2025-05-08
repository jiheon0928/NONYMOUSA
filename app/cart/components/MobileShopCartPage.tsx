// src/components/MobileShopCartPage.tsx
"use client";

import { useEffect } from "react";
import useCartStore from "@/components/zustand/cartData";
import { AiOutlineClose, AiOutlineQuestionCircle } from "react-icons/ai";
import ImgButtonText from "./GoodsBox/ImgButtonText";
import ChangeHandle from "./GoodsBox/subcomponents/ChangeHandle";

import MobileUpDownHandle from "./GoodsBox/subcomponents/MobileUpDownHandle";
import TextHandle from "./GoodsBox/subcomponents/TextHandle";
import MobilePurchaseButtons from "./GoodsBox/subcomponents/MobilePurchaseBButton";

const MobileShopCartPage = () => {
  const {
    cartItems,
    selectedItems,
    isAllChecked,
    isDialogOpen,
    selectedItemId,
    fetchItems,
    toggleAllCheckbox,
    toggleItemCheckbox,
    openDialog,
    closeDialog,
    changeQuantity,
    removeItem,
  } = useCartStore();

  // 화면 로드 시 Firestore에서 아이템 불러오기
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="md:hidden w-screen">
      {/* 전체 선택 */}
      <div className="flex px-4 items-center w-full gap-3 justify-start border-b py-3 mt-48 mb-6">
        <input
          type="checkbox"
          className="w-4 h-4 border border-gray-400 appearance-none rounded-sm checked:bg-black checked:before:content-['✔'] checked:before:text-white checked:flex items-center justify-center"
          checked={isAllChecked}
          onChange={() => toggleAllCheckbox()}
        />
        <span>전체 선택</span>
      </div>

      {/* 아이템 리스트 */}
      {cartItems.map((v) => (
        <div className="px-5 mb-3" key={v.id}>
          <div className="flex gap-4">
            <input
              type="checkbox"
              className="w-4 h-4 appearance-none rounded-sm border border-gray-400 checked:bg-black checked:before:content-['✔'] checked:before:text-white checked:flex items-center justify-center"
              checked={selectedItems.some((item) => item.id === v.id)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                toggleItemCheckbox(v, e.currentTarget.checked)
              }
            />

            <div className="flex-1">
              <ImgButtonText
                image={v.image}
                name={v.name}
                removeDataText={<AiOutlineClose />}
                removeFunc={() => removeItem(v.id)}
                nameStyle="text-[18px]"
                removeFuncStyle=""
              />

              <div className="flex py-5 border-b justify-between">
                <TextHandle text="주문금액" className="text-[14px] font-bold" />
                <TextHandle
                  text={`￦${(v.price * v.quantity).toLocaleString()}`}
                  className="text-[20px] font-bold"
                />
              </div>

              <div className="flex py-1 justify-between">
                <TextHandle
                  text={`상품금액(총 ${v.quantity}개)`}
                  className="text-[14px]"
                />
                <TextHandle
                  text={`￦${(v.price * v.quantity).toLocaleString()}`}
                  className="text-[15px]"
                />
              </div>

              <div className="flex py-1 justify-between">
                <TextHandle text="배송비" className="text-[14px]" />
                <TextHandle
                  text={
                    totalPrice >= 50000 ? (
                      <div className="flex items-center">
                        무료 <AiOutlineQuestionCircle />
                      </div>
                    ) : (
                      "￦3000"
                    )
                  }
                  className="text-[15px]"
                />
              </div>

              <div className="flex py-1 justify-between">
                <TextHandle text="배송수단" className="text-[14px]" />
                <TextHandle text="택배" className="text-[15px]" />
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
                  text="옵션/수량 변경"
                  className="text-xs border border-gray-400 w-5/12 py-2"
                  clickFunc={() => openDialog(v.id)}
                />
                <ChangeHandle
                  text="바로 구매"
                  className="text-xs text-white bg-black w-5/12 py-2"
                  clickFunc={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 요약 영역 */}
      <div className="flex items-center justify-between px-5">
        <div className="py-2 text-xs">{`총 주문상품 ${cartItems.length}개`}</div>
        <TextHandle
          text={`￦${
            totalPrice >= 50000 ? totalPrice : totalPrice + 3000
          }.toLocaleString()}`}
          className="text-xs"
        />
      </div>
      <div className="flex items-center justify-between px-5">
        <div className="py-2 text-xs">배송비</div>
        <TextHandle
          text={totalPrice >= 50000 ? "무료" : "￦3000"}
          className="text-xs"
        />
      </div>
      <div className="flex items-center justify-between px-5">
        <div className="py-2 font-bold">총 주문금액</div>
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
