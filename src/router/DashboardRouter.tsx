import { Routes, Route } from "react-router-dom";
import Invoices from "../pages/Invoices";
import Home from "../features/dashboard/Home";
import ProductsRoutes from "../features/products/routes/product.routes";

export const DashboardRouter = () => {
  return (
    <Routes>
      {/* Default home page */}
      <Route path="/" element={<Home />} />

      {/* Invoices page */}
      <Route path="invoices" element={<Invoices />} />

      <Route path="products" element={<ProductsRoutes />} />
      <Route path="products/*" element={<ProductsRoutes />} />
      {/* <Route path="projects/inventory-value" element={<Inventory />} />
      <Route path="projects/inventory-adjustments" element={<InventoryAdjustments />} />
      <Route path="projects/item-management" element={<ItemManagement />} />
      <Route path="projects/price-lists" element={<PriceLists />} />
      <Route path="projects/warehouses" element={<Warehouses />} />
      <Route path="projects/categories" element={<Categories />} />
      <Route path="projects/attributes" element={<Attributes />} />

      {/* Rutas placeholder */}
      {/* <Route path="calendar" element={<Soon />} /> */}
      {/* <Route path="documents" element={<Soon />} /> */}
      {/* <Route path="reports" element={<Soon />} /> */}

      {/* Catch-all (optional for handling 404s) */}
      {/* <Route path="*" element={<Error />} /> */}
    </Routes>
  );
};
