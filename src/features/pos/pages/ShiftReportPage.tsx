/**
 * ShiftReportPage
 * Reports and charts for closed shifts in a selected period.
 * UI in Spanish for DR, code comments in English.
 */
import { useState } from "react";
import { MOCK_SHIFT_REPORT } from "../data/mockShiftReport";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { FaSyncAlt } from "react-icons/fa";

const COLORS = ["#09997a", "#818cf8", "#2563eb", "#6ee7b7"];

export default function ShiftReportPage() {
  const [report, setReport] = useState(MOCK_SHIFT_REPORT);

  // Placeholder handlers for filters
  const [from, setFrom] = useState(report.from);
  const [to, setTo] = useState(report.to);

  const handleFilter = () => {
    // In real use, fetch data here
    alert("Filtrando reporte para: " + from + " a " + to);
  };

  return (
    <div className="bg-[#f7f8fa] min-h-screen px-2 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-1 text-black">
          Reportes de turnos
        </h1>
        <div className="text-gray-700 mb-6">
          Conoce el detalle de tus turnos cerrados en el período de tiempo que
          elijas.
          <a href="#" className="text-emerald-600 ml-1 underline">
            Ver más
          </a>
        </div>

        {/* Filter & KPIs */}
        <div className="bg-white rounded-xl shadow flex flex-wrap items-center gap-4 px-5 py-4 mb-5">
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">Períodos</span>
            <select className="border rounded px-2 py-1 bg-gray-50">
              <option>Personalizado</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">Desde</span>
            <input
              type="date"
              className="border rounded px-2 py-1 bg-gray-50"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-gray-500">Hasta</span>
            <input
              type="date"
              className="border rounded px-2 py-1 bg-gray-50"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <button
            className="ml-2 px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow"
            onClick={handleFilter}
          >
            Filtrar
          </button>
          <div className="ml-auto flex flex-row gap-6 items-center">
            <KPI label="Ingresos del período" value={report.incomes} positive />
            <KPI label="Gastos del período" value={report.expenses} negative />
            <KPI label="Diferencia" value={report.difference} positive />
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow p-3">
            <div className="flex justify-between items-center px-2 py-2">
              <span className="font-bold">Movimientos de Turnos</span>
              <FaSyncAlt
                className="text-gray-400 cursor-pointer"
                title="Refrescar"
              />
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={report.barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Ingresos" fill="#09997a" />
                <Bar dataKey="Gastos" fill="#f43f5e" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow p-3">
            <div className="flex justify-between items-center px-2 py-2">
              <span className="font-bold">Tipos de pago</span>
              <FaSyncAlt
                className="text-gray-400 cursor-pointer"
                title="Refrescar"
              />
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={report.paymentTypes}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#09997a"
                  label
                >
                  {report.paymentTypes.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="top" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * KPI
 * Displays a KPI indicator for incomes, expenses, or difference.
 */
function KPI({
  label,
  value,
  positive,
  negative,
}: {
  label: string;
  value: number;
  positive?: boolean;
  negative?: boolean;
}) {
  return (
    <div
      className={`flex flex-col ${positive ? "text-emerald-600" : ""} ${
        negative ? "text-red-500" : ""
      }`}
    >
      <span className="text-xs font-semibold">{label}</span>
      <span className="text-lg font-bold">
        RD${value.toLocaleString("es-DO", { minimumFractionDigits: 2 })}
      </span>
    </div>
  );
}
