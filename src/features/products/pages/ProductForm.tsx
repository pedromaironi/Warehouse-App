// src/features/products/pages/ProductForm.tsx

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { ProductFormState, ChangeHandler } from "../types/productForm";

import GeneralInfoSection from "../components/GeneralInfoSection";
import PriceSection from "../components/PriceSection";
import PriceListsSection from "../components/PriceListsSection";
import InventorySection from "../components/InventorySection";
import CostSection from "../components/CostSection";
import CustomFieldsSection from "../components/CustomFieldsSection";
import AccountingSection from "../components/AccountingSection";
import SidebarActions from "../components/SidebarActions";

const initialFormState: ProductFormState = {
  type: "Producto",
  hasVariants: false,
  name: "",
  reference: "",
  referenceType: "",
  unit: "",
  category: "",
  description: "",
  basePrice: "",
  tax: "0",
  totalPrice: "",
  priceLists: [{ list: "", value: "" }],
  inventory: [{ warehouse: "Principal", qty: "" }],
  cost: "",
  customFields: [],
  accountSales: "",
  accountInventory: "",
  accountCost: "",
  inventoriable: true,
  allowNegative: false,
};

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setProducts } = useProducts(); // products removed

  const [form, setForm] = useState<ProductFormState>(initialFormState);
  const [showError, setShowError] = useState(false);

  // calculate total whenever basePrice or tax changes
  useEffect(() => {
    const base = parseFloat(form.basePrice) || 0;
    const tax = parseFloat(form.tax) || 0;
    const total = base + base * (tax / 100);
    setForm((f) => ({ ...f, totalPrice: total.toFixed(2) }));
  }, [form.basePrice, form.tax]);

  // properly typed change handler
  const handleChange: ChangeHandler = (e) => {
    const target = e.target;
    const name = target.name;

    // Determine newValue safely
    let newValue: string | boolean;
    if (target instanceof HTMLInputElement) {
      newValue = target.type === "checkbox" ? target.checked : target.value;
    } else {
      // <select> or <textarea>
      newValue = (target as HTMLSelectElement | HTMLTextAreaElement).value;
    }

    // 3) Handle nested array fields explicitly:
    if (name.startsWith("priceLists.")) {
      // name = "priceLists.0.list" or "priceLists.0.value"
      const [, idxStr, key] = name.split(".");
      const idx = Number(idxStr);
      setForm((prev) => {
        const lists = [...prev.priceLists];
        lists[idx] = { ...lists[idx], [key]: newValue as string };
        return { ...prev, priceLists: lists };
      });
      return;
    }

    if (name.startsWith("inventory.")) {
      // name = "inventory.0.qty"
      const [, idxStr, key] = name.split(".");
      const idx = Number(idxStr);
      setForm((prev) => {
        const inv = [...prev.inventory];
        inv[idx] = { ...inv[idx], [key]: newValue as string };
        return { ...prev, inventory: inv };
      });
      return;
    }

    if (name.startsWith("customFields.")) {
      // name = "customFields.0.value"
      const [, idxStr, key] = name.split(".");
      const idx = Number(idxStr);
      setForm((prev) => {
        const cfs = [...prev.customFields];
        cfs[idx] = { ...cfs[idx], [key]: newValue as string };
        return { ...prev, customFields: cfs };
      });
      return;
    }

    // 4) Fallback for top-level fields:
    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // basic validation
    if (!form.name.trim() || !form.basePrice.trim() || !form.unit.trim()) {
      setShowError(true);
      return;
    }

    const record = {
      id: id || crypto.randomUUID(),
      name: form.name,
      reference: form.reference,
      price: parseFloat(form.totalPrice),
      description: form.description,
      status: "activo" as const,
    };

    setProducts((prev) =>
      id ? prev.map((p) => (p.id === id ? record : p)) : [...prev, record]
    );

    navigate("/dashboard/products");
  };

  // extracted save-and-new logic
  const handleSaveAndNew = () => {
    // simulate form submission
    if (!form.name.trim() || !form.basePrice.trim() || !form.unit.trim()) {
      setShowError(true);
      return;
    }

    // add record
    const record = {
      id: crypto.randomUUID(),
      name: form.name,
      reference: form.reference,
      price: parseFloat(form.totalPrice),
      description: form.description,
      status: "activo" as const,
    };
    setProducts((prev) => [...prev, record]);

    // reset form
    setForm(initialFormState);
    setShowError(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {id ? "Editar producto/servicio" : "Nuevo producto/servicio"}
        </h1>
      </div>

      <form
        id="product-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-6">
          <GeneralInfoSection
            form={form}
            showError={showError}
            onChange={handleChange}
          />
          <PriceSection
            form={form}
            showError={showError}
            onChange={handleChange}
          />
          <PriceListsSection form={form} onChange={handleChange} />
          <InventorySection form={form} onChange={handleChange} />
          <CostSection
            form={form}
            showError={showError}
            onChange={handleChange}
          />
          <CustomFieldsSection form={form} onChange={handleChange} />
          <AccountingSection form={form} onChange={handleChange} />
        </div>

        <aside className="space-y-6">
          <SidebarActions
            form={form}
            showError={showError}
            onChange={handleChange}
            onCancel={() => navigate("/dashboard/products")}
            onSaveAndNew={handleSaveAndNew}
          />
        </aside>
      </form>
    </div>
  );
}
