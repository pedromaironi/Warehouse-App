import { useState } from "react";

export interface FilterValues {
  name: string;
  reference: string;
  price: string;
  description: string;
  status: "todos" | "activo" | "inactivo";
}

interface FilterProductsProps {
  onFilter: (filters: FilterValues) => void;
  onClear: () => void;
}

export default function FilterProducts({
  onFilter,
  onClear,
}: FilterProductsProps) {
  const [filters, setFilters] = useState<FilterValues>({
    name: "",
    reference: "",
    price: "",
    description: "",
    status: "activo",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onFilter(filters);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-2">
      <input
        name="name"
        value={filters.name}
        onChange={handleChange}
        placeholder="Nombre"
        className="border px-3 py-1 rounded-md text-sm"
      />
      <input
        name="reference"
        value={filters.reference}
        onChange={handleChange}
        placeholder="Referencia"
        className="border px-3 py-1 rounded-md text-sm"
      />
      <input
        name="price"
        value={filters.price}
        onChange={handleChange}
        placeholder="Precio"
        className="border px-3 py-1 rounded-md text-sm"
      />
      <input
        name="description"
        value={filters.description}
        onChange={handleChange}
        placeholder="Descripción"
        className="border px-3 py-1 rounded-md text-sm"
      />
      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="border px-2 py-1 rounded-md text-sm"
      >
        <option value="todos">Todos</option>
        <option value="activo">Activos</option>
        <option value="inactivo">Inactivos</option>
      </select>
    </div>
  );
}
