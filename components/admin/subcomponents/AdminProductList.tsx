"use client";
import { ProductListProductData } from "@/app/types/admintype";
import { firestore } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminProductList = () => {
  const [products, setProducts] = useState<ProductListProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "products"));
        const productsList: ProductListProductData[] = [];
        querySnapshot.forEach((doc) => {
          productsList.push(doc.data() as ProductListProductData);
        });
        setProducts(productsList);
      } catch (error) {
        console.error("상품 데이터 불러오기 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const moveEdit = (productId: number) => {
    router.push(`/editproduct/${productId}`);
  };

  if (loading) {
    return <p className="text-center mt-4">데이터를 불러오는 중...</p>;
  }

  if (products.length === 0) {
    return <p className="text-center mt-4">등록된 상품이 없습니다.</p>;
  }

  return (
    <div className="container mx-auto pt-4">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">상품 ID</th>
              <th className="border border-gray-300 px-4 py-2">상품 코드</th>
              <th className="border border-gray-300 px-4 py-2">상품명</th>
              <th className="border border-gray-300 px-4 py-2">가격</th>
              <th className="border border-gray-300 px-4 py-2">카테고리</th>
              <th className="border border-gray-300 px-4 py-2">상품사진</th>
              <th className="border border-gray-300 px-4 py-2">출고예정</th>
              <th className="border border-gray-300 px-4 py-2">배송방법</th>
              <th className="border border-gray-300 px-4 py-2">배송비</th>
              <th className="border border-gray-300 px-4 py-2">수정</th>
            </tr>
          </thead>
          <tbody>
            {products.map((v) => (
              <tr key={v.productId} className="text-center">
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
                      className="mx-auto"
                      width={100}
                    />
                  ) : (
                    <span>없음</span>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {v.productExpectedShippingDate
                    ? typeof v.productExpectedShippingDate.toDate === "function"
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
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={() => moveEdit(v.productId)}
                  >
                    수정
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductList;
