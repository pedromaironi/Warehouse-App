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
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-gray-50 border-b text-xs text-gray-500 uppercase">
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
          {products.map((product) => (
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
      <div className="flex justify-between items-center px-4 py-3 text-sm border-t text-gray-500">
        <span>
          Mostrando {products.length} de {products.length}
        </span>
        <div>
          Página <strong>1</strong> de <strong>1</strong>
        </div>
      </div>
    </div>
  );
}
