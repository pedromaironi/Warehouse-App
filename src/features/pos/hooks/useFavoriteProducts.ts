// src/features/pos/hooks/useFavoriteProducts.ts
import { useState } from "react";
import { Product } from "../../products/types/product";

export function useFavoriteProducts(initialProducts: Product[]) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const toggleFavorite = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  // Puedes filtrar y ordenar aquí si lo prefieres
  const getFilteredSorted = (search: string) =>
    products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.reference?.toLowerCase().includes(search.toLowerCase()) ||
          p.id === search
      )
      .sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));

  return {
    products,
    setProducts,
    toggleFavorite,
    getFilteredSorted,
  };
}
