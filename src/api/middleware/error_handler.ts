import { Request, Response, NextFunction } from "express";
import { logger } from "../../utils/logger";
import { AppError } from "../../utils/error";

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error("Error:", error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      code: error.code,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
    code: "INTERNAL_SERVER_ERROR",
  });
};
