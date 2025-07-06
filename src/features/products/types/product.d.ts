export interface Product {
  id: string;
  name: string;
  reference: string;
  price: number;
  description?: string;
  status: "activo" | "inactivo";
}
