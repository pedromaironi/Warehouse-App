import React from "react";
import { ProductFormState } from "../types/productForm";
import PriceListDropdown from "./PriceListDropdown";

interface Props {
  form: ProductFormState;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onAddNewList: () => void; // Para abrir modal de nueva lista
  onListChange: (index: number, value: string) => void; // Custom handler para cambiar el valor del dropdown
  onValueChange: (index: number, value: string) => void; // Para cambiar el valor numérico
}
const PriceListsSection: React.FC<Props> = ({
  form,
  onRemove,
  onAdd,
  onAddNewList,
  onListChange,
  onValueChange,
}) => (
  <section className="bg-white border rounded-lg shadow-sm">
    <header className="px-4 py-2 border-b font-medium">
      Listas de precios
    </header>
    <div className="p-4 space-y-2">
      <p className="text-xs text-gray-500">
        Asigna varios precios con valor fijo o % de descuento.{" "}
        <a href="#" className="text-emerald-600 hover:underline">
          Ver más
        </a>
      </p>

      {form.priceLists.map((pl, i) => (
        <div key={i} className="flex gap-2 items-center">
          {/* Combobox custom */}
          <div className="flex-1 min-w-[200px]">
            <PriceListDropdown
              value={pl.list}
              onChange={(val) => onListChange(i, val)}
              onAddNew={onAddNewList}
            />
          </div>
          <input
            name={`priceLists.${i}.value`}
            value={pl.value}
            onChange={(e) => onValueChange(i, e.target.value)}
            className="w-32 border px-3 py-2 rounded-md text-sm border-gray-300"
            placeholder="Valor"
            type="number"
          />
          <button
            type="button"
            onClick={() => onRemove(i)}
            className="text-gray-400 hover:text-red-600 cursor-pointer"
            title="Eliminar"
          >
            &times;
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={onAdd}
        className="text-sm text-emerald-600 hover:underline cursor-pointer"
      >
        + Agregar lista de precio
      </button>
    </div>
  </section>
);

export default PriceListsSection;
