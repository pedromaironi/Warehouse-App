// src/features/products/components/AccountingSection.tsx
import React from "react";
import { ProductFormState, ChangeHandler } from "../types/productForm";

interface Props {
  form: ProductFormState;
  onChange: ChangeHandler;
}

const AccountingSection: React.FC<Props> = ({ form, onChange }) => (
  <section className="bg-white border rounded-lg shadow-sm">
    <header className="px-4 py-2 border-b font-medium">Configuración contable</header>
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium">Cuenta contable</label>
        <select
          name="accountSales"
          value={form.accountSales}
          onChange={onChange}
          className="mt-1 w-full border px-3 py-2 rounded-md text-sm border-gray-300"
        >
          <option value="">Ventas</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Cuenta inventario</label>
        <select
          name="accountInventory"
          value={form.accountInventory}
          onChange={onChange}
          className="mt-1 w-full border px-3 py-2 rounded-md text-sm border-gray-300"
        >
          <option value="">Inventarios</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Cuenta costo venta</label>
        <select
          name="accountCost"
          value={form.accountCost}
          onChange={onChange}
          className="mt-1 w-full border px-3 py-2 rounded-md text-sm border-gray-300"
        >
          <option value="">Costos del inventario</option>
        </select>
      </div>
    </div>
  </section>
);

export default AccountingSection;
