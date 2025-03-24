"use client";

import { useEffect } from "react";

import Image from "next/image";
import { useProductStore } from "../zustand/state";

const Test = () => {
  const { data, fetchData, loading } = useProductStore();
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>로딩 중...</div>;

  console.log(data);
  return (
    <>
      {data.map((v) => (
        <div key={v.id}>
          {v.productId} {v.productName}
          <Image src={v.productImage[0]} alt="" width={100} height={100} />
        </div>
      ))}
    </>
  );
};

export default Test;
