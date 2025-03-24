"use client";
import { create } from "zustand";

import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

interface Data {
  id: string;
  [key: string]: any;
}

interface ProductStore {
  data: Data[];
  loading: boolean;
  fetchData: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  data: [],
  loading: true,
  fetchData: async () => {
    const querySnapshot = await getDocs(collection(firestore, "products"));
    const docs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Data[];
    set({ data: docs, loading: false });
  },
}));
