// apps/backend/src/types.ts

export type User = {
  id: string;
  email: string;
  role: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
