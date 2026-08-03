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
exports.DonorProfile = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const types_1 = require("@life-for-all/types");
const DonorProfileSchema = new mongoose_1.Schema({
    userId: { type: String, required: true, unique: true, ref: 'User' },
    bloodGroup: { type: String, enum: Object.values(types_1.BloodGroup), required: true },
    dob: { type: Date, required: true },
    weight: { type: Number, required: true },
    gender: { type: String, enum: Object.values(types_1.Gender), required: true },
    lastDonationDate: { type: Date },
    nextEligibleDate: { type: Date },
    isAvailable: { type: Boolean, default: true },
    autoResumeDate: { type: Date },
    healthFlags: [{ type: String }],
    chronicConditions: [{ type: String }],
    hemoglobinLevel: { type: Number },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }, // [longitude, latitude]
    },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    rewardPoints: { type: Number, default: 0 },
    badgeTier: { type: String, enum: Object.values(types_1.BadgeTier), default: types_1.BadgeTier.BRONZE },
    totalDonations: { type: Number, default: 0 },
    donationStreak: { type: Number, default: 0 },
    responseRate: { type: Number, default: 100 },
    reliabilityScore: { type: Number, default: 100 },
}, { timestamps: true });
// Geospatial index for location-based searching
DonorProfileSchema.index({ location: '2dsphere' });
// Compound index for matching
DonorProfileSchema.index({ bloodGroup: 1, isAvailable: 1, location: '2dsphere' });
exports.DonorProfile = mongoose_1.default.model('DonorProfile', DonorProfileSchema);
//# sourceMappingURL=DonorProfile.js.map