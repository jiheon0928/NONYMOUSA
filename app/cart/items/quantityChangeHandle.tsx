import { firestore } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

export const useQuantityChange = (initialQuantity: number) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [tempQuantity, setTempQuantity] = useState(initialQuantity);

  const increaseQuantity = () => {
    setTempQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (tempQuantity > 1) {
      setTempQuantity((prev) => prev - 1);
    }
  };

  const confirmQuantityChange = async (itemId: string) => {
    try {
      const itemRef = doc(firestore, "shoppingCart", itemId);
      await updateDoc(itemRef, { quantity: tempQuantity });
      setQuantity(tempQuantity);
      window.location.reload();
    } catch (error) {
      console.error("수량 변경 실패:", error);
    }
  };

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
