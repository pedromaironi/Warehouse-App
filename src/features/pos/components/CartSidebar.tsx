interface CartItem {
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
}
export default function CartSidebar({ items, onRemove, onQtyChange, onCheckout }: Props) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <aside className="w-[410px] bg-white p-6 flex flex-col min-h-full shadow-lg">
      <h2 className="font-bold text-lg mb-6">Factura de venta</h2>
      {/* ...use your cart logic from previous code... */}
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
        {items.length === 0 ? (
          <>
            <span className="text-5xl mb-2">🛒</span>
            <div className="text-center">Aquí verás los productos que elijas<br /> en tu próxima venta</div>
          </>
        ) : (
          <ul className="divide-y w-full">
            {items.map((item) => (
              <li key={item.id} className="py-3 flex justify-between items-center gap-2">
                <div className="flex flex-col flex-1">
                  <span className="font-semibold">{item.name}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <button
                      onClick={() => onQtyChange(item.id, Math.max(item.quantity - 1, 1))}
                      disabled={item.quantity <= 1}
                      className="px-2 rounded bg-gray-200"
                    >-</button>
                    <input
                      className="w-8 text-center border rounded"
                      type="number"
                      min={1}
                      max={item.stock ?? 99}
                      value={item.quantity}
                      onChange={e =>
                        onQtyChange(
                          item.id,
                          Math.max(1, Math.min(Number(e.target.value), item.stock ?? 99))
                        )
                      }
                    />
                    <button
                      onClick={() => onQtyChange(item.id, Math.min(item.quantity + 1, item.stock ?? 99))}
                      disabled={item.stock !== undefined && item.quantity >= item.stock}
                      className="px-2 rounded bg-gray-200"
                    >+</button>
                    <span className="ml-2 text-xs text-gray-400">
                      {item.stock !== undefined
                        ? `Stock: ${item.stock - item.quantity}`
                        : ""}
                    </span>
                  </div>
                </div>
                <span className="font-semibold whitespace-nowrap">
                  RD${(item.price * item.quantity).toLocaleString()}
                </span>
                <button
                  className="ml-2 text-red-500 hover:underline text-xs"
                  onClick={() => onRemove(item.id)}
                  title="Remove"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-6 flex flex-col gap-2">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>RD${total.toLocaleString()}</span>
        </div>
        <button
          disabled={items.length === 0}
          className="bg-emerald-600 text-white rounded py-2 mt-2 hover:bg-emerald-700 disabled:bg-gray-300 disabled:text-gray-400"
          onClick={onCheckout}
        >
          Sell / Checkout
        </button>
      </div>
    </aside>
  );
}
