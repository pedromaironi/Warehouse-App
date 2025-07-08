/**
 * Represents the result of a payment in the checkout process.
 */
// method: "cash" | "credit" | "transfer" | "mixed";

export interface PaymentInfo {
  method: string;
  amount: number;
  seller?: string;
  note?: string;
  // Add other fields as needed, e.g., transactionId, paymentDetails, etc.
}

export interface CheckoutSuccessModalProps {
  total: number;
  paymentInfo: PaymentInfo;
  onPrint: () => void;
  onNewSale: () => void;
  onClose: () => void;
}
