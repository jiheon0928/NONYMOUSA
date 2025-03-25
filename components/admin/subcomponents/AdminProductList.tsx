"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

type ProductData = {
  id: string;
  productId: number;
  productCode: string;
  productName: string;
  productPrice: number;
  productCategory: string;
  productImage: string[];
  productExpectedShippingDate: any;
  productDeliveryMethod: string;
  productDeliveryPrice: number;
};

const AdminProductList = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "products"));
      const productsList: ProductData[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductData[];
      setProducts(productsList);
    } catch (error) {
      console.error("제품 데이터 불러오기 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const moveEdit = (productId: number) => {
    router.push(`/admin/${productId}/editproduct`);
  };

  const ProductDelete = async (docId: string) => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;
    try {
      await deleteDoc(doc(firestore, "products", docId));
      alert("제품이 삭제되었습니다.");
      fetchProducts();
    } catch (error) {
      console.error("제품 삭제 오류:", error);
      alert("제품 삭제 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <p className="text-center mt-4">데이터를 불러오는 중...</p>;
  }

  if (products.length == 0) {
    return <p className="text-center mt-4">등록된 제품이 없습니다.</p>;
  }

  return (
    <div className="container mx-auto pt-4 px-4">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-3 py-2">제품 ID</th>
            <th className="border border-gray-300 px-3 py-2">제품 코드</th>
            <th className="border border-gray-300 px-3 py-2">제품명</th>
            <th className="border border-gray-300 px-3 py-2">가격</th>
            <th className="border border-gray-300 px-3 py-2">카테고리</th>
            <th className="border border-gray-300 px-3 py-2">제품사진</th>
            <th className="border border-gray-300 px-3 py-2">출고예정</th>
            <th className="border border-gray-300 px-3 py-2">배송방법</th>
            <th className="border border-gray-300 px-3 py-2">배송비</th>
            <th className="border border-gray-300 px-3 py-2">수정</th>
            <th className="border border-gray-300 px-3 py-2">삭제</th>
          </tr>
        </thead>
        <tbody>
          {products.map((v) => (
            <tr key={v.id} className="text-center hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {v.productId}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {v.productCode}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {v.productName}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {v.productPrice}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {v.productCategory}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {v.productImage && v.productImage.length > 0 ? (
                  <img
                    src={v.productImage[0]}
                    alt={v.productName}
                    className="mx-auto w-24 h-24 object-cover rounded"
                  />
                ) : (
                  <span>없음</span>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {v.productExpectedShippingDate
                  ? typeof v.productExpectedShippingDate.toDate == "function"
                    ? v.productExpectedShippingDate
                        .toDate()
                        .toLocaleDateString()
                    : new Date(
                        v.productExpectedShippingDate
                      ).toLocaleDateString()
                  : "없음"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {v.productDeliveryMethod}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {v.productDeliveryPrice}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => moveEdit(v.productId)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded whitespace-nowrap"
                >
                  수정
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => ProductDelete(v.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded whitespace-nowrap"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="w-full text-center py-4 cursor-pointer"
        onClick={() => router.push(`/admin/addproduct`)}
      >
        상품 등록
      </div>
    </div>
  );
};

export default AdminProductList;
