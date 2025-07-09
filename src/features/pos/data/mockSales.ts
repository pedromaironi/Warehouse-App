// src/features/pos/data/mockSales.ts

import { Sale } from "../types/sales";

export const MOCK_SALES: Sale[] = [
  {
    id: "1",
    invoiceNumber: "B0100000002",
    customer: "Consumidor final",
    total: 100,
    date: "2025-07-08T23:42:00", // YYYY-MM-DDTHH:mm:ss
    paymentType: "Efectivo",
    status: "pagada",
  },
  {
    id: "2",
    invoiceNumber: "B0100000001",
    customer: "Pedro",
    total: 250.25,
    date: "2025-07-08T13:25:00",
    paymentType: "Tarjeta",
    status: "pagada",
  },
  // ...agrega más ventas para probar diferentes días, meses y años
];
