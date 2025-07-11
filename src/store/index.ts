import { configureStore } from "@reduxjs/toolkit";
import posSlice from "../features/pos/store/pos.slice";
import productSlice from "../features/products/store/product.slice";
import posShiftSettingsSlice from "../features/settings/store/posShiftSettingsSlice";

export const store = configureStore({
  reducer: {
    pos: posSlice,
    products: productSlice,
    posShiftSettings: posShiftSettingsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
