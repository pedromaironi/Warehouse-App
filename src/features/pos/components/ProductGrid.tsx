// ProductGrid.tsx
import { Product } from "../../products/types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
}

/**
 * Grid of products for POS.
 * Renders ProductCard for each product and handles clicks and favorite toggling.
 */
export default function ProductGrid({
  products,
  onProductClick,
  onToggleFavorite,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
      {products.map((prod) => (
        <ProductCard
          key={prod.id}
          product={prod}
          onClick={() => onProductClick(prod)}
          onToggleFavorite={() => onToggleFavorite(prod.id)} 
        />
      ))}
    </div>
  );
}
