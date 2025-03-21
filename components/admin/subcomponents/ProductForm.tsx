"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  runTransaction,
  doc,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../../../firebase/firebase";
import { ProductFormData } from "@/app/types/admintype";

const ProductForm = () => {
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
  });
  const [productExpectedShippingDate, setProductExpectedShippingDate] =
    useState("");
  const [productInfo, setProductInfo] = useState("");
  const [productImageFiles, setProductImageFiles] = useState<File[]>([]);
  const [imageList, setImageList] = useState<string[]>([]);

  const inputChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fileChange = (e: any) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files) as File[];
      setProductImageFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const colorChange = (colori: number, valuei: string) => {
    const newColors = [...formData.productHexCodes];
    newColors[colori] = valuei;
    setFormData((prev) => ({ ...prev, productHexCodes: newColors }));
  };

  const addColorInput = () => {
    setFormData((prev) => ({
      ...prev,
      productHexCodes: [...prev.productHexCodes, ""],
    }));
  };

  const removeColorInput = (removei: number) => {
    if (removei === 0) return;
    setFormData((prev) => ({
      ...prev,
      productHexCodes: prev.productHexCodes.filter((_, i) => i !== removei),
    }));
  };

  const uploadImages = async (): Promise<string[]> => {
    const uploadPromise = productImageFiles.map(async (file) => {
      const fileRef = ref(storage, `image/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    });
    const urls = await Promise.all(uploadPromise);
    setImageList(urls);
    return urls;
  };

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      const imageURL = await uploadImages();
      if (!imageURL.length) {
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
        productId: newProductId,
        productCode: formData.productCode,
        productHexCodes: formData.productHexCodes,
        productName: formData.productName,
        productPrice: Number(formData.productPrice),
        productCategory: formData.productCategory,
        productImage: imageURL,
        productExpectedShippingDate: productExpectedShippingDate
          ? new Date(productExpectedShippingDate + "T00:00:00")
          : null,
        productInfo: productInfo
          .split("\n")
          .filter((line) => line.trim() !== ""),
        productNotice: formData.productNotice
          .split("\n")
          .filter((line) => line.trim() !== ""),
        productOrigin: formData.productOrigin,
        productManufacturer: formData.productManufacturer,
        productDeliveryMethod: formData.productDeliveryMethod,
        productDeliveryPrice: Number(formData.productDeliveryPrice),
      };

      await addDoc(collection(firestore, "products"), productData);
      alert("상품이 등록되었습니다");
    } catch (error) {
      console.error("오류:", error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">상품 등록</h1>
      <form onSubmit={submit} className="space-y-4">
        {/* 상품코드 */}
        <div>
          <label className="block font-semibold mb-1">상품코드</label>
          <input
            type="text"
            name="productCode"
            value={formData.productCode}
            onChange={inputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* 색상 입력 */}
        <div>
          <label className="block font-semibold mb-1">상품 색상</label>
          {formData.productHexCodes.map((v, i) => (
            <div key={`color-${i}`} className="flex items-center mb-2">
              <input
                type="text"
                value={v}
                onChange={(e) => colorChange(i, e.target.value)}
                placeholder="#ffffff"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              {i !== 0 && (
                <button
                  type="button"
                  onClick={() => removeColorInput(i)}
                  className="ml-2 text-red-500 hover:underline"
                >
                  취소
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addColorInput}
            className="text-sm text-blue-500 hover:underline"
          >
            색상 추가
          </button>
        </div>

        {/* 상품명 */}
        <div>
          <label className="block font-semibold mb-1">상품명</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={inputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* 가격 */}
        <div>
          <label className="block font-semibold mb-1">가격</label>
          <input
            type="number"
            name="productPrice"
            value={formData.productPrice}
            onChange={inputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label className="block font-semibold mb-1">카테고리</label>
          <select
            name="productCategory"
            value={formData.productCategory}
            onChange={inputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="cap">Cap</option>
            <option value="outer">Outer</option>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        {/* 이미지 파일 선택 */}
        <div>
          <label className="block font-semibold mb-1">상품 이미지</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={fileChange}
            className="w-full"
            required
          />
          {productImageFiles.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {productImageFiles.map((file, i) => (
                <img
                  key={`img-${i}-${file.name}`}
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-24 h-24 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>

        {/* 출고예정 날짜 */}
        <div>
          <label className="block font-semibold mb-1">출고예정</label>
          <input
            type="date"
            name="productExpectedShippingDate"
            value={productExpectedShippingDate}
            onChange={(e) => setProductExpectedShippingDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* 상품 안내 */}
        <div>
          <label className="block font-semibold mb-1">상품 안내</label>
          <textarea
            name="productInfo"
            value={productInfo}
            onChange={(e) => setProductInfo(e.target.value)}
            placeholder="상품 안내를 입력하세요."
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* 중요 안내 */}
        <div>
          <label className="block font-semibold mb-1">중요 안내</label>
          <textarea
            name="productNotice"
            value={formData.productNotice}
            onChange={inputChange}
            placeholder="중요 안내를 입력하세요."
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* 원산지 */}
        <div>
          <label className="block font-semibold mb-1">원산지</label>
          <input
            type="text"
            name="productOrigin"
            value={formData.productOrigin}
            onChange={inputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* 제조사 */}
        <div>
          <label className="block font-semibold mb-1">제조사</label>
          <input
            type="text"
            name="productManufacturer"
            value={formData.productManufacturer}
            onChange={inputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* 배송 방법 */}
        <div>
          <label className="block font-semibold mb-1">배송 방법</label>
          <input
            type="text"
            name="productDeliveryMethod"
            value={formData.productDeliveryMethod}
            onChange={inputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        {/* 배송비 */}
        <div>
          <label className="block font-semibold mb-1">배송비</label>
          <input
            type="number"
            name="productDeliveryPrice"
            value={formData.productDeliveryPrice}
            onChange={inputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
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
};

export default ProductForm;
