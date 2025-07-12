/**
 * CashMovementTable
 * Table with edit and delete actions per row, plus row click for detail view.
 */
import { CashMovement } from "../types/cashMovements";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function CashMovementTable({
  movements,
  onSelect,
  onEdit,
  onDelete,
}: {
  movements: CashMovement[];
  onSelect: (movement: CashMovement) => void;
  onEdit: (movement: CashMovement) => void;
  onDelete: (movement: CashMovement) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 text-gray-600 font-semibold">
            <th className="py-2 px-2 text-left">Fecha</th>
            <th className="py-2 px-2 text-left">Tipo</th>
            <th className="py-2 px-2 text-right">Monto</th>
            <th className="py-2 px-2 text-left">Cuenta contable</th>
            <th className="py-2 px-2 text-left">Cliente</th>
            <th className="py-2 px-2 text-left">Observaciones</th>
            <th className="py-2 px-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((m) => (
            <tr key={m.id} className="border-b hover:bg-emerald-50 group">
              <td
                className="py-2 px-2 cursor-pointer"
                onClick={() => onSelect(m)}
              >
                {new Date(m.createdAt).toLocaleString("es-DO")}
              </td>
              <td
                className="py-2 px-2 cursor-pointer"
                onClick={() => onSelect(m)}
              >
                <span className={`font-semibold px-2 py-1 rounded-lg ${m.type === "income"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
                }`}>
                  {m.type === "income" ? "Ingreso" : "Retiro"}
                </span>
              </td>
              <td
                className="py-2 px-2 text-right cursor-pointer"
                onClick={() => onSelect(m)}
              >
                RD${m.amount.toLocaleString("es-DO", { minimumFractionDigits: 2 })}
              </td>
              <td
                className="py-2 px-2 cursor-pointer"
                onClick={() => onSelect(m)}
              >
                {m.account}
              </td>
              <td
                className="py-2 px-2 cursor-pointer"
                onClick={() => onSelect(m)}
              >
                {m.client || "-"}
              </td>
              <td
                className="py-2 px-2 truncate max-w-[150px] cursor-pointer"
                title={m.observations || ""}
                onClick={() => onSelect(m)}
              >
                {m.observations || "-"}
              </td>
              <td className="py-2 px-2 text-center">
                <button
                  className="text-blue-600 hover:text-blue-800 px-2"
                  onClick={() => onEdit(m)}
                  title="Editar"
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 hover:text-red-700 px-2"
                  onClick={() => onDelete(m)}
                  title="Eliminar"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {movements.length === 0 && (
        <div className="text-center text-gray-400 py-8">No hay movimientos registrados.</div>
      )}
    </div>
  );
}
