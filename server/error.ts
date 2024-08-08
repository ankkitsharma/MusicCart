export interface CustomError extends Error {
  status: number;
  message: string;
}

export const createError = (status: number, message: string): CustomError => {
  const err = new Error() as CustomError;
  err.status = status;
  err.message = message;
  return err;
};
