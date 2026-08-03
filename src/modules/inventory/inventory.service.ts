import { BloodUnit, IBloodUnitDocument, BloodBank } from '../../models';
import { BloodGroup, ComponentType, BloodUnitStatus } from '@life-for-all/types';

export class InventoryService {
  async addUnit(data: any, facilityId: string, facilityType: string): Promise<IBloodUnitDocument> {
    // Generate a unique barcode/ID
    const unitCode = `UNIT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Calculate expiry (simplistic, based on component type)
    const collectionDate = new Date();
    const expiryDate = new Date();
    if (data.componentType === ComponentType.WHOLE_BLOOD) {
      expiryDate.setDate(expiryDate.getDate() + 35);
    } else if (data.componentType === ComponentType.PLATELETS) {
      expiryDate.setDate(expiryDate.getDate() + 5);
    } else {
      expiryDate.setDate(expiryDate.getDate() + 42); // Red cells default
    }

    const unit = await BloodUnit.create({
      ...data,
      unitCode,
      facilityId,
      facilityType,
      collectionDate,
      expiryDate,
      status: BloodUnitStatus.AVAILABLE
    });

    return unit;
  }

  async getInventory(facilityId: string): Promise<any> {
    const units = await BloodUnit.find({ 
      facilityId, 
      status: BloodUnitStatus.AVAILABLE 
    });
    
    // Group by blood group
    const summary = units.reduce((acc, unit) => {
      acc[unit.bloodGroup] = (acc[unit.bloodGroup] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total: units.length, summary, units };
  }

  async updateUnitStatus(unitId: string, status: BloodUnitStatus, facilityId: string): Promise<IBloodUnitDocument | null> {
    return BloodUnit.findOneAndUpdate(
      { _id: unitId, facilityId },
      { status },
      { new: true }
    );
  }
}

export const inventoryService = new InventoryService();
