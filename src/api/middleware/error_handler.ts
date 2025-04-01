import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../../utils/error";
import { logger } from "../../utils/logger";
import { env } from "../../config/environment";

/**
 * Global error handling middleware for Express
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error details
  logger.error("Error Handler:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Handle known application errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
      code: err.errorCode,
      ...(env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: err.errors,
    });
  }

  // Fallback for unexpected errors
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
