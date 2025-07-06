// src/features/products/components/InventorySection.tsx
import React from "react";
import { ProductFormState, ChangeHandler } from "../types/productForm";

interface Props {
  form: ProductFormState;
  onChange: ChangeHandler;
}

const InventorySection: React.FC<Props> = ({ form, onChange }) => (
  <section className="bg-white border rounded-lg shadow-sm">
    <header className="px-4 py-2 border-b font-medium">Detalle de inventario</header>
    <div className="p-4 space-y-3">
      <p className="text-sm text-gray-500">
        Distribuye y controla cantidades en distintos lugares.{" "}
        <a href="#" className="text-emerald-600 hover:underline">
          Ver más
        </a>
      </p>

      {form.inventory.map((inv, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="p-2 bg-gray-100 rounded-md">🏷</span>
          <span className="flex-1 text-sm">{inv.warehouse}</span>
          <input
            name={`inventory.${i}.qty`}
            value={inv.qty}
            onChange={onChange}
            placeholder="Cantidad"
            className="w-24 border px-3 py-2 rounded-md text-sm border-gray-300"
          />
          <button
            className="text-gray-400 hover:text-red-600 cursor-pointer"
            type="button"
            onClick={() => {
              const arr = [...form.inventory];
              arr.splice(i, 1);
              onChange({ target: { name: "inventory", value: arr } } as any);
            }}
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
              name: "inventory",
              value: [...form.inventory, { warehouse: "Nueva bodega", qty: "" }],
            },
          } as any)
        }
        className="text-sm text-emerald-600 hover:underline cursor-pointer"
      >
        + Agregar bodega
      </button>
    </div>
  </section>
);

export default InventorySection;
