"use client";
import { useState } from "react";
import ImageHandle from "./ImageHandle";
import TextHandle from "./TextHandle";
import ChangeHandle from "./ChangeHandle";

type UpDownHandleProps = {
  image: string;
  name: string;
  quantity: string;
  clickFunc: () => void;
};
const UpDownHandle = ({
  image,
  name,
  quantity,
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
              <td>
                <ImageHandle image={image} />
              </td>
              <td>
                <TextHandle text={name} className="" />
              </td>
            </tr>
            <tr>
              <td>수량</td>
              <td className="flex">
                <ChangeHandle text={"▲"} clickFunc={clickFunc} className="" />
                <TextHandle text={quantity} className="" />
                <ChangeHandle text={"▼"} clickFunc={clickFunc} className="" />
              </td>
            </tr>
            <tr></tr>
            <tr></tr>
          </table>
          <button onClick={closeDialog}>×</button>
        </dialog>
      )}
    </div>
  );
};

export default UpDownHandle;
