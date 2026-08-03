"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryService = exports.InventoryService = void 0;
const models_1 = require("../../models");
const types_1 = require("@life-for-all/types");
class InventoryService {
    async addUnit(data, facilityId, facilityType) {
        // Generate a unique barcode/ID
        const unitCode = `UNIT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        // Calculate expiry (simplistic, based on component type)
        const collectionDate = new Date();
        const expiryDate = new Date();
        if (data.componentType === types_1.ComponentType.WHOLE_BLOOD) {
            expiryDate.setDate(expiryDate.getDate() + 35);
        }
        else if (data.componentType === types_1.ComponentType.PLATELETS) {
            expiryDate.setDate(expiryDate.getDate() + 5);
        }
        else {
            expiryDate.setDate(expiryDate.getDate() + 42); // Red cells default
        }
        const unit = await models_1.BloodUnit.create({
            ...data,
            unitCode,
            facilityId,
            facilityType,
            collectionDate,
            expiryDate,
            status: types_1.BloodUnitStatus.AVAILABLE
        });
        return unit;
    }
    async getInventory(facilityId) {
        const units = await models_1.BloodUnit.find({
            facilityId,
            status: types_1.BloodUnitStatus.AVAILABLE
        });
        // Group by blood group
        const summary = units.reduce((acc, unit) => {
            acc[unit.bloodGroup] = (acc[unit.bloodGroup] || 0) + 1;
            return acc;
        }, {});
        return { total: units.length, summary, units };
    }
    async updateUnitStatus(unitId, status, facilityId) {
        return models_1.BloodUnit.findOneAndUpdate({ _id: unitId, facilityId }, { status }, { new: true });
    }
}
exports.InventoryService = InventoryService;
exports.inventoryService = new InventoryService();
//# sourceMappingURL=inventory.service.js.map