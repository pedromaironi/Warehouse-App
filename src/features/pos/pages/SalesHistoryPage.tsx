// src/features/pos/pages/SalesHistoryPage.tsx
import { useState } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import { MOCK_SALES } from "../data/mockSales";
import SalesTable from "../components/SalesTable";
import SalesFilter from "../components/SalesHistoryFilter";

export default function SalesHistoryPage() {
  // Global filters
  const [filters, setFilters] = useState({ status: ["pagada"], date: "" });
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");

  // Apply filters & search
  const filtered = MOCK_SALES.filter((sale) => {
    // Status filter
    const statusMatch =
      filters.status.length === 0 || filters.status.includes(sale.status);
    // Date filter
    const dateMatch =
      !filters.date || sale.date.slice(0, 10) === filters.date;
    // Search filter
    const searchText = `${sale.invoiceNumber} ${sale.customer}`.toLowerCase();
    const searchMatch =
      !search || searchText.includes(search.toLowerCase());
    return statusMatch && dateMatch && searchMatch;
  });

  return (
    <div className="max-w-6xl mx-auto relative pt-6">
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-3xl font-bold mb-1">Facturas</h2>
        <button
          className="bg-white shadow-xs flex items-center gap-2 border cursor-pointer px-3 py-1 rounded hover:bg-gray-100 relative"
          onClick={() => setShowFilter((s) => !s)}
        >
          <FiFilter />
          Filtrar
          {/* active filters */}
          {(filters.status.length > 0 || filters.date) && (
            <span className="ml-1 bg-emerald-700 text-white text-xs px-2 py-0.5 rounded-full">
              {filters.status.length + (filters.date ? 1 : 0)}
            </span>
          )}
        </button>
        {showFilter && (
          <SalesFilter
            filters={filters}
            onChange={setFilters}
            onCancel={() => setShowFilter(false)}
            onApply={() => setShowFilter(false)}
          />
        )}
      </div>

      {/* Buscador */}
      <div className="relative mb-5 max-w-md">
        <FiSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          className="pl-10 pr-3 py-2 border rounded w-full focus:outline-emerald-600"
          placeholder="Buscar por factura, cliente, o número de orden"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <SalesTable sales={filtered} />
    </div>
  );
}
