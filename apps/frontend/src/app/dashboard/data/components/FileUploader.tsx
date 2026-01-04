import * as XLSX from "xlsx";
import { inferColumnTypes } from "../utils/parser";
import { ParsedData } from "../utils/types";

export default function FileUploader({
  onDataParsed,
}: {
  onDataParsed: (d: ParsedData) => void;
}) {
  const handleFile = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const wb = XLSX.read(buffer);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(ws);

    const headers = Object.keys(json[0] as any);
    const columnTypes = inferColumnTypes(json as any[]);

    onDataParsed({
      headers,
      rows: json as any[],
      columnTypes,
    });
  };

  return (
    <input
      type="file"
      accept=".csv,.xlsx"
      onChange={(e) => e.target.files && handleFile(e.target.files[0])}
    />
  );
}
