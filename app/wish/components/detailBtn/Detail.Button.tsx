"use client";
import { useState, useEffect } from "react";
import ButtonWrap from "./subComponent/ButtonWrap";
type DetailButtonProps = {
  id: string;
};
const DetailButton = ({ id }: DetailButtonProps) => {
  const [isWish, setIsWish] = useState(false);

  useEffect(() => {
    const storedWish = localStorage.getItem(`isWish_${id}`);
    setIsWish(storedWish === "true");
  },[id])

  const wishClickHandler = () => {
    setIsWish((prev) => {
      const newWishState = !prev;
      localStorage.setItem(`isWish_${id}`, JSON.stringify(newWishState)); // 상태 변경 시 저장
      return newWishState;
    });
  };
  return (
    <>
      <ButtonWrap state={isWish} handler={wishClickHandler} />
    </>
  );
};
export default DetailButton;
