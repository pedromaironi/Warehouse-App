/**
 * CashMovementForm
 * Modal form to create or edit a cash movement (income or withdrawal).
 * Field validation and feedback included. All documentation in English.
 * UI labels/messages in Spanish (for Dominican Republic business users).
 */
import { useEffect, useRef, useState } from "react";
import { CashMovement } from "../types/cashMovements";

interface CashMovementFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (movement: CashMovement) => void;
  initialData?: CashMovement | null;
}

const ACCOUNT_OPTIONS = [
  "Caja general",
  "Caja chica",
  "Efectivo POS",
  "Banco Popular",
];
const CLIENT_OPTIONS = ["Consumidor final", "Juan Pérez", "Cliente demo"];

export default function CashMovementForm({
  open,
  onClose,
  onSave,
  initialData,
}: CashMovementFormProps) {
  // Form state
  const [type, setType] = useState<"income" | "withdrawal">("income");
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("");
  const [client, setClient] = useState("");
  const [observations, setObservations] = useState("");
  const [touched, setTouched] = useState(false);
  const amountRef = useRef<HTMLInputElement>(null);
  const accountRef = useRef<HTMLSelectElement>(null);

  // Load initial data for edit mode
  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setAmount(initialData.amount.toString());
      setAccount(initialData.account);
      setClient(initialData.client || "");
      setObservations(initialData.observations || "");
    } else {
      setType("income");
      setAmount("");
      setAccount("");
      setClient("");
      setObservations("");
    }
    setTouched(false);
  }, [open, initialData]);

  // Validation
  const amountValid = !!amount && parseFloat(amount) > 0;
  const accountValid = !!account;
  const formValid = amountValid && accountValid;

  // Focus the first invalid field on submit
  useEffect(() => {
    if (touched && open && !formValid) {
      if (!amountValid && amountRef.current) amountRef.current.focus();
      else if (!accountValid && accountRef.current) accountRef.current.focus();
    }
  }, [touched, open, formValid, amountValid, accountValid]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!formValid) return;
    const movement: CashMovement = {
      id: initialData?.id ?? Date.now().toString(),
      type,
      amount: parseFloat(amount),
      account,
      client: client || undefined,
      observations: observations || undefined,
      createdAt: initialData?.createdAt ?? new Date().toISOString(),
    };
    onSave(movement);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/20 bg-opacity-40 flex items-center justify-center">
      <form
        className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative animate-fade-in"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg font-bold">
            {initialData ? "Editar movimiento" : "Nuevo movimiento de efectivo"}
          </div>
          <button
            className="text-gray-400 cursor-pointer hover:text-gray-700 text-xl"
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
        {/* Tabs for movement type */}
        <div className="flex gap-0 mb-5 border-b">
          <button
            type="button"
            onClick={() => setType("withdrawal")}
            className={`cursor-pointer w-1/2 py-2 font-semibold border ${
              type === "withdrawal"
                ? "text-white bg-[#fd634c] border-[#fd634c]"
                : "text-[#fd634c] border-[#fd634c] bg-white"
            } rounded-l-lg`}
          >
            RETIRO
          </button>
          <button
            type="button"
            onClick={() => setType("income")}
            className={`cursor-pointer w-1/2 py-2 font-semibold border ${
              type === "income"
                ? "text-white bg-emerald-600 border-emerald-600"
                : "text-emerald-600 border-emerald-600 bg-white"
            } rounded-r-lg`}
          >
            INGRESO
          </button>
        </div>
        {/* Fields */}
        <div className="flex flex-col gap-3">
          {/* Amount */}
          <div>
            <label className="font-semibold text-sm" htmlFor="amount-input">
              Cantidad de efectivo <span className="text-emerald-600">*</span>
            </label>
            <input
              ref={amountRef}
              id="amount-input"
              type="number"
              min={0}
              step="0.01"
              className={`mt-1 block w-full px-3 py-2 border rounded focus:outline-none transition
                ${
                  touched && !amountValid ? "border-red-400" : "border-gray-200"
                }`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              aria-invalid={touched && !amountValid}
              aria-describedby="amount-error"
            />
            {touched && !amountValid && (
              <div className="text-red-500 text-xs mt-1" id="amount-error">
                Debe ingresar una cantidad válida mayor que 0
              </div>
            )}
          </div>
          {/* Account */}
          <div>
            <label className="font-semibold text-sm" htmlFor="account-input">
              Cuenta contable <span className="text-emerald-600">*</span>
            </label>
            <select
              ref={accountRef}
              id="account-input"
              className={`mt-1 block w-full px-3 py-2 border rounded focus:outline-none transition
                ${
                  touched && !accountValid
                    ? "border-red-400"
                    : "border-gray-200"
                }`}
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required
              aria-invalid={touched && !accountValid}
              aria-describedby="account-error"
            >
              <option value="">Seleccionar</option>
              {ACCOUNT_OPTIONS.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {touched && !accountValid && (
              <div className="text-red-500 text-xs mt-1" id="account-error">
                Este campo es obligatorio
              </div>
            )}
          </div>
          {/* Client */}
          <div>
            <label className="font-semibold text-sm" htmlFor="client-input">
              Cliente
            </label>
            <select
              id="client-input"
              className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none border-gray-200"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            >
              <option value="">Selecciona un cliente</option>
              {CLIENT_OPTIONS.map((cli, i) => (
                <option key={i} value={cli}>
                  {cli}
                </option>
              ))}
            </select>
          </div>
          {/* Observations */}
          <div>
            <label className="font-semibold text-sm" htmlFor="obs-input">
              Observaciones
            </label>
            <textarea
              id="obs-input"
              className="mt-1 block w-full px-3 py-2 border rounded focus:outline-none border-gray-200"
              rows={2}
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
            />
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between mt-6">
          <span className="text-xs text-emerald-600">
            * Campos obligatorios
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded cursor-pointer border border-gray-300 bg-white hover:bg-gray-50 font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded cursor-pointer font-semibold text-white
                ${
                  formValid
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              disabled={!formValid}
            >
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
