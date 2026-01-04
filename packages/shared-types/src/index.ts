export interface User {
  id: string;
  email: string;
  role: "ADMIN" | "OPS";
}
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
