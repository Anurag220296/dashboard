export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    credentials: "include", // send cookies automatically
    ...options,
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
