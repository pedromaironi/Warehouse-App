// src/features/pos/data/mockShiftDetails.ts

import { ShiftDetail } from "../types/shiftDetails";

export const MOCK_SHIFT_DETAILS: ShiftDetail[] = [
  {
    id: "1",
    openedAt: "2025-07-08T09:04:00",
    userName: "Carlos Gómez",
    openingCash: 0,
    salesCash: 200,
    salesDebit: 0,
    salesCredit: 0,
    salesTransfer: 0,
    refunds: 0,
    cashIn: 0,
    cashOut: 0,
    totalSales: 200,
    expectedCash: 200,
  },
];
