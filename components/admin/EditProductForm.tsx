"use client";

import { EditProductData, ProductFormData } from "@/app/types/admintype";
import { firestore, storage } from "@/firebase/firebase";
import {
  collection,
  DocumentReference,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import React, { FormEvent, JSX, useEffect, useState } from "react";
import FileUploadPreview from "./subcomponents/FileUploadPreview";
import { ProductFormFields } from "./subcomponents/ProductFormFields";

export type EditProductFormProps = {
  productId: string;
};

const EditProductForm = ({ productId }: EditProductFormProps): JSX.Element => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
  const [existingImageURL, setExistingImageURL] = useState<string[]>([]);
  const [newImageFile, setNewImageFile] = useState<File[]>([]);
  const [docRefForUpdate, setDocRefForUpdate] =
    useState<DocumentReference | null>(null);

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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewImageFile((prev) => [...prev, ...filesArray]);
    }
  };

  const handleColorChange = (i: number, v: string) =>
    setFormData((prev) => {
      const newColors = [...prev.productHexCodes];
      newColors[i] = v;
      return { ...prev, productHexCodes: newColors };
    });

  const addColorInput = () =>
    setFormData((prev) => ({
      ...prev,
      productHexCodes: [...prev.productHexCodes, ""],
    }));

  const removeColorInput = (i: number) => {
    if (i === 0) return;
    setFormData((prev) => ({
      ...prev,
      productHexCodes: prev.productHexCodes.filter((_, b) => b !== i),
    }));
  };

  const handleSizeChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) =>
    setFormData((prev) => {
      const newSizes = [...prev.productSize];
      newSizes[index] = { ...newSizes[index], [field]: value };
      return { ...prev, productSize: newSizes };
    });

  const addSizeInput = () =>
    setFormData((prev) => ({
      ...prev,
      productSize: [...prev.productSize, { key: "", value: "" }],
    }));

  const removeSizeInput = (index: number) =>
    setFormData((prev) => ({
      ...prev,
      productSize: prev.productSize.filter((_, i) => i !== index),
    }));

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
        productInfo,
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

  if (loading)
    return <p className="text-center mt-4">제품 데이터를 불러오는 중...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">제품 수정</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          {existingImageURL?.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-semibold">기존 이미지:</p>
              <div className="flex flex-row flex-wrap gap-2">
                {existingImageURL.map((url, id) => (
                  <img
                    key={`existing-img-${id}`}
                    src={url}
                    alt={`기존 이미지 ${id + 1}`}
                    className="w-24 h-24 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
          )}
          <FileUploadPreview files={newImageFile} />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          제품 수정
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
