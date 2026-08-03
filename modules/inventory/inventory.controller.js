"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.getInventory = exports.addUnit = void 0;
const inventory_service_1 = require("./inventory.service");
const apiResponse_1 = require("../../utils/apiResponse");
const addUnit = async (req, res, next) => {
    try {
        const facilityId = req.user.userId; // Assuming user ID is facility ID for now
        const facilityType = req.user.role === 'blood_bank' ? 'blood_bank' : 'hospital';
        const result = await inventory_service_1.inventoryService.addUnit(req.body, facilityId, facilityType);
        (0, apiResponse_1.sendSuccess)(res, result, 201);
    }
    catch (error) {
        next(error);
    }
};
exports.addUnit = addUnit;
const getInventory = async (req, res, next) => {
    try {
        const facilityId = req.user.userId;
        const result = await inventory_service_1.inventoryService.getInventory(facilityId);
        (0, apiResponse_1.sendSuccess)(res, result);
    }
    catch (error) {
        next(error);
    }
};
exports.getInventory = getInventory;
const updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const facilityId = req.user.userId;
        const result = await inventory_service_1.inventoryService.updateUnitStatus(id, status, facilityId);
        (0, apiResponse_1.sendSuccess)(res, result);
    }
    catch (error) {
        next(error);
    }
};
exports.updateStatus = updateStatus;
//# sourceMappingURL=inventory.controller.js.map