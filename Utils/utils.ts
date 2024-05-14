import { Response } from "express";
import { HTTPCODES } from "./MainAppError";

export const generateRandomNumericString = (): string => {
  const numericString = Math.floor(Math.random() * 10000000000).toString();
  return numericString.padStart(10, "0");
};

// error
export function handleErrorResponse(
  error: unknown,
  res: Response,
  statusCode = HTTPCODES.INTERNAL_SERVER_ERROR
) {
  if (error instanceof Error) {
    return res.status(statusCode).json({ error: error.message });
  } else {
    return res.status(statusCode).json({ error });
  }
}
