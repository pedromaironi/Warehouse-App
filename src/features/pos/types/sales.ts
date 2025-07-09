import { ProductSale } from "../../products/types/product";

export interface Sale {
  id: string;
  invoiceNumber: string;
  customer: string;
  total: number;
  date: string; // ISO string
  paymentType: string;
  products: ProductSale[];
  status: string; //"pagada" | "anulada"
  paymentSummary: PaymentSummary;
  shop: string;
  client: string;
}

export interface PaymentSummary {
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  received: number;
  change: number;
}
