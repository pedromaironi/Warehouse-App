import { Product } from "../../products/types/product";
import { CartItem } from "../components/CartSidebar";

/**
 * addToCartHelper
 * Adds a product to the cart, or increases quantity if it already exists.
 * - If the product already exists, it increases the quantity (max = stock).
 * - If it's new, it adds it with quantity = 1.
 */
export function addToCartHelper(
  cart: CartItem[],
  product: Product
): CartItem[] {
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
