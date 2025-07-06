import { Routes, Route } from "react-router-dom";
import Products from "../pages/Products";
import ProductView from "../pages/ProductView";
import ProductForm from "../pages/ProductForm";

export default function ProductsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="new" element={<ProductForm />} />
      <Route path=":id" element={<ProductView />} />
      <Route path=":id/edit" element={<ProductForm />} />
    </Routes>
  );
}
