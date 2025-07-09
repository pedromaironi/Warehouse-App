import { InvoicePrintData } from "../types/invoicePrint";

/**
 * usePrintTicket
 * Hook para imprimir el ticket con el diseño 80mm, usando cualquier data.
 */
export function usePrintTicket() {
  function print(data: InvoicePrintData) {
    // Construye el layout del ticket SOLO para impresión
    const html = `
      <div class="ticket">
        <div class="ticket-header">
          <div class="bold" style="font-size: 18px;">${data.business.name}</div>
          <div>Teléfono: ${data.business.phone}</div>
          ${data.business.address ? `<div>${data.business.address}</div>` : ""}
          ${data.business.rnc ? `<div>RNC: ${data.business.rnc}</div>` : ""}
        </div>
        <div style="font-weight: 600; margin: 8px 0 4px 0;">
          Factura: <span class="bold">${data.invoiceNumber}</span>
          ${data.ncf ? `| NCF: <span class="bold">${data.ncf}</span>` : ""}
          <br />Fecha: <span>${data.date}</span> <br />
          Tipo de pago: <span>${data.paymentType}</span>
          <br />Sucursal: <span>${data.branch}</span>
          ${data.dueDate ? `<br />Vencimiento: <span>${data.dueDate}</span>` : ""}
        </div>
        <div class="bold mt-1 mb-2">Cliente: ${data.customer}</div>
        <table class="ticket-table mb-2 ">
          <thead>
            <tr>
              <th class="text-left bold">Producto</th>
              <th class="bold">Cant.</th>
              <th class="bold">P/U</th>
              <th class="bold">Importe</th>
            </tr>
          </thead>
          <tbody>
            ${data.products.map(
              (p) => `<tr>
                <td class="name">${p.name}</td>
                <td>${p.quantity}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>${p.total.toFixed(2)}</td>
              </tr>`
            ).join("")}
          </tbody>
        </table>
        <table class="totals">
          <tbody>
            <tr>
              <td>Subtotal:</td>
              <td class="text-right" colSpan="3">
                RD$${data.subtotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>ITBIS:</td>
              <td class="text-right" colSpan="3">
                RD$${data.itbis.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td class="big">Total:</td>
              <td class="text-right big" colSpan="3">
                RD$${data.total.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td>Total recibido:</td>
              <td class="text-right" colSpan="3">
                RD$${data.received.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td class="change">Cambio:</td>
              <td class="text-right change" colSpan="3">
                RD$${data.change.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="ticket-footer">
          ${data.footerNote || `<span class="bold">Developed by Pedro Toribio</span>`}
        </div>
      </div>
    `;

    // Estilos SOLO para impresión
    const style = `
      <style>
        @media print {
          @page { size: 80mm auto; margin: 0; }
        }
        body {
          font-family: 'Courier New', Courier, monospace !important;
          font-size: 16px !important;
          background: #fff !important;
          color: #111;
          margin: 0;
          padding: 0;
          width: 340px;
        }
        .ticket {
          width: 340px;
          margin: 0 auto;
          padding: 3rem;
          background: #fff;
        }
        .ticket-header, .ticket-footer {
          text-align: center;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .ticket-header { font-size: 18px; margin-bottom: 2px; }
        .ticket-footer { font-size: 13px; margin-top: 14px; }
        .ticket-table {
          width: 100%; border-collapse: collapse; font-size: 15px;
          table-layout: fixed; font-weight: bold;
        }
        .ticket-table th, .ticket-table td {
          padding: 2px 0; font-weight: bold; word-break: break-all;
        }
        .ticket-table th {
          border-bottom: 1px dashed #000; font-size: 15px; background: #fff; text-align: center;
        }
        .ticket-table td { font-size: 15px; background: #fff; text-align: center; }
        .ticket-table td.name { text-align: left; width: 55%; font-size: 15px; font-weight: bold; }
        .totals { margin-top: 14px; width: 100%; font-size: 16px; }
        .totals td { padding: 3px 0; font-size: 16px; }
        .totals .big, .totals .big td { font-size: 19px; font-weight: bold; }
        .totals .change, .totals .change td { color: #c00; font-weight: bold; }
        .title { font-weight: bold; font-size: 15px; margin-bottom: 1px; letter-spacing: 1px; }
        .bold { font-weight: bold; }
        .row { display: flex; justify-content: space-between; }
        .mt-1 { margin-top: 8px; }
        .mb-2 { margin-bottom: 12px; }
      </style>
    `;

    // Abrir, imprimir y cerrar
    const win = window.open("", "PRINT", "height=900,width=400");
    if (win) {
      win.document.write(`<html><head><title>Factura</title>${style}</head><body>${html}</body></html>`);
      win.document.close();
      win.focus();
      win.print();
      setTimeout(() => win.close(), 200);
    }
  }
  return print;
}
