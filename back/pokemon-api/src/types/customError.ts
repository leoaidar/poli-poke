export interface CustomError extends Error {
    statusCode?: number;
    customMessage?: string;
  }
  