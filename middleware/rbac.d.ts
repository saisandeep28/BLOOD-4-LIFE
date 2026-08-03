import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@life-for-all/types';
export declare const authorize: (roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => void;
export declare const requireVerified: (req: Request, res: Response, next: NextFunction) => void;
