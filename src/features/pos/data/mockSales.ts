// src/features/pos/data/mockSales.ts

import { Sale } from "../types/sales";

// Agrega productos, subtotales, etc.
export const MOCK_SALES: Sale[] = [
  {
    id: "A",
    ncf: "xxx",
    invoiceNumber: "B0100000002",
    customer: "Consumidor final",
    total: 420,
    date: "2025-07-08T23:42:00",
    paymentType: "Efectivo",
    status: "pagada",
    shop: "Almacen Juanito",
    client: "Pedro",
    products: [
      {
        id: "1",
        name: "Carolina",
        sku: "CAR-001",
        price: 170,
        qty: 1,
        subtotal: 170,
      },
      {
        id: "2",
        name: "Coca Cola 400 ML",
        sku: "COC-400",
        price: 250,
        qty: 2,
        subtotal: 500,
      },
    ],
    paymentSummary: {
      subtotal: 670,
      tax: 120.6,
      discount: 0,
      total: 790.6,
      received: 800,
      change: 9.4,
    },
  },
  {
    id: "B",
    invoiceNumber: "B0100000001",
    customer: "Pedro",
    total: 872.25,
    ncf: "xxx",
    date: "2025-07-08T13:25:00",
    paymentType: "Tarjeta",
    status: "pagada",
    client: "Pedro",
    shop: "Almacen Juanito",
    products: [
      {
        id: "3",
        name: "Pepsi 2L",
        sku: "PEP-2L",
        price: 400,
        qty: 1,
        subtotal: 400,
      },
    ],
    paymentSummary: {
      subtotal: 400,
      tax: 72,
      discount: 0,
      total: 472,
      received: 472,
      change: 0,
    },
  },
];
