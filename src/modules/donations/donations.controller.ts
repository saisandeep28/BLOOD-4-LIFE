import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { donationsService } from './donations.service';
import { sendSuccess } from '../../utils/apiResponse';

export const recordDonation = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const facilityId = req.user!.userId;
    // We assume the user has a linked facility or their ID is the facilityId.
    const facilityType = req.user!.role === 'hospital' ? 'hospital' : 'blood_bank';
    const facilityName = req.user!.email; // Temporary, in a real app fetch name from facility profile
    
    const result = await donationsService.recordDonation(req.body, facilityId, facilityType, facilityName);
    sendSuccess(res, result, 201);
  } catch (error) {
    next(error);
  }
};

export const getDonations = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const role = req.user!.role;
    const result = await donationsService.getDonations(userId, role);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const getCertificate = async (req: ExpressRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user!.userId;
    const role = req.user!.role;
    const result = await donationsService.getCertificate(id, userId, role);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};
