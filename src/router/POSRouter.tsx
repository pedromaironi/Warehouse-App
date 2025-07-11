import { Routes, Route } from "react-router-dom";
import POSPage from "../features/pos/pages/POSPage";
import SalesHistoryPage from "../features/pos/pages/SalesHistoryPage";
import SaleDetailPage from "../features/pos/pages/SalesDetailPage";
import GeneralSettingsPage from "../features/settings/pages/GeneralSettingsPage";
import ShiftHistoryPage from "../features/pos/pages/ShiftHistoryPage";
import ShiftDetailPage from "../features/pos/pages/ShiftDetailPage";
import ShiftReportPage from "../features/pos/pages/ShiftReportPage";

export const POSRouter = () => {
  return (
    <Routes>
      {/* Default */}
      <Route path="/" element={<POSPage />} />

      {/* Invoices page */}
      <Route path="history" element={<SalesHistoryPage />} />
      <Route path="history/:id" element={<SaleDetailPage />} />

      {/* Shift */}
      <Route path="shift-history" element={<ShiftHistoryPage />} />
      <Route path="shift-history/:id" element={<ShiftDetailPage />} />
      <Route path="shift-reports" element={<ShiftReportPage />} />

      <Route path="settings" element={<GeneralSettingsPage />} />

      {/* Catch-all (optional for handling 404s) */}
      <Route path="*" element={<POSPage />} />
    </Routes>
  );
};
