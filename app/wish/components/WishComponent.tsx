"use client";
import { fetchData } from "@/app/main/data/data";
import { useState, useEffect } from "react";
import { ProductType } from "./wishListType";
import WishListImage from "./wishList/subComponents/WishListImage";
import WishListTitle from "./wishList/subComponents/WishListTitle";
import WishListPrice from "./wishList/subComponents/WishListPrice";
import WishListButton from "./wishList/subComponents/WishListButton";

const WishComponent = () => {
  const [data, setData] = useState<ProductType[]>([]);
  const [wishIds, setWishIds] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<ProductType[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = (await fetchData()) as ProductType[]; // 타입 단언
      setData(fetchedData);
    };

    loadData();
  }, []);

  // 위시리스트 ID 가져오기
  useEffect(() => {
    const ids: string[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("isWish_")) {
        const value = localStorage.getItem(key);
        if (value === "true") {
          const id = key.replace("isWish_", "");
          ids.push(id);
        }
      }
    }

    setWishIds(ids);
  }, []);

  // 위시리스트 ID가 변경될 때 필터링
  useEffect(() => {
    const matchedData = data.filter((v) => v.id && wishIds.includes(v.id));
    setFilteredData(matchedData);
  }, [data, wishIds]);

  // 위시리스트 상태 토글 핸들러
  const toggleWishHandler = (productId: string) => {
    const isWished = localStorage.getItem(`isWish_${productId}`);
    const newValue = isWished === "true" ? "false" : "true"; // true/false로 전환
    localStorage.setItem(`isWish_${productId}`, newValue); // 로컬 스토리지 업데이트

    // 상태를 강제로 업데이트하여 리렌더링
    setFilteredData((prevFilteredData) =>
      prevFilteredData.map((item) =>
        item.id === productId ? { ...item } : item
      )
    );
  };

  return (
    <div>
      <h2 className="p-3 mb-4 text-xl">Wish List</h2>
      {filteredData.length > 0 ? (
        <ul
          className="p-3"
          style={{
            borderTop: "1px solid #eee",
            borderBottom: "1px solid #eee",
          }}
        >
          {filteredData.map((v) => {
            return (
              <li key={v.id} className="flex items-center">
                <WishListImage productImage={v.productImage} />
                <WishListTitle productName={v.productName} />
                <WishListPrice productPrice={v.productPrice} />
                <WishListButton
                  id={v.id}
                  toggleHandler={() => {
                    toggleWishHandler(v.id!);
                  }}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="py-40 text-center text-gray-400">
          위시리스트에 상품이 없습니다.
        </p>
      )}
    </div>
  );
};

export default WishComponent;
