import React from "react";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const isPOS = location.pathname.startsWith("/dashboard/pos");

  return (
    <div className="flex min-h-screen bg-gray-100 h-full">
      <main
        className={
          isPOS
            ? "flex-1 overflow-auto p-0 w-full" // POS: no padding, full width
            : "flex-1 overflow-auto mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-6"
            // Non-POS: centered, boxed, padding
        }
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
