/**
 * ConfirmDialog
 * Generic confirmation modal/dialog for any destructive or critical action.
 * Usage: show/hide controlled by parent, customize message/title/action.
 */
interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title = "Confirmar acción",
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/30 bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-xs w-full animate-fade-in">
        <div className="mb-2 font-bold text-lg text-gray-900">{title}</div>
        <div className="mb-5 text-gray-700">{message}</div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border cursor-pointer border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg cursor-pointer border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-semibold"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
