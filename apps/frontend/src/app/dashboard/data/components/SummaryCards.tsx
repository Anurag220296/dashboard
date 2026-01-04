import { ParsedData } from "../utils/types";

export default function SummaryCards({ data }: { data: ParsedData }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="border p-4 rounded">Rows: {data.rows.length}</div>
      <div className="border p-4 rounded">Columns: {data.headers.length}</div>
      <div className="border p-4 rounded">
        Numeric:{" "}
        {Object.values(data.columnTypes).filter((t) => t === "number").length}
      </div>
    </div>
  );
}
