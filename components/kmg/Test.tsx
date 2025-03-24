"use client";
import { useEffect } from "react";
import { useProductStore } from "../zustand/state";
import ImgSlide from "./ImgSlide/ImgSlide";

const Test = () => {
  const { fetchData, data, loading } = useProductStore();

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (data.length === 0) {
    return <div>불러올 데이터가 없습니다.</div>;
  }

  return (
    <div className="flex justify-between">
      <ImgSlide key="detailImgSlide" imgData={data[0].productImage} />
      <div></div>
    </div>
  );
};

export default Test;
