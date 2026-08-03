"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestsService = exports.RequestsService = void 0;
const models_1 = require("../../models");
const types_1 = require("@life-for-all/types");
const index_1 = require("../../index");
class RequestsService {
    async createRequest(data, userId, role) {
        const request = await models_1.Request.create({
            requesterId: userId,
            requesterRole: role,
            bloodGroup: data.bloodGroup,
            unitsNeeded: data.unitsNeeded,
            urgencyLevel: data.urgencyLevel,
            location: data.location,
            city: data.city,
            radiusKm: data.radiusKm || 10,
            reason: data.reason,
            patientName: data.patientName,
            patientAge: data.patientAge,
            unitsFulfilled: 0,
            escalationLevel: 0,
            status: types_1.RequestStatus.SUBMITTED,
        });
        // Fire & Forget: Find matching donors
        this.findMatchesForRequest(request._id.toString());
        return request;
    }
    async findMatchesForRequest(requestId) {
        const request = await models_1.Request.findById(requestId);
        if (!request)
            return;
        // Simplified geonear matching
        const matchingDonors = await models_1.DonorProfile.find({
            bloodGroup: request.bloodGroup, // Exact match for simplicity, can expand to compatible types
            isAvailable: true,
            location: {
                $near: {
                    $geometry: request.location,
                    $maxDistance: request.radiusKm * 1000 // Convert km to meters
                }
            }
        }).limit(20);
        const matches = matchingDonors.map(donor => ({
            donorId: donor.userId,
            donorName: 'Anonymous Donor',
            status: types_1.DonorMatchStatus.NOTIFIED,
            notifiedAt: new Date()
        }));
        if (matches.length > 0) {
            request.matchedDonors = matches;
            await request.save();
            // Emit real-time socket events
            matches.forEach(match => {
                index_1.io.of('/notifications').to(match.donorId).emit('new_blood_request', {
                    requestId: request._id,
                    bloodGroup: request.bloodGroup,
                    urgency: request.urgencyLevel,
                    distance: 'Nearby' // Calculate actual distance
                });
            });
        }
    }
    async getNearbyRequests(city, limit = 10) {
        return models_1.Request.find({
            city,
            status: { $in: [types_1.RequestStatus.SUBMITTED, types_1.RequestStatus.MATCHING, types_1.RequestStatus.IN_PROGRESS] }
        })
            .sort({ urgencyLevel: -1, createdAt: -1 })
            .limit(limit);
    }
    async updateRequestStatus(requestId, status) {
        const request = await models_1.Request.findByIdAndUpdate(requestId, { status }, { new: true });
        if (request) {
            index_1.io.of('/requests').to(requestId).emit('status_update', { status: request.status });
        }
        return request;
    }
}
exports.RequestsService = RequestsService;
exports.requestsService = new RequestsService();
//# sourceMappingURL=requests.service.js.map