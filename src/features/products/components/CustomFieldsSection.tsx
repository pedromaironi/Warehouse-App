// src/features/products/components/CustomFieldsSection.tsx

import { CustomField } from "../types/productForm";

interface CustomFieldsSectionProps {
  fields: CustomField[];
  onFieldAdd: () => void;
  onFieldChange: (index: number, newValue: string) => void;
  onFieldRemove: (index: number) => void;
}

export default function CustomFieldsSection({
  fields,
  onFieldAdd,
  onFieldChange,
  onFieldRemove,
}: CustomFieldsSectionProps) {
  return (
    <section className="bg-white border rounded-lg shadow-sm">
      <header className="px-4 py-2 border-b font-medium">
        Campos adicionales
      </header>
      <div className="p-4 space-y-3">
        <p className="text-sm text-gray-500">
          Conoce cómo crear campos personalizables{" "}
          <a href="#" className="text-emerald-600 hover:underline">
            aquí
          </a>.
        </p>

        {/* “Agregar” button */}
        <button
          type="button"
          onClick={onFieldAdd}
          className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm cursor-pointer"
        >
          Agregar campo
        </button>

        {/* Existing fields */}
        {fields.map((cf, i) => (
          <div key={i} className="flex items-center gap-2">
            <label className="flex-1 text-sm">{cf.field || `Campo ${i + 1}`}</label>
            <input
              type="text"
              value={cf.value}
              onChange={(e) => onFieldChange(i, e.target.value)}
              className="w-40 border px-3 py-2 rounded-md text-sm border-gray-300"
            />
            <button
              type="button"
              onClick={() => onFieldRemove(i)}
              className="text-gray-400 hover:text-red-600 cursor-pointer"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
