import { CashMovement } from "../types/cashMovements";

/**
 * MOCK_CASH_MOVEMENTS
 * Example of mock cash movement records.
 */
export const MOCK_CASH_MOVEMENTS: CashMovement[] = [
  // Example data, can be empty initially
  {
    id: "1",
    type: "income",
    amount: 500,
    account: "Caja general",
    client: "Consumidor final",
    observations: "Apertura de caja",
    createdAt: "2025-07-11T09:00:00",
  },
];
