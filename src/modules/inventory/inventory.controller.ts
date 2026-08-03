import { Request, Response, NextFunction } from 'express';
import { inventoryService } from './inventory.service';
import { sendSuccess } from '../../utils/apiResponse';
import { BloodUnitStatus } from '@life-for-all/types';

export const addUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const facilityId = req.user!.userId; // Assuming user ID is facility ID for now
    const facilityType = req.user!.role === 'blood_bank' ? 'blood_bank' : 'hospital';
    const result = await inventoryService.addUnit(req.body, facilityId, facilityType);
    sendSuccess(res, result, 201);
  } catch (error) {
    next(error);
  }
};

export const getInventory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const facilityId = req.user!.userId;
    const result = await inventoryService.getInventory(facilityId);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const facilityId = req.user!.userId;
    const result = await inventoryService.updateUnitStatus(id, status as BloodUnitStatus, facilityId);
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};
