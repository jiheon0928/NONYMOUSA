"use client";

import { firestore } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Item } from "../typeprops.tsx/TypeProps";

const useItems = () => {
  const [itemArr, setItemArr] = useState<Item[]>([]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "shoppingCart")
      );
      const items: Item[] = querySnapshot.docs
        .map((doc) => {
          const data = doc.data();

          if (
            typeof data.name === "string" &&
            typeof data.image === "string" &&
            typeof data.price === "number" &&
            typeof data.quantity === "number"
          ) {
            return { ...data, id: doc.id } as Item;
          } else {
            console.warn("유효하지 않은 데이터:", data);
            return null;
          }
        })
        .filter((item): item is Item => item !== null);

      setItemArr(items);
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return itemArr;
};

export default useItems;
