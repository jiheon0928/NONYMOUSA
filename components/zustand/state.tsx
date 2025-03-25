"use client";
import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { productData, ProductStore } from "../kmg/types";

export const useProductStore = create<ProductStore>((set) => ({
  data: [],
  loading: true,
  fetchData: async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "products"));
      const docs: productData[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
        } as productData;
      });
      set({ data: docs, loading: false });
    } catch (error) {
      console.error("🔥 fetchData error:", error);
      set({ data: [], loading: false });
    }
  },
}));
