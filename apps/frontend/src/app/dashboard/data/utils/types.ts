export type ParsedData = {
  headers: string[];
  rows: Record<string, any>[];
  columnTypes: Record<string, "number" | "string" | "date">;
};

export type ChartConfig = {
  id: string;
  chartType: "bar" | "line" | "pie";
  xKey: string;
  yKey?: string;
  aggregation?: "sum" | "avg" | "count";
  rowLimit: number;
};
