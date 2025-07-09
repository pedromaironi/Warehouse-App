import { CartItem } from "../components/CartSidebar";
import { PaymentInfo } from "../types/checkout";
import { InvoicePrintData } from "../types/invoicePrint";

/**
 * generatePrintTicket
 * Prepares printable invoice data using the current cart and mock info.
 * Replace mock data with real API response in production.
 *
 * @param cart - Current sale cart (CartItem[])
 * @param paymentMethod - Selected payment method (string)
 * @param paymentInfo - Additional payment info (object)
 * @returns InvoicePrintData - data to render PrintTicketModal
 */
export function generatePrintTicket(
  cart: CartItem[],
  paymentMethod: string,
  paymentInfo: PaymentInfo
): InvoicePrintData {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itbis = subtotal * 0.0;
  const total = subtotal + itbis;

  return {
    business: {
      name: "Almacen Juanito",
      phone: "809-783-9215",
      address: "Av. Principal Mella #85, Navarrete",
      rnc: "none",
    },
    invoiceNumber: "B01-0000001",
    ncf: "B0100000001",
    date: new Date().toLocaleString(),
    paymentType: paymentMethod || "Efectivo",
    branch: "Principal",
    dueDate: "",
    customer: "Consumidor final",
    products: cart.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    })),
    subtotal,
    itbis,
    total,
    received: total,
    change: 0,
    footerNote: "Developed by Pedro Toribio",
    ...paymentInfo,
  };
}
