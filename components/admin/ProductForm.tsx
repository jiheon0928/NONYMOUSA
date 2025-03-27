// components/ProductForm.tsx
"use client";

import { ProductFormData } from "@/app/types/admintype";
import { firestore, storage } from "@/firebase/firebase";
import { addDoc, collection, doc, runTransaction } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import React, { FormEvent, JSX, useState } from "react";
import FileUploadPreview from "./subcomponents/FileUploadPreview";
import { ProductFormFields } from "./subcomponents/ProductFormFields";

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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void =>
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  // 상품 색상 관련 핸들러
  const handleColorChange = (index: number, value: string): void =>
    setFormData((prev) => {
      const newColors = [...prev.productHexCodes];
      newColors[index] = value;
      return { ...prev, productHexCodes: newColors };
    });
  const addColorInput = (): void =>
    setFormData((prev) => ({
      ...prev,
      productHexCodes: [...prev.productHexCodes, ""],
    }));
  const removeColorInput = (index: number): void => {
    if (index === 0) return;
    setFormData((prev) => ({
      ...prev,
      productHexCodes: prev.productHexCodes.filter((_, i) => i !== index),
    }));
  };

  // 상품 사이즈 관련 핸들러
  const handleSizeChange = (
    index: number,
    field: "key" | "value",
    value: string
  ): void =>
    setFormData((prev) => {
      const newSizes = [...prev.productSize];
      newSizes[index] = { ...newSizes[index], [field]: value };
      return { ...prev, productSize: newSizes };
    });
  const addSizeInput = (): void =>
    setFormData((prev) => ({
      ...prev,
      productSize: [...prev.productSize, { key: "", value: "" }],
    }));
  const removeSizeInput = (index: number): void =>
    setFormData((prev) => ({
      ...prev,
      productSize: prev.productSize.filter((_, i) => i !== index),
    }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setProductImageFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const uploadImages = async (): Promise<string[]> => {
    const uploadPromises = productImageFiles.map(async (file) => {
      const fileRef = ref(storage, `image/${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      return getDownloadURL(snapshot.ref);
    });
    const urls = await Promise.all(uploadPromises);
    setImageList(urls);
    return urls;
  };

  const submit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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
        productInfo,
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
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">상품 등록</h1>
      <form onSubmit={submit} className="space-y-4">
        <ProductFormFields
          formData={formData}
          productInfo={productInfo}
          productExpectedShippingDate={productExpectedShippingDate}
          handleInputChange={handleInputChange}
          handleColorChange={handleColorChange}
          addColorInput={addColorInput}
          removeColorInput={removeColorInput}
          handleSizeChange={handleSizeChange}
          addSizeInput={addSizeInput}
          removeSizeInput={removeSizeInput}
          setProductInfo={setProductInfo}
          setProductExpectedShippingDate={setProductExpectedShippingDate}
        />
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
