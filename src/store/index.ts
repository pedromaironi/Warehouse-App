import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/products/product.slice";
import posSlice from "./features/pos/pos.slice";

export const store = configureStore({
  reducer: {
    pos: posSlice,
    products: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
