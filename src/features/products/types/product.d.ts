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