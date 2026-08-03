import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { volunteerService } from './volunteer.service';
import { sendSuccess } from '../../utils/apiResponse';
import { VolunteerTaskStatus } from '@life-for-all/types';

export const getTasks = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { city, status, lat, lng, radiusKm } = req.query;
    const result = await volunteerService.getTasks(
      city as string, 
      status as VolunteerTaskStatus, 
      lat ? Number(lat) : undefined, 
      lng ? Number(lng) : undefined, 
      radiusKm ? Number(radiusKm) : undefined
    );
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const acceptTask = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;
    const result = await volunteerService.acceptTask(id, userId);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;
    const { status, notes } = req.body;
    const result = await volunteerService.updateTaskStatus(id, userId, status, notes);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};
