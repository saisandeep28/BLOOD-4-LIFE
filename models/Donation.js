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
exports.Donation = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const types_1 = require("@life-for-all/types");
const DonationSchema = new mongoose_1.Schema({
    donorId: { type: String, required: true, ref: 'User' },
    donorName: { type: String, required: true },
    unitId: { type: String, ref: 'BloodUnit' },
    facilityId: { type: String, required: true },
    facilityType: { type: String, enum: ['hospital', 'blood_bank'], required: true },
    facilityName: { type: String, required: true },
    bloodGroup: { type: String, enum: Object.values(types_1.BloodGroup), required: true },
    componentType: { type: String, enum: Object.values(types_1.ComponentType), required: true },
    date: { type: Date, required: true, default: Date.now },
    quantityMl: { type: Number, required: true },
    certificateUrl: { type: String },
    certificateId: { type: String },
    hemoglobinLevel: { type: Number },
    notes: { type: String },
}, { timestamps: true });
DonationSchema.index({ donorId: 1, date: -1 });
DonationSchema.index({ facilityId: 1, date: -1 });
exports.Donation = mongoose_1.default.model('Donation', DonationSchema);
//# sourceMappingURL=Donation.js.map