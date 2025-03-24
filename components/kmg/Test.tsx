"use client";
import { useEffect } from "react";
import { useProductStore } from "../zustand/state";
import ImgSlide from "./ImgSlide/ImgSlide";
import ProductBody from "./productDetail/ProductBody";
import ProductHeader from "./productDetail/ProductHeader";
import BaseButton from "./BaseButton";

const Test = () => {
  const { fetchData, data, loading } = useProductStore();

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (data.length === 0) {
    return <div>불러올 데이터가 없습니다.</div>;
  }
  console.log(data);
  return (
    <div className="flex justify-between gap-48 mb-16">
      <ImgSlide key="detailImgSlide" imgData={data[0].productImage} />
      <div className="w-full">
        {/* 기본 정보 */}
        <ProductHeader
          key="namePrice"
          productName={data[0].productName}
          productPrice={data[0].productPrice}
        />
        <div className="border-b border-t py-5 flex flex-col gap-11">
          {/* 기본 정보 */}
          <ProductBody
            key="productInfo"
            className="text-xs text-light_Grey"
            productData={data[0].productInfo}
          />
          {/* notice */}
          <ProductBody
            key="productNotice"
            className="text-xs font-bold text-light_Grey w-96"
            productData={data[1].productNotice}
          />

          {/* 색 버튼 */}
          <div className="flex gap-1">
            {data[0].productHexCodes.map((v) => (
              <BaseButton
                key={`${v}btn`}
                className="w-5 h-5 rounded-md border-none"
                style={{ backgroundColor: v }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
