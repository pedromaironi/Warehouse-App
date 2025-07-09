export interface Sale {
  id: string;
  invoiceNumber: string;
  customer: string;
  total: number;
  date: string; // ISO string
  paymentType: string;
  status: string; //"pagada" | "anulada"
}
