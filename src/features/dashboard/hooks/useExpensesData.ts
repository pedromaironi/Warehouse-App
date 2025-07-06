export interface ExpenseItem {
  label: string;
  value: number;
  color: string;
}

export const useExpensesData = (): ExpenseItem[] => {
  // Simulación inicial, luego puedes hacer fetch a una API aquí
  return [
    { label: "Gastos de venta", value: 0, color: "red" },
    { label: "Gastos de personal de ventas", value: 0, color: "blue" },
    { label: "Sueldos y salarios personal de ventas", value: 0, color: "indigo" },
    { label: "Salario de navidad personal de ventas", value: 0, color: "green" },
    { label: "Horas extras personal de ventas", value: 0, color: "yellow" },
  ];
};
