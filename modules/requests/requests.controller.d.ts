import { Request as ExpressRequest, Response, NextFunction } from 'express';
export declare const createRequest: (req: ExpressRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getNearbyRequests: (req: ExpressRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const updateStatus: (req: ExpressRequest, res: Response, next: NextFunction) => Promise<void>;
