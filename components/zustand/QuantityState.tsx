import { create } from "zustand";
import { QuantityState } from "../kmg/types";

export const useQuantityStore = create<QuantityState>((set) => ({
  quantity: 1,
  setQuantity: (val) => set({ quantity: val }),
  increase: () =>
    set((state) => ({ quantity: Math.min(state.quantity + 1, 99) })),
  decrease: () =>
    set((state) => ({ quantity: Math.max(state.quantity - 1, 1) })),
}));
