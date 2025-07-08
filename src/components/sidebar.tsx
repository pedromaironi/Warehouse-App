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

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const location = useLocation();

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <IoHomeOutline /> },
    { name: "POS", path: "/dashboard/pos", icon: <FaFileAlt /> },
    {
      name: "Productos",
      path: "/dashboard/products",
      icon: <FaFolder />,
      subItems: [
        { name: "Productos y servicios", path: "/dashboard/products" },
        { name: "Inventario", path: "/dashboard/projects/inventory-value" },
        {
          name: "Ajustes de inventario",
          path: "/dashboard/projects/inventory-adjustments",
        },
        {
          name: "Gestión de artículos",
          path: "/dashboard/projects/item-management",
        },
        { name: "Lista de precios", path: "/dashboard/projects/price-lists" },
        { name: "Almacenes", path: "/dashboard/projects/warehouses" },
        { name: "Categorías", path: "/dashboard/projects/categories" },
        { name: "Atributos", path: "/dashboard/projects/attributes" },
      ],
    },
    { name: "Soon", path: "/dashboard/calendar", icon: <FaCalendarAlt /> },
    { name: "Soon", path: "/dashboard/documents", icon: <FaFileAlt /> },
    { name: "Soon", path: "/dashboard/reports", icon: <FaChartPie /> },
  ];

  return (
    <aside
      className={`h-screen bg-white text-gray-800 transition-all duration-300 fixed top-0 left-0 z-40 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 ">
        {isOpen ? (
          <>
            <div className="flex items-center space-x-3 overflow-hidden">
              <img
                src="https://avatars.githubusercontent.com/u/80669905?s=200&v=4"
                alt="Logo"
                className="w-8 h-8 rounded-2xl"
              />
              <span className="text-lg font-semibold whitespace-nowrap">
                Inkflow
              </span>
            </div>
            <button onClick={toggleSidebar}>
              <FaBars className="h-5 w-5 text-gray-600" />
            </button>
          </>
        ) : (
          <button
            onClick={toggleSidebar}
            className="w-full flex justify-center"
          >
            <FaBars className="h-5 w-5 text-gray-600" />
          </button>
        )}
      </div>
        <div className="border-b border-gray-400 ml-6 mr-6"></div>
      {/* Navigation */}
      <div className="p-4">
        <ul>
          {menuItems.map((item, index) => (
            <li key={item.path} className="mb-2">
              <div
                className={`flex justify-between items-center px-3 py-2 rounded-md transition ${
                  location.pathname === item.path
                    ? "bg-gray-100 text-indigo-600 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => item.subItems && toggleDropdown(index)}
              >
                <Link
                  to={item.path}
                  className="flex items-center gap-3 justify-center md:justify-start"
                >
                  <span className="text-lg text-gray-500">{item.icon}</span>
                  {isOpen && <span className="text-sm">{item.name}</span>}
                </Link>
                {item.subItems && isOpen && (
                  <span>
                    {openDropdown === index ? (
                      <FaChevronUp className="w-4 h-4" />
                    ) : (
                      <FaChevronDown className="w-4 h-4" />
                    )}
                  </span>
                )}
              </div>

              {item.subItems && openDropdown === index && isOpen && (
                <ul className="ml-6 mt-1">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.path} className="mt-1">
                      <Link
                        to={subItem.path}
                        className={`block px-3 py-2 rounded-md transition text-sm ${
                          location.pathname === subItem.path
                            ? "bg-gray-100 text-indigo-600 font-medium"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* User Info */}
        <div className="p-4 border-t border-gray-400 text-sm text-gray-500 flex items-center justify-center md:justify-start gap-2">
          <FaUsers className="text-gray-400" />
          {isOpen && <span>Pedro M. Toribio</span>}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
