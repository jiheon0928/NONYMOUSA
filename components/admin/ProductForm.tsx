// components/ProductForm.tsx
"use client";

import React, { useState, FormEvent, JSX } from "react";
import { collection, addDoc, runTransaction, doc } from "firebase/firestore";
import { firestore, storage } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import InputField from "./subcomponents/InputField";
import ColorInputs from "./subcomponents/ColorInputs";
import SelectField from "./subcomponents/SelectField";
import TextAreaField from "./subcomponents/TextAreaField";
import SizeInputs from "./subcomponents/SizeInputs";
import FileUploadPreview from "./subcomponents/FileUploadPreview";

type SizeType = {
  key: string;
  value: string;
};

type ProductFormData = {
  productCode: string;
  productHexCodes: string[];
  productName: string;
  productPrice: string;
  productCategory: string;
  productNotice: string;
  productOrigin: string;
  productManufacturer: string;
  productDeliveryMethod: string;
  productDeliveryPrice: string;
  productDetails: string;
  productMaterials: string;
  productSize: SizeType[];
  productSizeInfo: string;
};

export default function ProductForm(): JSX.Element {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    productCode: "",
    productHexCodes: [""],
    productName: "",
    productPrice: "",
    productCategory: "cap",
    productNotice: "",
    productOrigin: "",
    productManufacturer: "",
    productDeliveryMethod: "",
    productDeliveryPrice: "",
    productDetails: "",
    productMaterials: "",
    productSize: [{ key: "", value: "" }],
    productSizeInfo: "",
  });
  const [productInfo, setProductInfo] = useState("");
  const [productExpectedShippingDate, setProductExpectedShippingDate] =
    useState("");
  const [productImageFiles, setProductImageFiles] = useState<File[]>([]);
  const [imageList, setImageList] = useState<string[]>([]);

  function handleInputChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // 상품 색상 관련 핸들러
  function handleColorChange(index: number, value: string): void {
    const newColors = [...formData.productHexCodes];
    newColors[index] = value;
    setFormData((prev) => ({ ...prev, productHexCodes: newColors }));
  }
  function addColorInput(): void {
    setFormData((prev) => ({
      ...prev,
      productHexCodes: [...prev.productHexCodes, ""],
    }));
  }
  function removeColorInput(index: number): void {
    if (index === 0) return;
    setFormData((prev) => ({
      ...prev,
      productHexCodes: prev.productHexCodes.filter((_, i) => i !== index),
    }));
  }

  // 상품 사이즈 관련 핸들러
  function handleSizeChange(
    index: number,
    field: "key" | "value",
    value: string
  ): void {
    const newSize = [...formData.productSize];
    newSize[index] = { ...newSize[index], [field]: value };
    setFormData((prev) => ({ ...prev, productSize: newSize }));
  }
  function addSizeInput(): void {
    setFormData((prev) => ({
      ...prev,
      productSize: [...prev.productSize, { key: "", value: "" }],
    }));
  }
  function removeSizeInput(index: number): void {
    if (formData.productSize.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      productSize: prev.productSize.filter((_, i) => i !== index),
    }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setProductImageFiles((prev) => [...prev, ...filesArray]);
    }
  }

  async function uploadImages(): Promise<string[]> {
    const uploadPromises = productImageFiles.map(async (file) => {
      const fileRef = ref(storage, `image/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    });
    const urls = await Promise.all(uploadPromises);
    setImageList(urls);
    return urls;
  }

  async function submit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      const imageURLs = await uploadImages();
      if (!imageURLs.length) {
        alert("이미지 업로드에 실패했습니다.");
        return;
      }
      const newProductId = await runTransaction(
        firestore,
        async (transaction) => {
          const counterRef = doc(firestore, "counters", "products");
          const counterDoc = await transaction.get(counterRef);
          let current = 0;
          if (counterDoc.exists()) {
            current = counterDoc.data().current || 0;
          }
          const newId = current + 1;
          transaction.set(counterRef, { current: newId });
          return newId;
        }
      );

      const productData = {
        ...formData,
        productId: newProductId,
        productPrice: Number(formData.productPrice),
        productDeliveryPrice: Number(formData.productDeliveryPrice),
        productInfo: productInfo,
        productImage: imageURLs,
        productExpectedShippingDate: productExpectedShippingDate
          ? new Date(productExpectedShippingDate + "T00:00:00")
          : null,
      };

      await addDoc(collection(firestore, "products"), productData);
      alert("상품이 등록되었습니다");
      router.push("/admin/adminproductlist");
    } catch (error) {
      console.error("오류:", error);
      alert("오류가 발생했습니다.");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">상품 등록</h1>
      <form onSubmit={submit} className="space-y-4">
        {/* 상품 코드 */}
        <InputField
          label="상품 코드"
          name="productCode"
          value={formData.productCode}
          onChange={handleInputChange}
          required
        />

        {/* 상품 색상 */}
        <ColorInputs
          colors={formData.productHexCodes}
          onColorChange={handleColorChange}
          onAddColor={addColorInput}
          onRemoveColor={removeColorInput}
        />

        {/* 상품명 */}
        <InputField
          label="상품명"
          name="productName"
          value={formData.productName}
          onChange={handleInputChange}
          required
        />

        {/* 가격 */}
        <InputField
          label="가격"
          name="productPrice"
          value={formData.productPrice}
          onChange={handleInputChange}
          type="number"
          required
        />

        {/* 카테고리 */}
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

        {/* 상품 안내 */}
        <TextAreaField
          label="상품 안내"
          name="productInfo"
          value={productInfo}
          onChange={(e) => setProductInfo(e.target.value)}
          placeholder="상품 안내를 입력하세요."
          required
        />

        {/* 중요 안내 */}
        <TextAreaField
          label="중요 안내"
          name="productNotice"
          value={formData.productNotice}
          onChange={handleInputChange}
          placeholder="중요 안내를 입력하세요."
        />

        {/* 원산지 */}
        <InputField
          label="원산지"
          name="productOrigin"
          value={formData.productOrigin}
          onChange={handleInputChange}
          required
        />

        {/* 제조사 */}
        <InputField
          label="제조사"
          name="productManufacturer"
          value={formData.productManufacturer}
          onChange={handleInputChange}
          required
        />

        {/* 배송 방법 */}
        <InputField
          label="배송 방법"
          name="productDeliveryMethod"
          value={formData.productDeliveryMethod}
          onChange={handleInputChange}
          required
        />

        {/* 배송비 */}
        <InputField
          label="배송비"
          name="productDeliveryPrice"
          value={formData.productDeliveryPrice}
          onChange={handleInputChange}
          type="number"
          required
        />

        {/* 출고예정 날짜 */}
        <InputField
          label="출고예정"
          name="productExpectedShippingDate"
          value={productExpectedShippingDate}
          onChange={(e) => setProductExpectedShippingDate(e.target.value)}
          type="date"
        />

        {/* 상품 디테일 설명 */}
        <TextAreaField
          label="상품 디테일 설명"
          name="productDetails"
          value={formData.productDetails}
          onChange={handleInputChange}
          placeholder="상품 디테일 설명을 입력하세요."
          required
        />

        {/* 상품 재질 설명 */}
        <TextAreaField
          label="상품 재질 설명"
          name="productMaterials"
          value={formData.productMaterials}
          onChange={handleInputChange}
          placeholder="상품 재질 설명을 입력하세요."
          required
        />

        {/* 상품 사이즈 정보 */}
        <TextAreaField
          label="상품 사이즈 정보"
          name="productSizeInfo"
          value={formData.productSizeInfo}
          onChange={handleInputChange}
          placeholder="상품 사이즈 정보를 입력하세요."
          required
        />

        {/* 상품 사이즈 */}
        <SizeInputs
          sizes={formData.productSize}
          onSizeChange={handleSizeChange}
          onAddSize={addSizeInput}
          onRemoveSize={removeSizeInput}
        />

        {/* 상품 이미지 */}
        <div>
          <label className="block font-semibold mb-1">상품 이미지</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full"
          />
          <FileUploadPreview files={productImageFiles} />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          상품 등록
        </button>
      </form>
    </div>
  );
}
