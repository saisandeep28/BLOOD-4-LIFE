import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { requestsService } from './requests.service';
import { sendSuccess } from '../../utils/apiResponse';
import { RequestStatus } from '@life-for-all/types';

export const createRequest = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const role = req.user!.role;
    const result = await requestsService.createRequest(req.body, userId, role);
    sendSuccess(res, result, 201);
  } catch (error) {
    next(error);
  }
};

export const getNearbyRequests = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const city = req.query.city as string;
    const result = await requestsService.getNearbyRequests(city);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await requestsService.updateRequestStatus(id, status as RequestStatus);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};
