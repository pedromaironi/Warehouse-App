// src/features/pos/hooks/usePOSCart.ts
import { useState, useCallback } from "react";
import { Product } from "../../products/types/product";
import { CartItem } from "../components/CartSidebar";
import { nanoid } from "nanoid";

export interface SaleTab {
  id: string;
  name: string;
  cart: CartItem[];
}

export function usePOSCart(initialProducts: Product[]) {
  // Sales tabs state
  const [sales, setSales] = useState<SaleTab[]>([
    { id: "main", name: "Principal", cart: [] },
  ]);
  const [activeSaleId, setActiveSaleId] = useState("main");
  const [renameTabId, setRenameTabId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState<string>("");
  const [deleteTabId, setDeleteTabId] = useState<string | null>(null);

  // Get the active tab and cart
  const activeSale = sales.find((s) => s.id === activeSaleId);

  // Tab functions
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

  // Cart functions
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

  const handleCheckout = useCallback(() => {
    setSales((prevSales) =>
      prevSales.map((sale) =>
        sale.id === activeSaleId ? { ...sale, cart: [] } : sale
      )
    );
  }, [activeSaleId]);

  function addToCartHelper(cart: CartItem[], product: Product): CartItem[] {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
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

  return {
    sales,
    setSales,
    activeSaleId,
    setActiveSaleId,
    activeSale,
    renameTabId,
    setRenameTabId,
    renameValue,
    setRenameValue,
    deleteTabId,
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
