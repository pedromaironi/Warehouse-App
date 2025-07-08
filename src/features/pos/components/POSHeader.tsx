// src/features/pos/POSHeader.tsx

export default function POSHeader() {
  return (
    <header className="flex items-center p-4 bg-white shadow-xs">
      <span className="font-bold text-xl">Facturar</span>
      <div className="flex-1" />
      {/* profile, icons... */}
      <button className="ml-4 bg-emerald-50 text-emerald-600 text-sm px-3 py-1 rounded font-semibold">
        Disponible
      </button>
      <div className="ml-4 w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
        P
      </div>
    </header>
  );
}
