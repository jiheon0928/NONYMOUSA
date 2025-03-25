"use client";
import { useEffect, useState } from "react";
import ImgSlide from "./ImgSlide/ImgSlide";
import ProductBody from "./productDetail/ProductBody";
import ProductHeader from "./productDetail/ProductHeader";
import BaseButton from "./BaseButton";
import { useRouter } from "next/navigation";
import StatusHandler from "./productDetail/StatusHandler";
import { ColorBtnClick, handleAddToCart } from "@/function/func";
import { useProductStore } from "../zustand/state";
import { productData } from "./types";
import ProductDetailInfo from "./toggle/ToogleInfo";

import MetaInfoBox from "./productDetail/MetaInfoBox";
import ProductCntBox from "./productCnt/ProductCntBox";
import ProductActionButtons from "./productDetail/ProductActionButtons";
import CartDialog from "./productDetail/CartDialog";

type ProductInfoProps = {
  id: string;
};

const ProductInfo = ({ id }: ProductInfoProps) => {
  const router = useRouter();
  const { fetchData, data, loading } = useProductStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);
  console.log(data);
  const productData: productData | undefined = data.find(
    (v) => v.productId.toString() === id
  );

  if (loading || data.length === 0 || !productData) {
    return (
      <StatusHandler
        loading={loading}
        data={data}
        currentProduct={productData}
      />
    );
  }

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
          {/* 상품 정보 */}
          <ProductBody
            key="productDetail"
            infoData={productData.productInfo}
            noticeData={productData.productNotice}
          />
          {/* 색 버튼 */}
          <div className="flex gap-1">
            {productData.productHexCodes.map((v) => (
              <BaseButton
                key={`${v}btn`}
                className="w-5 h-5 rounded-md border-none"
                style={{ backgroundColor: v }}
                clickFunc={() =>
                  ColorBtnClick(
                    data,
                    id,
                    productData.productCode,
                    v,
                    router,
                    productData.productHexCodes[0]
                  )
                }
              />
            ))}
          </div>
          <ProductDetailInfo
            details={
              productData.productDetails?.replace(/\\r\\n|\\n|\\r/g, "\n") ?? ""
            }
            materials={
              productData.productMaterials?.replace(/\\r\\n|\\n|\\r/g, "\n") ??
              ""
            }
            sizeInfo={
              productData.productSizeInfo?.replace(/\\r\\n|\\n|\\r/g, "\n") ??
              ""
            }
            sizeList={productData.productSize ?? []}
          />
        </div>
        {/*  */}
        <div className="flex flex-col gap-10">
          <MetaInfoBox
            origin={productData.productOrigin}
            manufacturer={productData.productManufacturer}
            deliveryMethod={productData.productDeliveryMethod}
            deliveryFee="무료 (₩50,000 이상 무료배송)  |  도서산간 배송비 추가"
          />
          <ProductCntBox price={productData.productPrice} />
          <ProductActionButtons
            addToCart={() => {
              handleAddToCart(productData);
              setIsDialogOpen(true);
            }}
          />

          <CartDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
