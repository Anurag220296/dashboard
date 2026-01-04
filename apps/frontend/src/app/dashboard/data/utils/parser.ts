export function inferColumnTypes(rows: Record<string, any>[]) {
  const types: Record<string, "number" | "string" | "date"> = {};

  Object.keys(rows[0]).forEach((key) => {
    const sample = rows.slice(0, 10).map((r) => r[key]);

    if (sample.every((v) => !isNaN(Number(v)))) {
      types[key] = "number";
    } else if (sample.every((v) => !isNaN(Date.parse(v)))) {
      types[key] = "date";
    } else {
      types[key] = "string";
    }
  });

  return types;
}
