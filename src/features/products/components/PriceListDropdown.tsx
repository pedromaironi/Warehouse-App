import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { IoChevronDownOutline as ChevronDown } from "react-icons/io5";
import { IoCheckmarkSharp as Check } from "react-icons/io5";

interface PriceListOption {
  id: string;
  label: string;
}

const options: PriceListOption[] = [
  { id: "sin-embase", label: "Sin embase" },
  { id: "con-embase", label: "Con embase" },
  { id: "embase-botellas", label: "Con embase y Botellas" },
  { id: "botellas-sin-embase", label: "Con botellas y sin embase" },
  { id: "nene-provisiones", label: "Nene Provisiones" },
];

export default function PriceListDropdown({
  value,
  onChange,
  onAddNew,
}: {
  value: string;
  onChange: (val: string) => void;
  onAddNew: () => void;
}) {
  const [query, setQuery] = useState("");

  const filteredOptions = query
    ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
    : options;

  return (
    <Combobox value={value} onChange={onChange}>
      <div className="relative w-64">
        <Combobox.Input
          className="w-full border rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:border-emerald-500"
          onChange={(e) => setQuery(e.target.value)}
          displayValue={(val: string) =>
            options.find((o) => o.id === val)?.label || ""
          }
          placeholder="Buscar"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </Combobox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white border border-gray-200 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
            {filteredOptions.length === 0 && (
              <div className="cursor-default select-none py-2 px-4 text-gray-500">
                No se encontró nada.
              </div>
            )}
            {filteredOptions.map((option) => (
              <Combobox.Option
                key={option.id}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-emerald-50 text-emerald-700" : "text-gray-900"
                  }`
                }
                value={option.id}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-600">
                        <Check className="w-4 h-4" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
            {/* Línea separadora y opción especial */}
            <div className="border-t my-1" />
            <button
              type="button"
              className="block w-full text-left px-4 py-2 text-emerald-600 hover:underline text-sm"
              onClick={onAddNew}
            >
              Nueva Lista de precios
            </button>
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
