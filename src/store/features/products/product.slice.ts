// src/store/features/products/productSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductFormState } from "../../../features/products/types/productFormTypes";

interface ProductsState {
  list: ProductFormState[];
  selected: ProductFormState | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  list: [],
  selected: null,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<ProductFormState[]>) {
      state.list = action.payload;
    },
    addProduct(state, action: PayloadAction<ProductFormState>) {
      state.list.push(action.payload);
    },
    updateProduct(state, action: PayloadAction<ProductFormState>) {
      state.list = state.list.map((prod) =>
        prod.reference === action.payload.reference ? action.payload : prod
      );
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.list = state.list.filter((prod) => prod.reference !== action.payload);
    },
    setSelectedProduct(state, action: PayloadAction<ProductFormState | null>) {
      state.selected = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    // Puedes agregar reducers para inventory, priceLists, etc.
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  removeProduct,
  setSelectedProduct,
  setLoading,
  setError,
} = productsSlice.actions;

export default productsSlice.reducer;
