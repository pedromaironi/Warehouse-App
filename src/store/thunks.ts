// src/store/features/products/thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductFormState } from "../features/products/types/productFormTypes";

// fetchProducts
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    // const response = await fetch("/api/products");
    // return await response.json();
    return []; // Simulación
  }
);
