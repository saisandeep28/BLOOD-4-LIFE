import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { notificationsService } from './notifications.service';
import { sendSuccess } from '../../utils/apiResponse';

export const getNotifications = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const result = await notificationsService.getUserNotifications(userId);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;
    const result = await notificationsService.markAsRead(id, userId);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const broadcast = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    await notificationsService.broadcast(req.body);
    sendSuccess(res, { message: 'Broadcast sent successfully' });
  } catch (error) {
    next(error);
  }
};
