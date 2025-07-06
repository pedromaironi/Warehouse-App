import { useExpensesData } from "../hooks/useExpensesData";

export default function ExpensesTable() {
  const data = useExpensesData();
  const total = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-1">Distribución de gastos</h3>
      <p className="text-xs text-gray-400 mb-4">La gráfica muestra el valor de tu top 5 de gastos</p>

      <div className="flex justify-between mb-4">
        <p className="text-lg font-semibold">Total</p>
        <p className="text-lg font-bold">RD${total.toFixed(2)}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-gray-500 uppercase border-b">
            <tr>
              <th className="py-2">Concepto</th>
              <th>Valor</th>
              <th>Participación</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              const percentage = total > 0 ? ((item.value / total) * 100).toFixed(1) + "%" : "0%";
              return (
                <tr key={i} className="border-b">
                  <td className="py-2 flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full bg-${item.color}-500`}></span>
                    {item.label}
                  </td>
                  <td>RD${item.value.toFixed(2)}</td>
                  <td>{percentage}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
