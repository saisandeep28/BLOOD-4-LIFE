import { Request, Response, NextFunction } from 'express';
import { searchService } from './search.service';
import { sendSuccess } from '../../utils/apiResponse';
import { BloodGroup } from '@life-for-all/types';

export const searchFacilities = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { lat, lng, radius, type } = req.query;
    const result = await searchService.searchFacilities(
      Number(lat), 
      Number(lng), 
      Number(radius) || 10, 
      type as any
    );
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const searchDonors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { bloodGroup, lat, lng, radius } = req.query;
    const result = await searchService.searchDonors(
      bloodGroup as BloodGroup,
      Number(lat), 
      Number(lng), 
      Number(radius) || 10
    );
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};
