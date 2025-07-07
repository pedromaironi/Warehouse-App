// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/products/product.slice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    // otros reducers...
  },
});

// Tipos para hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
