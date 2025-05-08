"use client";
import { firestore } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Item } from "../typeprops.tsx/TypeProps";

const useItems = () => {
  const [itemArr, setItemArr] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const qs = await getDocs(collection(firestore, "shoppingCart"));
        console.log("쇼핑카트 문서 개수:", qs.size);
        const items = qs.docs
          .map((doc) => {
            const data = doc.data();
            console.log(doc.id, data);
            if (
              typeof data.name === "string" &&
              typeof data.image === "string" &&
              typeof data.price === "number" &&
              typeof data.quantity === "number"
            ) {
              return { ...data, id: doc.id } as Item;
            } else {
              console.warn("유효하지 않은 문서:", doc.id, data);
              return null;
            }
          })
          .filter((it): it is Item => it !== null);

        setItemArr(items);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchData();
  }, []);

  return itemArr;
};

export default useItems;
