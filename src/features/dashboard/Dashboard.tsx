// src/features/dashboard/Dashboard.tsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { DashboardRouter } from "../../router/DashboardRouter";
import DashboardLayout from "../../layouts/DashboardLayouts";
import SidebarDashboard from "../../components/SidebarDashboard";
import SidebarPOS from "../../components/SidebarPOS";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const isPOS = location.pathname.startsWith("/dashboard/pos");

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar: POS or General */}
      {isPOS ? (
        <SidebarPOS isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(o => !o)} />
      ) : (
        <SidebarDashboard isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(o => !o)} />
      )}

      {/* Main content */}
      <main
        className={`
          flex-1
          overflow-y-auto
          transition-all duration-300
          ${sidebarOpen ? "ml-64" : "ml-20"}
        `}
      >
        <DashboardLayout>
          <DashboardRouter />
        </DashboardLayout>
      </main>
    </div>
  );
}
