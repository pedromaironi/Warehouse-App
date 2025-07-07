import React, { useState } from "react";

export interface WarehouseOption {
  id: string;
  name: string;
}

export interface WarehouseData {
  warehouseId: string;
  qty: string;
  minQty?: string;
  maxQty?: string;
}

interface Props {
  warehouses: WarehouseOption[];
  onSave: (data: WarehouseData) => void;
  onClose: () => void;
  defaultValue?: WarehouseData & { warehouseName?: string };
}

export default function AddWarehouseModal({
  warehouses,
  onSave,
  onClose,
  defaultValue,
}: Props) {
  const [form, setForm] = useState<WarehouseData>({
    warehouseId: defaultValue?.warehouseId || "",
    qty: defaultValue?.qty || "",
    minQty: defaultValue?.minQty || "",
    maxQty: defaultValue?.maxQty || "",
  });
  const [creating, setCreating] = useState(false);
  const [newWarehouse, setNewWarehouse] = useState("");

  // HANDLERS
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddWarehouse = () => {
    if (newWarehouse.trim()) {
      const newId = crypto.randomUUID();
      warehouses.push({ id: newId, name: newWarehouse });
      setForm((f) => ({ ...f, warehouseId: newId }));
      setNewWarehouse("");
      setCreating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.20)",
        backdropFilter: "blur(2px)",
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-0 w-full max-w-lg border border-neutral-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-7 pt-7 pb-4 border-b">
            <h2 className="text-xl font-bold text-neutral-800">
              Seleccionar bodegas
            </h2>
            <button
              type="button"
              className="text-neutral-400 hover:text-red-500 text-2xl font-bold rounded transition"
              onClick={onClose}
              tabIndex={0}
              aria-label="Cerrar"
            >
              &times;
            </button>
          </div>
          {/* Body */}
          <div className="px-7 py-5 flex flex-col gap-5">
            {/* Almacén */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Almacén <span className="text-emerald-600">*</span>
              </label>
              {!creating ? (
                <div className="flex gap-2 items-center">
                  <select
                    name="warehouseId"
                    value={form.warehouseId}
                    onChange={handleInput}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-gray-50 text-gray-900 text-base focus:border-emerald-500 outline-none"
                  >
                    <option value="">Seleccionar...</option>
                    {warehouses.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="rounded-lg border border-emerald-600 text-emerald-600 px-3 py-1.5 text-sm font-semibold hover:bg-emerald-50 transition"
                    onClick={() => setCreating(true)}
                  >
                    + Nuevo
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-gray-50 text-base"
                    value={newWarehouse}
                    onChange={(e) => setNewWarehouse(e.target.value)}
                    placeholder="Nombre almacén"
                  />
                  <button
                    type="button"
                    className="bg-emerald-600 text-white rounded-lg px-3 py-2 text-sm font-semibold hover:bg-emerald-700"
                    onClick={handleAddWarehouse}
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="rounded-lg border border-neutral-300 text-neutral-500 px-3 py-1.5 text-sm font-semibold hover:bg-neutral-100"
                    onClick={() => setCreating(false)}
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>

            {/* Cantidades: 3 columnas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Cantidad inicial <span className="text-emerald-600">*</span>
                </label>
                <input
                  name="qty"
                  type="number"
                  value={form.qty}
                  onChange={handleInput}
                  min={0}
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-gray-50 text-base focus:border-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Cantidad mínima
                </label>
                <input
                  name="minQty"
                  type="number"
                  value={form.minQty}
                  onChange={handleInput}
                  min={0}
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-gray-50 text-base focus:border-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Cantidad máxima
                </label>
                <input
                  name="maxQty"
                  type="number"
                  value={form.maxQty}
                  onChange={handleInput}
                  min={0}
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 bg-gray-50 text-base focus:border-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="flex justify-end gap-2 px-7 pb-7 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-neutral-300 text-neutral-500 px-5 py-2 font-semibold hover:bg-neutral-100 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-emerald-600 text-white px-5 py-2 font-semibold hover:bg-emerald-700 transition"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
