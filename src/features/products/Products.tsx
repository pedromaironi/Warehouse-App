import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "./components/ProductTable";
import { useProducts } from "./hooks/useProducts";
import ProductActions from "./components/ProductActions";

export default function Products() {
  const { products } = useProducts();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const isSelected = (id: string) => selected.includes(id);

  const toggleAll = () => {
    setSelected((prev) =>
      prev.length === products.length ? [] : products.map((p) => p.id)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Productos y servicios
          </h1>
          <p className="text-sm text-gray-500">
            Gestiona todos los detalles de tus productos y servicios.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="border px-3 py-1.5 text-sm rounded-md text-gray-700 hover:bg-gray-100">
            Más acciones
          </button>
          <button
            onClick={() => navigate("/dashboard/products/new")}
            className="bg-emerald-600 text-white px-4 py-2 text-sm rounded-md hover:bg-emerald-700"
          >
            + Nuevo producto/servicio
          </button>
        </div>
      </div>

      {selected.length > 0 && (
        <ProductActions
          selected={selected}
          clearSelection={() => setSelected([])}
        />
      )}

      <ProductTable
        products={products}
        selected={selected}
        toggleSelect={toggleSelect}
        isSelected={isSelected}
        toggleAll={toggleAll}
      />
    </div>
  );
}
