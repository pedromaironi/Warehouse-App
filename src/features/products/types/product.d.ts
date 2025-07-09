export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  reference: string;
  image: string[];
  isFavorite: boolean;
  stock: number;
  reference?: string;
  status?: string;
}

export interface ProductSale {
  id: string;
  name: string;
  price: number;
  qty: number;
  sku: string;
  subtotal: number;
}
