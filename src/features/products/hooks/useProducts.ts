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
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Futuras funciones: filter, delete, update, etc.
  return { products, setProducts };
};
