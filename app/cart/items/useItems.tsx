"use client";

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Item {
  id: string;
  quantity: string;
  image: string;
  name: string;
  price: string;
}

const useItems = () => {
  const [itemArr, setItemArr] = useState<Item[]>([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "shoppingCart"));
    const items: Item[] = [];
    querySnapshot.forEach((doc) => {
      items.push({ ...doc.data(), id: doc.id } as Item);
    });
    setItemArr(items);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return itemArr;
};

export default useItems;
