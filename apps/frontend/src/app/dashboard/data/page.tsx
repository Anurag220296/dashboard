"use client";

import { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function DataPage() {
  const [data, setData] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>({});
  const [numericColumns, setNumericColumns] = useState<string[]>([]);
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [rowLimit, setRowLimit] = useState<number>(10);

  /* ----------------------------- */
  /* FILE UPLOAD                  */
  /* ----------------------------- */
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("[DataPage] file uploaded:", file.name);

    if (file.name.endsWith(".csv")) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results:any) => {
          console.log("[DataPage] CSV parsed", results.data);
          processData(results.data);
        },
      });
    } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const wb = XLSX.read(evt.target?.result);
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const jsonData = XLSX.utils.sheet_to_json(ws);
        console.log("[DataPage] Excel parsed", jsonData);
        processData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Unsupported file type");
    }
  };

  const processData = (rows: any[]) => {
    console.log("[DataPage] processing data");
    setData(rows);

    if (rows.length > 0) {
      const numericCols = Object.keys(rows[0]).filter((col) =>
        !isNaN(Number(rows[0][col]))
      );
      console.log("[DataPage] numeric columns:", numericCols);
      setNumericColumns(numericCols);
      setSelectedColumn(numericCols[0] || null);
    }

    const summaryObj: any = { totalRows: rows.length };
    setSummary(summaryObj);
  };

  /* ----------------------------- */
  /* RENDER CHART                  */
  /* ----------------------------- */
  const renderChart = () => {
    if (!selectedColumn || data.length === 0) return null;

    const chartData = data.slice(0, rowLimit);
    console.log("[DataPage] rendering chart", chartType, selectedColumn, rowLimit);

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(chartData[0])[0]} />
              <YAxis />
              <Tooltip />
              <Bar dataKey={selectedColumn} fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={Object.keys(chartData[0])[0]} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey={selectedColumn} stroke="#f43f5e" />
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey={selectedColumn}
                nameKey={Object.keys(chartData[0])[0]}
                outerRadius={100}
                fill="#3b82f6"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={randomColor(index)} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const randomColor = (i: number) => {
    const colors = ["#3b82f6", "#f43f5e", "#16a34a", "#fbbf24", "#8b5cf6"];
    return colors[i % colors.length];
  };

  /* ----------------------------- */
  /* RENDER UI                     */
  /* ----------------------------- */
  return (
    <div>
      <h1>Data Page</h1>
      <p>Upload CSV or Excel to visualize data.</p>

      <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />

      {data.length > 0 && (
        <div style={{ marginTop: 24 }}>
          {/* Summary */}
          <h2>Summary</h2>
          <div style={{ display: "flex", gap: 16 }}>
            <SummaryCard title="Total Rows" value={summary.totalRows} />
          </div>

          {/* Controls */}
          <div style={{ marginTop: 24, display: "flex", gap: 16 }}>
            <div>
              <label>Chart Type: </label>
              <select
                value={chartType}
                onChange={(e) =>
                  setChartType(e.target.value as "bar" | "line" | "pie")
                }
              >
                <option value="bar">Bar</option>
                <option value="line">Line</option>
                <option value="pie">Pie</option>
              </select>
            </div>

            <div>
              <label>Numeric Column: </label>
              <select
                value={selectedColumn || ""}
                onChange={(e) => setSelectedColumn(e.target.value)}
              >
                {numericColumns.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Rows Limit: </label>
              <input
                type="number"
                value={rowLimit}
                onChange={(e) => setRowLimit(Number(e.target.value))}
                min={1}
                max={data.length}
              />
            </div>
          </div>

          {/* Table Preview */}
          <h2 style={{ marginTop: 32 }}>Preview Table</h2>
          <table style={{ borderCollapse: "collapse", width: "100%", marginTop: 12 }}>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} style={{ border: "1px solid #ddd", padding: 8 }}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(0, rowLimit).map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j} style={{ border: "1px solid #ddd", padding: 8 }}>
                      {val as string}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Chart */}
          <div style={{ marginTop: 32 }}>{renderChart()}</div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------- */
/* Reusable Summary Card        */
/* ---------------------------- */
function SummaryCard({ title, value }: { title: string; value: any }) {
  console.log("[SummaryCard] render", title, value);
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        padding: 16,
        minWidth: 120,
      }}
    >
      <p style={{ fontSize: 13, color: "#64748b", marginBottom: 4 }}>{title}</p>
      <strong style={{ fontSize: 22 }}>{value}</strong>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import FileUploader from "./components/FileUploader";
// import SummaryCards from "./components/SummaryCards";
// import ChartConfigurator from "./components/ChartConfigurator";
// import ChartRenderer from "./components/ChartRenderer";
// import TablePreview from "./components/TablePreview";
// import { ParsedData, ChartConfig } from "./utils/types";

// export default function DataPage() {
//   const [data, setData] = useState<ParsedData | null>(null);
//   const [charts, setCharts] = useState<ChartConfig[]>([]);
//   const [globalRowLimit, setGlobalRowLimit] = useState(100);

//   const addChart = () => {
//     if (!data) return;

//     setCharts((prev) => [
//       ...prev,
//       {
//         id: crypto.randomUUID(),
//         chartType: "bar",
//         xKey: data.headers[0],
//         yKey: undefined,
//         aggregation: "count",
//         rowLimit: globalRowLimit,
//       },
//     ]);
//   };

//   const updateChart = (id: string, updates: Partial<ChartConfig>) => {
//     setCharts((prev) =>
//       prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
//     );
//   };

//   const removeChart = (id: string) => {
//     setCharts((prev) => prev.filter((c) => c.id !== id));
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Upload + Global Filters */}
//       <div className="flex justify-between items-center gap-4">
//         <FileUploader onDataParsed={setData} />
//         {data && (
//           <select
//             value={globalRowLimit}
//             onChange={(e) => setGlobalRowLimit(Number(e.target.value))}
//             className="border rounded px-3 py-2"
//           >
//             {[50, 100, 500, 1000].map((n) => (
//               <option key={n} value={n}>
//                 {n} rows
//               </option>
//             ))}
//           </select>
//         )}
//       </div>

//       {/* Summary */}
//       {data && <SummaryCards data={data} />}

//       {/* Add Chart */}
//       {data && (
//         <button
//           onClick={addChart}
//           className="px-4 py-2 bg-black text-white rounded"
//         >
//           + Add Chart
//         </button>
//       )}

//       {/* Charts */}
//       {charts.map((chart) => (
//         <div
//           key={chart.id}
//           className="grid grid-cols-12 gap-4 border rounded p-4"
//         >
//           <div className="col-span-12 md:col-span-4">
//             <ChartConfigurator
//               chart={chart}
//               data={data!}
//               onChange={(u) => updateChart(chart.id, u)}
//               onRemove={() => removeChart(chart.id)}
//             />
//           </div>

//           <div className="col-span-12 md:col-span-8">
//             <ChartRenderer chart={chart} rows={data!.rows} />
//           </div>
//         </div>
//       ))}

//       {/* Table Preview */}
//       {data && (
//         <TablePreview
//           headers={data.headers}
//           rows={data.rows.slice(0, globalRowLimit)}
//         />
//       )}
//     </div>
//   );
// }
