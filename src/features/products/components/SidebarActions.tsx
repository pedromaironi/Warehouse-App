// src/features/products/components/SidebarActions.tsx
import React from "react";
import { ChangeHandler, ProductFormState } from "../types/productFormTypes";
import { CiCamera as Camera } from "react-icons/ci";

interface Props {
  form: ProductFormState;
  showError: boolean;
  onChange: ChangeHandler;
  onCancel: () => void;
  onSaveAndNew: () => void;
  onOpenGallery: () => void;
}

const SidebarActions: React.FC<Props> = ({
  form,
  showError,
  onChange,
  onCancel,
  onSaveAndNew,
  onOpenGallery,
}) => (
  <div className="bg-white border rounded-lg shadow-sm p-4 space-y-4">
    {/* Image placeholder */}
    {showError && (
      <div className="text-red-600 text-xs bg-red-50 rounded p-2 mb-2 text-center">
        Completa los campos obligatorios antes de guardar.
      </div>
    )}
    <div
      onClick={onOpenGallery}
      className="h-32 rounded-md flex items-center justify-center cursor-pointer"
    >
      {form.images && form.images.length > 0 ? (
        <img
          src={
            // Show the favorite image if any, otherwise the first image
            (form.images.find((img) => img.isFavorite) || form.images[0]).url
          }
          alt="Imagen principal"
          className="h-full w-full object-contain rounded"
        />
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full text-gray-400 text-sm">
          <Camera className="w-full h-10 text-gray-300 mb-2 flex-1 justify-center flex-row flex align-middle" />
          {"  "}Agrega imágenes aquí
        </div>
      )}
    </div>

    {/* Preview */}
    <div className="text-center">
      <p className="text-sm text-gray-500">Producto sin nombre</p>
      <p className="text-xl font-semibold text-emerald-600">
        RD$ {form.totalPrice} DOP
      </p>
    </div>

    {/* Toggles */}
    <div className="space-y-3">
      <label className="flex items-center justify-between text-sm">
        <span>
          Inventariable <span className="text-gray-400">ℹ</span>
        </span>
        <input
          type="checkbox"
          name="inventoriable"
          checked={form.inventoriable}
          onChange={onChange}
          className="form-toggle"
        />
      </label>
      <label className="flex items-center justify-between text-sm">
        <span>Venta en negativo</span>
        <input
          type="checkbox"
          name="allowNegative"
          checked={form.allowNegative}
          onChange={onChange}
          className="form-toggle"
        />
      </label>
    </div>

    {/* Buttons */}
    <div className="space-y-2">
      <button
        type="button"
        onClick={onCancel}
        className="w-full border px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
      >
        Cancelar
      </button>
      <button
        type="submit"
        form="product-form"
        className="w-full bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 cursor-pointer"
      >
        Guardar
      </button>
      <button
        type="button"
        onClick={onSaveAndNew}
        className="w-full border border-emerald-600 text-emerald-600 px-4 py-2 rounded-md hover:bg-emerald-50 cursor-pointer"
      >
        Guardar y crear otro
      </button>
    </div>
  </div>
);

export default SidebarActions;
