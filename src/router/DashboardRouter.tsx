import { Routes, Route } from "react-router-dom";
import Invoices from "../pages/Invoices";
import Home from "../pages/Home";

export const DashboardRouter = () => {
  return (
    <Routes>
      {/* Default home page */}
      <Route path="/" element={<Home />} />

      {/* Invoices page */}
      <Route path="/invoices" element={<Invoices />} />

      {/* Catch-all (optional for handling 404s) */}
      {/* <Route path="*" element={<Error />} /> */}
    </Routes>
  );
};
