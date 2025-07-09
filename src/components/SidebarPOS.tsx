import {
  FaFileAlt,
  FaCashRegister,
  FaHistory,
  FaUsers,
  FaBars,
  FaMoneyBillWave,
  FaUndo,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

interface SidebarPOSProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function SidebarPOS({ isOpen, toggleSidebar }: SidebarPOSProps) {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Helper to handle dropdown menus
  const handleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Menu items structure (matches Alegra POS)
  const menuItems = [
    {
      name: "Facturar",
      path: "/dashboard/pos",
      icon: <FaCashRegister />,
    },
    {
      name: "Ingresos",
      icon: <FaMoneyBillWave />,
      children: [
        {
          name: "Historial de ventas",
          path: "/dashboard/pos/history",
        },
        {
          name: (
            <span className="flex items-center gap-2">
              Facturación electrónica
              <span className="text-xs bg-gray-100 px-2 py-0.5 rounded ml-2 text-gray-500 border border-gray-200">
                Desactivada
              </span>
            </span>
          ),
          path: "/dashboard/pos/electronic-invoice",
        },
      ],
    },
    {
      name: "Turnos",
      icon: <FaHistory />,
      children: [
        {
          name: "Historial de turnos",
          path: "/dashboard/pos/shift-history",
        },
        {
          name: "Reportes de turnos",
          path: "/dashboard/pos/shift-reports",
        },
      ],
    },
    {
      name: "Gestión de efectivo",
      path: "/dashboard/pos/cash-management",
      icon: <FaFileAlt />,
    },
    {
      name: "Devoluciones",
      path: "/dashboard/pos/returns",
      icon: <FaUndo />,
    },
    {
      name: "Contactos",
      path: "/dashboard/pos/contacts",
      icon: <FaUsers />,
    },
    {
      name: "Inventario",
      icon: <MdOutlineInventory2 />,
      children: [
        {
          name: "Productos y servicios",
          path: "/dashboard/pos/products",
        },
        {
          name: "Ajustes de inventario",
          path: "/dashboard/pos/inventory-adjustments",
        },
        {
          name: "Almacenes",
          path: "/dashboard/pos/warehouses",
        },
        {
          name: "Listas de precios",
          path: "/dashboard/pos/price-lists",
        },
        {
          name: "Categorías",
          path: "/dashboard/pos/categories",
        },
        {
          name: "Atributos",
          path: "/dashboard/pos/attributes",
        },
      ],
    },
    {
      name: "Configuraciones",
      path: "/dashboard/pos/settings",
      icon: <FiSettings />,
    },
    // Extras
    // {
    //   name: (
    //     <span className="flex items-center gap-2">
    //       Mi suscripción
    //       <span className="text-xs bg-gray-100 px-2 py-0.5 rounded ml-2 text-gray-500 border border-gray-200">
    //         Plan Demo
    //       </span>
    //     </span>
    //   ),
    //   path: "/dashboard/pos/subscription",
    //   icon: <FaFileAlt />,
    //   extra: true,
    // },
    {
      name: "Atajos del teclado",
      path: "/dashboard/pos/shortcuts",
      icon: <FaFileAlt />,
      extra: true,
    },
    {
      name: (
        <span className="flex items-center gap-2">
          Portal de clientes
          <span className="ml-1 text-lg">&#8599;</span>
        </span>
      ),
      path: "/dashboard/pos/client-portal",
      icon: <FaFileAlt />,
      extra: true,
    },
    {
      name: (
        <span className="flex items-center gap-2">
          Contabilidad
          <span className="ml-1 text-lg">&#8599;</span>
        </span>
      ),
      path: "/dashboard",
      icon: <FaFileAlt />,
      extra: true,
    },
  ];

  return (
    <aside
      className={`h-screen bg-white text-gray-800 transition-all duration-300 fixed top-0 left-0 z-40 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center p-4 ${
          isOpen ? "justify-between" : "justify-center"
        }`}
      >
        <div className="flex items-center space-x-3 overflow-hidden">
          {isOpen ? (
            <>
              <img
                src="https://avatars.githubusercontent.com/u/80669905?s=200&v=4"
                alt="Logo"
                className="w-8 h-8 rounded-2xl"
              />
              <span className="text-lg font-semibold whitespace-nowrap">
                Inkflow
              </span>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="w-full flex justify-center"
            >
              <FaBars className="h-5 cursor-pointer w-5 text-gray-600" />
            </button>
          )}
        </div>
        <div className="flex items-center space-x-3 overflow-hidden">
          {isOpen ? (
            <button onClick={toggleSidebar}>
              <FaBars className="h-5 cursor-pointer w-5 text-gray-600" />
            </button>
          ) : (
            <div className="hidden w-0"></div>
          )}
        </div>
      </div>

      <div className="border-b border-gray-400 ml-6 mr-6"></div>
      <div className="p-4">
        <ul>
          {menuItems.map((item, idx) => {
            // Render items with children as dropdowns
            if (item.children) {
              const isOpenDropdown = openDropdown === item.name;
              return (
                <li key={idx} className="mb-2">
                  <div
                    className={`flex justify-between items-center px-3 py-2 rounded-md transition cursor-pointer ${
                      isOpenDropdown
                        ? "bg-gray-100 text-emerald-600 font-medium"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => handleDropdown(item.name as string)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      {isOpen && <span>{item.name}</span>}
                    </div>
                    {isOpen && (
                      <span>
                        {isOpenDropdown ? (
                          <FaChevronUp className="w-4 h-4" />
                        ) : (
                          <FaChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>
                  {/* Dropdown list */}
                  {isOpenDropdown && isOpen && (
                    <ul className="ml-6 mt-1">
                      {item.children.map((sub, subIdx: number) => (
                        <li key={subIdx} className="mt-1">
                          <Link
                            to={sub.path}
                            className={`block px-3 py-2 rounded-md transition text-sm ${
                              location.pathname === sub.path
                                ? "bg-gray-100 text-emerald-600 font-medium"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            }
            // Render normal items
            return (
              <li key={item.path as string} className="mb-2">
                <Link
                  to={item.path as string}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition text-sm ${
                    location.pathname === item.path
                      ? "bg-gray-100 text-emerald-600 font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {isOpen && <span>{item.name}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Footer - puedes personalizar aquí si deseas info de usuario */}
      {/* ... */}
    </aside>
  );
}
