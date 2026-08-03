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
exports.VolunteerTask = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const types_1 = require("@life-for-all/types");
const VolunteerTaskSchema = new mongoose_1.Schema({
    requestId: { type: String, ref: 'Request' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    volunteerId: { type: String, ref: 'User' },
    assignedBy: { type: String, ref: 'User' },
    status: { type: String, enum: Object.values(types_1.VolunteerTaskStatus), default: types_1.VolunteerTaskStatus.PENDING },
    location: {
        type: { type: String, enum: ['Point'] },
        coordinates: { type: [Number] },
    },
    city: { type: String, required: true },
    acceptedAt: { type: Date },
    completedAt: { type: Date },
    notes: { type: String },
}, { timestamps: true });
VolunteerTaskSchema.index({ city: 1, status: 1 });
VolunteerTaskSchema.index({ volunteerId: 1, status: 1 });
VolunteerTaskSchema.index({ location: '2dsphere' });
exports.VolunteerTask = mongoose_1.default.model('VolunteerTask', VolunteerTaskSchema);
//# sourceMappingURL=VolunteerTask.js.map