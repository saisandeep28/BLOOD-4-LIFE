import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  logger.error(err.message || 'Internal Server Error', { 
    error: err,
    path: req.path,
    method: req.method,
    ip: req.ip
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Format mongoose errors
  if (err.name === 'ValidationError') {
    res.status(422).json({
      success: false,
      error: { code: 'VALIDATION_ERROR', message, details: err.errors }
    });
    return;
  }

  if (err.code === 11000) {
    res.status(409).json({
      success: false,
      error: { code: 'DUPLICATE_RESOURCE', message: 'Resource already exists' }
    });
    return;
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production' && statusCode === 500 ? 'Internal Server Error' : message,
    }
  });
};
