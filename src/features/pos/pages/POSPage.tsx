import { useCallback, useEffect, useRef, useState } from "react";
import CartSidebar from "../components/CartSidebar";
import POSHeader from "../components/POSHeader";
import ProductGrid from "../components/ProductGrid";
import ProductSearchBar from "../components/ProductSearchBar";
import { MOCK_PRODUCTS } from "../data/mockProducts";
import SalesTabsBar from "../components/SalesTabBar";
import CheckoutMethodModal from "../modal/CheckoutMethodModal";
import CheckoutPayModal from "../modal/CheckoutPayModal";
import CheckoutSuccessModal from "../modal/CheckoutSucessModal";
import { InvoicePrintData } from "../types/invoicePrint";
import TicketPreviewModal from "../modal/TicketPreviewModal";
import { usePrintTicket } from "../hooks/usePrintTicket";
import { usePOSCart } from "../hooks/usePOSCart";
import { generatePrintTicket } from "../utils/printUtils";
import { PaymentInfo } from "../types/checkout";
import { useFavoriteProducts } from "../hooks/useFavoriteProducts";

export default function POSPage() {
  // CART & TAB LOGIC (100% from hook)
  const {
    sales,
    activeSale,
    activeSaleId,
    renameTabId,
    renameValue,
    deleteTabId,
    setRenameValue,
    setRenameTabId,
    setDeleteTabId,
    handleTabClick,
    handleAddTab,
    handleRenameTab,
    saveRenameTab,
    handleDeleteTab,
    confirmDeleteTab,
    handleProductClick,
    handleRemove,
    handleQtyChange,
    handleCancel,
    handleCheckout,
  } = usePOSCart(MOCK_PRODUCTS);

  // UI state
  const [loading, setLoading] = useState(true);
  const [checkoutStep, setCheckoutStep] = useState<
    null | "method" | "pay" | "success"
  >(null);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: "",
    amount: 0,
    seller: "",
    note: "",
  });
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState<InvoicePrintData | null>(null);
  const printTicket = usePrintTicket();
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { toggleFavorite, getFilteredSorted } =
    useFavoriteProducts(MOCK_PRODUCTS);
    
  // Products
  const filteredAndSortedProducts = getFilteredSorted(search);

  // Total calculation
  const total = (activeSale?.cart ?? []).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Async loading
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timeout);
  }, []);

  // Shortcuts: F2 (search), F8 (checkout)
  const handleStartCheckout = useCallback(() => setCheckoutStep("method"), []);
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

  // Payment/checkout handlers
  const handleSelectMethod = (method: string) => {
    setSelectedMethod(method);
    setCheckoutStep("pay");
  };
  const handlePay = (info: PaymentInfo) => {
    setPaymentInfo(info);
    setCheckoutStep("success");
  };
  const handleFinishSale = () => {
    if (!activeSale) return;
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
              onToggleFavorite={toggleFavorite}
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
          <TicketPreviewModal
            data={ticketData}
            open={printModalOpen}
            onClose={() => setPrintModalOpen(false)}
            onPrint={() => {
              printTicket(ticketData);
              setPrintModalOpen(false);
            }}
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
                  onClick={saveRenameTab}
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
                  onClick={confirmDeleteTab}
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
