import { ApiError, PaginationMeta } from '@life-for-all/types';
import { Response } from 'express';
export declare const sendSuccess: <T>(res: Response, data: T, statusCode?: number, meta?: PaginationMeta) => void;
export declare const sendError: (res: Response, error: ApiError, statusCode?: number) => void;
