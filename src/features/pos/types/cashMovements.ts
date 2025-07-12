/**
 * CashMovement
 * Represents a cash transaction (income or withdrawal).
 */
export interface CashMovement {
  id: string;
  type: "withdrawal" | "income";
  amount: number;
  account: string;
  client?: string;
  observations?: string;
  createdAt: string; // ISO date string
}
