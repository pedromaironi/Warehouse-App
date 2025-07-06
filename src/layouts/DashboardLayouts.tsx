import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  // local state for sidebar open/close
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* pass both props down */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* main content */}
      <main className="flex-1 overflow-auto bg-white p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
