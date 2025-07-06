import { FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";

interface Props {
  selected: string[];
  clearSelection: () => void;
}

export default function ProductActions({ selected, clearSelection }: Props) {
  return (
    <div className="mt-4 bg-gray-50 p-3 rounded-md border text-sm flex items-center gap-4">
      <span className="text-gray-600">
        {selected.length} producto(s) seleccionado(s)
      </span>
      <button className="text-blue-600 hover:underline flex items-center gap-1">
        <FaToggleOn /> Activar
      </button>
      <button className="text-yellow-600 hover:underline flex items-center gap-1">
        <FaToggleOff /> Desactivar
      </button>
      <button className="text-red-600 hover:underline flex items-center gap-1">
        <FaTrash /> Eliminar
      </button>
      <button className="ml-auto text-gray-500 hover:underline" onClick={clearSelection}>
        Cancelar
      </button>
    </div>
  );
}
