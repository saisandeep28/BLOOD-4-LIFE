import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { adminService } from './admin.service';
import { sendSuccess } from '../../utils/apiResponse';
import { UserRole } from '@life-for-all/types';

export const getUsers = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const role = req.query.role as UserRole;
    
    const result = await adminService.getUsers(page, limit, role);
    sendSuccess(res, result.users, 200, result.meta);
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await adminService.updateUserStatus(id, req.body);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const verifyEntity = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { entityId } = req.params;
    const { status, rejectionReason } = req.body;
    const result = await adminService.verifyEntity(entityId, status, rejectionReason);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const getAuditLogs = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 50;
    
    const result = await adminService.getAuditLogs(page, limit);
    sendSuccess(res, result.logs, 200, result.meta);
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await adminService.getAnalytics();
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};
