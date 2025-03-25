import { create } from "zustand";
import { CartItem, CartState } from "../kmg/types";
import { collection, getDocs } from "firebase/firestore";
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

  addToCart: (item) =>
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
    }),

  updateQuantity: (id, newQuantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ),
    })),
}));
