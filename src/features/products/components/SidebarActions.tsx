// src/features/products/components/SidebarActions.tsx
import React from "react";
import { ChangeHandler, ProductFormState } from "../types/productForm";

interface Props {
  form: ProductFormState;
  showError: boolean;
  onChange: ChangeHandler;
  onCancel: () => void;
  onSaveAndNew: () => void;
}

const SidebarActions: React.FC<Props> = ({
  form,
  showError,
  onChange,
  onCancel,
  onSaveAndNew,
}) => (
  <div className="bg-white border rounded-lg shadow-sm p-4 space-y-4">
    {/* Image placeholder */}
    <div className="h-32 bg-gray-100 rounded-md flex items-center justify-center cursor-pointer">
      <span className="text-4xl text-gray-300">📷</span>
    </div>

    {/* Preview */}
    <div className="text-center">
      <p className="text-sm text-gray-500">Producto sin nombre</p>
      <p className="text-xl font-semibold text-emerald-600">
        RD$ {form.totalPrice} DOP
      </p>
    </div>

    {/* Toggles */}
    <div className="space-y-3">
      <label className="flex items-center justify-between text-sm">
        <span>
          Inventariable <span className="text-gray-400">ℹ</span>
        </span>
        <input
          type="checkbox"
          name="inventoriable"
          checked={form.inventoriable}
          onChange={onChange}
          className="form-toggle"
        />
      </label>
      <label className="flex items-center justify-between text-sm">
        <span>Venta en negativo</span>
        <input
          type="checkbox"
          name="allowNegative"
          checked={form.allowNegative}
          onChange={onChange}
          className="form-toggle"
        />
      </label>
    </div>

    {/* Buttons */}
    <div className="space-y-2">
      <button
        type="button"
        onClick={onCancel}
        className="w-full border px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
      >
        Cancelar
      </button>
      <button
        type="submit"
        form="product-form"
        className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 cursor-pointer"
      >
        Guardar
      </button>
      <button
        type="button"
        onClick={onSaveAndNew}
        className="w-full border border-emerald-600 text-emerald-600 px-4 py-2 rounded-md hover:bg-emerald-50 cursor-pointer"
      >
        Guardar y crear otro
      </button>
    </div>
  </div>
);

export default SidebarActions;
