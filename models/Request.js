"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const types_1 = require("@life-for-all/types");
const RequestSchema = new mongoose_1.Schema({
    requesterId: { type: String, required: true, ref: 'User' },
    requesterRole: { type: String, enum: Object.values(types_1.UserRole), required: true },
    bloodGroup: { type: String, enum: Object.values(types_1.BloodGroup), required: true },
    componentType: { type: String, enum: Object.values(types_1.ComponentType) },
    unitsNeeded: { type: Number, required: true },
    unitsFulfilled: { type: Number, default: 0 },
    urgencyLevel: { type: String, enum: Object.values(types_1.UrgencyLevel), required: true },
    hospitalId: { type: String, ref: 'Hospital' },
    hospitalName: { type: String },
    patientName: { type: String },
    patientAge: { type: Number },
    reason: { type: String },
    status: { type: String, enum: Object.values(types_1.RequestStatus), default: types_1.RequestStatus.SUBMITTED },
    matchedDonors: [
        {
            donorId: { type: String, ref: 'User', required: true },
            donorName: { type: String },
            status: { type: String, enum: Object.values(types_1.DonorMatchStatus), default: types_1.DonorMatchStatus.NOTIFIED },
            notifiedAt: { type: Date, default: Date.now },
            respondedAt: { type: Date },
            distance: { type: Number },
            matchScore: { type: Number },
        },
    ],
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true },
    },
    city: { type: String, required: true },
    radiusKm: { type: Number, required: true, default: 10 },
    escalationLevel: { type: Number, default: 0 },
    medicalDocuments: [{ type: String }],
    notes: { type: String },
    fulfilledAt: { type: Date },
    cancelledAt: { type: Date },
    cancelReason: { type: String },
    slaDeadline: { type: Date },
}, { timestamps: true });
RequestSchema.index({ location: '2dsphere' });
RequestSchema.index({ status: 1, urgencyLevel: 1, createdAt: -1 });
RequestSchema.index({ requesterId: 1 });
exports.Request = mongoose_1.default.model('Request', RequestSchema);
//# sourceMappingURL=Request.js.map