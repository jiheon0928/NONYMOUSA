"use client";
import { useEffect } from "react";
import { productData, useProductStore } from "../zustand/state";
import ImgSlide from "./ImgSlide/ImgSlide";
import ProductBody from "./productDetail/ProductBody";
import ProductHeader from "./productDetail/ProductHeader";
import BaseButton from "./BaseButton";
import { useRouter } from "next/navigation";

type ProductInfoProps = {
  id: string;
};

const ProductInfo = ({ id }: ProductInfoProps) => {
  const { fetchData, data, loading } = useProductStore();

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (data.length === 0) {
    return <div>불러올 데이터가 없습니다.</div>;
  }
  console.log(data);
  const productData: productData | undefined = data.find(
    (v) => v.productId.toString() === id
  );

  if (!productData) {
    return <div>해당 제품을 찾을 수 없습니다.</div>;
  }

  const router = useRouter();

  const handleColorClick = (hex: string) => {
    const sameColorProduct = data.find(
      (item) =>
        item.productCode === productData.productCode &&
        item.productHexCodes[0] === hex &&
        item.productId !== productData.productId
    );

    if (sameColorProduct) {
      router.push(`/detail/${sameColorProduct.productId}`);
    }
  };

  return (
    <div className="flex justify-between gap-48 mb-16">
      <ImgSlide key="detailImgSlide" imgData={productData.productImage} />
      <div className="w-full">
        {/* 기본 정보 */}
        <ProductHeader
          key="namePrice"
          productName={productData.productName}
          productPrice={productData.productPrice}
        />
        <div className="border-b border-t py-5 flex flex-col gap-11">
          {/* 기본 정보 */}
          <ProductBody
            key="productInfo"
            className="text-xs text-light_Grey"
            productData={productData.productInfo}
          />
          {/* notice */}
          <ProductBody
            key="productNotice"
            className="text-xs font-bold text-light_Grey w-96"
            productData={productData.productNotice}
          />

          {/* 색 버튼 */}
          <div className="flex gap-1">
            {productData.productHexCodes.map((v) => (
              <BaseButton
                key={`${v}btn`}
                className="w-5 h-5 rounded-md border-none"
                style={{ backgroundColor: v }}
                clickFunc={() => handleColorClick(v)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
