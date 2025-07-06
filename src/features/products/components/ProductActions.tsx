import { FaTrash, FaToggleOn, FaToggleOff } from "react-icons/fa";

interface Props {
  selected: string[];
  clearSelection: () => void;
  onActivate: () => void;
  onDeactivate: () => void;
  onDelete: () => void;
}

export default function ProductActions({
  selected,
  clearSelection,
  onActivate,
  onDeactivate,
  onDelete,
}: Props) {
  return (
    <div className="mt-4 bg-gray-50 p-3 rounded-md border text-sm flex items-center gap-4">
      <span className="text-gray-600">
        {selected.length} producto(s) seleccionado(s)
      </span>
      <button onClick={onActivate} className="text-blue-600 hover:underline flex items-center gap-1">
        <FaToggleOn /> Activar
      </button>
      <button onClick={onDeactivate} className="text-yellow-600 hover:underline flex items-center gap-1">
        <FaToggleOff /> Desactivar
      </button>
      <button onClick={onDelete} className="text-red-600 hover:underline flex items-center gap-1">
        <FaTrash /> Eliminar
      </button>
      <button className="ml-auto text-gray-500 hover:underline" onClick={clearSelection}>
        Cancelar
      </button>
    </div>
  );
}
