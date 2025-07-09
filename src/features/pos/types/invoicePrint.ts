export interface InvoicePrintProduct {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface InvoicePrintData {
  business: {
    name: string;
    phone: string;
    address?: string;
    rnc?: string;
  };
  invoiceNumber: string;
  ncf?: string;
  date: string;
  paymentType: string;
  branch: string;
  dueDate?: string;
  customer: string;
  products: InvoicePrintProduct[];
  subtotal: number;
  itbis: number;
  total: number;
  received: number;
  change: number;
  footerNote?: string;
}
