import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { reportsService } from './reports.service';
import { sendSuccess } from '../../utils/apiResponse';

export const getDonationsReport = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const role = req.user!.role;
    const { startDate, endDate } = req.query;
    
    const result = await reportsService.getDonationReport(userId, role, startDate as string, endDate as string);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const getInventoryReport = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const result = await reportsService.getInventoryReport(userId);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const exportReport = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const role = req.user!.role;
    const { type } = req.query;
    
    const result = await reportsService.exportReport(type as string, userId, role);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};
