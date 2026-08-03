import { ApiResponse, ApiError, PaginationMeta } from '@life-for-all/types';
import { Response } from 'express';

export const sendSuccess = <T>(res: Response, data: T, statusCode = 200, meta?: PaginationMeta): void => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    error: null,
    meta
  };
  res.status(statusCode).json(response);
};

export const sendError = (res: Response, error: ApiError, statusCode = 400): void => {
  const response: ApiResponse<null> = {
    success: false,
    data: null,
    error
  };
  res.status(statusCode).json(response);
};
