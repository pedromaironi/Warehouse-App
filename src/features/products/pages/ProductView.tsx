import { useParams, useNavigate } from "react-router-dom";
import { Product } from "../types/product";

const mockProduct: Product = {
  id: "1",
  name: "Cerveza Presidente Light",
  reference: "REF-001",
  price: 1906.8,
  description: "Producto alcohólico",
  status: "activo",
};

export default function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();

  // En el futuro: buscar por ID
  const product = mockProduct;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Detalles del producto</h1>
        <button
          onClick={() => navigate(`/dashboard/products/${id}/edit`)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Editar
        </button>
      </div>

      <div className="space-y-4 text-gray-700">
        <div>
          <span className="font-medium">Nombre:</span> {product.name}
        </div>
        <div>
          <span className="font-medium">Referencia:</span> {product.reference}
        </div>
        <div>
          <span className="font-medium">Precio:</span> RD${product.price}
        </div>
        <div>
          <span className="font-medium">Descripción:</span>{" "}
          {product.description}
        </div>
        <div>
          <span className="font-medium">Estado:</span> {product.status}
        </div>
      </div>
    </div>
  );
}
