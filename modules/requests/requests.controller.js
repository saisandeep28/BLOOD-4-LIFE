"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.getNearbyRequests = exports.createRequest = void 0;
const requests_service_1 = require("./requests.service");
const apiResponse_1 = require("../../utils/apiResponse");
const createRequest = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const role = req.user.role;
        const result = await requests_service_1.requestsService.createRequest(req.body, userId, role);
        (0, apiResponse_1.sendSuccess)(res, result, 201);
    }
    catch (error) {
        next(error);
    }
};
exports.createRequest = createRequest;
const getNearbyRequests = async (req, res, next) => {
    try {
        const city = req.query.city;
        const result = await requests_service_1.requestsService.getNearbyRequests(city);
        (0, apiResponse_1.sendSuccess)(res, result);
    }
    catch (error) {
        next(error);
    }
};
exports.getNearbyRequests = getNearbyRequests;
const updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const result = await requests_service_1.requestsService.updateRequestStatus(id, status);
        (0, apiResponse_1.sendSuccess)(res, result);
    }
    catch (error) {
        next(error);
    }
};
exports.updateStatus = updateStatus;
//# sourceMappingURL=requests.controller.js.map