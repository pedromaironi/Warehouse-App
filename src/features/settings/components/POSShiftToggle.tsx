// src/features/settings/components/PosShiftsToggle.tsx
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setEnabled } from "../store/posShiftSettingsSlice";

export default function PosShiftsToggle() {
  const dispatch = useDispatch();
  const enabled = useSelector(
    (state: RootState) => state.posShiftSettings.enabled
  );

  //   const ACCOUNTS = [
  //     { id: "1", name: "Banco Corriente" },
  //     { id: "2", name: "Efectivo POS" },
  //     { id: "3", name: "Caja General" },
  //   ];

  return (
    <div className="flex items-center gap-3 py-4">
      <span className="font-medium">Habilitar turnos de caja</span>
      <button
        className={`w-12 h-6 rounded-full transition-colors duration-300 ${
          enabled ? "bg-emerald-500" : "bg-gray-300"
        }`}
        aria-pressed={enabled}
        onClick={() => dispatch(setEnabled(!enabled))}
      >
        <span
          className={`block h-6 w-6 bg-white rounded-full shadow transform transition-transform duration-300 ${
            enabled ? "translate-x-6" : ""
          }`}
        />
      </button>
      <span
        className={`text-xs font-semibold ml-2 ${
          enabled ? "text-emerald-600" : "text-gray-400"
        }`}
      >
        {enabled ? "Activado" : "Desactivado"}
      </span>
    </div>
  );
}
