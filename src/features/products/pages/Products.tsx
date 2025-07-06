import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductTable from "../components/ProductTable";
import ProductActions from "../components/ProductActions";
import FilterProducts, { FilterValues } from "../components/ProductFilter";
import QuickProductModal from "../components/QuickProductModal";

export default function Products() {
  const { products, updateStatus, deleteProducts } = useProducts();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [showQuickModal, setShowQuickModal] = useState(false);

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

  const [filters, setFilters] = useState({
    name: "",
    reference: "",
    price: "",
    description: "",
    status: "todos",
  });

  const handleFilter = (newFilters: FilterValues) => setFilters(newFilters);
  const clearFilter = () =>
    setFilters({
      name: "",
      reference: "",
      price: "",
      description: "",
      status: "todos",
    });

  const filteredProducts = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(filters.name.toLowerCase());
    const matchRef = p.reference
      .toLowerCase()
      .includes(filters.reference.toLowerCase());
    const matchDesc = (p.description ?? "")
      .toLowerCase()
      .includes(filters.description.toLowerCase());
    const matchPrice =
      filters.price === "" || String(p.price).includes(filters.price);
    const matchStatus =
      filters.status === "todos" || p.status === filters.status;
    return matchName && matchRef && matchDesc && matchPrice && matchStatus;
  });
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
      {/* Encabezado */}
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
            onClick={() => setShowQuickModal(true)}
            className="cursor-pointer bg-emerald-600 text-white px-4 py-2 text-sm rounded-md hover:bg-emerald-700"
          >
            + Nuevo producto/servicio
          </button>
        </div>
      </div>

      {/* Acciones por selección */}
      {selected.length > 0 && (
        <ProductActions
          selected={selected}
          clearSelection={() => setSelected([])}
          onActivate={() => {
            updateStatus(selected, "activo");
            setSelected([]);
          }}
          onDeactivate={() => {
            updateStatus(selected, "inactivo");
            setSelected([]);
          }}
          onDelete={() => {
            deleteProducts(selected);
            setSelected([]);
          }}
        />
      )}

      {/* Filtros por columna */}
      {showFilters && (
        <div className="flex items-center flew-row gap-2 px-2 py-2 w-full">
          <FilterProducts
            onFilter={handleFilter}
            onClear={() => {
              clearFilter();
              setShowFilters(false);
            }}
          />

          <div className="flex justify-end w-full">
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="text-sm text-emerald-600 hover:underline"
            >
              {showFilters ? "Cerrar" : "Filtrar"}
            </button>
          </div>
        </div>
      )}
      <div className={`flex justify-end ${showFilters ? "hidden" : "text-sm"}`}>
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="text-sm text-emerald-600 hover:underline"
        >
          {showFilters ? "Cerrar" : "Filtrar"}
        </button>
      </div>
      {/* Tabla */}
      <ProductTable
        products={filteredProducts}
        selected={selected}
        toggleSelect={toggleSelect}
        isSelected={isSelected}
        toggleAll={toggleAll}
      />
      {showQuickModal && (
        <QuickProductModal onClose={() => setShowQuickModal(false)} />
      )}
    </div>
  );
}
