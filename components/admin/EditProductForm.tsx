"use client";

import React, { useEffect, useState, FormEvent, JSX } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  DocumentReference,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "@/firebase/firebase";
import { useRouter } from "next/navigation";
import { EditProductData } from "@/app/types/admintype";
import InputField from "./subcomponents/InputField";
import ColorInputs from "./subcomponents/ColorInputs";
import SelectField from "./subcomponents/SelectField";
import TextAreaField from "./subcomponents/TextAreaField";
import SizeInputs from "./subcomponents/SizeInputs";
import FileUploadPreview from "./subcomponents/FileUploadPreview";

export type EditProductFormProps = {
  productId: string;
};

const EditProductForm = ({ productId }: EditProductFormProps): JSX.Element => {
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

  const handleColorChange = (index: number, value: string) =>
    setFormData((prev) => {
      const newColors = [...prev.productHexCodes];
      newColors[index] = value;
      return { ...prev, productHexCodes: newColors };
    });

  const addColorInput = () =>
    setFormData((prev) => ({
      ...prev,
      productHexCodes: [...prev.productHexCodes, ""],
    }));
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
        <div>
          <label className="block font-semibold mb-1">상품 이미지</label>
          <input
            className="w-full"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
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
          상품 등록
        </button>
      </form>
    </div>
  );
};

export default EditProductForm;
