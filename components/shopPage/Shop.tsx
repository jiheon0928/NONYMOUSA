"use client";
import Product from "@/app/shop/components/mainComponent/Product";
import { useProductStore } from "@/components/zustand/state";
import { useEffect } from "react";

const Shop = () => {
  const { data, fetchData, loading } = useProductStore();
  useEffect(() => {
    fetchData();
  }, []);
  const dataArr = data.sort((a, b) => b.productId - a.productId);

  return (
    <div>
      <section className="mt-60 pb-[5vw] px-3">
        <article className="productWrap">
          {dataArr.map((v) => (
            <Product key={v.productId} {...v} productId={v.productId} />
          ))}
        </article>
      </section>
    </div>
  );
};

export default Shop;
