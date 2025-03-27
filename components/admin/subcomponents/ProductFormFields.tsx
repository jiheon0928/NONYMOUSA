// components/ProductFormFields.tsx
"use client";

import React, { JSX } from "react";
import InputField from "./InputField";
import ColorInputs from "./ColorInputs";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";
import SizeInputs from "./SizeInputs";
import { ProductFormData } from "@/app/types/admintype";

type ProductFormFieldsProps = {
  formData: ProductFormData;
  productInfo: string;
  productExpectedShippingDate: string;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleColorChange: (i: number, v: string) => void;
  addColorInput: () => void;
  removeColorInput: (i: number) => void;
  handleSizeChange: (
    index: number,
    field: "key" | "value",
    value: string
  ) => void;
  addSizeInput: () => void;
  removeSizeInput: (i: number) => void;
  setProductInfo: (v: string) => void;
  setProductExpectedShippingDate: (v: string) => void;
};

export const ProductFormFields = ({
  formData,
  productInfo,
  productExpectedShippingDate,
  handleInputChange,
  handleColorChange,
  addColorInput,
  removeColorInput,
  handleSizeChange,
  addSizeInput,
  removeSizeInput,
  setProductInfo,
  setProductExpectedShippingDate,
}: ProductFormFieldsProps): JSX.Element => (
  <>
    <InputField
      label="상품 코드"
      name="productCode"
      value={formData.productCode}
      onChange={handleInputChange}
      required
    />
    <div>
      <label className="block font-semibold mb-1">상품 색상</label>
      <ColorInputs
        colors={formData.productHexCodes}
        onColorChange={handleColorChange}
        onAddColor={addColorInput}
        onRemoveColor={removeColorInput}
      />
    </div>
    <InputField
      label="상품명"
      name="productName"
      value={formData.productName}
      onChange={handleInputChange}
      required
    />
    <InputField
      label="가격"
      name="productPrice"
      value={formData.productPrice}
      onChange={handleInputChange}
      type="number"
      required
    />
    <SelectField
      label="카테고리"
      name="productCategory"
      value={formData.productCategory}
      onChange={handleInputChange}
      required
      options={[
        { value: "cap", label: "Cap" },
        { value: "outer", label: "Outer" },
        { value: "top", label: "Top" },
        { value: "bottom", label: "Bottom" },
        { value: "accessories", label: "Accessories" },
      ]}
    />
    <TextAreaField
      label="상품 안내"
      name="productInfo"
      value={productInfo}
      onChange={(e) => setProductInfo(e.target.value)}
      placeholder="상품 안내를 입력하세요."
      required
    />
    <TextAreaField
      label="중요 안내"
      name="productNotice"
      value={formData.productNotice}
      onChange={handleInputChange}
      placeholder="중요 안내를 입력하세요."
    />
    <InputField
      label="원산지"
      name="productOrigin"
      value={formData.productOrigin}
      onChange={handleInputChange}
      required
    />
    <InputField
      label="제조사"
      name="productManufacturer"
      value={formData.productManufacturer}
      onChange={handleInputChange}
      required
    />
    <InputField
      label="배송 방법"
      name="productDeliveryMethod"
      value={formData.productDeliveryMethod}
      onChange={handleInputChange}
      required
    />
    <InputField
      label="배송비"
      name="productDeliveryPrice"
      value={formData.productDeliveryPrice}
      onChange={handleInputChange}
      type="number"
      required
    />
    <InputField
      label="출고예정"
      name="productExpectedShippingDate"
      value={productExpectedShippingDate}
      onChange={(e) => setProductExpectedShippingDate(e.target.value)}
      type="date"
    />
    <TextAreaField
      label="상품 디테일 설명"
      name="productDetails"
      value={formData.productDetails}
      onChange={handleInputChange}
      placeholder="상품 디테일 설명을 입력하세요."
      required
    />
    <TextAreaField
      label="상품 재질 설명"
      name="productMaterials"
      value={formData.productMaterials}
      onChange={handleInputChange}
      placeholder="상품 재질 설명을 입력하세요."
      required
    />
    <TextAreaField
      label="상품 사이즈 정보"
      name="productSizeInfo"
      value={formData.productSizeInfo}
      onChange={handleInputChange}
      placeholder="상품 사이즈 정보를 입력하세요."
      required
    />
    <div>
      <label className="block font-semibold mb-1">상품 사이즈</label>
      <SizeInputs
        sizes={formData.productSize}
        onSizeChange={handleSizeChange}
        onAddSize={addSizeInput}
        onRemoveSize={removeSizeInput}
      />
    </div>
  </>
);
