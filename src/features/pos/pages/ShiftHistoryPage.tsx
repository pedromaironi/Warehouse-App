import { useState } from "react";
import { FaPlus, FaDoorOpen, FaDoorClosed } from "react-icons/fa";
import { Shift } from "../types/shift";
import { MOCK_SHIFTS } from "../data/mockShift";
import { ConfirmDialog } from "../../../components/ConfirmDialog";
import { useNavigate } from "react-router-dom";

/**
 * ShiftHistoryPage
 * Displays a list of cash register shifts (turnos de caja) for the POS module.
 * Allows opening new shifts and closing current ones, using a reusable confirmation dialog.
 * All UI labels and content are in Spanish for Dominican business users.
 * All documentation and code comments are in English.
 */
export default function ShiftHistoryPage() {
  // State: list of shifts
  const [shifts, setShifts] = useState(MOCK_SHIFTS);
  const navigate = useNavigate();

  // State: id of shift being considered for closing (to show dialog)
  const [shiftToClose, setShiftToClose] = useState<null | string>(null);

  // Find if there's an open shift
  const openShift = shifts.find((s) => s.status === "open");

  /**
   * Handler for opening a new shift
   */
  const handleOpenShift = () => {
    alert("Aquí va el formulario para abrir un turno.");
  };

  /**
   * Handler for user action: wants to close a shift (show confirm dialog)
   */
  const handleAskCloseShift = (id: string) => {
    setShiftToClose(id);
  };

  /**
   * Handler: user confirms closing shift in dialog
   */
  const handleConfirmCloseShift = () => {
    if (!shiftToClose) return;
    // Demo: update status to "closed" and set closing cash (for demo)
    setShifts((prev) =>
      prev.map((shift) =>
        shift.id === shiftToClose
          ? {
              ...shift,
              status: "closed",
              closedAt: new Date().toISOString(),
              closingCash: shift.openingCash + 1000, // just for demo
            }
          : shift
      )
    );
    setShiftToClose(null);
    alert("Turno cerrado exitosamente (demo)");
  };

  /**
   * Handler: user cancels closing in dialog
   */
  const handleCancelCloseShift = () => {
    setShiftToClose(null);
  };

  return (
    <div className="max-w-6xl mx-auto relative pt-6">
      {/* --- Page header and open shift button --- */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Historial de turnos</h1>
        {!openShift && (
          <button
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold shadow cursor-pointer"
            onClick={handleOpenShift}
            title="Abrir turno"
          >
            <FaPlus />
          </button>
        )}
      </div>
      <div className="bg-white rounded-xl shadow p-4 overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-600 font-semibold">
              <th className="py-2 px-2 text-left">Estado</th>
              <th className="py-2 px-2 text-left">Cajero</th>
              <th className="py-2 px-2 text-left">Fecha apertura</th>
              <th className="py-2 px-2 text-left">Fecha cierre</th>
              <th className="py-2 px-2 text-right">Base inicial</th>
              <th className="py-2 px-2 text-right">Cierre</th>
              <th className="py-2 px-2 text-left">Notas</th>
              <th className="py-2 px-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift: Shift) => (
              <tr key={shift.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-2">
                  {shift.status === "open" ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <FaDoorOpen /> Abierto
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full font-bold bg-gray-100 text-gray-500 border border-gray-300">
                      <FaDoorClosed /> Cerrado
                    </span>
                  )}
                </td>
                <td className="py-2 px-2">{shift.userName}</td>
                <td className="py-2 px-2">
                  {shift.openedAt &&
                    new Date(shift.openedAt).toLocaleString("es-DO")}
                </td>
                <td className="py-2 px-2">
                  {shift.closedAt
                    ? new Date(shift.closedAt).toLocaleString("es-DO")
                    : "-"}
                </td>
                <td className="py-2 px-2 text-right">
                  RD${shift.openingCash.toLocaleString("es-DO")}
                </td>
                <td className="py-2 px-2 text-right">
                  {shift.closingCash
                    ? `RD$${shift.closingCash.toLocaleString("es-DO")}`
                    : "-"}
                </td>
                <td className="py-2 px-2">{shift.notes || "-"}</td>
                <td className="py-2 px-2 text-center">
                  {shift.status === "open" ? (
                    <button
                      className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 font-bold cursor-pointer"
                      onClick={() => handleAskCloseShift(shift.id)}
                    >
                      Cerrar turno
                    </button>
                  ) : (
                    <button
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded hover:bg-blue-100 font-bold cursor-pointer"
                      onClick={() =>
                        navigate(`/dashboard/pos/shift-history/${shift.id}`)
                      }
                    >
                      Detalles
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Reusable confirmation dialog for closing shift --- */}
      <ConfirmDialog
        open={!!shiftToClose}
        title="Cerrar turno"
        message="¿Está seguro que desea cerrar este turno? Esta acción no se puede deshacer."
        confirmLabel="Cerrar turno"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmCloseShift}
        onCancel={handleCancelCloseShift}
      />
    </div>
  );
}
