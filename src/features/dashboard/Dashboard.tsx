// src/features/dashboard/Dashboard.tsx
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { DashboardRouter } from "../../router/DashboardRouter";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen((o) => !o)}
      />

      {/* Main content */}
      <main
        className={`
          flex-1
          overflow-y-auto
          transition-all duration-300
          ${sidebarOpen ? "ml-64" : "ml-20"}
        `}
      >
        {/* Boxed container: centers and constrains width, adds padding */}
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-6">
          <DashboardRouter />
        </div>
      </main>
    </div>
  );
}
