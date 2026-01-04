export default function TablePreview({
  headers,
  rows,
}: {
  headers: string[];
  rows: any[];
}) {
  return (
    <div className="overflow-auto border rounded">
      <table className="min-w-full text-sm">
        <thead className="sticky top-0 bg-gray-100">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-3 py-2 border">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {headers.map((h) => (
                <td key={h} className="px-3 py-2 border">
                  {String(r[h])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
