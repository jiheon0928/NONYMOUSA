// src/components/zustand/cartData.ts

import { getDocs, collection } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";
import { Item } from "@/app/cart/typeprops.tsx/TypeProps";
import { create } from "zustand";

interface CartState {
  cartItems: Item[];
  selectedItems: Item[];
  isAllChecked: boolean;
  isDialogOpen: boolean;
  selectedItemId: string | null;

  fetchItems: () => Promise<void>;
  toggleAllCheckbox: () => void;
  toggleItemCheckbox: (item: Item, checked: boolean) => void;
  openDialog: (itemId: string) => void;
  closeDialog: () => void;
  changeQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
}

const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  selectedItems: [],
  isAllChecked: false,
  isDialogOpen: false,
  selectedItemId: null,

  // 1) 파이어베이스에서 쇼핑카트 아이템 불러오기
  fetchItems: async () => {
    try {
      const qs = await getDocs(collection(firestore, "shoppingCart"));
      const items = qs.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Item, "id">),
      }));
      set({ cartItems: items });
    } catch (error) {
      console.error("fetchItems 실패:", error);
    }
  },

  // 이하 기존 액션들…
  toggleAllCheckbox: () => {
    const { cartItems, isAllChecked } = get();
    set({
      isAllChecked: !isAllChecked,
      selectedItems: !isAllChecked ? [...cartItems] : [],
    });
  },

  toggleItemCheckbox: (item, checked) => {
    const { selectedItems } = get();
    set({
      selectedItems: checked
        ? [...selectedItems, item]
        : selectedItems.filter((i) => i.id !== item.id),
    });
  },

  openDialog: (itemId) => set({ isDialogOpen: true, selectedItemId: itemId }),
  closeDialog: () => set({ isDialogOpen: false, selectedItemId: null }),

  changeQuantity: (itemId, quantity) => {
    const items = get().cartItems.map((i) =>
      i.id === itemId ? { ...i, quantity } : i
    );
    set({ cartItems: items });
  },

  removeItem: (itemId) => {
    set({
      cartItems: get().cartItems.filter((i) => i.id !== itemId),
      selectedItems: get().selectedItems.filter((i) => i.id !== itemId),
    });
  },
}));

export default useCartStore;
