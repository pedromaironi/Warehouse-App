/**
 * ShiftDetailPage
 * Shows detailed information and summary of a cash register shift.
 * UI in Spanish, docs in English. Data is mocked for now.
 */
import { useParams } from "react-router-dom";
import { MOCK_SHIFT_DETAILS } from "../data/mockShiftDetails";
import { ShiftDetail } from "../types/shiftDetails";

export default function ShiftDetailPage() {
  const { id } = useParams<{ id: string }>();

  // Get shift data by id (mock)
  const shift: ShiftDetail | undefined = MOCK_SHIFT_DETAILS.find(
    (s) => s.id === id
  );

  if (!shift) {
    return (
      <div className="max-w-3xl mx-auto pt-10 text-center text-xl text-red-500">
        Turno no encontrado.
      </div>
    );
  }

  return (
    <div className="bg-[#f7f8fa] min-h-screen px-2 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              Detalles del turno en curso
            </h1>
            <div className="text-sm text-gray-700">
              Conoce los movimientos de efectivo en tu turno de caja actual.{" "}
              <a href="#" className="text-emerald-600 underline">
                Aprende a usar los turnos
              </a>
            </div>
          </div>
          <button
            onClick={() => alert("Implementar cierre de turno")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all"
          >
            Cerrar turno
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow p-0 overflow-hidden">
          <div className="flex justify-between bg-gray-50 px-6 py-4 border-b">
            <div>
              <div className="text-sm text-gray-600">Fecha de inicio</div>
              <div className="font-semibold text-base">
                {shift.openedAt &&
                  new Date(shift.openedAt).toLocaleString("es-DO", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Total de ventas</div>
              <div className="font-bold text-base text-emerald-700">
                RD$
                {shift.totalSales.toLocaleString("es-DO", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
          <table className="w-full text-sm">
            <tbody>
              <Row label="Base inicial" value={shift.openingCash} />
              <Row label="Ventas en efectivo" value={shift.salesCash} />
              <Row
                label="Ventas por tarjeta de débito"
                value={shift.salesDebit}
              />
              <Row
                label="Ventas por tarjeta de crédito"
                value={shift.salesCredit}
              />
              <Row
                label="Ventas por transferencias"
                value={shift.salesTransfer}
              />
              <Row
                label="Devolución de dinero"
                value={shift.refunds}
                isNegative
              />
              <Row label="Ingresos en efectivo" value={shift.cashIn} />
              <Row
                label="Retiros de efectivo"
                value={shift.cashOut}
                isNegative
              />
              {/* Divider */}
              <tr>
                <td colSpan={2}>
                  <hr className="my-2 border-gray-300" />
                </td>
              </tr>
              <Row
                label="Total de movimientos del turno"
                value={
                  shift.openingCash +
                  shift.salesCash +
                  shift.salesDebit +
                  shift.salesCredit +
                  shift.salesTransfer +
                  shift.cashIn -
                  shift.refunds -
                  shift.cashOut
                }
                bold
              />
            </tbody>
          </table>
        </div>

        {/* Expected cash */}
        <div className="bg-white rounded-xl shadow p-4 mt-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-bold">Dinero esperado en caja</div>
              <div className="text-gray-600 text-sm">
                Base inicial más las ventas e ingresos en efectivo, menos las
                devoluciones y retiros.
              </div>
            </div>
            <div className="font-bold text-xl">
              RD$
              {shift.expectedCash.toLocaleString("es-DO", {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Row
 * Renders a single row of the shift movements table.
 */
function Row({
  label,
  value,
  isNegative,
  bold,
}: {
  label: string;
  value: number;
  isNegative?: boolean;
  bold?: boolean;
}) {
  return (
    <tr>
      <td className={`py-1 px-6 ${bold ? "font-bold text-base" : ""}`}>
        {label}
      </td>
      <td
        className={`py-1 px-6 text-right ${
          isNegative && value !== 0 ? "text-red-500" : ""
        } ${bold ? "font-bold text-base" : ""}`}
      >
        RD${value.toLocaleString("es-DO", { minimumFractionDigits: 2 })}
      </td>
    </tr>
  );
}
