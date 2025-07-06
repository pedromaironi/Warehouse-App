// src/features/dashboard/hooks/useTransactionsData.ts
export interface TransactionEntry {
  date: string;
  ingresos: number;
  egresos: number;
}

export const useTransactionsData = (): TransactionEntry[] => {
  return [
    { date: "1 jul", ingresos: 0, egresos: 0 },
    { date: "2 jul", ingresos: 0, egresos: 0 },
    { date: "3 jul", ingresos: 0, egresos: 0 },
  ];
};
