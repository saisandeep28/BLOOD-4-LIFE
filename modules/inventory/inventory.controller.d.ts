import { Request, Response, NextFunction } from 'express';
export declare const addUnit: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getInventory: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const updateStatus: (req: Request, res: Response, next: NextFunction) => Promise<void>;
