"use client";

import { useEffect, useState } from "react";
import { TiTimes } from "react-icons/ti";
import { removeData } from "../items/removeData";
import useItems from "../items/useItems";
import DeliveryBox from "./GoodsBox/DeliveryBox";
import GoodsInfo from "./GoodsBox/GoodsInfo";
import ShopCart from "./GoodsBox/ShopCart";
import ShopCartList from "./GoodsBox/ShopCartList";
import TextHandle from "./GoodsBox/subcomponents/TextHandle";

// Item 타입 정의
interface Item {
  id: string;
  quantity: string;
  image: string;
  name: string;
  price: string;
}

const ShopCartPage = () => {
  const itemArr = useItems(); // items 배열을 가져옴
  const [selectedItems, setSelectedItems] = useState<Item[]>([]); // 선택된 아이템 관리
  const [isAllChecked, setIsAllChecked] = useState(true); // 전체 체크박스 상태

  // 페이지 로드 시 모든 항목을 선택 상태로 초기화
  useEffect(() => {
    setSelectedItems(itemArr); // 모든 항목을 선택된 상태로 설정
    setIsAllChecked(true); // 전체 체크박스를 체크된 상태로 설정
  }, [itemArr]); // itemArr이 변경되면 실행

  // 전체 체크박스 상태 업데이트 함수
  const handleAllCheckboxChange = (isChecked: boolean) => {
    setIsAllChecked(isChecked); // 전체 체크박스 상태 업데이트
    if (isChecked) {
      setSelectedItems(itemArr); // 모든 항목 선택
    } else {
      setSelectedItems([]); // 모든 항목 해제
    }
  };

  // 개별 항목 체크박스 상태 업데이트 함수
  const handleCheckboxChange = (item: Item, isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems((prev) => [...prev, item]); // 아이템 추가
    } else {
      setSelectedItems(
        (prev) => prev.filter((selectedItem) => selectedItem.id !== item.id) // 아이템 제거
      );
    }
  };

  // 전체 체크박스를 자동으로 업데이트 (아이템들의 체크 상태에 따라)
  useEffect(() => {
    // 전체 체크박스 상태를 결정하는 로직
    if (itemArr.length === selectedItems.length) {
      setIsAllChecked(true); // 모든 항목이 선택되었으면 전체 체크박스를 체크
    } else {
      setIsAllChecked(false); // 하나라도 선택되지 않으면 전체 체크박스를 해제
    }
  }, [selectedItems, itemArr]); // selectedItems나 itemArr가 변경될 때마다 실행

  // 선택된 항목들의 가격 합계 계산
  const totalPrice = selectedItems.reduce(
    (total, item) => total + parseFloat(item.price) * parseFloat(item.quantity),
    0
  );

  return (
    <div className="flex flex-col justify-center items-center min-h-screen mt-96">
      <div className="flex flex-col w-3/4 gap-6">
        <ShopCart
          shopCartText="장바구니"
          shopCartCountStyle="text-[11px] bg-black w-5 h-5 rounded-full text-white flex justify-center items-center"
          shopCartCountText={itemArr.length.toString()}
          ShopCartStlye="text-[20px]"
        />
        {/* 전체 체크박스 */}
        <GoodsInfo
          isAllChecked={isAllChecked}
          onAllCheckboxChange={handleAllCheckboxChange}
        />
        <div className="flex">
          <table className="w-full">
            <tbody>
              {itemArr.map((v, i) => (
                <tr key={i}>
                  <td>
                    <ShopCartList
                      image={v.image}
                      goodsName={v.name}
                      goodsNameStyle="text-[13px]"
                      removeFunc={() => removeData(v.id)}
                      removeDataText={<TiTimes />}
                      removeDataTextStyle="text-[30px]"
                      countBoxText={v.quantity}
                      countBtnText="옵션/수량 변경"
                      countTextStyle="text-[13px]"
                      upDownBtn={() => ""}
                      countBtnStyle="text-[11px] px-4 py-1 border-2"
                      priceText={
                        "￦" +
                        (
                          parseFloat(v.price) * parseFloat(v.quantity)
                        ).toString()
                      }
                      priceTextStyle="text-[20px] font-bold"
                      priceBtnText="바로구매"
                      priceBtnStyle="bg-black text-white text-[11px] px-4 py-1"
                      buyFunc={() => ""}
                      onCheckboxChange={(isChecked) =>
                        handleCheckboxChange(v, isChecked)
                      }
                      isChecked={selectedItems.some((item) => item.id === v.id)} // 개별 체크박스 상태
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
