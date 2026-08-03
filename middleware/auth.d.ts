import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@life-for-all/types';
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                role: UserRole;
                email: string;
            };
        }
    }
}
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
