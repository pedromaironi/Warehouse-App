import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
} from "../../../store/features/pos/pos.slice";
import { Product } from "../../products/types/product";
import CartSidebar from "../components/CartSidebar";
import POSHeader from "../components/POSHeader";
import ProductGrid from "../components/ProductGrid";
import ProductSearchBar from "../components/ProductSearchBar";
import { MOCK_PRODUCTS } from "../data/mockProducts";

export default function POSPage() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.pos.cart);

  const handleProductClick = (product: Product) => {
    if (product.stock > 0) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          stock: product.stock,
          isFavorite: product.isFavorite,
        })
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <POSHeader />
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 flex flex-col px-6 pb-6 pt-4 overflow-auto">
          <ProductSearchBar />
          <ProductGrid
            products={MOCK_PRODUCTS}
            onProductClick={handleProductClick}
          />
        </main>
        <CartSidebar
          items={cart}
          onRemove={(id) => dispatch(removeFromCart(id))}
          onQtyChange={(id, qty) => dispatch(updateQty({ id, qty }))}
          onCheckout={() => dispatch(clearCart())}
        />
      </div>
    </div>
  );
}
