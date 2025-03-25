"use client";

import React, { useState, FormEvent } from "react";
import { collection, addDoc, runTransaction, doc } from "firebase/firestore";
import { firestore, storage } from "@/firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ProductFormData } from "@/app/types/admintype";
import { useRouter } from "next/navigation";

const ProductForm = () => {
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

  const handleInputChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: any) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files) as File[];
      setProductImageFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleColorChange = (i: number, v: string) => {
    const newColors = [...formData.productHexCodes];
    newColors[i] = v;
    setFormData((prev) => ({ ...prev, productHexCodes: newColors }));
  };

  const addColorInput = () => {
    setFormData((prev) => ({
      ...prev,
      productHexCodes: [...prev.productHexCodes, ""],
    }));
  };

  const removeColorInput = (i: number) => {
    if (i == 0) return;
    setFormData((prev) => ({
      ...prev,
      productHexCodes: prev.productHexCodes.filter((_, a) => a !== i),
    }));
  };

  const handleSizeChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newSize = [...formData.productSize];
    newSize[index] = { ...newSize[index], [field]: value };
    setFormData((prev) => ({ ...prev, productSize: newSize }));
  };

  const addSizeInput = () => {
    setFormData((prev) => ({
      ...prev,
      productSize: [...prev.productSize, { key: "", value: "" }],
    }));
  };

  const removeSizeInput = (index: number) => {
    if (formData.productSize.length == 1) return;
    setFormData((prev) => ({
      ...prev,
      productSize: prev.productSize.filter((_, i) => i !== index),
    }));
  };

  const uploadImages = async (): Promise<string[]> => {
    const uploadPromises = productImageFiles.map(async (file) => {
      const fileRef = ref(storage, `image/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    });
    const urls = await Promise.all(uploadPromises);
    setImageList(urls);
    return urls;
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
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
        ...formData,
        productId: newProductId,
        productPrice: Number(formData.productPrice),
        productDeliveryPrice: Number(formData.productDeliveryPrice),
        productInfo: productInfo,
        productImage: imageURL,
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
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">상품 등록</h1>
      <form onSubmit={submit} className="space-y-4">
        {/* 상품 코드 */}
        <div>
          <label className="block font-semibold mb-1">상품 코드</label>
          <input
            type="text"
            name="productCode"
            value={formData.productCode}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        {/* 상품 색상 */}
        <div>
          <label className="block font-semibold mb-1">상품 색상</label>
          {formData.productHexCodes.map((color, index) => (
            <div key={`color-${index}`} className="flex items-center mb-2">
              <input
                type="text"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                placeholder="#ffffff"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => removeColorInput(index)}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            placeholder="중요 안내를 입력하세요."
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        {/* 원산지 */}
        <div>
          <label className="block font-semibold mb-1">원산지</label>
          <input
            type="text"
            name="productOrigin"
            value={formData.productOrigin}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
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
        {/* 상품 디테일 설명 */}
        <div>
          <label className="block font-semibold mb-1">상품 디테일 설명</label>
          <textarea
            name="productDetails"
            value={formData.productDetails}
            onChange={handleInputChange}
            placeholder="상품 디테일 설명을 입력하세요."
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        {/* 상품 재질 설명 */}
        <div>
          <label className="block font-semibold mb-1">상품 재질 설명</label>
          <textarea
            name="productMaterials"
            value={formData.productMaterials}
            onChange={handleInputChange}
            placeholder="상품 재질 설명을 입력하세요."
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        {/* 상품 사이즈 정보 */}
        <div>
          <label className="block font-semibold mb-1">상품 사이즈 정보</label>
          <textarea
            name="productSizeInfo"
            value={formData.productSizeInfo}
            onChange={handleInputChange}
            placeholder="상품 사이즈 정보를 입력하세요."
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        {/* 상품 사이즈 */}
        <div>
          <label className="block font-semibold mb-1">상품 사이즈</label>
          {formData.productSize.map((size, sizei) => (
            <div key={`size-${sizei}`} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={size.key}
                onChange={(e) => {
                  const newSize = [...formData.productSize];
                  newSize[sizei] = { ...newSize[sizei], key: e.target.value };
                  setFormData({ ...formData, productSize: newSize });
                }}
                placeholder="키"
                className="w-1/3 border border-gray-300 rounded px-3 py-2"
                required
              />
              <input
                type="text"
                value={size.value}
                onChange={(e) => {
                  const newSize = [...formData.productSize];
                  newSize[sizei] = { ...newSize[sizei], value: e.target.value };
                  setFormData({ ...formData, productSize: newSize });
                }}
                placeholder="값"
                className="w-1/3 border border-gray-300 rounded px-3 py-2"
                required
              />
              {sizei !== 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      productSize: formData.productSize.filter(
                        (_, i) => i !== sizei
                      ),
                    })
                  }
                  className="ml-2 text-red-500 hover:underline"
                >
                  취소
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                productSize: [...formData.productSize, { key: "", value: "" }],
              })
            }
            className="text-sm text-blue-500 hover:underline"
          >
            사이즈 추가
          </button>
        </div>

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
          {productImageFiles && productImageFiles.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-semibold">새로운 이미지:</p>
              <div className="flex flex-row flex-wrap gap-2">
                {productImageFiles.map((v, i) => (
                  <img
                    key={`new-img-${i}-${v.name}`}
                    src={URL.createObjectURL(v)}
                    alt={`새로운 이미지 ${i + 1}`}
                    className="w-24 h-24 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
          )}
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
