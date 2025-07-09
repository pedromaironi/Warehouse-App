// src/features/pos/components/SalesTable.tsx
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Sale } from "../types/sales";
import { FiMoreVertical } from "react-icons/fi";

interface Props {
  sales: Sale[];
}
export default function SalesTable({ sales }: Props) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white shadow rounded-xl overflow-auto">
      <table className="w-full min-w-[1000px] text-sm">
        <thead>
          <tr className="text-left bg-gray-50 text-gray-600 font-semibold">
            <th className="px-4 py-3">Número de factura</th>
            <th className="px-4 py-3">Cliente</th>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Método de pago</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center text-gray-400 py-8">
                No hay ventas para mostrar
              </td>
            </tr>
          )}
          {sales.map((sale) => (
            <tr
              key={sale.id}
              className="border-t hover:bg-emerald-50 transition"
            >
              <td className="px-4 py-3 font-medium">{sale.invoiceNumber}</td>
              <td className="px-4 py-3">{sale.customer}</td>
              <td className="px-4 py-3">
                {new Date(sale.date).toLocaleString("es-DO")}
              </td>
              <td className="px-4 py-3 font-bold text-emerald-700">
                RD${sale.total.toLocaleString("es-DO")}
              </td>
              <td className="px-4 py-3">{sale.paymentType}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      sale.status === "pagada"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-gray-100 text-gray-500"
                    }
                  `}
                >
                  ● {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                </span>
              </td>
              <td className="px-4 py-3 text-right relative">
                <button
                  className="text-gray-500 cursor-pointer hover:text-emerald-700 transition p-2 rounded-full"
                  onClick={() =>
                    setOpenMenu(openMenu === sale.id ? null : sale.id)
                  }
                >
                  <FiMoreVertical size={20} />
                </button>
                {openMenu === sale.id && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 mt-2 w-40 bg-white shadow-xl rounded-lg z-20 hover:bg-emerald-50"
                  >
                    <ul>
                      <li>
                        <Link
                          to={`/pos/history/${sale.id}`}
                          className="block px-4 py-2 text-sm w-fit text-emerald-700 font-medium"
                        >
                          Mostrar detalles
                        </Link>
                      </li>
                      {/* Agrega más acciones aquí si lo necesitas */}
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
