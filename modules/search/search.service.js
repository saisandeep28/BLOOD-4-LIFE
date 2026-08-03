"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchService = exports.SearchService = void 0;
const models_1 = require("../../models");
class SearchService {
    async searchFacilities(lat, lng, radiusKm, type) {
        const query = {
            location: {
                $near: {
                    $geometry: { type: 'Point', coordinates: [lng, lat] },
                    $maxDistance: radiusKm * 1000
                }
            }
        };
        let results = [];
        if (!type || type === 'blood_bank') {
            const banks = await models_1.BloodBank.find(query).limit(20);
            results = [...results, ...banks.map(b => ({ ...b.toObject(), facilityType: 'blood_bank' }))];
        }
        if (!type || type === 'hospital') {
            const hospitals = await models_1.Hospital.find(query).limit(20);
            results = [...results, ...hospitals.map(h => ({ ...h.toObject(), facilityType: 'hospital' }))];
        }
        return results;
    }
    async searchDonors(bloodGroup, lat, lng, radiusKm) {
        const donors = await models_1.DonorProfile.find({
            bloodGroup,
            isAvailable: true,
            location: {
                $near: {
                    $geometry: { type: 'Point', coordinates: [lng, lat] },
                    $maxDistance: radiusKm * 1000
                }
            }
        }).limit(50).populate('userId', 'name avatar role');
        return donors;
    }
}
exports.SearchService = SearchService;
exports.searchService = new SearchService();
//# sourceMappingURL=search.service.js.map