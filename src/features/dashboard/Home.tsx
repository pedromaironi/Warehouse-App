import SummaryCard from "./components/SummaryCard";
import SalesChart from "./components/SalesChart";
import TransactionsChart from "./components/TransactionsChart";
import ExpensesTable from "./components/ExpensesTable";

export default function Home() {
  return (
    <div className="space-y-6 mb-4">
      <h1 className="text-2xl font-bold text-gray-800">Resumen del negocio</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <SummaryCard title="Cuentas por cobrar" value="RD$0.00" description="0 documentos" />
        <SummaryCard title="Cuentas por pagar" value="RD$0.00" description="0 documentos" />
        <SummaryCard title="Impuestos en venta" value="RD$0.00" />
        <SummaryCard title="Productos vendidos" value="0" />
        <SummaryCard title="Devoluciones de clientes" value="RD$0.00" description="Incluye impuestos" />
        <SummaryCard title="Clientes con ventas" value="0" />
      </div>

      {/* Gráficas */}
      <SalesChart />
      <TransactionsChart />
      <ExpensesTable />
    </div>
  );
}
