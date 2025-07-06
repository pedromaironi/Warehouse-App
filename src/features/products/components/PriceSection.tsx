// src/features/products/components/PriceSection.tsx
import React, { useEffect } from "react";
import { ProductFormState, ChangeHandler } from "../types/productForm";

interface Props {
  form: ProductFormState;
  showError: boolean;
  onChange: ChangeHandler;
}

const PriceSection: React.FC<Props> = ({ form, showError, onChange }) => {
  // auto-calc total
  useEffect(() => {
    const base = parseFloat(form.basePrice) || 0;
    const tax = parseFloat(form.tax) || 0;
    const total = base + base * (tax / 100);
    onChange({
      target: { name: "totalPrice", value: total.toFixed(2), type: "change" },
    } as any);
  }, [form.basePrice, form.tax]);

  return (
    <section className="bg-white border rounded-lg shadow-sm">
      <header className="px-4 py-2 border-b font-medium">Precio</header>
      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-500">
          Indica el valor de venta y el costo de compra.
        </p>
        <div className="grid grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium">
              Precio base <span className="text-red-500">*</span>
            </label>
            <input
              name="basePrice"
              value={form.basePrice}
              onChange={onChange}
              className={`mt-1 w-full border px-3 py-2 rounded-md text-sm ${
                showError && !form.basePrice
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Impuesto</label>
            <select
              name="tax"
              value={form.tax}
              onChange={onChange}
              className="mt-1 w-full border px-3 py-2 rounded-md text-sm border-gray-300"
            >
              <option value="0">Ninguno (0%)</option>
              <option value="18">ITBIS (18%)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Precio Total <span className="text-red-500">*</span>
            </label>
            <input
              name="totalPrice"
              value={form.totalPrice}
              readOnly
              className={`mt-1 w-full bg-gray-100 border px-3 py-2 rounded-md text-sm ${
                showError && !form.totalPrice
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceSection;
