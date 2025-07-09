// src/features/pos/components/CheckoutMethodModal.tsx

import React from "react";

/**
 * Props for CheckoutMethodModal
 * @param total - Total amount of the invoice
 * @param onSelect - Callback when a payment method is selected (receives method: string)
 * @param onCancel - Callback for cancel action (closes the modal)
 */
export interface CheckoutMethodModalProps {
  total: number;
  onSelect: (method: string) => void;
  onCancel: () => void;
}

/**
 * First step modal in the checkout process.
 * Lets the user select the payment method (Cash, Card, Transfer, Mixed).
 */
const CheckoutMethodModal: React.FC<CheckoutMethodModalProps> = ({
  total,
  onSelect,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 flex flex-col gap-6">
        <h2 className="font-bold text-xl mb-1">Pagar factura</h2>
        <div className="text-center">
          <div className="text-sm text-gray-400 font-semibold uppercase">
            TOTAL
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-6">
            RD${total.toFixed(2)}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <button
            className="flex flex-col items-center justify-center border-2 border-gray-200 rounded-xl p-4 bg-white shadow-md hover:bg-emerald-50 hover:border-emerald-500 transition cursor-pointer"
            onClick={() => onSelect("cash")}
          >
            <span role="img" aria-label="efectivo" className="text-2xl">
              💵
            </span>
            <div className="font-semibold mt-2">Efectivo</div>
          </button>
          <button
            className="flex flex-col items-center justify-center border-2 border-gray-200 rounded-xl p-4 bg-white shadow-md hover:bg-emerald-50 hover:border-emerald-500 transition cursor-pointer"
            onClick={() => onSelect("credit")}
          >
            <span role="img" aria-label="tarjeta" className="text-2xl">
              💳
            </span>
            <div className="font-semibold mt-2">Tarjeta de crédito</div>
          </button>
          <button
            className="flex flex-col items-center justify-center border-2 border-gray-200 rounded-xl p-4 bg-white shadow-md hover:bg-emerald-50 hover:border-emerald-500 transition cursor-pointer"
            onClick={() => onSelect("transfer")}
          >
            <span role="img" aria-label="transfer" className="text-2xl">
              🏦
            </span>
            <div className="font-semibold mt-2">Transferencia</div>
          </button>
          <button
            className="flex flex-col items-center justify-center border-2 border-gray-200 rounded-xl p-4 bg-white shadow-md hover:bg-emerald-50 hover:border-emerald-500 transition cursor-pointer col-span-3"
            onClick={() => onSelect("mixed")}
          >
            <span role="img" aria-label="combinado" className="text-2xl">
              💱
            </span>
            <div className="font-semibold mt-2">Combinado</div>
          </button>
        </div>
        <button
          className="mt-6 border px-4 py-2 rounded text-gray-500 cursor-pointer hover:bg-gray-100"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CheckoutMethodModal;
