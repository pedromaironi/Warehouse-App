// src/features/pos/data/mockShiftReport.ts
export const MOCK_SHIFT_REPORT = {
  from: "2025-07-02",
  to: "2025-07-11",
  incomes: 200,
  expenses: 0,
  difference: 200,
  barData: [
    { name: "Cierre 1", Ingresos: 200, Gastos: 0 }
  ],
  paymentTypes: [
    { name: "Efectivo", value: 200 },
    { name: "Débito", value: 0 },
    { name: "Crédito", value: 0 },
    { name: "Transferencia", value: 0 }
  ]
};
