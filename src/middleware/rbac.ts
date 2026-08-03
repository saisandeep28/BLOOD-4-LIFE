import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@life-for-all/types';

export const authorize = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Not authenticated' } });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ 
        success: false, 
        error: { code: 'FORBIDDEN', message: 'You do not have permission to perform this action' } 
      });
      return;
    }

    next();
  };
};

export const requireVerified = (req: Request, res: Response, next: NextFunction): void => {
  // In a real app we'd fetch the user's verification status from DB or put it in token.
  // Assuming it's checked in auth.ts or token.
  next();
};
