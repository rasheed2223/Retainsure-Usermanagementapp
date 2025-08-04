import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/user.js';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal server error';

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error.message.includes('UNIQUE constraint failed')) {
    statusCode = 409;
    message = 'Email already exists';
  } else if (error.message.includes('validation')) {
    statusCode = 400;
    message = error.message;
  }

  // Log error for debugging (in production, use proper logging)
  console.error(`Error ${statusCode}: ${message}`, error.stack);

  res.status(statusCode).json({
    success: false,
    error: message
  });
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};