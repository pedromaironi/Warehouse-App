import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string[];
  quantity: number;
  stock: number;
  isFavorite?: boolean;
}

interface POSState {
  cart: CartItem[];
}

const initialState: POSState = {
  cart: [],
};

const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const existing = state.cart.find(item => item.id === action.payload.id);
      if (existing) {
        if (existing.quantity < existing.stock) existing.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    updateQty(state, action: PayloadAction<{ id: string; qty: number }>) {
      const item = state.cart.find(i => i.id === action.payload.id);
      if (item) item.quantity = Math.max(1, Math.min(action.payload.qty, item.stock));
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } = posSlice.actions;
export default posSlice.reducer;
