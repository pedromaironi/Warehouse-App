import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaFolder,
  FaCalendarAlt,
  FaFileAlt,
  FaChartPie,
  FaBars,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
  const location = useLocation(); // Get current path

  // Toggle Sidebar
  const toggleSidebar = () => setIsOpen(!isOpen);

  // Toggle Dropdown
  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  // Sidebar items with dropdown support
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <IoHomeOutline /> },
    { name: "Facturacion", path: "/dashboard/invoices", icon: <FaFileAlt /> },
    {
      name: "Productos",
      path: "/dashboard/projects",
      icon: <FaFolder />,
      subItems: [
        { name: "Productos y servicios", path: "/dashboard/products" },
        { name: "Inventario", path: "/dashboard/projects/inventory-value" },
        { name: "Ajustes de inventario", path: "/dashboard/projects/inventory-adjustments" },
        { name: "Gestion de articulos", path: "/dashboard/projects/item-management" },
        { name: "Lista de precios", path: "/dashboard/projects/price-lists" },
        { name: "Almacenes", path: "/dashboard/projects/warehouses" },
        { name: "Categorias", path: "/dashboard/projects/categories" },
        { name: "Atributos", path: "/dashboard/projects/attributes" },
      ],
    },
    {
      name: "Soon",
      path: "/dashboard/calendar",
      icon: <FaCalendarAlt />,
    },
    { name: "Soon", path: "/dashboard/documents", icon: <FaFileAlt /> },
    { name: "Soon", path: "/dashboard/reports", icon: <FaChartPie /> },
  ];

  return (
    <div className="flex-1">
      {/* Sidebar */}
      <div
        className={`fixed md:relative h-screen bg-indigo-700 text-white transition-all duration-300 ${
          isOpen ? "w-64" : "w-0 md:w-20"
        } overflow-hidden`}
      >
        {/* Sidebar Header with Logo and Toggle Button */}
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="https://avatars.githubusercontent.com/u/80669905?s=200&v=4"
              alt="Logo"
              className="w-8 h-8 rounded-2xl"
            />
            {isOpen && <span className="text-lg font-semibold">Inkflow</span>}
          </div>

          {/* Toggle Button */}
          <button onClick={toggleSidebar} className="md:hidden">
            <FaBars className="h-5 w-5 cursor-pointer" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className={`${isOpen ? "block" : "hidden md:block"} p-4`}>
          {/* Navigation */}
          <nav>
            <ul>
              {menuItems.map((item, index) => (
                <li key={item.path} className="mt-1 mb-1">
                  {/* Main Menu Item */}
                  <div
                    className={`flex justify-between items-center px-4 py-2 rounded-2xl transition duration-200 ${
                      location.pathname === item.path
                        ? "bg-indigo-900"
                        : "hover:bg-indigo-600"
                    }`}
                    onClick={() => item.subItems && toggleDropdown(index)} // Toggle dropdown if subItems exist
                  >
                    <Link
                      to={item.path}
                      className="flex items-center space-x-3 text-white"
                    >
                      <span className="w-5 h-5">{item.icon}</span>
                      {isOpen && <span>{item.name}</span>}
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

                  {/* Dropdown Submenu */}
                  {item.subItems && openDropdown === index && isOpen && (
                    <ul className="ml-8 mt-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.path} className="mt-1">
                          <Link
                            to={subItem.path}
                            className={`block px-4 py-2 rounded-2xl transition duration-200 ${
                              location.pathname === subItem.path
                                ? "bg-indigo-900"
                                : "hover:bg-indigo-600"
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
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-indigo-500 flex items-center space-x-3">
            <FaUsers size={40} className={!isOpen ? "block" : "hidden"} />
            {isOpen && <span>Pedro M. Toribio</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;