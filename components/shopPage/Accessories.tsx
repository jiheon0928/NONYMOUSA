"use client";
import Product from "@/app/shop/components/mainComponent/Product";
import { useProductStore } from "../zustand/state";
import { useEffect } from "react";

const Accessories = () => {
  const { data, fetchData, loading } = useProductStore();
  useEffect(() => {
    fetchData();
  }, []);

  const accessoriesData = data.filter((v) => {
    return v.productCategory == "accessories";
  });
  const accessoriesDataArr = accessoriesData.sort(
    (a, b) => b.productId - a.productId
  );
  return (
    <>
      <div className="mt-[250px] pb-[5vw] px-4">
        <div className="productWrap">
          {accessoriesDataArr.map((v) => {
            const price = v.productPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            return <Product key={v.productId} {...v} productPrice={price} />;
          })}
        </div>
      </div>
    </>
  );
};
export default Accessories;
