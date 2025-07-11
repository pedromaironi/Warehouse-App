import { FaArrowLeft, FaBan, FaShareAlt, FaPrint } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MOCK_SALES } from "../data/mockSales";
import { useState } from "react";
import { InvoicePrintData } from "../types/invoicePrint";
import { usePrintTicket } from "../hooks/usePrintTicket";

/**
 * SaleDetailPage
 * Displays modern SaaS-style invoice details with PDF download,
 * cancel, share, and print actions. All CTA buttons are
 * interactive (cursor-pointer, hover, color).
 */
export default function SaleDetailPage() {
  const navigate = useNavigate();
  // For demo, using the first MOCK_SALES item
  const [sale, setSale] = useState(MOCK_SALES[0]); // Replace as needed
  const printTicket = usePrintTicket();
  
  // Example handlers for CTAs
  const handleBack = () => navigate(-1);
  const handleCancel = () => {
    if (sale.status === "anulada") {
      alert("Esta factura ya está anulada.");
      return;
    }
    setSale({ ...sale, status: "anulada" });
    alert("Factura anulada (demo)");
  };
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Enlace copiado al portapapeles (demo)");
  };
  const handlePrint = () => {
    // --- Map your sale data to InvoicePrintData type ---
    const invoicePrintData: InvoicePrintData = {
      business: {
        name: sale.shop,
        phone: "809-000-0000",
        address: "Dirección demo",
        rnc: "123456789",
      },
      invoiceNumber: sale.invoiceNumber,
      ncf: sale.ncf || "",
      date: new Date(sale.date).toLocaleString("es-DO"),
      paymentType: sale.paymentType,
      branch: sale.shop,
      dueDate: "-", // Add real data if available
      customer: sale.customer,
      products: sale.products.map((p) => ({
        name: p.name,
        quantity: p.qty,
        price: p.price,
        total: p.subtotal,
      })),
      subtotal: sale.paymentSummary.subtotal,
      itbis: sale.paymentSummary.tax,
      total: sale.paymentSummary.total,
      received: sale.paymentSummary.received,
      change: sale.paymentSummary.change,
      footerNote: "Gracias por su compra.",
    };

    printTicket(invoicePrintData);
  };

  // Badge by status
  const statusColors = {
    pagada: "bg-green-100 text-green-700",
    anulada: "bg-red-100 text-red-700",
    pendiente: "bg-yellow-100 text-yellow-700",
  };
  const statusText = {
    pagada: "Pagada",
    anulada: "Anulada",
    pendiente: "Pendiente",
  };

  const productos = sale.products;

  return (
    <div className="bg-[#fafbfc] min-h-screen py-10 px-2">
      <div className="max-w-6xl mx-auto">
        {/* --- Page Title & CTA row --- */}
        <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
          <h1 className="text-3xl font-bold mb-1">Detalles de la factura</h1>
          <div className="flex gap-2 flex-wrap">
            {/* Cancel button */}
            <button
              onClick={handleCancel}
              className={`px-4 py-2 rounded-2xl font-medium flex items-center gap-2 transition border shadow-sm
                bg-red-50 text-red-700 border-red-200 hover:bg-red-100
                ${
                  sale.status === "anulada"
                    ? "opacity-60 cursor-not-allowed"
                    : "cursor-pointer"
                }
              `}
              disabled={sale.status === "anulada"}
              title="Anular factura"
            >
              <FaBan /> Anular
            </button>
            {/* Share button */}
            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-2xl font-medium flex items-center gap-2 transition border shadow-sm
                bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 cursor-pointer"
              title="Compartir enlace"
            >
              <FaShareAlt /> Compartir
            </button>
            {/* Print button */}
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-2xl font-medium flex items-center gap-2 transition border shadow-sm
                bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 cursor-pointer"
              title="Imprimir"
            >
              <FaPrint /> Imprimir
            </button>
          </div>
        </div>
        {/* Disclaimer */}
        <div className="text-gray-500 mb-4 text-sm">
          Esto es válido como factura y debe usarse solo como referencia. Puede
          encontrarlo en el botón Imprimir.
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          {/* Invoice info block */}
          <div className="bg-white rounded-2xl shadow p-6 flex-1 min-w-[350px] max-w-2xl">
            <div className="flex items-center mb-5 gap-3">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full font-semibold text-xs border border-green-200 ${
                  statusColors[sale.status as keyof typeof statusColors]
                } mr-2`}
              >
                ● {statusText[sale.status as keyof typeof statusText]}
              </span>
              {/* Arrow back only on desktop */}
              <button
                className="ml-auto text-gray-600 hover:text-emerald-700 text-base font-medium cursor-pointer flex items-center gap-2"
                onClick={handleBack}
                title="Volver a ventas"
              >
                <FaArrowLeft className="inline mb-[2px]" /> Volver
              </button>
            </div>
            {/* Meta info grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-12 text-sm">
              <InfoRow label="Tienda" value="0000457890 JUANITO SEVEN UP" />
              <InfoRow label="Número de pedido" value="BE13199773" />
              <InfoRow label="Vendido por" value={sale.shop} />
              <InfoRow label="Número de factura" value={sale.invoiceNumber} />
              <InfoRow label="Fecha de emisión" value="Mié, 9 de jul de 2025" />
              <InfoRow label="Fecha de vencimiento" value="-" />
              <InfoRow
                label="Total"
                value={
                  <span className="font-semibold text-lg text-gray-900">
                    RD$
                    {sale.paymentSummary.total.toLocaleString("es-DO", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                }
              />
            </div>
          </div>

          {/* Payment summary (side) */}
          <div className="bg-white rounded-2xl shadow p-6 w-full md:w-96 mt-2 md:mt-0">
            <div className="font-bold mb-3">Resumen de pagos</div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Subtotal</span>
              <span>
                RD$
                {sale.paymentSummary.subtotal.toLocaleString("es-DO", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Itbis 18%</span>
              <span className="text-green-700">
                RD$
                {sale.paymentSummary.tax.toLocaleString("es-DO", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Descuentos</span>
              <span className="text-green-700">
                RD$
                {(sale.paymentSummary.discount || 0).toLocaleString("es-DO", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-3 pt-3 border-t">
              <span>Total</span>
              <span>
                RD$
                {sale.paymentSummary.total.toLocaleString("es-DO", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Products table */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <div className="bg-white rounded-2xl shadow flex-1 overflow-auto min-w-[350px]">
            <table className="w-full text-sm border-separate">
              <thead>
                <tr className="text-left text-gray-700 border-b">
                  <th className="py-3 px-4 font-semibold">Producto</th>
                  <th className="py-3 px-2 font-semibold">Precio</th>
                  <th className="py-3 px-2 font-semibold">Cantidad</th>
                  <th className="py-3 px-2 font-semibold">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-0 hover:bg-gray-50 group transition"
                  >
                    <td className="py-2 px-4">
                      <span className="font-medium text-gray-900">
                        {p.name}
                      </span>
                      <br />
                      <span className="text-xs text-gray-500">
                        SKU - {p.sku}
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      RD$
                      {p.price.toLocaleString("es-DO", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-2 px-2">{p.qty}</td>
                    <td className="py-2 px-2 font-semibold">
                      RD$
                      {p.subtotal.toLocaleString("es-DO", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination simulation */}
            <div className="flex items-center justify-between py-2 px-4 border-t text-xs text-gray-600 bg-white rounded-b-2xl">
              <span>
                1 - {productos.length} de {productos.length}
              </span>
              <div>
                Líneas por página:
                <select className="ml-1 border rounded px-1 py-0.5 focus:outline-none cursor-pointer">
                  <option>20</option>
                </select>
                <button className="ml-3 px-2 py-1 rounded hover:bg-gray-100 transition cursor-pointer">
                  &lt;
                </button>
                <span className="mx-1">1</span>
                <button className="px-2 py-1 rounded hover:bg-gray-100 transition cursor-pointer">
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * InfoRow
 * Small utility component for displaying invoice meta information.
 */
function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="font-semibold text-gray-700">{label}</div>
      <div className="text-gray-900">{value}</div>
    </div>
  );
}
