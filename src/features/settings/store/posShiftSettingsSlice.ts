import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { POSShiftSettings } from "../types/posShiftSettings";

const initialState: POSShiftSettings = {
  enabled: false,
  incomeAccount: "",
  expenseAccount: "",
};

// Slice
const posShiftSettingsSlice = createSlice({
  name: "posShiftSettings",
  initialState,
  reducers: {
    setEnabled(state, action: PayloadAction<boolean>) {
      state.enabled = action.payload;
    },
    setIncomeAccount(state, action: PayloadAction<string>) {
      state.incomeAccount = action.payload;
    },
    setExpenseAccount(state, action: PayloadAction<string>) {
      state.expenseAccount = action.payload;
    },
    setAllSettings(state, action: PayloadAction<POSShiftSettings>) {
      state.enabled = action.payload.enabled;
      state.incomeAccount = action.payload.incomeAccount;
      state.expenseAccount = action.payload.expenseAccount;
    },
    resetSettings(state) {
      state.enabled = false;
      state.incomeAccount = "";
      state.expenseAccount = "";
    },
  },
});

export const {
  setEnabled,
  setIncomeAccount,
  setExpenseAccount,
  setAllSettings,
  resetSettings,
} = posShiftSettingsSlice.actions;

export default posShiftSettingsSlice.reducer;
