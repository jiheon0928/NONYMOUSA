// useQuantityChange.ts
import { useState } from "react";
import { firestore } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const useQuantityChange = (initialQuantity: number) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [tempQuantity, setTempQuantity] = useState(initialQuantity);

  // 수량 증가
  const increaseQuantity = () => {
    setTempQuantity((prev) => prev + 1);
  };

  // 수량 감소
  const decreaseQuantity = () => {
    if (tempQuantity > 1) {
      setTempQuantity((prev) => prev - 1);
    }
  };

  // 변경 확인 (Firebase 업데이트)
  const confirmQuantityChange = async (itemId: string) => {
    try {
      const itemRef = doc(firestore, "shoppingCart", itemId);
      await updateDoc(itemRef, { quantity: tempQuantity });
      setQuantity(tempQuantity);
    } catch (error) {
      console.error("수량 변경 실패:", error);
    }
  };

  // 변경 취소 (원래 값으로 복원)
  const cancelQuantityChange = () => {
    setTempQuantity(quantity);
  };

  return {
    quantity,
    tempQuantity,
    increaseQuantity,
    decreaseQuantity,
    confirmQuantityChange,
    cancelQuantityChange,
  };
};
