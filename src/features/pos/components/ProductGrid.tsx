// ProductGrid.tsx
import { Product } from "../../products/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export default function ProductGrid({
  products,
  onProductClick,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((prod) => (
        <ProductCard
          key={prod.id}
          product={prod}
          onClick={() => onProductClick(prod)}
        />
      ))}
    </div>
  );
}
