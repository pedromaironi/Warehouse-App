// src/features/pos/components/CheckoutPayModal.tsx

import React, { useState } from "react";
import { PaymentInfo } from "../types/checkout";

/**
 * Props for CheckoutPayModal
 * @param total - Total amount to charge
 * @param method - Selected payment method ("cash" | "credit" | "transfer" | "mixed")
 * @param onPay - Callback when payment is completed (receives payment info object)
 * @param onBack - Callback for going back to previous step
 * @param onCancel - Callback to cancel/close the modal
 */
interface CheckoutPayModalProps {
  total: number;
  method: string;
  onPay: (info: PaymentInfo) => void;
  onBack: () => void;
  onCancel: () => void;
}

/**
 * Second step modal in the checkout process.
 * Shows a form for the chosen payment method, validates, and calls onPay.
 */
const CheckoutPayModal: React.FC<CheckoutPayModalProps> = ({
  total,
  method,
  onPay,
  onBack,
  onCancel,
}) => {
  const [amount, setAmount] = useState(total);
  const [seller, setSeller] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (method === "cash" && (isNaN(amount) || amount < total)) {
      setError("El importe debe ser igual o mayor al total.");
      return;
    }
    setError("");
    onPay({ method, amount, seller, note });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 flex flex-col gap-5">
        <h2 className="font-bold text-xl">Pagar factura</h2>
        <div className="text-center mb-2">
          <div className="text-xs text-gray-400 font-semibold uppercase">
            TOTAL
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">
            RD${total.toFixed(2)}
          </div>
        </div>
        {method === "cash" && (
          <>
            <label className="text-gray-700 mb-1">
              Importe del pago en efectivo*
            </label>
            <input
              type="number"
              className="border rounded px-3 py-2 mb-2 w-full"
              placeholder="Ingrese el monto"
              value={amount}
              min={0}
              onChange={(e) => setAmount(Number(e.target.value))}
              autoFocus
            />
            <div className="flex gap-3 mb-2">
              {[total, total + 20, total + 40].map((val) => (
                <button
                  key={val}
                  type="button"
                  className="border rounded px-4 py-2 bg-gray-50 cursor-pointer hover:bg-emerald-100 transition"
                  onClick={() => setAmount(val)}
                >
                  RD${val.toFixed(2)}
                </button>
              ))}
            </div>
          </>
        )}
        {/* Here you could add more fields for other methods */}
        <div className="flex gap-3 mb-2">
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">Vendedor</label>
            <select
              className="w-full border rounded px-2 py-2 bg-white"
              value={seller}
              onChange={(e) => setSeller(e.target.value)}
            >
              <option value="">Seleccionar...</option>
              <option value="Juan">Juan</option>
              <option value="Ana">Ana</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">Notes</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-2"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Agregar una nota"
            />
          </div>
        </div>
        {error && <div className="text-xs text-red-500 mb-2">{error}</div>}
        <div className="flex gap-3">
          <button
            className="border rounded px-4 py-2 flex-1 cursor-pointer hover:bg-gray-100"
            onClick={onBack}
          >
            Atras
          </button>
          <button
            className="bg-emerald-600 text-white rounded px-4 py-2 flex-1 cursor-pointer hover:bg-emerald-700"
            onClick={handleContinue}
          >
            Continuar
          </button>
        </div>
        <div className="flex justify-center w-full">
          <button
            className="mt-1 text-gray-500 text-sm cursor-pointer hover:underline w-fit"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPayModal;
