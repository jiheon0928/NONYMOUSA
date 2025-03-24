"use client";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineMinus } from "react-icons/hi";
import { LuPlus } from "react-icons/lu";
import ChangeHandle from "./ChangeHandle";
import TextHandle from "./TextHandle";

type UpDownHandleProps = {
  allPrice: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  downHandle: () => void;
  upHandle: () => void;
  cancleHandle: () => void;
  confirmHandle: () => void;
};
const UpDownHandle = ({
  allPrice,
  image,
  name,
  price,
  quantity,
  downHandle,
  upHandle,
  cancleHandle,
  confirmHandle,
}: UpDownHandleProps) => {
  const [isOpen, SetIsOpen] = useState(false);

  return (
    <div>
      <button
        className="border-2 text-xs px-3 py-1"
        onClick={() => SetIsOpen(true)}>
        옵션/수량 변경
      </button>

      {isOpen && (
        <dialog
          open
          className="fixed w-lvw h-lvh z-[9999] top-0 bg-black bg-opacity-30 flex justify-center items-center ">
          <div className="w-1/4 h-2/5 bg-white rounded-md relative">
            <TextHandle
              text={"옵션 변경"}
              className="border-b text-center py-3"
            />
            <div className="flex p-4 text-xs  gap-5">
              <Image src={image} alt="" width={60} height={60} />
              <div className="flex flex-col pr-20">
                <TextHandle text={name} className="" />
                <TextHandle text={price} className="" />
              </div>
            </div>
            <TextHandle text="수량" className="text-xs px-6 pt-6 mb-3" />
            <div className="flex px-6 mb-12">
              <ChangeHandle
                text={<HiOutlineMinus />}
                className="p-1 border border-gray-300 text-gray-400 "
                clickFunc={downHandle}
              />
              <TextHandle
                text={quantity}
                className="border border-gray-300 px-4 py-2 flex items-center text-[10px]"
              />
              <ChangeHandle
                text={<LuPlus />}
                className="border p-1 border-gray-300 text-gray-400"
                clickFunc={upHandle}
              />
            </div>
            <div className="flex justify-between px-4 mb-6">
              <TextHandle text={`총수량${quantity}개`} className="text-xs" />
              <TextHandle text={`￦${allPrice}`} className="" />
            </div>
            <div className="flex justify-center gap-1">
              <ChangeHandle
                text={"취소"}
                className="border border-black px-6 py-3 text-xs"
                clickFunc={cancleHandle}
              />
              <ChangeHandle
                text={"변경"}
                className="bg-black text-white px-6 py-3 text-xs"
                clickFunc={() => confirmHandle}
              />
            </div>
            <button
              className="absolute top-2 right-5 text-4xl"
              onClick={() => SetIsOpen(false)}>
              ×
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default UpDownHandle;
