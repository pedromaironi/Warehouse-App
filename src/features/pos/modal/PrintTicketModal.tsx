// src/features/pos/components/PrintTicketModal.tsx

import React, { useRef } from "react";
import { InvoicePrintData } from "../types/invoicePrint";

/**
 * PrintTicketModal
 * Renders a print-friendly ticket invoice and triggers print action for 80mm POS printers.
 */
interface PrintTicketModalProps {
  data: InvoicePrintData;
  open: boolean;
  onClose: () => void;
}

const PrintTicketModal: React.FC<PrintTicketModalProps> = ({
  data,
  open,
  onClose,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  // Print only the ticket, styled for 80mm receipt printers
const handlePrint = () => {
  if (!printRef.current) return;
  const printContents = printRef.current.innerHTML;
  const win = window.open("", "PRINT", "height=900,width=350");
  if (win) {
    win.document.write(`
      <html>
        <head>
          <title>Factura</title>
          <style>
            @media print {
              @page {
                size: 80mm auto;
                margin: 0;
              }
              html, body {
                width: 80mm !important;
                min-width: 80mm !important;
                max-width: 80mm !important;
                margin: 0 !important;
                padding: 0 !important;
                background: #fff !important;
              }
              .ticket {
                width: 80mm !important;
                min-width: 80mm !important;
                max-width: 80mm !important;
                margin: 0 !important;
                padding: 0 !important;
                font-family: monospace, Arial, sans-serif;
                font-size: 13px;
                background: #fff;
              }
              * {
                box-sizing: border-box;
              }
            }
            html, body {
              width: 80mm !important;
              min-width: 80mm !important;
              max-width: 80mm !important;
              margin: 0 !important;
              padding: 0 !important;
              background: #fff !important;
            }
            .ticket {
              width: 80mm !important;
              min-width: 80mm !important;
              max-width: 80mm !important;
              margin: 0 !important;
              padding: 0 !important;
              font-family: monospace, Arial, sans-serif;
              font-size: 13px;
              background: #fff;
            }
            .ticket-header, .ticket-footer { text-align: center; }
            .ticket-table { width: 100%; border-collapse: collapse; font-size: 12px;}
            .ticket-table th, .ticket-table td { padding: 1px 0; }
            .ticket-table th { border-bottom: 1px dashed #888; font-size: 12px;}
            .ticket-table td { text-align: right; }
            .ticket-table td.name { text-align: left; }
            .totals { margin-top: 8px; }
            .totals tr td { padding: 1px 0; }
            .big { font-size: 15px; font-weight: bold; }
            .change { color: red; }
          </style>
        </head>
        <body>
          <div class="ticket">
            ${printContents}
          </div>
        </body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
    setTimeout(() => win.close(), 200);
  }
};



  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full flex flex-col items-center">
        <h2 className="font-bold text-xl mb-2">Vista previa de factura</h2>
        <div
          ref={printRef}
          className="w-full overflow-auto"
          style={{ background: "#fff", padding: 0 }}
        >
          {/* TICKET LAYOUT */}
          <div className="ticket-header">
            <div className="font-bold">{data.business.name}</div>
            <div>Teléfono: {data.business.phone}</div>
            {data.business.address && <div>{data.business.address}</div>}
            {data.business.rnc && <div>RNC: {data.business.rnc}</div>}
          </div>
          <div className="text-xs mt-2 mb-1" style={{ whiteSpace: "pre-line" }}>
            Factura: {data.invoiceNumber}
            {data.ncf && <> | NCF: {data.ncf}</>}
            <br />
            Fecha: {data.date} <br />
            Tipo de pago: {data.paymentType}
            <br />
            Sucursal: {data.branch}
            {data.dueDate && <><br />Vencimiento: {data.dueDate}</>}
          </div>
          <div className="font-semibold mt-2 mb-1">Cliente: {data.customer}</div>
          {/* Productos */}
          <table className="ticket-table mb-2">
            <thead>
              <tr>
                <th className="text-left">Producto</th>
                <th>Cant.</th>
                <th>P/U</th>
                <th>Importe</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((p, i) => (
                <tr key={i}>
                  <td className="name">{p.name}</td>
                  <td>{p.quantity}</td>
                  <td>{p.price.toFixed(2)}</td>
                  <td>{p.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Totales */}
          <table className="totals w-full text-xs">
            <tbody>
              <tr>
                <td>Subtotal:</td>
                <td className="text-right" colSpan={3}>
                  RD${data.subtotal.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>ITBIS:</td>
                <td className="text-right" colSpan={3}>
                  RD${data.itbis.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="big">Total:</td>
                <td className="text-right big" colSpan={3}>
                  RD${data.total.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>Total recibido:</td>
                <td className="text-right" colSpan={3}>
                  RD${data.received.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td>Cambio:</td>
                <td className="text-right change" colSpan={3}>
                  RD${data.change.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="ticket-footer mt-2 text-xs">
            {data.footerNote || "Developed by Pedro Toribio"}
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            className="bg-emerald-600 text-white px-6 py-2 rounded font-semibold shadow hover:bg-emerald-700"
            onClick={handlePrint}
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

export default PrintTicketModal;
