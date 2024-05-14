import { Request, Response, NextFunction } from "express";
import { HTTPCODES, MainAppError } from "../../Utils/MainAppError";


const DeveloperError = (err: MainAppError, res: Response) => {
  return res.status(HTTPCODES.INTERNAL_SERVER_ERROR).json({
    error: err,
    message: err.message,
    stack: err.stack,
    status: err.httpcode,
  });
};

export const errorHandler = (
  err: MainAppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  DeveloperError(err, res);
};