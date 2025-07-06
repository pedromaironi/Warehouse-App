// src/features/products/components/PriceListsSection.tsx
import React from "react";
import { ProductFormState, ChangeHandler } from "../types/productForm";

interface Props {
  form: ProductFormState;
  onChange: ChangeHandler;
}

const PriceListsSection: React.FC<Props> = ({ form, onChange }) => (
  <section className="bg-white border rounded-lg shadow-sm">
    <header className="px-4 py-2 border-b font-medium">Listas de precios</header>
    <div className="p-4 space-y-2">
      <p className="text-xs text-gray-500">
        Asigna varios precios con valor fijo o % de descuento.{" "}
        <a href="#" className="text-emerald-600 hover:underline">
          Ver más
        </a>
      </p>

      {form.priceLists.map((pl, i) => (
        <div key={i} className="flex gap-2 items-center">
          <select
            name={`priceLists.${i}.list`}
            value={pl.list}
            onChange={onChange}
            className="flex-1 border px-3 py-2 rounded-md text-sm border-gray-300"
          >
            <option value="">Buscar...</option>
          </select>
          <input
            name={`priceLists.${i}.value`}
            value={pl.value}
            onChange={onChange}
            className="w-32 border px-3 py-2 rounded-md text-sm border-gray-300"
            placeholder="Valor"
          />
          <button
            type="button"
            onClick={() => {
              const arr = [...form.priceLists];
              arr.splice(i, 1);
              onChange({ target: { name: "priceLists", value: arr } } as any);
            }}
            className="text-gray-400 hover:text-red-600 cursor-pointer"
          >
            &times;
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          onChange({
            target: {
              name: "priceLists",
              value: [...form.priceLists, { list: "", value: "" }],
            },
          } as any)
        }
        className="text-sm text-emerald-600 hover:underline cursor-pointer"
      >
        + Agregar lista de precio
      </button>
    </div>
  </section>
);

export default PriceListsSection;
