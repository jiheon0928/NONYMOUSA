"use client";
import Product from "@/app/shop/components/mainComponent/Product";
import { useProductStore } from "@/components/zustand/state";
import { useEffect } from "react";

const Shop = () => {
  const { data, fetchData, loading } = useProductStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div className="text-center py-20">상품을 불러오는 중…</div>;
  }

  // 원본 data를 건드리지 않도록 복사 → 정렬
  const dataArr = [...data].sort((a, b) => b.productId - a.productId);

  return (
    <section className="mt-60 pb-[5vw] px-3">
      <article className="productWrap">
        {dataArr.map((v) => (
          <Product key={v.productId} {...v} />
        ))}
      </article>
    </section>
  );
};

export default Shop;
