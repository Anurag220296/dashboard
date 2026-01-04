import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartConfig } from "../utils/types";
import { prepareChartData } from "../utils/chartHelpers";

export default function ChartRenderer({
  chart,
  rows,
}: {
  chart: ChartConfig;
  rows: any[];
}) {
  const data = prepareChartData(rows, chart);

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        {chart.chartType === "bar" && (
          <BarChart data={data}>
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        )}

        {chart.chartType === "line" && (
          <LineChart data={data}>
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Line dataKey="value" />
          </LineChart>
        )}

        {chart.chartType === "pie" && (
          <PieChart>
            <Tooltip />
            <Pie data={data} dataKey="value" nameKey="name" />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
