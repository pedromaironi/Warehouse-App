import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Product } from "../types/product";

export default function ProductForm() {
  const { id } = useParams(); // Si existe, es edición
  const navigate = useNavigate();

  const [form, setForm] = useState<Product>({
    id: id || crypto.randomUUID(),
    name: "",
    reference: "",
    price: 0,
    description: "",
    status: "activo",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí guardarías en base de datos o contexto
    console.log("Producto guardado:", form);
    navigate("/dashboard/products");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {id ? "Editar producto" : "Nuevo producto/servicio"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tipo de producto (solo visual) */}
        <div className="flex gap-4">
          {["Producto", "Servicio", "Combo"].map((type) => (
            <button
              key={type}
              type="button"
              className={`px-4 py-2 border rounded-md ${
                type === "Producto"
                  ? "bg-emerald-600 text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Nombre *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Referencia</label>
            <input
              name="reference"
              value={form.reference}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Precio *</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Estado</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/products")}
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            {id ? "Guardar cambios" : "Crear producto"}
          </button>
        </div>
      </form>
    </div>
  );
}
