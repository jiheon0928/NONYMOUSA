"use client";
import { useState, useEffect } from "react";
import ButtonWrap from "./subComponent/ButtonWrap";
type DetailButtonProps = {
  id: string;
};
const DetailButton = ({ id }: DetailButtonProps) => {
  const [isWish, setIsWish] = useState(false);

  const wishClickHandler = () => {
    setIsWish((prev) => !prev);
  };
  console.log(isWish);

  useEffect(() => {
    localStorage.setItem("isWish", JSON.stringify(isWish));
    localStorage.setItem("id", id);
  }, [isWish, id]);
  return (
    <>
      <ButtonWrap state={isWish} handler={wishClickHandler} />
      <p>{id}</p>
    </>
  );
};
export default DetailButton;
