// src/features/pos/SalesSidebar.tsx
import { FiUserPlus } from "react-icons/fi";

export default function SalesSidebar() {
  return (
    <aside className="w-[410px] bg-white p-6 flex flex-col min-h-full shadow-lg">
      <h2 className="font-bold text-lg mb-6">Factura de venta</h2>
      <div className="flex gap-2 mb-4">
        <div className="flex-1">
          <div className="text-xs font-medium text-gray-500 mb-1">
            Lista de precio
          </div>
          <select className="w-full px-3 py-2 border rounded-lg text-gray-700">
            <option>General</option>
            {/* ...add more price lists */}
          </select>
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium text-gray-500 mb-1">
            Numeración
          </div>
          <select className="w-full px-3 py-2 border rounded-lg text-gray-700">
            <option>Consumo (02)</option>
            {/* ... */}
          </select>
        </div>
      </div>
      <div className="mb-6">
        <div className="text-xs font-medium text-gray-500 mb-1">Cliente</div>
        <div className="flex gap-2 items-center">
          <select className="flex-1 px-3 py-2 border rounded-lg text-gray-700">
            <option>Consumidor final</option>
            {/* ... */}
          </select>
          <button className="bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg px-3 py-2">
            <FiUserPlus />
            <span className="ml-1 text-sm">Nuevo</span>
          </button>
        </div>
      </div>
      {/* Empty state */}
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
        <span className="text-5xl mb-2">🛒</span>
        <div className="text-center">
          Aquí verás los productos que elijas <br /> en tu próxima venta
        </div>
      </div>
      {/* Checkout actions */}
      <div className="mt-6">
        <button
          className="w-full py-3 rounded-lg text-white font-semibold bg-emerald-600 text-lg disabled:bg-gray-300"
          disabled
        >
          Vender RD$0.0
        </button>
        <button className="w-full mt-2 py-2 text-emerald-600 bg-white rounded-lg border border-emerald-100 hover:bg-emerald-50">
          Cancelar
        </button>
      </div>
    </aside>
  );
}
