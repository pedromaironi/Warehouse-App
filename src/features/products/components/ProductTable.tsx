import { useState } from "react";
import { Product } from "../types/product";
import ProductRow from "./ProductRow";

interface ProductTableProps {
  products: Product[];
  selected: string[];
  toggleSelect: (id: string) => void;
  isSelected: (id: string) => boolean;
  toggleAll: () => void;
}

export default function ProductTable({
  products,
  selected,
  toggleSelect,
  isSelected,
  toggleAll,
}: ProductTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="rounded-lg overflow-hidden bg-white shadow-md">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-gray-50 text-xs text-gray-500">
          <tr>
            <th className="px-4 py-3">
              <input
                type="checkbox"
                checked={
                  selected.length === products.length && products.length > 0
                }
                onChange={toggleAll}
              />
            </th>
            <th className="px-4 py-3 text-left">Nombre</th>
            <th className="px-4 py-3 text-left">Referencia</th>
            <th className="px-4 py-3 text-left">Precio</th>
            <th className="px-4 py-3 text-left">Descripción</th>
            <th className="px-4 py-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              isSelected={isSelected(product.id)}
              toggleSelect={toggleSelect}
            />
          ))}
        </tbody>
      </table>

      {/* Paginación simple */}
      <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-500">
        <span>
          Mostrando {paginatedProducts.length} de {products.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="text-sm px-2 py-1 border rounded disabled:opacity-50"
          >
            ← Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="text-sm px-2 py-1 border rounded disabled:opacity-50"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
