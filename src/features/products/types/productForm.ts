// src/features/products/types/productForm.ts
export interface PriceList {
  list: string;
  value: string;
}

export interface InventoryItem {
  warehouse: string;
  qty: string;
}

export interface CustomField {
  field: string;
  value: string;
}

export interface ProductFormState {
  type: "Producto" | "Servicio" | "Combo";
  hasVariants: boolean;
  name: string;
  reference: string;
  referenceType: string;
  unit: string;
  category: string;
  description: string;
  basePrice: string;
  tax: string;
  totalPrice: string;
  priceLists: PriceList[];
  inventory: InventoryItem[];
  cost: string;
  customFields: CustomField[];
  accountSales: string;
  accountInventory: string;
  accountCost: string;
  inventoriable: boolean;
  allowNegative: boolean;
}

export type ChangeHandler = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
) => void;
export type TypeSelectHandler = (
  type: "Producto" | "Servicio" | "Combo"
) => void;

export type CheckboxChangeHandler = React.ChangeEventHandler<HTMLInputElement>;
