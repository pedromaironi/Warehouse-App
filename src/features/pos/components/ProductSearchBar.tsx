import { forwardRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import QuickProductModal from "../../products/components/QuickProductModal";

const ProductSearchBar = forwardRef<HTMLInputElement, {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>(({ value, onChange }, ref) => {
  const [showQuickModal, setShowQuickModal] = useState(false);

  return (
    <div className="flex items-center w-full max-w-3xl gap-4 mb-8">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Buscar productos o escanear código (F2)"
          className="w-full h-12 pl-12 pr-4 border border-gray-300 rounded-lg text-base hover:bg-white focus:bg-white transition"
          ref={ref}
          value={value}
          onChange={onChange}
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
          <FiSearch className="text-gray-400 text-xl mr-2" />
        </span>
      </div>
      <button
        onClick={() => setShowQuickModal(true)}
        className="h-12 px-6 bg-white border border-gray-300 rounded-lg cursor-pointer text-emerald-700 font-semibold hover:bg-emerald-50 shadow transition flex items-center"
      >
        Nuevo producto +
      </button>
      {showQuickModal && (
        <QuickProductModal onClose={() => setShowQuickModal(false)} />
      )}
    </div>
  );
});

export default ProductSearchBar;
