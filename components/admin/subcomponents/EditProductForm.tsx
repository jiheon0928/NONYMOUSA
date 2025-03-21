"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { EditProductData } from "@/app/types/admintype";

export type EditProductFormProps = {
  productId: string;
};

const EditProductForm = ({ productId }: EditProductFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState({
    productCode: "",
    productHexCodes: [""],
    productName: "",
    productPrice: "",
    productCategory: "cap" as
      | "cap"
      | "outer"
      | "top"
      | "bottom"
      | "accessories",
    productNotice: "",
    productOrigin: "",
    productManufacturer: "",
    productDeliveryMethod: "",
    productDeliveryPrice: "",
  });
  const [productInfo, setProductInfo] = useState<string>("");
  const [productExpectedShippingDate, setProductExpectedShippingDate] =
    useState<string>("");
  const [existingImageURL, setExistingImageURL] = useState<string[]>([]);
  const [newImageFile, setNewImageFile] = useState<File[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const numericId = Number(productId);
        const snapshot = await getDocs(collection(firestore, "products"));
        let found = false;
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as EditProductData;
          if (data.productId === numericId) {
            setFormData({
              productCode: data.productCode,
              productHexCodes: data.productHexCodes,
              productName: data.productName,
              productPrice: data.productPrice.toString(),
              productCategory: data.productCategory,
              productNotice: data.productNotice.join("\n"),
              productOrigin: data.productOrigin,
              productManufacturer: data.productManufacturer,
              productDeliveryMethod: data.productDeliveryMethod,
              productDeliveryPrice: data.productDeliveryPrice.toString(),
            });
            setProductInfo(data.productInfo.join("\n"));
            if (data.productExpectedShippingDate) {
              const expectedDate =
                typeof data.productExpectedShippingDate.toDate === "function"
                  ? data.productExpectedShippingDate.toDate()
                  : new Date(data.productExpectedShippingDate);
              const isoDate = expectedDate.toISOString().split("T")[0];
              setProductExpectedShippingDate(isoDate);
            }
            setExistingImageURL(data.productImage);
            found = true;
          }
        });
        if (!found) {
          setError("제품 데이터를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("제품 데이터 불러오기 오류:", error);
        setError("제품 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const inputChange = (e: any) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const FileChange = (e: any) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files) as File[];
      setNewImageFile((prev) => [...prev, ...filesArray]);
    }
  };

  // Promise 어노테이션 사용
  const uploadNewImages = async (): Promise<string[]> => {
    const promises = newImageFile.map(async (file) => {
      const fileRef = ref(storage, `image/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      return getDownloadURL(snapshot.ref);
    });
    return Promise.all(promises);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const newImageURLs = await uploadNewImages();
      const updatedImageURLs =
        newImageURLs.length > 0 ? newImageURLs : existingImageURL;

      // 전체 문서를 가져와서 제품 ID가 일치하는 문서의 참조(docRef)를 찾음
      const numericId = Number(productId);
      const snapshot = await getDocs(collection(firestore, "products"));
      let docRef = null;
      snapshot.forEach((docSnap) => {
        const data = docSnap.data() as EditProductData;
        if (data.productId === numericId) {
          docRef = docSnap.ref;
        }
      });

      if (docRef) {
        await updateDoc(docRef, {
          productCode: formData.productCode,
          productHexCodes: formData.productHexCodes,
          productName: formData.productName,
          productPrice: Number(formData.productPrice),
          productCategory: formData.productCategory,
          productImage: updatedImageURLs,
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
        });
        alert("제품이 성공적으로 수정되었습니다!");
        router.push("/adminproductlist/adminproductlist");
      } else {
        alert("수정할 제품을 찾을 수 없습니다.");
      }
    } catch (err) {
      console.error("제품 수정 오류:", err);
      alert("제품 수정 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <p className="text-center mt-4">제품 데이터를 불러오는 중...</p>;
  }
  if (error) {
    return <p className="text-center mt-4 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">제품 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 상품 코드 */}
        <div>
          <label className="block font-semibold mb-1">상품 코드</label>
          <input
            type="text"
            name="productCode"
            value={formData.productCode}
            onChange={inputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        {/* 상품 색상 */}
        <div>
          <label className="block font-semibold mb-1">상품 색상</label>
          {formData.productHexCodes.map((color, idx) => (
            <div key={`color-${idx}`} className="flex items-center mb-2">
              <input
                type="text"
                value={color}
                onChange={(e) => {
                  const newColors = [...formData.productHexCodes];
                  newColors[idx] = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    productHexCodes: newColors,
                  }));
                }}
                placeholder="#ffffff"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              {idx !== 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      productHexCodes: prev.productHexCodes.filter(
                        (_, i) => i !== idx
                      ),
                    }))
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
              setFormData((prev) => ({
                ...prev,
                productHexCodes: [...prev.productHexCodes, ""],
              }))
            }
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
        {/* 상품 이미지 */}
        <div>
          <label className="block font-semibold mb-1">상품 이미지</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={FileChange}
            className="w-full"
            required
          />
          {existingImageURL && existingImageURL.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-semibold">기존 이미지:</p>
              <div className="flex flex-row flex-wrap gap-2">
                {existingImageURL.map((url, idx) => (
                  <img
                    key={`existing-img-${idx}`}
                    src={url}
                    alt={`기존 이미지 ${idx + 1}`}
                    className="w-24 h-24 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
          )}
          {newImageFile && newImageFile.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-semibold">새로운 이미지:</p>
              <div className="flex flex-row flex-wrap gap-2">
                {newImageFile.map((file, idx) => (
                  <img
                    key={`new-img-${idx}-${file.name}`}
                    src={URL.createObjectURL(file)}
                    alt={`새로운 이미지 ${idx + 1}`}
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
          수정 완료
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
