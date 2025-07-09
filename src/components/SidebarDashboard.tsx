import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaFolder,
  FaCalendarAlt,
  FaFileAlt,
  FaChartPie,
  FaChevronDown,
  FaChevronUp,
  FaBars,
} from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

interface SidebarDashboardProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function SidebarDashboard({ isOpen, toggleSidebar }: SidebarDashboardProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Structure matches SidebarPOS for consistency
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <IoHomeOutline />,
    },
    {
      name: "POS",
      path: "/dashboard/pos",
      icon: <FaFileAlt />,
    },
    {
      name: "Productos",
      icon: <FaFolder />,
      children: [
        { name: "Productos y servicios", path: "/dashboard/products" },
        { name: "Inventario", path: "/dashboard/projects/inventory-value" },
        { name: "Ajustes de inventario", path: "/dashboard/projects/inventory-adjustments" },
        { name: "Gestión de artículos", path: "/dashboard/projects/item-management" },
        { name: "Lista de precios", path: "/dashboard/projects/price-lists" },
        { name: "Almacenes", path: "/dashboard/projects/warehouses" },
        { name: "Categorías", path: "/dashboard/projects/categories" },
        { name: "Atributos", path: "/dashboard/projects/attributes" },
      ],
    },
    {
      name: "Soon",
      path: "/dashboard/calendar",
      icon: <FaCalendarAlt />,
    },
    {
      name: "Soon",
      path: "/dashboard/documents",
      icon: <FaFileAlt />,
    },
    {
      name: "Soon",
      path: "/dashboard/reports",
      icon: <FaChartPie />,
    },
  ];

  // Dropdown handler for consistency (uses menu name)
  const handleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <aside
      className={`h-screen bg-white text-gray-800 transition-all duration-300 fixed top-0 left-0 z-40 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div className={`flex items-center p-4 ${isOpen ? "justify-between" : "justify-center"}`}>
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
            // Dropdown for 'Productos'
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
                    onClick={() => handleDropdown(item.name)}
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
                  {isOpenDropdown && isOpen && (
                    <ul className="ml-6 mt-1">
                      {item.children.map((sub, subIdx) => (
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
            // Normal (no dropdown)
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
        {/* User Info */}
        <div className="p-4 border-t border-gray-400 text-sm text-gray-500 flex items-center justify-center md:justify-start gap-2 mt-4">
          <FaUsers className="text-gray-400" />
          {isOpen && <span>Pedro M. Toribio</span>}
        </div>
      </div>
    </aside>
  );
}
