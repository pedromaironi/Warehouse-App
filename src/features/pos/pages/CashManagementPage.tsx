/**
 * CashManagementPage
 * Main page for managing cash movements. Includes filters, add button, and a data table with actions.
 * All code comments in English. All UI content in Spanish.
 */

import { useState } from "react";
import CashMovementForm from "../components/CashMovementForm";
import CashMovementTable from "../components/CashMovementTable";
import { CashMovement } from "../types/cashMovements";
import CashMovementDetail from "../modal/CashMovementDetail";
import { ConfirmDialog } from "../../../components/ConfirmDialog";

export default function CashManagementPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editMovement, setEditMovement] = useState<CashMovement | null>(null);
  const [cashMovements, setCashMovements] = useState<CashMovement[]>([]);
  const [selected, setSelected] = useState<CashMovement | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CashMovement | null>(null);

  // Filters (example: by type, account, client, date, search)
  const [filterText, setFilterText] = useState("");

  // Filtered data (simple text search, you can improve this)
  const filteredMovements = cashMovements.filter((m) =>
    [m.account, m.client, m.observations]
      .join(" ")
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );

  const handleSaveMovement = (movement: CashMovement) => {
    if (editMovement) {
      setCashMovements((prev) =>
        prev.map((m) => (m.id === movement.id ? movement : m))
      );
      setEditMovement(null);
    } else {
      setCashMovements((prev) => [...prev, movement]);
    }
    setModalOpen(false);
  };

  const handleEdit = (movement: CashMovement) => {
    setEditMovement(movement);
    setModalOpen(true);
  };

  const handleDelete = (movement: CashMovement) => {
    setDeleteTarget(movement);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setCashMovements((prev) => prev.filter((m) => m.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  const handleSelectMovement = (movement: CashMovement) => {
    setSelected(movement);
    setDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-6">
      {/* Header: title, description, and add button */}
      <div className="max-w-6xl mx-auto flex flex-col gap-2 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold">Gestión de efectivo</h1>
            <div className="text-gray-500 text-sm">
              Administra tus ingresos y retiros de efectivo. Filtra, revisa y controla todos los movimientos de caja.
            </div>
          </div>
          <button
            className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white px-5 py-2 rounded-lg font-semibold shadow self-start md:self-auto"
            onClick={() => { setEditMovement(null); setModalOpen(true); }}
          >
            Nuevo movimiento de efectivo
          </button>
        </div>

        {/* Filters */}
        <div className="mt-3 flex gap-2">
          <input
            className="border rounded px-3 py-2 text-sm w-full max-w-xs"
            placeholder="Buscar por cuenta, cliente, observaciones..."
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
          />
          {/* Add more filters here if you want (tipo, fecha, cuenta...) */}
        </div>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto">
        <CashMovementTable
          movements={filteredMovements}
          onSelect={handleSelectMovement}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Create/Edit Modal */}
      <CashMovementForm
        open={modalOpen}
        onClose={() => { setEditMovement(null); setModalOpen(false); }}
        onSave={handleSaveMovement}
        initialData={editMovement}
      />

      {/* Detail Modal */}
      <CashMovementDetail
        movement={selected}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        open={!!deleteTarget}
        title="Eliminar movimiento"
        message="¿Seguro que deseas eliminar este movimiento de efectivo? Esta acción no se puede deshacer."
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
