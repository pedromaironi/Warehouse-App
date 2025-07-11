// src/features/pos/pages/ShiftHistoryPage.tsx

import { useState } from "react";
import { FaPlus, FaDoorOpen, FaDoorClosed } from "react-icons/fa";
import { Shift } from "../types/shift";
import { MOCK_SHIFTS } from "../data/mockShift";

export default function ShiftHistoryPage() {
  const [shifts, setShifts] = useState(MOCK_SHIFTS);

  // Find if there's an open shift
  const openShift = shifts.find((s) => s.status === "open");

  const handleOpenShift = () => {
    alert("Open shift form goes here.");
  };

  const handleCloseShift = (id: string) => {
    alert("Close shift form goes here for shift " + id);
  };

  return (
    <div className="max-w-6xl mx-auto relative pt-6">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Historial de turnos</h1>
        {!openShift && (
          <button
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-semibold shadow cursor-pointer"
            onClick={handleOpenShift}
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
                <td className="py-2 px-2">{shift.openedAt}</td>
                <td className="py-2 px-2">{shift.closedAt || "-"}</td>
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
                      onClick={() => handleCloseShift(shift.id)}
                    >
                      Cerrar turno
                    </button>
                  ) : (
                    <button
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded hover:bg-blue-100 font-bold cursor-pointer"
                      onClick={() => alert("Show shift details")}
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
    </div>
  );
}
