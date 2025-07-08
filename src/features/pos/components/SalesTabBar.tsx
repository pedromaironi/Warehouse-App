import { Menu } from "@headlessui/react";

export interface SaleTab {
  id: string;
  name?: string;
}

interface Props {
  sales: SaleTab[];
  activeSaleId: string;
  onTabClick: (id: string) => void;
  onAddTab: () => void;
  onRenameTab: (id: string) => void;
  onDeleteTab: (id: string) => void;
}

const SalesTabsBar = ({
  sales,
  activeSaleId,
  onTabClick,
  onAddTab,
  onRenameTab,
  onDeleteTab,
}: Props) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-white border-t shadow z-40 flex items-center">
      <div className="flex items-center gap-2 px-2 flex-1 overflow-x-auto">
        {sales.map((sale) => (
          <div key={sale.id} className="relative flex items-center">
            <button
              type="button"
              className={`
                flex items-center gap-1 px-4 h-9 rounded-t border border-b-0 shadow-sm font-medium text-gray-700
                ${sale.id === activeSaleId
                  ? "bg-emerald-50 border-emerald-300"
                  : "bg-white hover:bg-gray-100"}
                cursor-pointer
              `}
              onClick={() => onTabClick(sale.id)}
            >
              <span className="inline-block w-5 h-5 mr-1">🧾</span>
              {sale.name}
            </button>
            {sale.id !== "main" && (
              <Menu as="div" className="relative flex items-center ml-1">
                <Menu.Button
                  className={`
                    h-9 w-9 flex items-center justify-center rounded border
                    border-gray-200 bg-white hover:bg-gray-100 text-gray-600 transition cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-emerald-400
                  `}
                >
                  <span className="text-lg font-bold">⋯</span>
                </Menu.Button>
                <Menu.Items
                  anchor="bottom"
                  className="absolute left-1/2 top-11 min-w-[120px] z-50 bg-white border rounded shadow-lg py-1 flex flex-col outline-none"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className={`text-sm text-gray-700 px-4 py-2 text-left cursor-pointer w-full ${active ? "bg-gray-100" : ""}`}
                        onClick={() => onRenameTab(sale.id)}
                      >
                        Renombrar
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className={`text-sm text-gray-400 px-4 py-2 text-left cursor-pointer w-full ${active ? "bg-red-50" : ""}`}
                        onClick={() => onDeleteTab(sale.id)}
                      >
                        Eliminar
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            )}
          </div>
        ))}
        {/* Add new tab button */}
        <button
          type="button"
          className="h-9 w-9 ml-2 rounded-full flex items-center justify-center border border-gray-200 text-emerald-700 hover:bg-emerald-50 transition cursor-pointer"
          title="Nueva factura"
          onClick={onAddTab}
        >
          <span className="text-2xl leading-none">+</span>
        </button>
      </div>
    </div>
  );
};

export default SalesTabsBar;
