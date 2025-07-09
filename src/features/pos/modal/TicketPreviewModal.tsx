import React from "react";
import { InvoicePrintData } from "../types/invoicePrint";

interface Props {
  open: boolean;
  onClose: () => void;
  data: InvoicePrintData;
  onPrint: () => void; // El hook se pasa aquí
}

const TicketPreviewModal: React.FC<Props> = ({
  open,
  onClose,
  data,
  onPrint,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl px-8 py-6 max-w-lg w-full flex flex-col items-center">
        <h2 className="font-bold text-2xl mb-3 text-center">
          Vista previa de factura
        </h2>
        <div
          className="w-full overflow-auto"
          style={{
            background: "#fff",
            padding: 16,
            fontFamily: "inherit",
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            marginBottom: 16,
          }}
        >
          {/* -- Bonito diseño preview, solo pantalla -- */}
          <div className="text-center mb-2">
            <div className="font-bold text-lg">{data.business.name}</div>
            <div className="text-sm">Teléfono: {data.business.phone}</div>
            {data.business.address && (
              <div className="text-sm">{data.business.address}</div>
            )}
            {data.business.rnc && (
              <div className="text-sm">RNC: {data.business.rnc}</div>
            )}
          </div>
          <div className="text-sm mb-2">
            <span className="font-semibold">Factura:</span> {data.invoiceNumber}
            {data.ncf && (
              <>
                {" "}
                <span className="font-semibold">| NCF:</span> {data.ncf}
              </>
            )}
            <br />
            <span className="font-semibold">Fecha:</span> {data.date}
            <br />
            <span className="font-semibold">Tipo de pago:</span>{" "}
            {data.paymentType}
            <br />
            <span className="font-semibold">Sucursal:</span> {data.branch}
            {data.dueDate && (
              <>
                <br />
                <span className="font-semibold">Vencimiento:</span>{" "}
                {data.dueDate}
              </>
            )}
          </div>
          <div className="font-semibold mb-2 text-sm">
            Cliente: {data.customer}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs mb-2 border-separate border-spacing-y-1">
              <thead>
                <tr>
                  <th className="text-left">Producto</th>
                  <th className="text-center">Cant.</th>
                  <th className="text-right">P/U</th>
                  <th className="text-right">Importe</th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((p, i) => (
                  <tr key={i}>
                    <td className="text-left">{p.name}</td>
                    <td className="text-center">{p.quantity}</td>
                    <td className="text-right">{p.price.toFixed(2)}</td>
                    <td className="text-right">{p.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>RD${data.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>ITBIS:</span>
              <span>RD${data.itbis.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base">
              <span>Total:</span>
              <span>RD${data.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total recibido:</span>
              <span>RD${data.received.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Cambio:</span>
              <span>RD${data.change.toFixed(2)}</span>
            </div>
          </div>
          <div className="text-center text-xs mt-2 font-semibold">
            {data.footerNote || "Developed by Pedro Toribio"}
          </div>
        </div>
        <div className="flex gap-3 mt-2">
          <button
            className="bg-emerald-600 text-white px-6 py-2 rounded font-semibold shadow hover:bg-emerald-700"
            onClick={onPrint}
          >
            Imprimir
          </button>
          <button
            className="border px-6 py-2 rounded text-gray-700 font-semibold hover:bg-gray-100"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketPreviewModal;
