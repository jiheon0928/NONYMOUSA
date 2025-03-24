"use client";

import React, { useEffect, useState, FormEvent } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { EditProductData } from "@/app/types/admintype";

export type EditProductFormProps = {
  productId: string;
};

const EditProductForm = ({ productId }: EditProductFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    productDetails: "",
    productMaterials: "",
    productSize: [] as { key: string; value: string }[],
    productSizeInfo: "",
  });
  const [productInfo, setProductInfo] = useState("");
  const [productExpectedShippingDate, setProductExpectedShippingDate] =
    useState("");
  const [existingImageURL, setExistingImageURL] = useState<string[]>([]);
  const [newImageFile, setNewImageFile] = useState<File[]>([]);
  const [docRefForUpdate, setDocRefForUpdate] = useState<any>(null);

  useEffect(() => {
    const fetchEditProductData = async () => {
      try {
        const q = query(
          collection(firestore, "products"),
          where("productId", "==", Number(productId))
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          setDocRefForUpdate(docSnap.ref);
          const data = docSnap.data() as EditProductData;
          setFormData({
            productCode: data.productCode,
            productHexCodes: data.productHexCodes,
            productName: data.productName,
            productPrice: data.productPrice.toString(),
            productCategory: data.productCategory,
            productNotice: data.productNotice,
            productOrigin: data.productOrigin,
            productManufacturer: data.productManufacturer,
            productDeliveryMethod: data.productDeliveryMethod,
            productDeliveryPrice: data.productDeliveryPrice.toString(),
            productDetails: data.productDetails,
            productMaterials: data.productMaterials,
            productSize: data.productSize || [],
            productSizeInfo: data.productSizeInfo || "",
          });
          setProductInfo(data.productInfo);
          if (data.productExpectedShippingDate) {
            const expectedDate =
              typeof data.productExpectedShippingDate.toDate === "function"
                ? data.productExpectedShippingDate.toDate()
                : new Date(data.productExpectedShippingDate);
            setProductExpectedShippingDate(
              expectedDate.toISOString().split("T")[0]
            );
          }
          setExistingImageURL(data.productImage);
        } else {
          setError("제품 데이터를 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("제품 데이터 불러오기 오류:", err);
        setError("제품 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchEditProductData();
  }, [productId]);

  const handleInputChange = (e: any) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: any) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files) as File[];
      setNewImageFile((prev) => [...prev, ...filesArray]);
    }
  };

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...formData.productHexCodes];
    newColors[index] = value;
    setFormData((prev) => ({ ...prev, productHexCodes: newColors }));
  };

  const addColorInput = () => {
    setFormData((prev) => ({
      ...prev,
      productHexCodes: [...prev.productHexCodes, ""],
    }));
  };

  const removeColorInput = (index: number) => {
    if (index === 0) return;
    setFormData((prev) => ({
      ...prev,
      productHexCodes: prev.productHexCodes.filter((_, i) => i !== index),
    }));
  };

  const handleSizeChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newSizes = [...formData.productSize];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setFormData((prev) => ({ ...prev, productSize: newSizes }));
  };

  const addSizeInput = () => {
    setFormData((prev) => ({
      ...prev,
      productSize: [...prev.productSize, { key: "", value: "" }],
    }));
  };

  const removeSizeInput = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      productSize: prev.productSize.filter((_, i) => i !== index),
    }));
  };

  const uploadNewImages = async (): Promise<string[]> => {
    const promises = newImageFile.map(async (file) => {
      const fileRef = ref(storage, `image/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      return getDownloadURL(snapshot.ref);
    });
    return Promise.all(promises);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newImageURLs = await uploadNewImages();
      const updatedImageURLs =
        newImageURLs.length > 0 ? newImageURLs : existingImageURL;
      if (!docRefForUpdate) {
        setError("업데이트할 제품 문서를 찾을 수 없습니다.");
        return;
      }
      await updateDoc(docRefForUpdate, {
        productCode: formData.productCode,
        productHexCodes: formData.productHexCodes,
        productName: formData.productName,
        productPrice: Number(formData.productPrice),
        productCategory: formData.productCategory,
        productImage: updatedImageURLs,
        productExpectedShippingDate: productExpectedShippingDate
          ? new Date(productExpectedShippingDate + "T00:00:00")
          : null,
        productInfo: productInfo,
        productNotice: formData.productNotice,
        productOrigin: formData.productOrigin,
        productManufacturer: formData.productManufacturer,
        productDeliveryMethod: formData.productDeliveryMethod,
        productDeliveryPrice: Number(formData.productDeliveryPrice),
        productDetails: formData.productDetails,
        productMaterials: formData.productMaterials,
        productSize: formData.productSize,
        productSizeInfo: formData.productSizeInfo,
      });
      alert("제품이 수정되었습니다");
      router.push("/admin/adminproductlist");
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
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        {/* 상품 색상 */}
        <div>
          <label className="block font-semibold mb-1">상품 색상</label>
          {formData.productHexCodes.map((color, id) => (
            <div key={`color-${id}`} className="flex items-center mb-2">
              <input
                type="text"
                value={color}
                onChange={(e) => handleColorChange(id, e.target.value)}
                placeholder="#ffffff"
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              {id !== 0 && (
                <button
                  type="button"
                  onClick={() => removeColorInput(id)}
                  className="ml-2 w-1/12 text-red-500 hover:underline"
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
            className="w-full border border-gray-300 rounded px-3 py-2"
            name="productInfo"
            value={productInfo}
            onChange={(e) => setProductInfo(e.target.value)}
            placeholder="상품 안내를 입력하세요."
            required
          />
        </div>
        {/* 중요 안내 */}
        <div>
          <label className="block font-semibold mb-1">중요 안내</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            name="productNotice"
            value={formData.productNotice}
            onChange={handleInputChange}
            placeholder="중요 안내를 입력하세요."
          />
        </div>
        {/* 원산지 */}
        <div>
          <label className="block font-semibold mb-1">원산지</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            name="productOrigin"
            value={formData.productOrigin}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* 제조사 */}
        <div>
          <label className="block font-semibold mb-1">제조사</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            name="productManufacturer"
            value={formData.productManufacturer}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* 배송 방법 */}
        <div>
          <label className="block font-semibold mb-1">배송 방법</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="text"
            name="productDeliveryMethod"
            value={formData.productDeliveryMethod}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* 배송비 */}
        <div>
          <label className="block font-semibold mb-1">배송비</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="number"
            name="productDeliveryPrice"
            value={formData.productDeliveryPrice}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* 출고예정 날짜 */}
        <div>
          <label className="block font-semibold mb-1">출고예정</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="date"
            name="productExpectedShippingDate"
            value={productExpectedShippingDate}
            onChange={(e) => setProductExpectedShippingDate(e.target.value)}
          />
        </div>
        {/* 상품 디테일 설명 */}
        <div>
          <label className="block font-semibold mb-1">상품 디테일 설명</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            name="productDetails"
            value={formData.productDetails}
            onChange={handleInputChange}
            placeholder="상품 디테일 설명을 입력하세요."
            required
          />
        </div>
        {/* 상품 재질 설명 */}
        <div>
          <label className="block font-semibold mb-1">상품 재질 설명</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            name="productMaterials"
            value={formData.productMaterials}
            onChange={handleInputChange}
            placeholder="상품 재질 설명을 입력하세요."
            required
          />
        </div>
        {/* 상품 사이즈 정보 */}
        <div>
          <label className="block font-semibold mb-1">상품 사이즈 정보</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            name="productSizeInfo"
            value={formData.productSizeInfo}
            onChange={handleInputChange}
            placeholder="상품 사이즈 정보를 입력하세요."
            required
          />
        </div>
        {/* 상품 사이즈 (동적 입력, 키와 값) */}
        <div>
          <label className="block font-semibold mb-1">상품 사이즈</label>
          {(formData.productSize || []).map((size, index) => (
            <div key={`size-${index}`} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={size.key}
                onChange={(e) => {
                  const newSizes = [...(formData.productSize || [])];
                  newSizes[index] = { ...newSizes[index], key: e.target.value };
                  setFormData({ ...formData, productSize: newSizes });
                }}
                placeholder="키"
                className="w-1/3 border border-gray-300 rounded px-3 py-2"
                required
              />
              <input
                className="w-1/3 border border-gray-300 rounded px-3 py-2"
                type="text"
                value={size.value}
                onChange={(e) => {
                  const newSizes = [...(formData.productSize || [])];
                  newSizes[index] = {
                    ...newSizes[index],
                    value: e.target.value,
                  };
                  setFormData({ ...formData, productSize: newSizes });
                }}
                placeholder="값"
                required
              />
              {index !== 0 && (
                <button
                  className="ml-2 w-1/12 text-red-500 hover:underline"
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      productSize: (formData.productSize || []).filter(
                        (_, i) => i !== index
                      ),
                    })
                  }
                >
                  취소
                </button>
              )}
            </div>
          ))}
          <button
            className="text-sm text-blue-500 hover:underline"
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                productSize: [
                  ...(formData.productSize || []),
                  { key: "", value: "" },
                ],
              })
            }
          >
            사이즈 추가
          </button>
        </div>
        {/* 상품 이미지 */}
        <div>
          <label className="block font-semibold mb-1">상품 이미지</label>
          <input
            className="w-full"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          {existingImageURL && existingImageURL.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-semibold">기존 이미지:</p>
              <div className="flex flex-row flex-wrap gap-2">
                {existingImageURL.map((url, id) => (
                  <img
                    className="w-24 h-24 object-cover rounded border"
                    key={`existing-img-${id}`}
                    src={url}
                    alt={`기존 이미지 ${id + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
          {newImageFile && newImageFile.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-semibold">새로운 이미지:</p>
              <div className="flex flex-row flex-wrap gap-2">
                {newImageFile.map((file, id) => (
                  <img
                    className="w-24 h-24 object-cover rounded border"
                    key={`new-img-${id}-${file.name}`}
                    src={URL.createObjectURL(file)}
                    alt={`새로운 이미지 ${id + 1}`}
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

export default EditProductForm;
