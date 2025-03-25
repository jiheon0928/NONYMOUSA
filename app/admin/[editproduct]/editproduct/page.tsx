"use client";

import EditProductForm from "@/components/admin/subcomponents/EditProductForm";
import { useParams } from "next/navigation";

const EditProductPage = () => {
  const params = useParams();
  const productId =
    typeof params.editproduct == "string"
      ? params.editproduct
      : params.editproduct?.[0] || "";

  if (!productId) {
    return <p className="text-center mt-4">유효한 제품 ID가 없습니다.</p>;
  }

  return (
    <div className="mt-32">
      <h1>상품 수정 페이지</h1>
      <EditProductForm productId={productId} />
    </div>
  );
};

export default EditProductPage;
