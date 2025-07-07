// src/features/products/components/CostSection.tsx
import React from "react";
import { ProductFormState, ChangeHandler } from "../types/productFormTypes";

interface Props {
  form: ProductFormState;
  showError: boolean;
  onChange: ChangeHandler;
}

const CostSection: React.FC<Props> = ({ form, showError, onChange }) => (
  <section className="bg-white border rounded-lg shadow-sm">
    <header className="px-4 py-2 border-b font-medium">Costo inicial</header>
    <div className="p-4">
      <input
        name="cost"
        value={form.cost}
        onChange={onChange}
        placeholder="RD$0.000"
        className={`w-full border px-3 py-2 rounded-md text-sm ${
          showError && !form.cost ? "border-red-500" : "border-gray-300"
        }`}
      />
    </div>
  </section>
);

export default CostSection;
