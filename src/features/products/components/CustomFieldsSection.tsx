// src/features/products/components/CustomFieldsSection.tsx
import React from "react";
import { ProductFormState, ChangeHandler } from "../types/productForm";

interface Props {
  form: ProductFormState;
  onChange: ChangeHandler;
}

const CustomFieldsSection: React.FC<Props> = ({ form, onChange }) => (
  <section className="bg-white border rounded-lg shadow-sm">
    <header className="px-4 py-2 border-b font-medium">Campos adicionales</header>
    <div className="p-4 space-y-3">
      <p className="text-sm text-gray-500">
        Conoce cómo crear campos personalizables{" "}
        <a href="#" className="text-emerald-600 hover:underline">
          aquí
        </a>.
      </p>
      <div className="flex gap-2">
        <select
          name="newCustomField"
          onChange={onChange}
          className="flex-1 border px-3 py-2 rounded-md text-sm border-gray-300"
        >
          <option value="">Buscar</option>
        </select>
        <button
          type="button"
          onClick={() =>
            onChange({
              target: {
                name: "customFields",
                value: [...form.customFields, { field: "", value: "" }],
              },
            } as any)
          }
          className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm cursor-pointer"
        >
          Agregar
        </button>
      </div>
      {form.customFields.map((cf, i) => (
        <div key={i} className="flex items-center gap-2">
          <label className="flex-1 text-sm">{cf.field}</label>
          <input
            name={`customFields.${i}.value`}
            value={cf.value}
            onChange={onChange}
            className="w-40 border px-3 py-2 rounded-md text-sm border-gray-300"
          />
          <button
            className="text-gray-400 hover:text-red-600 cursor-pointer"
            type="button"
            onClick={() => {
              const arr = [...form.customFields];
              arr.splice(i, 1);
              onChange({ target: { name: "customFields", value: arr } } as any);
            }}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  </section>
);

export default CustomFieldsSection;
