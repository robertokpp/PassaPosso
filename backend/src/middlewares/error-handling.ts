import { AppError } from "../utils/AppError.js";
import { ErrorRequestHandler } from "express";
import multer from "multer";
import { ZodError, z } from "zod";

export const errorHandling: ErrorRequestHandler = (
  error,
  request,
  response,
  next,
) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({ message: error.message });
    return;
  }

  if (error instanceof ZodError) {
    response
      .status(400)
      .json({ message: "Validation error", issues: z.treeifyError(error) });
    return;
  }

  if (error instanceof multer.MulterError) {
    response.status(400).json({ message: error.message, code: error.code });
    return;
  }

  response.status(500).json({ message: error.message });
  return;
};
