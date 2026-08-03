import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { appointmentsService } from './appointments.service';
import { sendSuccess } from '../../utils/apiResponse';

export const getSlots = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { facilityId, date } = req.query;
    if (!facilityId || !date) {
      throw { statusCode: 400, code: 'BAD_REQUEST', message: 'facilityId and date are required' };
    }
    const result = await appointmentsService.getAvailableSlots(facilityId as string, date as string);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const bookAppointment = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const result = await appointmentsService.bookAppointment(req.body, userId);
    sendSuccess(res, result, 201);
  } catch (error) {
    next(error);
  }
};

export const getAppointments = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const role = req.user!.role;
    const result = await appointmentsService.getAppointments(userId, role);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;
    const role = req.user!.role;
    const result = await appointmentsService.updateAppointment(id, req.body, userId, role);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};
