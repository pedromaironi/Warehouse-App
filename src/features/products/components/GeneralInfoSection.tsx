// src/features/products/components/GeneralInfoSection.tsx
import React from "react";
import { ProductFormState, ChangeHandler } from "../types/productForm";

interface Props {
  form: ProductFormState;
  showError: boolean;
  onChange: ChangeHandler;
}

const GeneralInfoSection: React.FC<Props> = ({ form, showError, onChange }) => (
  <section className="bg-white border rounded-lg shadow-sm">
    <header className="px-4 py-2 border-b font-medium">Información general</header>
    <div className="p-4 space-y-4">
      {/* Type tabs + variants */}
      <div className="flex items-center space-x-2">
        {(["Producto", "Servicio", "Combo"] as const).map((t) => (
          <button
            key={t}
            type="button"
            name="type"
            value={t}
            onClick={onChange}
            className={`px-4 py-2 border rounded-md text-sm cursor-pointer ${
              form.type === t
                ? "bg-emerald-50 border-emerald-600 text-emerald-600"
                : "bg-gray-100 border-gray-300 text-gray-600"
            }`}
          >
            {t}
          </button>
        ))}
        <label className="inline-flex items-center ml-6">
          <input
            type="checkbox"
            name="hasVariants"
            checked={form.hasVariants}
            onChange={onChange}
            className="form-checkbox h-4 w-4 text-emerald-600"
          />
          <span className="ml-2 text-sm text-gray-700">
            Producto con variantes
          </span>
        </label>
      </div>
      <p className="text-xs text-gray-500">
        <span className="text-emerald-600">ℹ</span> Una vez creado, no podrás
        cambiar el tipo ni su condición variable.
      </p>

      {/* Name & Reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className={`mt-1 w-full border px-3 py-2 rounded-md text-sm ${
              showError && !form.name ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Referencia</label>
          <input
            name="reference"
            value={form.reference}
            onChange={onChange}
            className="mt-1 w-full border px-3 py-2 rounded-md text-sm border-gray-300"
          />
        </div>
      </div>

      {/* Unit & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">
            Unidad de medida <span className="text-red-500">*</span>{" "}
            <span className="text-gray-400">ℹ</span>
          </label>
          <select
            name="unit"
            value={form.unit}
            onChange={onChange}
            className={`mt-1 w-full border px-3 py-2 rounded-md text-sm ${
              showError && !form.unit ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Buscar...</option>
            {/* map your real unit list here */}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">
            Categoría <span className="text-gray-400">ℹ</span>
          </label>
          <select
            name="category"
            value={form.category}
            onChange={onChange}
            className="mt-1 w-full border px-3 py-2 rounded-md text-sm border-gray-300"
          >
            <option value="">Seleccionar...</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium">Descripción</label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          className="mt-1 w-full border px-3 py-2 rounded-md text-sm border-gray-300"
          rows={4}
        />
      </div>
    </div>
  </section>
);

export default GeneralInfoSection;
