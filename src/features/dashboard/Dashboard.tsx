import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { DashboardRouter } from "../../router/DashboardRouter";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Ajustar espacio lateral según estado del sidebar */}
      <main
        className={`transition-all duration-300 px-6 pt-6 flex-1 overflow-y-auto ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <DashboardRouter />
      </main>
    </div>
  );
}
