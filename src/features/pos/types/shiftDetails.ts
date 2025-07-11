// src/features/pos/types/shiftDetail.ts
export interface ShiftDetail {
  id: string;
  openedAt: string;
  closedAt?: string;
  userName: string;
  openingCash: number;
  salesCash: number;
  salesDebit: number;
  salesCredit: number;
  salesTransfer: number;
  refunds: number;
  cashIn: number;
  cashOut: number;
  totalSales: number;
  expectedCash: number;
}
