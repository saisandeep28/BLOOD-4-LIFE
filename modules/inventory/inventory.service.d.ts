import { IBloodUnitDocument } from '../../models';
import { BloodUnitStatus } from '@life-for-all/types';
export declare class InventoryService {
    addUnit(data: any, facilityId: string, facilityType: string): Promise<IBloodUnitDocument>;
    getInventory(facilityId: string): Promise<any>;
    updateUnitStatus(unitId: string, status: BloodUnitStatus, facilityId: string): Promise<IBloodUnitDocument | null>;
}
export declare const inventoryService: InventoryService;
