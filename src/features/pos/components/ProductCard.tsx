import { FiStar } from "react-icons/fi";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string[];
    isFavorite: boolean;
    stock: number;
  };
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0;
  return (
    <div
      className={`relative bg-white rounded-xl shadow flex flex-col items-center p-5 min-h-[265px] max-w-xs mx-auto hover:shadow-md transition group cursor-pointer select-none ${
        isOutOfStock ? "opacity-60 pointer-events-none" : "hover:ring-2 hover:ring-emerald-200"
      }`}
      onClick={!isOutOfStock ? onClick : undefined}
      tabIndex={isOutOfStock ? -1 : 0}
      role="button"
      aria-disabled={isOutOfStock}
    >
      {product.isFavorite && (
        <span className="absolute top-3 right-3 bg-white rounded-full shadow px-2 py-1 text-emerald-500 text-lg">
          <FiStar />
        </span>
      )}
      <div className="w-20 h-20 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mb-2">
        <span className="text-6xl text-gray-200">🏷️</span>
      </div>
      <span className={`inline-block text-xs rounded px-3 py-1 mb-2 ${
        isOutOfStock ? "bg-orange-50 text-orange-600 border border-orange-200"
        : "bg-emerald-50 text-emerald-600 border border-emerald-200"}`}>
        {isOutOfStock ? (
          <span className="text-orange-500">⦿ Agotado</span>
        ) : (
          <span className="text-emerald-600">Inv {product.stock}</span>
        )}
      </span>
      <div className="text-sm text-gray-500 text-center min-h-[44px] mt-1 mb-2">{product.name}</div>
      <div className="font-bold text-xl text-gray-800 mb-2 text-center">
        RD${product.price.toLocaleString("es-DO")}
      </div>
    </div>
  );
}
