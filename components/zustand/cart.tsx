"use client";
import { create } from "zustand";
import { CartItem, CartState } from "../kmg/types";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  loading: true,

  fetchData: async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "shoppingCart")
      );
      const docs: CartItem[] = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: Number(doc.id),
          name: data.name,
          price: data.price,
          quantity: data.quantity,
          image: data.image,
        };
      });
      set({ cartItems: docs, loading: false });
    } catch (error) {
      console.error("🔥 fetchData error:", error);
      set({ cartItems: [], loading: false });
    }
  },

  addToCart: async (item) => {
    set((state) => {
      const existing = state.cartItems.find((i) => i.id === item.id);
      if (existing) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, item],
      };
    });

    try {
      await setDoc(doc(firestore, "shoppingCart", item.id.toString()), item, {
        merge: true,
      });
      console.log("Firebase 저장 완료");
    } catch (error) {
      console.error("Firebase 저장 실패:", error);
    }
  },

  updateQuantity: async (id, newQuantity) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ),
    }));

    try {
      await setDoc(
        doc(firestore, "shoppingCart", id.toString()),
        { quantity: newQuantity },
        { merge: true }
      );
      console.log("수량 변경 Firebase 반영 완료");
    } catch (error) {
      console.error("Firebase 수량 변경 실패:", error);
    }
  },
}));
