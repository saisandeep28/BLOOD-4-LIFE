import mongoose, { Schema, Document } from 'mongoose';
import { IBloodUnit, BloodGroup, ComponentType, BloodUnitStatus } from '@life-for-all/types';

export interface IBloodUnitDocument extends Omit<IBloodUnit, '_id'>, Document {}

const BloodUnitSchema = new Schema<IBloodUnitDocument>(
  {
    facilityId: { type: String, required: true }, // Can be hospital ID or blood bank ID
    facilityType: { type: String, enum: ['hospital', 'blood_bank'], required: true },
    bloodGroup: { type: String, enum: Object.values(BloodGroup), required: true },
    componentType: { type: String, enum: Object.values(ComponentType), required: true },
    unitCode: { type: String, required: true, unique: true },
    collectionDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
    status: { type: String, enum: Object.values(BloodUnitStatus), default: BloodUnitStatus.AVAILABLE },
    storageLocationId: { type: String },
    donorId: { type: String, ref: 'User' },
    donationId: { type: String, ref: 'Donation' },
    quantityMl: { type: Number, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

// Compound index for expiry-risk and stock queries
BloodUnitSchema.index({ facilityId: 1, bloodGroup: 1, expiryDate: 1 });
BloodUnitSchema.index({ status: 1, expiryDate: 1 });

export const BloodUnit = mongoose.model<IBloodUnitDocument>('BloodUnit', BloodUnitSchema);
