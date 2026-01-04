import { ChartConfig, ParsedData } from "../utils/types";

export default function ChartConfigurator({
  chart,
  data,
  onChange,
  onRemove,
}: {
  chart: ChartConfig;
  data: ParsedData;
  onChange: (u: Partial<ChartConfig>) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-3">
      <select
        value={chart.chartType}
        onChange={(e) => onChange({ chartType: e.target.value as any })}
        className="w-full border p-2"
      >
        <option value="bar">Bar</option>
        <option value="line">Line</option>
        <option value="pie">Pie</option>
      </select>

      <select
        value={chart.xKey}
        onChange={(e) => onChange({ xKey: e.target.value })}
        className="w-full border p-2"
      >
        {data.headers.map((h) => (
          <option key={h}>{h}</option>
        ))}
      </select>

      {chart.chartType !== "pie" && (
        <select
          value={chart.yKey}
          onChange={(e) => onChange({ yKey: e.target.value })}
          className="w-full border p-2"
        >
          <option value="">Select Y</option>
          {data.headers
            .filter((h) => data.columnTypes[h] === "number")
            .map((h) => (
              <option key={h}>{h}</option>
            ))}
        </select>
      )}

      <select
        value={chart.aggregation}
        onChange={(e) => onChange({ aggregation: e.target.value as any })}
        className="w-full border p-2"
      >
        <option value="count">Count</option>
        <option value="sum">Sum</option>
        <option value="avg">Average</option>
      </select>

      <button onClick={onRemove} className="text-red-600">
        Remove
      </button>
    </div>
  );
}
