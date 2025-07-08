import { useCallback, useEffect, useRef, useState } from "react";
import { Product } from "../../products/types/product";
import CartSidebar, { CartItem } from "../components/CartSidebar";
import POSHeader from "../components/POSHeader";
import ProductGrid from "../components/ProductGrid";
import ProductSearchBar from "../components/ProductSearchBar";
import { MOCK_PRODUCTS } from "../data/mockProducts";
import { nanoid } from "nanoid"; // Or use crypto.randomUUID() if you prefer
import SalesTabsBar from "../components/SalesTabBar";
import CheckoutMethodModal from "../components/CheckoutMethodModal";
import CheckoutPayModal from "../components/CheckoutPayModal";
import CheckoutSuccessModal from "../components/CheckoutSucessModal";

// -- POSPage: Main Point Of Sale component, supports multi-invoice (multi-cart/tab) workflow --
export default function POSPage() {
  // Loader state for product grid (simulated for demo purposes)
  const [loading, setLoading] = useState(true);

  // States for the tabs
  const [renameTabId, setRenameTabId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState<string>("");
  const [deleteTabId, setDeleteTabId] = useState<string | null>(null);

  // CHECKOUT FLOW
  const [checkoutStep, setCheckoutStep] = useState<
    null | "method" | "pay" | "success"
  >(null);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<any>({});

  // live search term
  const [search, setSearch] = useState("");
  //Shortcuts
  const searchInputRef = useRef<HTMLInputElement>(null);

  /**
   * List of all open invoices/sales.
   * Each sale contains a unique id, display name, and its own cart (array of CartItem).
   */
  const [sales, setSales] = useState<
    { id: string; name: string; cart: CartItem[] }[]
  >([{ id: "main", name: "Principal", cart: [] }]);

  /**
   * Tracks which invoice/tab is currently active.
   * Only the active sale's cart is displayed in the CartSidebar.
   */
  const [activeSaleId, setActiveSaleId] = useState("main");

  // Returns the sale currently being viewed/edited.
  const activeSale = sales.find((s) => s.id === activeSaleId);
  const total = (activeSale?.cart ?? []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Simulate async product loading (replace with real fetch in production)
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timeout);
  }, []);

  // Handles "checkout": clears only the active cart, but you could implement a sale-saving workflow here
  const handleCheckout = useCallback(() => {
    setSales((prevSales) =>
      prevSales.map((sale) =>
        sale.id === activeSaleId ? { ...sale, cart: [] } : sale
      )
    );
  }, [activeSaleId]);

  const handleStartCheckout = () => setCheckoutStep("method");
  const handleSelectMethod = (method: string) => {
    setSelectedMethod(method);
    setCheckoutStep("pay");
  };
  const handlePay = (info: any) => {
    setPaymentInfo(info);
    setCheckoutStep("success");
  };
  const handleFinishSale = () => {
    handleCheckout();
    setCheckoutStep(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F2") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "F8") {
        e.preventDefault();
        handleCheckout(); // Already in your scope
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleCheckout]);

  // Adds a product to the cart of the active invoice
  const handleProductClick = (product: Product) => {
    setSales((prev) =>
      prev.map((sale) =>
        sale.id === activeSaleId
          ? { ...sale, cart: addToCartHelper(sale.cart, product) }
          : sale
      )
    );
  };

  // Removes a product from the active invoice's cart by id
  const handleRemove = (id: string) => {
    setSales((prev) =>
      prev.map((sale) =>
        sale.id === activeSaleId
          ? { ...sale, cart: sale.cart.filter((item) => item.id !== id) }
          : sale
      )
    );
  };

  // Changes the quantity of a product in the active cart
  const handleQtyChange = (id: string, qty: number) => {
    setSales((prev) =>
      prev.map((sale) =>
        sale.id === activeSaleId
          ? {
              ...sale,
              cart: sale.cart.map((item) =>
                item.id === id ? { ...item, quantity: qty } : item
              ),
            }
          : sale
      )
    );
  };

  const handleRenameTab = (id: string) => {
    const tab = sales.find((t) => t.id === id);
    setRenameTabId(id);
    setRenameValue(tab?.name || "");
  };

  // For delete: ensure at least 1 tab remains, and switch tab if deleting active
  const handleDeleteTab = (id: string) => {
    setDeleteTabId(id); // Solo abre el modal de confirmación
  };

  // Handles "cancel": just clears the active cart
  const handleCancel = () => {
    setSales((prev) =>
      prev.map((sale) =>
        sale.id === activeSaleId ? { ...sale, cart: [] } : sale
      )
    );
  };

  // Activates another tab/invoice by its id
  const handleTabClick = (id: string) => setActiveSaleId(id);

  // Creates a new invoice/tab with an empty cart and sets it as active
  const handleAddTab = () => {
    const newId = nanoid(); // Or crypto.randomUUID()
    setSales((prev) => [
      ...prev,
      { id: newId, name: `Venta ${prev.length + 1}`, cart: [] },
    ]);
    setActiveSaleId(newId);
  };

  // Add handleCloseTab, handleRenameTab, etc. here for extra POS features

  return (
    <div className="min-h-screen flex flex-col">
      <POSHeader />
      {/* Main layout: product grid (left), cart sidebar (right) */}
      <div className="flex-1 flex overflow-hidden pb-12">
        <main className="flex-1 flex flex-col px-6 pb-6 pt-4 overflow-auto bg-[#f7fafd]">
          <ProductSearchBar
            ref={searchInputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {loading ? (
            <div className="flex flex-1 flex-col items-center justify-center h-full">
              <span className="mb-3 text-gray-500">
                Cargando tus productos, danos un tiempo más
              </span>
              {/* Tailwind spinner */}
              <span className="animate-spin rounded-full border-4 border-emerald-300 border-t-transparent h-12 w-12 block" />
            </div>
          ) : (
            <ProductGrid
              products={MOCK_PRODUCTS.filter(
                (p) =>
                  p.name.toLowerCase().includes(search.toLowerCase()) ||
                  p.reference?.toLowerCase().includes(search.toLowerCase()) ||
                  p.id === search
              )}
              onProductClick={handleProductClick}
            />
          )}
        </main>
        <CartSidebar
          items={activeSale?.cart || []}
          onRemove={handleRemove}
          onQtyChange={handleQtyChange}
          onCheckout={() => setCheckoutStep("method")}
          onCancel={handleCancel}
        />
        {checkoutStep === "method" && (
          <CheckoutMethodModal
            total={total}
            onSelect={handleSelectMethod}
            onCancel={() => setCheckoutStep(null)}
          />
        )}
        {checkoutStep === "pay" && (
          <CheckoutPayModal
            total={total}
            method={selectedMethod}
            onPay={handlePay}
            onBack={() => setCheckoutStep("method")}
            onCancel={() => setCheckoutStep(null)}
          />
        )}
        {checkoutStep === "success" && (
          <CheckoutSuccessModal
            total={total}
            paymentInfo={paymentInfo}
            onPrint={() => {
              /* Tu lógica para imprimir */
            }}
            onNewSale={handleFinishSale}
            onClose={() => setCheckoutStep(null)}
          />
        )}
        {renameTabId && (
          <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
              <h2 className="font-semibold text-lg mb-4">Renombrar venta</h2>
              <input
                type="text"
                className={`w-full border rounded px-3 py-2 mb-2 ${
                  !renameValue.trim() ||
                  sales.some(
                    (tab) =>
                      tab.name === renameValue.trim() && tab.id !== renameTabId
                  )
                    ? "border-red-400"
                    : "border-gray-300"
                }`}
                value={renameValue}
                autoFocus
                maxLength={24}
                onChange={(e) => setRenameValue(e.target.value)}
                placeholder="Nombre de la venta"
              />
              {/* Mensajes de error */}
              {!renameValue.trim() && (
                <div className="text-xs text-red-500 mb-2">
                  El nombre es obligatorio.
                </div>
              )}
              {sales.some(
                (tab) =>
                  tab.name === renameValue.trim() && tab.id !== renameTabId
              ) && (
                <div className="text-xs text-red-500 mb-2">
                  Ya existe una venta con ese nombre.
                </div>
              )}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setRenameTabId(null)}
                  className="px-4 py-2 rounded border cursor-pointer bg-gray-50 text-gray-700 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setSales((prev) =>
                      prev.map((tab) =>
                        tab.id === renameTabId
                          ? { ...tab, name: renameValue.trim() }
                          : tab
                      )
                    );
                    setRenameTabId(null);
                  }}
                  className="px-4 py-2 rounded bg-emerald-600 cursor-pointer text-white font-medium hover:bg-emerald-700"
                  disabled={
                    !renameValue.trim() ||
                    sales.some(
                      (tab) =>
                        tab.name === renameValue.trim() &&
                        tab.id !== renameTabId
                    )
                  }
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Persistent bottom bar for invoice/tabs management */}
        <SalesTabsBar
          sales={sales.map((sale) => ({
            id: sale.id,
            name: sale.name,
          }))}
          activeSaleId={activeSaleId}
          onTabClick={handleTabClick}
          onAddTab={handleAddTab}
          onRenameTab={handleRenameTab}
          onDeleteTab={handleDeleteTab}
        />
      </div>
      {renameTabId && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
            <h2 className="font-semibold text-lg mb-4">Renombrar venta</h2>
            <input
              type="text"
              className={`w-full border rounded px-3 py-2 mb-2 ${
                !renameValue.trim() ||
                sales.some(
                  (tab) =>
                    tab.name === renameValue.trim() && tab.id !== renameTabId
                )
                  ? "border-red-400"
                  : "border-gray-300"
              }`}
              value={renameValue}
              autoFocus
              maxLength={24}
              onChange={(e) => setRenameValue(e.target.value)}
              placeholder="Nombre de la venta"
            />
            {!renameValue.trim() && (
              <div className="text-xs text-red-500 mb-2">
                El nombre es obligatorio.
              </div>
            )}
            {sales.some(
              (tab) => tab.name === renameValue.trim() && tab.id !== renameTabId
            ) && (
              <div className="text-xs text-red-500 mb-2">
                Ya existe una venta con ese nombre.
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRenameTabId(null)}
                className="px-4 py-2 rounded border cursor-pointer bg-gray-50 text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setSales((prev) =>
                    prev.map((tab) =>
                      tab.id === renameTabId
                        ? { ...tab, name: renameValue.trim() }
                        : tab
                    )
                  );
                  setRenameTabId(null);
                }}
                className="px-4 py-2 rounded bg-emerald-600 cursor-pointer text-white font-medium hover:bg-emerald-700"
                disabled={
                  !renameValue.trim() ||
                  sales.some(
                    (tab) =>
                      tab.name === renameValue.trim() && tab.id !== renameTabId
                  )
                }
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteTabId && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm">
            <h2 className="font-semibold text-lg mb-3">¿Eliminar venta?</h2>
            <div className="mb-5 text-gray-700">
              ¿Estás seguro de eliminar{" "}
              <b>{sales.find((t) => t.id === deleteTabId)?.name}</b>? Esta
              acción no se puede deshacer.
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteTabId(null)}
                className="px-4 py-2 rounded border cursor-pointer bg-gray-50 text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setSales((prev) => {
                    const filtered = prev.filter(
                      (tab) => tab.id !== deleteTabId
                    );
                    // Nunca borrar el último tab
                    if (filtered.length === 0) return prev;
                    // Si eliminas el activo, cambia al primero
                    if (activeSaleId === deleteTabId)
                      setActiveSaleId(filtered[0].id);
                    return filtered;
                  });
                  setDeleteTabId(null);
                }}
                className="px-4 py-2 rounded bg-red-600 cursor-pointer text-white font-medium hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * addToCartHelper: Adds a product to the cart.
 * - If the product already exists, it increases the quantity (max = stock).
 * - If it's new, it adds it with quantity = 1.
 */
function addToCartHelper(cart: CartItem[], product: Product): CartItem[] {
  const exists = cart.find((item) => item.id === product.id);
  if (exists) {
    // Don't increase quantity if already at stock
    if (exists.quantity >= exists.stock) return cart;
    return cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
        : item
    );
  }
  return [
    ...cart,
    {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      stock: product.stock,
      isFavorite: product.isFavorite,
    },
  ];
}
