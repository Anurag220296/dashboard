import { ChartConfig } from "./types";

export function prepareChartData(rows: any[], chart: ChartConfig) {
  const limited = rows.slice(0, chart.rowLimit);

  const map: Record<string, number[]> = {};

  limited.forEach((r) => {
    const x = r[chart.xKey];
    const y = chart.yKey ? Number(r[chart.yKey]) : 1;

    if (!map[x]) map[x] = [];
    map[x].push(y);
  });

  return Object.entries(map).map(([x, values]) => ({
    x,
    name: x,
    value:
      chart.aggregation === "avg"
        ? values.reduce((a, b) => a + b, 0) / values.length
        : chart.aggregation === "sum"
        ? values.reduce((a, b) => a + b, 0)
        : values.length,
  }));
}
