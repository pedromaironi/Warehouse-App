import React from "react";

interface POSLayoutProps {
  children: React.ReactNode;
  rightSidebar?: React.ReactNode;
}

export default function POSLayout({ children, rightSidebar }: POSLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar/Menu (optional, for navigation) */}
      <aside className="w-16 bg-white shadow-sm flex flex-col items-center py-4">
        {/* TODO: Navigation icons */}
      </aside>

      {/* Main area */}
      <main className="flex-1 p-6 flex flex-col">
        {children}
      </main>

      {/* Right sidebar (cart/checkout) */}
      <aside className="w-[420px] bg-white border-l shadow-lg p-4">
        {rightSidebar}
      </aside>
    </div>
  );
}
