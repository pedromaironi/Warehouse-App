import { useNavigate } from "react-router-dom";
import { Product } from "../types/product";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

interface ProductRowProps {
  product: Product;
  isSelected: boolean;
  toggleSelect: (id: string) => void;
}

export default function ProductRow({
  product,
  isSelected,
  toggleSelect,
}: ProductRowProps) {
  const navigate = useNavigate();

  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleSelect(product.id)}
        />
      </td>
      <td className="px-4 py-3">{product.name}</td>
      <td className="px-4 py-3">{product.reference}</td>
      <td className="px-4 py-3">RD$ {product.price}</td>
      <td className="px-4 py-3">{product.description}</td>
      <td className="px-4 py-3 flex gap-2 text-gray-500">
        <button onClick={() => navigate(`/dashboard/products/${product.id}`)}>
          <FaEye />
        </button>
        <button
          onClick={() => navigate(`/dashboard/products/${product.id}/edit`)}
        >
          <FaEdit />
        </button>
        <button>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
