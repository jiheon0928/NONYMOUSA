"use client";
import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { ProductData } from "@/app/types/admintype";

export type productData = {
  productCategory: string;
  productDeliveryPrice: number;
  productHexCodes: string[];
  productNotice: string[];
  productInfo: string[];
  productManufacturer: string;
  productDetails: string;
  productId: number;
  productSize: any[];
  productDeliveryMethod: string;
  productCode: string;
  productPrice: number;
  productOrigin: string;
  productImage: string[];
  productSizeInfo: string;
  productName: string;
  productExpectedShippingDate: ProductExpectedShippingDate;
  productMaterials: string;
};

type ProductExpectedShippingDate = {
  seconds: number;
  nanoseconds: number;
};

type ProductStore = {
  data: productData[];
  loading: boolean;
  fetchData: () => Promise<void>;
};

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
