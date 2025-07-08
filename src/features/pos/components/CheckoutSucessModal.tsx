// src/features/pos/components/CheckoutSuccessModal.tsx

import React from "react";
import { PaymentInfo } from "../types/checkout";

/**
 * Props for CheckoutSuccessModal
 * @param total - Total amount of the sale
 * @param paymentInfo - Object with info about the payment performed
 * @param onPrint - Callback for "Print" button
 * @param onNewSale - Callback for "New Sale" (resets cart, closes modal)
 * @param onClose - Callback to simply close the modal
 */
interface CheckoutSuccessModalProps {
  total: number;
  paymentInfo: PaymentInfo;
  onPrint: () => void;
  onNewSale: () => void;
  onClose: () => void;
}

/**
 * Final modal of the checkout flow.
 * Shows a success state, change (if any), and lets user print or start a new sale.
 */
const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({
  total,
  paymentInfo,
  onPrint,
  onNewSale,
  onClose,
}) => {
  // Calculate change if cash
  const change =
    paymentInfo?.amount && paymentInfo?.amount > total
      ? paymentInfo.amount - total
      : 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 flex flex-col gap-4 items-center">
        <div className="text-4xl mb-2">🎉</div>
        <h2 className="font-bold text-xl mb-2 text-center">
          Guardando venta...
        </h2>
        <div className="mb-1 text-center text-gray-700">
          Puede imprimir o iniciar una nueva venta mientras guarda la factura.
        </div>
        <div className="flex flex-col items-center w-full mb-2">
          <div className="text-lg font-bold mb-1">
            Total RD${total.toFixed(2)}
          </div>
          <div className="text-sm text-gray-600 mb-1">
            Cambio / Devuelta{" "}
            <span className="font-bold text-rose-500">
              RD${change.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex justify-center gap-2 w-full mb-2">
          <button
            className="border rounded px-4 py-2 flex-1 hover:bg-gray-100 cursor-pointer"
            onClick={onPrint}
          >
            Imprimir
          </button>
          <button
            className="bg-emerald-600 text-white rounded px-4 py-2 hover:bg-emerald-700 flex-1 cursor-pointer"
            onClick={onNewSale}
          >
            Nueva venta
          </button>
        </div>
        <button
          className="text-gray-500 underline text-sm cursor-pointer"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccessModal;
