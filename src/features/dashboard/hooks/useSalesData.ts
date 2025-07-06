// src/features/dashboard/hooks/useSalesData.ts
export interface SaleEntry {
  date: string;
  total: number;
}

export const useSalesData = (): SaleEntry[] => {
  // Datos mockeados, luego los puedes reemplazar por API call
  return [
    { date: "1 jul", total: 0 },
    { date: "2 jul", total: 0 },
    { date: "3 jul", total: 0 },
    { date: "4 jul", total: 0 },
    { date: "5 jul", total: 0 },
  ];
};
