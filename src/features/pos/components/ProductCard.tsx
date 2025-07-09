import { FiStar } from "react-icons/fi";
import { Product } from "../../products/types/product";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onToggleFavorite: (id: string) => void;
}

/**
 * ProductCard component
 * Displays product info and allows toggling favorite status.
 */
export default function ProductCard({
  product,
  onClick,
  onToggleFavorite,
}: ProductCardProps) {
  const isOutOfStock = product.stock <= 0;
  return (
    <div
      className={`relative cursor-pointer bg-white rounded-xl shadow flex flex-col items-center p-2 min-h-[170px] min-w-[110px] max-w-[135px] ${
        isOutOfStock
          ? "opacity-60 pointer-events-none"
          : "hover:ring-2 hover:bg-gray-50  hover:ring-emerald-200"
      }`}
      onClick={!isOutOfStock ? onClick : undefined}
      tabIndex={isOutOfStock ? -1 : 0}
      role="button"
      aria-disabled={isOutOfStock}
    >
      {/* Favorite icon (clickable) */}
      <button
        className="absolute top-1.5 right-1.5 cursor-pointer bg-white rounded-full shadow p-1 text-emerald-500 text-base z-10"
        onClick={(e) => {
          e.stopPropagation(); // Prevent click from triggering product click
          onToggleFavorite(product.id);
        }}
        tabIndex={0}
        aria-label={
          product.isFavorite ? "Unmark as favorite" : "Mark as favorite"
        }
        title={product.isFavorite ? "Unmark as favorite" : "Mark as favorite"}
      >
        <FiStar className={product.isFavorite ? "fill-current" : ""} />
      </button>

      {/* Product main content */}
      <div className="w-20 h-20 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mb-2">
        <span className="text-6xl text-gray-200">🏷️</span>
      </div>
      <span
        className={`inline-block text-xs rounded px-3 py-1 mb-2 ${
          isOutOfStock
            ? "bg-orange-50 text-orange-600 border border-orange-200"
            : "bg-emerald-50 text-emerald-600 border border-emerald-200"
        }`}
      >
        {isOutOfStock ? (
          <span className="text-orange-500">⦿ Out of stock</span>
        ) : (
          <span className="text-emerald-600">Inv {product.stock}</span>
        )}
      </span>
      <div className="text-sm text-gray-500 text-center min-h-[44px] mt-1 mb-2">
        {product.name}
      </div>
      <div className="font-bold text-xl text-gray-800 mb-2 text-center">
        RD${product.price.toLocaleString("es-DO")}
      </div>
    </div>
  );
}
