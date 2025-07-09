import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPrint, FaShareAlt, FaBan } from "react-icons/fa";
import { MOCK_SALES } from "../data/mockSales";
import { ProductSale } from "../../products/types/product";
import { PaymentSummary } from "../types/sales";

/**
 * SaleDetailPage
 * Displays the full details for a single sale/invoice.
 */
export default function SaleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const sale = MOCK_SALES.find((s) => s.id === id);

  if (!sale) {
    return <div className="p-10 text-center">Cargando...</div>;
  }

  // Handlers for top buttons
  const handleCancel = () => {
    // Simulate cancel logic (for now just update state)
    setSale({ ...sale, status: "cancelled" });
    alert("Factura anulada (demo)");
  };
  const handleShare = () => {
    // Simulate share logic
    navigator.clipboard.writeText(window.location.href);
    alert("Enlace copiado al portapapeles (demo)");
  };
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 bg-white shadow-lg rounded-lg mt-10 mb-10">
      {/* Top bar: Back, Actions */}
      <div className="flex items-center justify-between mb-8">
        <button
          className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Volver a ventas
        </button>
        <div className="flex gap-3">
          <button
            className="bg-red-100 text-red-700 px-4 py-2 rounded font-semibold flex items-center gap-2 hover:bg-red-200"
            onClick={handleCancel}
          >
            <FaBan /> Anular
          </button>
          <button
            className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded font-semibold flex items-center gap-2 hover:bg-emerald-200"
            onClick={handleShare}
          >
            <FaShareAlt /> Compartir
          </button>
          <button
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold flex items-center gap-2 hover:bg-blue-200"
            onClick={handlePrint}
          >
            <FaPrint /> Imprimir
          </button>
        </div>
      </div>

      {/* Invoice main info */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex flex-wrap gap-8 mb-3">
          <div>
            <div className="font-semibold text-gray-700">Factura</div>
            <div>{sale.invoiceNumber}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700">Tienda</div>
            <div>{sale.shop}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700">Cliente</div>
            <div>{sale.client}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700">Fecha</div>
            <div>{sale.date}</div>
          </div>
          <div>
            <div className="font-semibold text-gray-700">Estado</div>
            <span
              className={`inline-block px-3 py-1 rounded text-xs font-bold ${
                sale.status === "paid"
                  ? "bg-green-100 text-green-700"
                  : sale.status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {sale.status === "paid"
                ? "Pagada"
                : sale.status === "cancelled"
                ? "Anulada"
                : "Pendiente"}
            </span>
          </div>
        </div>
      </div>

      {/* Product table */}
      <div className="overflow-x-auto">
        <table className="min-w-full mb-8 bg-white">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-2">Producto</th>
              <th className="text-left py-2 px-2">SKU</th>
              <th className="text-right py-2 px-2">Precio</th>
              <th className="text-right py-2 px-2">Cantidad</th>
              <th className="text-right py-2 px-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {sale.products.map((p, i: number) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-2 px-2">{p.name}</td>
                <td className="py-2 px-2 text-gray-500">{p.sku}</td>
                <td className="py-2 px-2 text-right">
                  RD${p.price.toFixed(2)}
                </td>
                <td className="py-2 px-2 text-right">{p.qty}</td>
                <td className="py-2 px-2 text-right">
                  RD${p.subtotal.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment summary */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1"></div>
        <div className="bg-gray-50 rounded-lg p-5 w-full md:w-80 shadow-sm">
          <div className="font-bold mb-2">Resumen de pagos</div>
          <div className="flex justify-between mb-1">
            <span>Subtotal</span>
            <span>RD${sale.paymentSummary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>ITBIS</span>
            <span>RD${sale.paymentSummary.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Descuento</span>
            <span className="text-green-700">
              RD${sale.paymentSummary.discount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between font-bold text-xl mt-2 border-t pt-2">
            <span>Total</span>
            <span>RD${sale.paymentSummary.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Total recibido</span>
            <span>RD${sale.paymentSummary.received.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Cambio</span>
            <span className="text-red-500">
              RD${sale.paymentSummary.change.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
function setSale(arg0: { status: string; id: string; invoiceNumber: string; customer: string; total: number; date: string; paymentType: string; products: ProductSale[]; paymentSummary: PaymentSummary; shop: string; client: string; }) {
    throw new Error("Function not implemented.");
}

