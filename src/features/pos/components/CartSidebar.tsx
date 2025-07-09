import { useState } from "react";
import EditProductModal from "../modal/EditProductModal";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
const priceLists = [
  "General",
  "Sin embase",
  "Con embase",
  "Con embase y Botellas",
  "Con botellas y sin embase",
  "Nana Provisiones",
];
const numerations = ["Consumo (01)", "Consumo (02)", "Consumo (03)"];
const customers = ["Consumidor final", "Cliente frecuente", "Empresa XYZ"];

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string[];
  quantity: number;
  stock: number;
  isFavorite?: boolean;
}
interface Props {
  items: CartItem[];
  onRemove: (productId: string) => void;
  onQtyChange: (productId: string, qty: number) => void;
  onCheckout: () => void;
  onCancel: () => void;
}

export default function CartSidebar({
  items,
  onRemove,
  onQtyChange,
  onCheckout,
  onCancel,
}: Props) {
  const [priceList, setPriceList] = useState(priceLists[0]);
  const [numeration, setNumeration] = useState(numerations[1]);
  const [customer, setCustomer] = useState(customers[0]);
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itbis = subtotal * 0.18;
  const total = subtotal + itbis;

  return (
    <aside className="h-[calc(100vh-64px)] w-[350px] min-w-[320px] bg-white flex flex-col p-4">
      {" "}
      {/* HEADER */}
      <div className="px-6 pt-4 pb-4 flex justify-center items-center h-auto">
        <h2 className="font-bold text-lg h-fit">Factura de venta</h2>
      </div>
      {/* DROPDOWNS */}
      <div className="flex gap-3 px-6 py-3 bg-white/80">
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">
            Lista de precio
          </label>
          <select
            value={priceList}
            onChange={(e) => setPriceList(e.target.value)}
            className="w-full h-9 border rounded px-2 bg-white focus:outline-emerald-600"
          >
            {priceLists.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">Numeración</label>
          <select
            value={numeration}
            onChange={(e) => setNumeration(e.target.value)}
            className="w-full h-9 border rounded px-2 bg-white focus:outline-emerald-600"
          >
            {numerations.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* CLIENT */}
      <div className="flex items-end gap-3 px-6 pt-3 pb-2 ">
        <div className="flex-1">
          <label className="text-xs text-gray-500 mb-1 block">Cliente</label>
          <select
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            className="w-full h-9 border rounded px-2 bg-white focus:outline-emerald-600"
          >
            {customers.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="h-9 px-3 rounded border cursor-pointer text-emerald-600 hover:bg-emerald-50 font-medium text-sm flex items-center"
        >
          <span className="text-lg mr-1">+</span> Nuevo
        </button>
      </div>
      {/* LIST PRODUCTS */}
      <div className="flex-1 overflow-y-auto px-6 py-2">
        {items.length === 0 ? (
          <div className="text-center text-gray-400 py-8 text-sm">
            <span className="text-4xl block mb-2">🛒</span>
            Aquí verás los productos que elijas
            <br /> en tu próxima venta
          </div>
        ) : (
          <ul className="divide-y">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-2 py-3">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    RD${item.price.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <button
                      onClick={() =>
                        onQtyChange(item.id, Math.max(item.quantity - 1, 1))
                      }
                      disabled={item.quantity <= 1}
                      className="
                        w-8 h-8 flex items-center justify-center 
                        text-emerald-600 text-lg font-bold
                        rounded-full shadow 
                        border border-gray-200
                        bg-white
                        transition
                        hover:bg-emerald-50 hover:border-emerald-400
                        disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed
                        active:scale-95
                        cursor-pointer
                    "
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        onQtyChange(
                          item.id,
                          Math.min(item.quantity + 1, item.stock)
                        )
                      }
                      disabled={item.quantity >= item.stock}
                      className={`
    w-8 h-8 flex items-center justify-center
    cursor-pointer 
    text-emerald-600 text-lg font-bold
    rounded-full shadow 
    border border-gray-200
    bg-white
    transition
    hover:bg-emerald-50 hover:border-emerald-400
    disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed
    active:scale-95
  `}
                    >
                      +
                    </button>
                  </div>
                </div>
                <span className="font-semibold ml-2 whitespace-nowrap">
                  RD${(item.price * item.quantity).toLocaleString()}
                </span>
                {/* ÍCONOS: Editar y Eliminar */}
                <button
                  className="ml-2 p-1 text-gray-500 hover:text-emerald-700"
                  title="Editar"
                  onClick={() => setEditingItem(item)}
                >
                  <FiEdit2 className="cursor-pointer" />
                </button>
                <button
                  className="ml-1 p-1 text-gray-500 hover:text-red-700"
                  title="Eliminar"
                  onClick={() => onRemove(item.id)}
                >
                  <RiDeleteBinLine className="cursor-pointer" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* MODAL */}
      {editingItem && (
        <EditProductModal
          open={!!editingItem}
          onClose={() => setEditingItem(null)}
          item={editingItem}
          onSave={(updatedItem) => {
            onQtyChange(updatedItem.id, updatedItem.quantity);
            setEditingItem(null);
          }}
        />
      )}
      {/* FOOTER */}
      <div className="border-t px-6 py-4 bg-white">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>RD${subtotal.toFixed(1)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>ITBIS (18.00%)</span>
          <span>RD${itbis.toFixed(1)}</span>
        </div>
        <button
          className="w-full bg-emerald-600 text-white rounded cursor-pointer h-10 text-lg font-semibold shadow mt-2 hover:bg-emerald-700 disabled:bg-gray-300 disabled:text-gray-400"
          disabled={items.length === 0}
          onClick={onCheckout}
        >
          Vender RD${total.toFixed(1)}
        </button>
        <div className="flex justify-between items-center mt-3 text-xs ">
          <span className="text-gray-500">{items.length} Productos</span>
          <button
            className="text-emerald-700 hover:underline px-2 py-1 rounded cursor-pointer"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </aside>
  );
}
