// src/features/pos/pages/POSPage.tsx

import { useCallback, useEffect, useRef, useState } from "react";
import { Product } from "../../products/types/product";
import CartSidebar, { CartItem } from "../components/CartSidebar";
import POSHeader from "../components/POSHeader";
import ProductGrid from "../components/ProductGrid";
import ProductSearchBar from "../components/ProductSearchBar";
import { MOCK_PRODUCTS } from "../data/mockProducts";
import { nanoid } from "nanoid";
import SalesTabsBar from "../components/SalesTabBar";
import CheckoutMethodModal from "../modal/CheckoutMethodModal";
import CheckoutPayModal from "../modal/CheckoutPayModal";
import CheckoutSuccessModal from "../modal/CheckoutSucessModal";
import PrintTicketModal from "../modal/PrintTicketModal";
import { InvoicePrintData } from "../types/invoicePrint";

/**
 * POSPage - Main POS screen with multi-invoice/tab support.
 * Handles all the logic for sales, product search, cart management, checkout, and printing.
 */
export default function POSPage() {
  // Loader state for product grid (simulated for demo purposes)
  const [loading, setLoading] = useState(true);

  // Store the product list in component state
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  // States for the tabs (rename, delete)
  const [renameTabId, setRenameTabId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState<string>("");
  const [deleteTabId, setDeleteTabId] = useState<string | null>(null);

  // CHECKOUT FLOW
  const [checkoutStep, setCheckoutStep] = useState<
    null | "method" | "pay" | "success"
  >(null);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [paymentInfo, setPaymentInfo] = useState<any>({});

  // PRINT
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState<InvoicePrintData | null>(null);

  // Live search term and search input ref (for F2 shortcut)
  const [search, setSearch] = useState("");
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

  // Total amount for the current sale
  const total = (activeSale?.cart ?? []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /**
   * Toggles the 'isFavorite' flag for a product by its id.
   * @param id - Product id to toggle favorite status.
   */
  const handleToggleFavorite = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  };

  /**
   * Sorts products so favorites appear first.
   * Products with isFavorite === true are shown before others.
   */
  const filteredAndSortedProducts = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.reference?.toLowerCase().includes(search.toLowerCase()) ||
        p.id === search
    )
    .sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));

  /**
   * Returns a new array where favorites are listed before non-favorites.
   */
  const sortedProducts = [
    ...products.filter((p) => p.isFavorite),
    ...products.filter((p) => !p.isFavorite),
  ];

  // Simulate async product loading (replace with real fetch in production)
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timeout);
  }, []);

  /**
   * handleCheckout
   * Clears the cart for the active tab after finishing the sale.
   * Wrapped in useCallback for correct effect dependencies.
   */
  const handleCheckout = useCallback(() => {
    setSales((prevSales) =>
      prevSales.map((sale) =>
        sale.id === activeSaleId ? { ...sale, cart: [] } : sale
      )
    );
  }, [activeSaleId]);

  // Handle starting the checkout flow (show method modal)
  const handleStartCheckout = () => setCheckoutStep("method");

  // Handle payment method selection in modal
  const handleSelectMethod = (method: string) => {
    setSelectedMethod(method);
    setCheckoutStep("pay");
  };

  // Handle entering payment info and confirming payment
  const handlePay = (info: any) => {
    setPaymentInfo(info);
    setCheckoutStep("success");
  };

  /**
   * handleFinishSale
   * Finishes the sale: clears the cart and closes modals.
   * Prepares ticket data for printing.
   * Uses the current cart state (so that printing always reflects latest cart).
   */
  const handleFinishSale = () => {
    if (!activeSale) return;
    // Generate the ticket data for printing using current cart
    const ticket = generatePrintTicket(
      activeSale.cart,
      selectedMethod,
      paymentInfo
    );
    setTicketData(ticket);
    setPrintModalOpen(true);
    handleCheckout();
    setCheckoutStep(null);
  };

  // Shortcuts: F2 = focus search, F8 = checkout
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F2") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
      if (e.key === "F8") {
        e.preventDefault();
        handleStartCheckout();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleStartCheckout]);

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

  // Modal actions for renaming and deleting sales tabs
  const handleRenameTab = (id: string) => {
    const tab = sales.find((t) => t.id === id);
    setRenameTabId(id);
    setRenameValue(tab?.name || "");
  };

  // For delete: ensure at least 1 tab remains, and switch tab if deleting active
  const handleDeleteTab = (id: string) => {
    setDeleteTabId(id);
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
    const newId = nanoid();
    setSales((prev) => [
      ...prev,
      { id: newId, name: `Venta ${prev.length + 1}`, cart: [] },
    ]);
    setActiveSaleId(newId);
  };

  // Print ticket handler, uses ticketData and opens PrintTicketModal
  const handlePrint = () => {
    if (!activeSale) return;
    const ticket = generatePrintTicket(
      activeSale.cart,
      selectedMethod,
      paymentInfo
    );
    setTicketData(ticket);
    setPrintModalOpen(true);
  };

  // --- Render ---
  return (
    <div className="min-h-screen flex flex-col">
      <POSHeader />
      {/* Main layout: product grid (left), cart sidebar (right) */}
      <div className="flex-1 flex overflow-hidden pb-12">
        <main className="flex-1 flex flex-col px-6 pb-6 pt-4 overflow-auto bg-gray-100">
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
              <span className="animate-spin rounded-full border-4 border-emerald-300 border-t-transparent h-12 w-12 block" />
            </div>
          ) : (
            <ProductGrid
              products={filteredAndSortedProducts}
              onProductClick={handleProductClick}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </main>
        <CartSidebar
          items={activeSale?.cart || []}
          onRemove={handleRemove}
          onQtyChange={handleQtyChange}
          onCheckout={handleStartCheckout}
          onCancel={handleCancel}
        />
        {/* --- Checkout Modals --- */}
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
            onPrint={handlePrint}
            onNewSale={handleFinishSale}
            onClose={() => setCheckoutStep(null)}
          />
        )}
        {/* --- Print Modal --- */}
        {printModalOpen && ticketData && (
          <PrintTicketModal
            data={ticketData}
            open={printModalOpen}
            onClose={() => setPrintModalOpen(false)}
          />
        )}
        {/* --- Rename/Remove Sale Modals --- */}
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
              {/* Error messages */}
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
                      if (filtered.length === 0) return prev;
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
        {/* --- Sales Tab Bar --- */}
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
    </div>
  );
}

/**
 * addToCartHelper
 * Adds a product to the cart, or increases quantity if it already exists.
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

/**
 * generatePrintTicket
 * Prepares printable invoice data using the current cart and mock info.
 * Replace mock data with real API response in production.
 *
 * @param cart - Current sale cart (CartItem[])
 * @param paymentMethod - Selected payment method (string)
 * @param paymentInfo - Additional payment info (object)
 * @returns InvoicePrintData - data to render PrintTicketModal
 */
function generatePrintTicket(
  cart: CartItem[],
  paymentMethod: string,
  paymentInfo: any
): InvoicePrintData {
  // Calculate subtotal and itbis (18%)
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itbis = subtotal * 0.18;
  const total = subtotal + itbis;

  return {
    business: {
      name: "Almacenes Juan",
      phone: "809-783-9321",
      address: "Av. Principal #123, Santiago",
      rnc: "123456789",
    },
    invoiceNumber: "B01-0000001",
    ncf: "B0100000001",
    date: new Date().toLocaleString(),
    paymentType: paymentMethod || "Efectivo",
    branch: "Principal",
    dueDate: "", // Empty for now
    customer: "Consumidor final",
    products: cart.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    })),
    subtotal,
    itbis,
    total,
    received: total, // By default, assume paid exact amount
    change: 0, // Assume no change (edit as needed)
    footerNote: "Developed by Pedro Toribio",
    ...paymentInfo, // Pass any additional payment data if needed
  };
}
