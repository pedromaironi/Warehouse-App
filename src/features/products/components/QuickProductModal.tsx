import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

const initialForm = {
  name: "",
  warehouse: "principal",
  unit: "",
  basePrice: "",
  tax: "18",
  totalPrice: "",
  quantity: "",
  cost: "",
};

const dummyUnits = [
  "Barril",
  "Bolsa",
  "Bote",
  "Bultos",
  "Botella",
  "Caja/Cajón",
  "Docena",
  "Galón",
  "Kilogramo",
  "Litro",
  "Metro",
  "Paquete",
  "Unidad",
];

export default function QuickProductModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [showError, setShowError] = useState(false);

  const requiredFields = [
    "name",
    "warehouse",
    "unit",
    "basePrice",
    "totalPrice",
    "quantity",
    "cost",
  ];
  const isValid = requiredFields.every(
    (key) => form[key as keyof typeof form].trim() !== ""
  );
  const { setProducts } = useProducts();

  useEffect(() => {
    const base = parseFloat(form.basePrice);
    const taxRate = parseFloat(form.tax);
    if (!isNaN(base) && !isNaN(taxRate)) {
      const total = base + base * (taxRate / 100);
      setForm((prev) => ({ ...prev, totalPrice: total.toFixed(2) }));
    }
  }, [form.basePrice, form.tax]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) {
      setShowError(true);
      return;
    }

    const newProduct = {
      id: crypto.randomUUID(),
      name: form.name,
      reference: "-",
      price: parseFloat(form.totalPrice),
      description: `Unidad: ${form.unit}, Almacén: ${form.warehouse}`,
      status: "activo" as const, // Cast to satisfy the Product type
    };

    setProducts((prev) => [...prev, newProduct]);
    console.log("Producto creado:", form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-90 flex items-center justify-center z-50 bg-opacity-100">
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h2 className="text-lg font-semibold mb-4">
            Formulario básico de productos
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Nombre *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nombre del producto"
                  className={`w-full border px-3 py-2 rounded-md text-sm ${
                    showError && !form.name ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Unidad de medida *
                </label>
                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded-md text-sm ${
                    showError && !form.unit ? "border-red-500" : ""
                  }`}
                >
                  <option value="">Buscar...</option>
                  {dummyUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                  <option value="new">+ Agregar unidad de medida</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Almacén *</label>
                <select
                  name="warehouse"
                  value={form.warehouse}
                  onChange={(e) => {
                    if (e.target.value === "new")
                      navigate("/dashboard/products/warehouses/new");
                    else handleChange(e);
                  }}
                  className={`w-full border px-3 py-2 rounded-md text-sm ${
                    showError && !form.warehouse ? "border-red-500" : ""
                  }`}
                >
                  <option value="principal">Principal</option>
                  <option value="new">+ Agregar nuevo almacén</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Precio base *
                </label>
                <input
                  name="basePrice"
                  value={form.basePrice}
                  onChange={handleChange}
                  placeholder="RD$0.000"
                  className={`w-full border px-3 py-2 rounded-md text-sm ${
                    showError && !form.basePrice ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Impuesto</label>
                <select
                  name="tax"
                  value={form.tax}
                  onChange={(e) => {
                    if (e.target.value === "new")
                      navigate("/dashboard/products/taxes/new");
                    else handleChange(e);
                  }}
                  className="w-full border px-3 py-2 rounded-md text-sm"
                >
                  <option value="0">Ninguno (0%)</option>
                  <option value="18">ITBIS - (18.00%)</option>
                  <option value="new">+ Agregar nuevo impuesto</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Precio total *
                </label>
                <input
                  name="totalPrice"
                  value={form.totalPrice}
                  readOnly
                  className={`w-full bg-gray-100 border px-3 py-2 rounded-md text-sm ${
                    showError && !form.totalPrice ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Cantidad *</label>
                <input
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded-md text-sm ${
                    showError && !form.quantity ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Costo inicial *
                </label>
                <input
                  name="cost"
                  value={form.cost}
                  onChange={handleChange}
                  placeholder="RD$0.000"
                  className={`w-full border px-3 py-2 rounded-md text-sm ${
                    showError && !form.cost ? "border-red-500" : ""
                  }`}
                />
              </div>
            </div>

            {showError && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <span className="text-lg">⚠</span> Campos obligatorios antes de
                guardar
              </p>
            )}

            <div className="flex justify-between items-center mt-4">
              <span
                onClick={() => navigate("/dashboard/products/new")}
                className="text-sm text-emerald-600 hover:underline cursor-pointer"
              >
                Ir al formulario avanzado
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="border px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
                >
                  Crear producto
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
