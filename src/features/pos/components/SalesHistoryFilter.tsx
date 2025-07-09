// src/features/pos/components/SalesFilter.tsx
import { useState } from "react";

const STATUS_OPTIONS = [
  { label: "Pagadas", value: "pagada" },
  { label: "Pago pendiente", value: "pendiente" },
  { label: "Vencidas", value: "vencida" },
  { label: "Canceladas", value: "cancelada" },
];

interface Props {
  filters: { status: string[]; date: string };
  onChange: (filters: { status: string[]; date: string }) => void;
  onCancel: () => void;
  onApply: () => void;
}

export default function SalesFilter({ filters, onChange, onCancel, onApply }: Props) {
  const [localFilters, setLocalFilters] = useState(filters);

  // Handle status checkbox
  const handleStatus = (status: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status],
    }));
  };

  // Handle date
  const handleDate = (date: string) => {
    setLocalFilters((prev) => ({ ...prev, date }));
  };

  // On "Apply" click
  const handleApply = () => {
    onChange(localFilters);
    onApply();
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-[390px] max-w-full absolute z-30 top-14 left-2">
      <div className="mb-2 text-xl font-bold">Filtrar</div>
      <div className="mb-3">
        <div className="font-semibold mb-2">Estado</div>
        <div className="flex flex-col gap-1">
          {STATUS_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.status.includes(opt.value)}
                onChange={() => handleStatus(opt.value)}
                className="accent-emerald-600"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <div className="font-semibold mb-2">Fecha</div>
        <input
          type="date"
          className="border px-2 py-1 rounded w-full"
          value={localFilters.date}
          onChange={(e) => handleDate(e.target.value)}
        />
      </div>
      <div className="flex justify-between items-center border-t pt-3">
        <button className="text-gray-500 cursor-pointer hover:underline" onClick={onCancel}>
          Cancelar
        </button>
        <button
          className="bg-emerald-600 text-white px-6 cursor-pointer py-1.5 rounded font-semibold shadow hover:bg-emerald-700"
          onClick={handleApply}
        >
          Aplicar
        </button>
      </div>
    </div>
  );
}
