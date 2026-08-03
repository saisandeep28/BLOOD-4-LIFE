"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDonors = exports.searchFacilities = void 0;
const search_service_1 = require("./search.service");
const apiResponse_1 = require("../../utils/apiResponse");
const searchFacilities = async (req, res, next) => {
    try {
        const { lat, lng, radius, type } = req.query;
        const result = await search_service_1.searchService.searchFacilities(Number(lat), Number(lng), Number(radius) || 10, type);
        (0, apiResponse_1.sendSuccess)(res, result);
    }
    catch (error) {
        next(error);
    }
};
exports.searchFacilities = searchFacilities;
const searchDonors = async (req, res, next) => {
    try {
        const { bloodGroup, lat, lng, radius } = req.query;
        const result = await search_service_1.searchService.searchDonors(bloodGroup, Number(lat), Number(lng), Number(radius) || 10);
        (0, apiResponse_1.sendSuccess)(res, result);
    }
    catch (error) {
        next(error);
    }
};
exports.searchDonors = searchDonors;
//# sourceMappingURL=search.controller.js.map