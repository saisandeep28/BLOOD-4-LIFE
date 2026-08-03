import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { usersService } from './users.service';
import { sendSuccess } from '../../utils/apiResponse';

export const getMe = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const role = req.user!.role;
    const result = await usersService.getUserProfile(userId, role);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const role = req.user!.role;
    const result = await usersService.updateUserProfile(userId, role, req.body);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const getPublicDonorProfile = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await usersService.getPublicDonorProfile(id);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const updateAvailability = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { isAvailable, autoResumeDate } = req.body;
    const result = await usersService.updateAvailability(userId, isAvailable, autoResumeDate);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const getDonationHistory = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const result = await usersService.getDonationHistory(userId);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const generateDonorQR = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const result = await usersService.generateDonorQR(userId);
    sendSuccess(res, { qrCodeUrl: result });
  } catch (error) {
    next(error);
  }
};
