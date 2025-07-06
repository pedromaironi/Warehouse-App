import { useState } from "react";
import { Product } from "../types/product";

const initialProducts: Product[] = [
  {
    id: "1",
    name: "Cerveza Presidente Light 22 oz",
    reference: "REF-001",
    price: 1906.8,
    description: "Producto alcohólico",
    status: "activo",
  },
  {
    id: "2",
    name: "Refresco Pepsi 400 ml - Familiar",
    reference: "REF-002",
    price: 144.1,
    description: "Bebida carbonatada",
    status: "activo",
  },
  {
    id: "3",
    name: "Refresco Pepsi 400 ml - Familiar",
    reference: "REF-002",
    price: 144.1,
    description: "Bebida carbonatada",
    status: "activo",
  },
  {
    id: "4",
    name: "Refresco Pepsi 400 ml - Familiar",
    reference: "REF-002",
    price: 144.1,
    description: "Bebida carbonatada",
    status: "activo",
  },
  {
    id: "5",
    name: "Refresco Pepsi 400 ml - Familiar",
    reference: "REF-002",
    price: 144.1,
    description: "Bebida carbonatada",
    status: "activo",
  },
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateStatus = (ids: string[], status: Product["status"]) => {
    setProducts((prev) =>
      prev.map((p) => (ids.includes(p.id) ? { ...p, status } : p))
    );
  };

  const deleteProducts = (ids: string[]) => {
    setProducts((prev) => prev.filter((p) => !ids.includes(p.id)));
  };

  return {
    products,
    setProducts,
    updateStatus,
    deleteProducts,
  };
};