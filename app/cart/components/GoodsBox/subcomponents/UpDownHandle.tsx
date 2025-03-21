"use client";
import { useState } from "react";
import ImageHandle from "./ImageHandle";
import TextHandle from "./TextHandle";
import ChangeHandle from "./ChangeHandle";

type UpDownHandleProps = {
  image: string;
  name: string;
  quantity: string;
  text: string;
  clickFunc: () => void;
};
const UpDownHandle = ({
  image,
  name,
  quantity,
  text,
  clickFunc,
}: UpDownHandleProps) => {
  const [isOpen, SetIsOpen] = useState(false);

  const openDialog = () => {
    SetIsOpen(true); // 대화 상자 열기
  };

  const closeDialog = () => {
    SetIsOpen(false);
  };

  return (
    <div>
      <button onClick={openDialog}>옵션/수량 변경</button>

      {isOpen && (
        <dialog open>
          <table>
            <tr className="">옵션 변경</tr>

            <tr>
              <ImageHandle image={image} />
              <TextHandle text={name} className="" />
            </tr>

            <tr>
              <td>수량</td>
              <td className="flex">
                <ChangeHandle text={"▲"} clickFunc={clickFunc} className="" />
                <TextHandle text={quantity} className="" />
                <ChangeHandle text={"▼"} clickFunc={clickFunc} className="" />
              </td>
            </tr>
            <tr className="flex">
              <TextHandle text={`총수량 ${quantity}개`} className="" />
              <TextHandle text={text} className="" />
            </tr>

            <tr className="flex">
              <ChangeHandle text={text} clickFunc={clickFunc} className="" />
              <ChangeHandle text={text} clickFunc={clickFunc} className="" />
            </tr>
          </table>
          <button onClick={closeDialog}>×</button>
        </dialog>
      )}
    </div>
  );
};

export default UpDownHandle;
