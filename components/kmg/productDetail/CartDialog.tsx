"use client";

import BaseButton from "../BaseButton";
import BaseText from "../BaseText";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { CartDialogProps } from "../types";

const CartDialog = ({ isOpen, onClose }: CartDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // 다이얼로그가 열릴 때 showModal 실행
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    }
  }, [isOpen]);

  // 열려있지 않으면 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="w-[360px] h-[200px] max-w-[90%] rounded-lg p-0 m-auto backdrop:bg-black/40 flex flex-col justify-between"
      onClose={onClose}
    >
      <div className="p-6 text-sm text-center text-deep_Grey flex-1 flex items-center justify-center">
        <BaseText text="선택하신 상품을 장바구니에 담았습니다." />
      </div>
      <div className="flex border-t text-sm text-deep_Grey h-[56px]">
        <BaseButton
          text="계속쇼핑"
          className="w-1/2 border-r py-3"
          clickFunc={onClose}
        />
        <Link href="/cart" className="w-1/2">
          <button
            onClick={onClose}
            className="w-full h-full py-3 text-center hover:bg-gray-100"
          >
            장바구니
          </button>
        </Link>
      </div>
    </dialog>
  );
};

export default CartDialog;
