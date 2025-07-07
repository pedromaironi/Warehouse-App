import { useState } from "react";
import AddWarehouseModal, { WarehouseData } from "../modals/AddWarehouseModal";

interface InventoryItem {
  id: string; // ID único de este registro
  warehouseId: string;
  warehouseName: string;
  qty: string;
  minQty?: string;
  maxQty?: string;
}

interface Warehouse {
  id: string;
  name: string;
}

interface Props {
  inventory: InventoryItem[];
  warehouses: Warehouse[];
  onInventoryChange: (list: InventoryItem[]) => void;
}

export default function InventorySection({
  inventory,
  warehouses,
  onInventoryChange,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Handler para añadir o editar bodega
  const handleSave = (data: WarehouseData, idx: number | null) => {
    const newInventory = [...inventory];
    if (idx === null) {
      // Nueva bodega
      newInventory.push({
        id: crypto.randomUUID(),
        warehouseId: data.warehouseId,
        warehouseName:
          warehouses.find((w) => w.id === data.warehouseId)?.name || "",
        qty: data.qty,
        minQty: data.minQty,
        maxQty: data.maxQty,
      });
    } else {
      // Editar existente
      newInventory[idx] = {
        ...newInventory[idx],
        warehouseId: data.warehouseId,
        warehouseName:
          warehouses.find((w) => w.id === data.warehouseId)?.name || "",
        qty: data.qty,
        minQty: data.minQty,
        maxQty: data.maxQty,
      };
    }
    onInventoryChange(newInventory);
    setShowModal(false);
    setEditIndex(null);
  };

  // Abre modal para nuevo
  const handleAddClick = () => {
    setEditIndex(null);
    setShowModal(true);
  };

  // Abre modal para editar
  const handleEditClick = (i: number) => {
    setEditIndex(i);
    setShowModal(true);
  };

  return (
    <section className="bg-white border rounded-lg shadow-sm p-4">
      <header className="font-medium border-b pb-2 mb-2">
        Detalle de inventario
      </header>
      <div className="space-y-2">
        {inventory.length === 0 && (
          <div className="text-gray-400 text-sm">Sin bodegas agregadas.</div>
        )}
        {inventory.map((item, i) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded p-2 cursor-pointer"
            onClick={() => handleEditClick(i)}
          >
            <div>
              <div className="font-semibold">{item.warehouseName}</div>
              <div className="text-xs text-gray-500">
                Inicial: <b>{item.qty}</b>{" "}
                {item.minQty && (
                  <>
                    | Mín: <b>{item.minQty}</b>
                  </>
                )}{" "}
                {item.maxQty && (
                  <>
                    | Máx: <b>{item.maxQty}</b>
                  </>
                )}
              </div>
            </div>
            {/* Botón de eliminar si quieres */}
          </div>
        ))}
        <button
          type="button"
          className="mt-2 text-emerald-600 hover:underline"
          onClick={handleAddClick}
        >
          + Agregar bodega
        </button>
      </div>
      {showModal && (
        <AddWarehouseModal
          warehouses={warehouses}
          onSave={(data) => handleSave(data, editIndex)}
          onClose={() => {
            setShowModal(false);
            setEditIndex(null);
          }}
          defaultValue={editIndex !== null ? inventory[editIndex] : undefined}
        />
      )}
    </section>
  );
}
