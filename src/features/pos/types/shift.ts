// src/features/pos/types/shift.ts

/** Cash register shift status */
export type ShiftStatus = "open" | "closed";

/** Cash movement for the shift (income, withdrawal, correction, etc.) */
export interface ShiftMovement {
  id: string;
  type: "income" | "withdrawal" | "correction";
  amount: number;
  date: string;
  description?: string;
  account?: string; // e.g., cash, bank, POS, etc.
}

/** Main Shift structure */
export interface Shift {
  id: string;
  status: ShiftStatus;
  openedAt: string; // ISO string
  closedAt?: string; // ISO string or undefined if still open
  userId: string;
  userName: string;
  openingCash: number; // Base cash at open
  closingCash?: number; // Real cash at close (if closed)
  expectedCash?: number; // System-calculated expected cash at close
  notes?: string;
  movements: ShiftMovement[];
}

/** Used to open a new shift */
export interface ShiftOpenForm {
  openingCash: number;
  baseAccount: string;
  notes?: string;
}

/** Used to close an open shift */
export interface ShiftCloseForm {
  closingCash: number;
  notes?: string;
}

/** Filtering and searching shifts */
export interface ShiftFilters {
  status?: ShiftStatus | ""; // "open", "closed", or empty for all
  userId?: string;
  dateFrom?: string; // e.g., "2025-07-10"
  dateTo?: string;
  search?: string; // Free text: cashier name, id, notes...
}

interface ShiftState {
  shifts: Shift[];
  loading: boolean;
  error?: string;
  filters: ShiftFilters;
  openForm?: ShiftOpenForm;
  closeForm?: ShiftCloseForm;
}
