import { useState } from "react";
import { Product } from "../../products/types/product";
import { nanoid } from "nanoid";
import { CartItem } from "../components/CartSidebar";
import { addToCartHelper } from "../utils/cartUtils";

export function usePOSCart(initialProducts: Product[]) {
  // Tabs/carts
  const [sales, setSales] = useState<{ id: string; name: string; cart: CartItem[] }[]>([
    { id: "main", name: "Principal", cart: [] },
  ]);
  const [activeSaleId, setActiveSaleId] = useState("main");

  // Rename/delete modals
  const [renameTabId, setRenameTabId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState<string>("");
  const [deleteTabId, setDeleteTabId] = useState<string | null>(null);

  // Active sale
  const activeSale = sales.find((s) => s.id === activeSaleId);

  // Tab logic
  const handleTabClick = (id: string) => setActiveSaleId(id);
  const handleAddTab = () => {
    const newId = nanoid();
    setSales((prev) => [
      ...prev,
      { id: newId, name: `Venta ${prev.length + 1}`, cart: [] },
    ]);
    setActiveSaleId(newId);
  };
  const handleRenameTab = (id: string) => {
    const tab = sales.find((t) => t.id === id);
    setRenameTabId(id);
    setRenameValue(tab?.name || "");
  };
  const saveRenameTab = () => {
    setSales((prev) =>
      prev.map((tab) =>
        tab.id === renameTabId ? { ...tab, name: renameValue.trim() } : tab
      )
    );
    setRenameTabId(null);
  };
  const handleDeleteTab = (id: string) => setDeleteTabId(id);
  const confirmDeleteTab = () => {
    setSales((prev) => {
      const filtered = prev.filter((tab) => tab.id !== deleteTabId);
      if (filtered.length === 0) return prev;
      if (activeSaleId === deleteTabId) setActiveSaleId(filtered[0].id);
      return filtered;
    });
    setDeleteTabId(null);
  };

  // Cart actions
  const handleProductClick = (product: Product) => {
    setSales((prev) =>
      prev.map((sale) =>
        sale.id === activeSaleId
          ? { ...sale, cart: addToCartHelper(sale.cart, product) }
          : sale
      )
    );
  };
  const handleRemove = (id: string) => {
    setSales((prev) =>
      prev.map((sale) =>
        sale.id === activeSaleId
          ? { ...sale, cart: sale.cart.filter((item) => item.id !== id) }
          : sale
      )
    );
  };
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
  const handleCancel = () => {
    setSales((prev) =>
      prev.map((sale) =>
        sale.id === activeSaleId ? { ...sale, cart: [] } : sale
      )
    );
  };
  const handleCheckout = () => {
    setSales((prevSales) =>
      prevSales.map((sale) =>
        sale.id === activeSaleId ? { ...sale, cart: [] } : sale
      )
    );
  };

  return {
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
  };
}
