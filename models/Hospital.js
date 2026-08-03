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
exports.Hospital = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const types_1 = require("@life-for-all/types");
const HospitalSchema = new mongoose_1.Schema({
    userId: { type: String, required: true, ref: 'User' },
    name: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    location: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true },
    },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    contactInfo: {
        phone: { type: String, required: true },
        email: { type: String, required: true },
        emergencyPhone: { type: String },
    },
    verificationStatus: { type: String, enum: Object.values(types_1.VerificationStatus), default: types_1.VerificationStatus.PENDING },
    verificationDocuments: [{ type: String }],
    rejectionReason: { type: String },
    staff: [{ type: String, ref: 'User' }],
    operatingHours: {
        open: { type: String },
        close: { type: String },
        days: [{ type: String }],
    },
    facilities: [{ type: String }],
    specialties: [{ type: String }],
}, { timestamps: true });
HospitalSchema.index({ location: '2dsphere' });
exports.Hospital = mongoose_1.default.model('Hospital', HospitalSchema);
//# sourceMappingURL=Hospital.js.map