import { useState } from "react";
import ProductCard from "./ProductCard";

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Cerveza Presidente Light 22 oz Mediana - Huacal [16 unidades]",
    price: 2250,
    image: [""], // Add image URL if needed
    isFavorite: true,
    stockLabel: "Agotado",
    stock: 10,
  },
  {
    id: "2",
    name: "Refresco Pepsi 400 ml - Fardo [12 unidades]",
    price: 170,
    image: [""],
    isFavorite: true,
    stockLabel: "Inv 23",
    stock: 10,
  },
  // Add more products here...
];

interface ProductListProps {
  onAddToCart: (productId: string) => void;
}

export default function ProductList({ onAddToCart }: ProductListProps) {
  const [search, setSearch] = useState("");

  const filteredProducts = MOCK_PRODUCTS.filter((prod) =>
    prod.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <input
          className="w-full px-3 py-2 border rounded focus:outline-emerald-500"
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-emerald-600 text-white px-4 py-2 rounded">
          + New Product
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onAddToCart(product.id)}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400">
            No products found
          </div>
        )}
      </div>
    </div>
  );
}
