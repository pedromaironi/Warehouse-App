import { useState } from "react";
import { CartItem } from "../components/CartSidebar";

// ...definiciones anteriores (CartItem, Props, etc.)

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  item: CartItem;
  onSave: (
    updatedItem: CartItem & { discount?: number; description?: string }
  ) => void;
}

export default function EditProductModal({
  open,
  onClose,
  item,
  onSave,
}: EditProductModalProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [discount, setDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [priceBase] = useState(item.price / 1.18); // Calculado sin ITBIS
  const [itbisPercent] = useState(18);
  const [itbis] = useState((priceBase * itbisPercent) / 100);
  const [finalPrice] = useState(priceBase + itbis);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
        <h3 className="font-bold text-lg mb-4">Editar venta</h3>
        <div className="flex gap-3 items-center mb-4">
          <div className="w-14 h-14 rounded bg-gray-100 flex items-center justify-center text-gray-400">
            📦
          </div>
          <div>
            <div className="font-semibold text-sm">{item.name}</div>
            <div className="text-xs text-gray-500">Producto</div>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-2">
            <div>
              <label className="text-xs text-gray-500">Precio base</label>
              <input
                type="number"
                value={priceBase.toFixed(1)}
                className="border rounded px-2 w-20 h-8"
                readOnly
              />
            </div>
            <span className="text-xl font-bold">+</span>
            <div>
              <label className="text-xs text-gray-500">Impuesto</label>
              <input
                type="text"
                value={`ITBIS (${itbisPercent}%)`}
                className="border rounded px-2 w-32 h-8"
                readOnly
              />
            </div>
            <span className="text-xl font-bold">=</span>
            <div>
              <label className="text-xs text-gray-500">Precio final</label>
              <input
                type="number"
                value={finalPrice.toFixed(1)}
                className="border rounded px-2 w-20 h-8"
                readOnly
              />
            </div>
          </div>
          <div className="flex gap-2 mb-2">
            <div className="flex-1">
              <label className="text-xs text-gray-500">Cantidad</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border rounded px-2 h-8"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-500">Descuento (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full border rounded px-2 h-8"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-2 h-20"
            />
          </div>
        </div>
        <div className="border-t pt-3 mt-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>RD${priceBase.toFixed(1)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>ITBIS (18.0%)</span>
            <span>RD${itbis.toFixed(1)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Total</span>
            <span>RD${finalPrice.toFixed(1)}</span>
          </div>
          <div className="flex gap-2">
            <button
              className="flex-1 py-2 rounded border cursor-pointer hover:bg-gray-100"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="flex-1 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
              onClick={() =>
                onSave({ ...item, quantity, discount, description })
              }
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
