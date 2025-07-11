import { useState, useRef, useEffect } from "react";
import { Sale } from "../types/sales";
import { useNavigate } from "react-router-dom";

interface Props {
  sales: Sale[];
}

/**
 * SalesTable component
 * Displays a list of sales/invoices in a modern, card-like table UI with actions.
 * - Each row shows invoice details, status badge, and an action menu.
 * - The action menu appears on click and closes when clicking outside.
 */
export default function SalesTable({ sales }: Props) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  // Close the action menu if user clicks outside of it
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        openMenu &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openMenu]);

  return (
    <div className="bg-white shadow rounded-xl overflow-auto ">
      <table className="w-full min-w-[900px] text-sm">
        <thead>
          <tr className="text-left bg-gray-50 text-gray-600 font-semibold">
            <th className="px-4 py-3">Numero de factura</th>
            <th className="px-4 py-3">Cliente</th>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Metodo de pago</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {sales.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center text-gray-400 py-8">
                No sales to display
              </td>
            </tr>
          )}
          {sales.map((sale) => (
            <tr
              key={sale.id}
              // Card-style row with hover effects
              className="bg-white hover:shadow-lg transition-all duration-150 border rounded-xl my-2"
              style={{ borderBottom: "8px solid #f9fafb" }}
            >
              <td className="px-4 py-4 font-semibold text-gray-700">
                {sale.invoiceNumber}
              </td>
              <td className="px-4 py-4">{sale.customer}</td>
              <td className="px-4 py-4 text-gray-500">
                {new Date(sale.date).toLocaleString("en-US")}
              </td>
              <td className="px-4 py-4">
                <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-base font-bold shadow-sm inline-block">
                  RD${sale.total.toLocaleString("es-DO")}
                </span>
              </td>
              <td className="px-4 py-4">{sale.paymentType}</td>
              <td className="px-4 py-4">
                {/* Status as pill badge */}
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold 
                    ${
                      sale.status === "pagada"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-gray-100 text-gray-500"
                    }
                  `}
                >
                  <span
                    className={`w-2 h-2 rounded-full 
                      ${
                        sale.status === "pagada"
                          ? "bg-emerald-600"
                          : "bg-gray-400"
                      }
                    `}
                  ></span>
                  {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                </span>
              </td>
              <td className="px-4 py-4 text-right relative">
                {/* Dropdown menu */}
                <button
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded hover:bg-blue-100 font-bold cursor-pointer"
                  onClick={() => navigate(`/dashboard/pos/history/${sale.id}`)}
                >
                  Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination or summary can be added here */}
    </div>
  );
}
