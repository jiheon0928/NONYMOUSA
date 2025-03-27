"use client";
import { create } from "zustand";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  removeData: () => void;
};

type CartState = {
  cartItems: CartItem[];
  selectedItems: CartItem[];
  isAllChecked: boolean;
  isDialogOpen: boolean;
  selectedItemId: string | null;
  totalPrice: number;
  setCartItems: (items: CartItem[]) => void;
  toggleAllCheckbox: (isChecked: boolean) => void;
  toggleItemCheckbox: (item: CartItem, isChecked: boolean) => void;
  openDialog: (itemId: string) => void;
  closeDialog: () => void;
  changeQuantity: (itemId: string, newQuantity: number) => void;
  removeItem: (itemId: string) => void; // removeItem 함수 추가
};

const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  selectedItems: [],
  isAllChecked: true,
  isDialogOpen: false,
  selectedItemId: null,
  totalPrice: 0,

  setCartItems: (items) =>
    set(() => {
      const itemsWithRemove = items.map((item) => ({
        ...item,
        removeData: () => {
          set((state) => ({
            cartItems: state.cartItems.filter(
              (cartItem) => cartItem.id !== item.id
            ),
            selectedItems: state.selectedItems.filter(
              (selectedItem) => selectedItem.id !== item.id
            ),
          }));
        },
      }));
      return {
        cartItems: itemsWithRemove,
        selectedItems: itemsWithRemove,
      };
    }),

  toggleAllCheckbox: (isChecked) =>
    set(() => ({
      isAllChecked: isChecked,
      selectedItems: isChecked ? get().cartItems : [],
    })),

  toggleItemCheckbox: (item, isChecked) =>
    set((state) => ({
      selectedItems: isChecked
        ? [...state.selectedItems, item]
        : state.selectedItems.filter(
            (selectedItem) => selectedItem.id !== item.id
          ),
    })),

  openDialog: (itemId) =>
    set(() => ({
      isDialogOpen: true,
      selectedItemId: itemId,
    })),

  closeDialog: () =>
    set(() => ({
      isDialogOpen: false,
      selectedItemId: null,
    })),

  changeQuantity: (itemId, newQuantity) =>
    set((state) => ({
      selectedItems: state.selectedItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ),
    })),

  removeItem: (itemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
      selectedItems: state.selectedItems.filter((item) => item.id !== itemId),
    })),
}));

export default useCartStore;
