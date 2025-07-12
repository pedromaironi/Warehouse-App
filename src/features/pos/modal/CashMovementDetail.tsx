/**
 * CashMovementDetail
 * Shows full details of a selected cash movement in a modal.
 * All UI in Spanish. Documentation in English.
 */
import { CashMovement } from "../types/cashMovements";

export default function CashMovementDetail({
  movement,
  open,
  onClose,
}: {
  movement: CashMovement | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!open || !movement) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 relative animate-fade-in">
        <button
          className="absolute cursor-pointer top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>
        <div className="text-xl font-bold mb-3">Detalle del movimiento</div>
        <div className="flex flex-col gap-2 text-sm">
          <DetailRow label="Fecha" value={new Date(movement.createdAt).toLocaleString("es-DO")} />
          <DetailRow label="Tipo" value={movement.type === "income" ? "Ingreso" : "Retiro"} />
          <DetailRow label="Monto" value={`RD$${movement.amount.toLocaleString("es-DO", { minimumFractionDigits: 2 })}`} />
          <DetailRow label="Cuenta contable" value={movement.account} />
          <DetailRow label="Cliente" value={movement.client || "-"} />
          <DetailRow label="Observaciones" value={movement.observations || "-"} />
        </div>
        <div className="flex justify-end mt-6">
          <button
            className="px-4 cursor-pointer py-2 rounded bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b last:border-0 py-1">
      <span className="font-semibold">{label}</span>
      <span className="text-gray-700 text-right">{value}</span>
    </div>
  );
}
