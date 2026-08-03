import mongoose, { Schema, Document } from 'mongoose';
import { IBloodBank, VerificationStatus } from '@life-for-all/types';

export interface IBloodBankDocument extends Omit<IBloodBank, '_id'>, Document {}

const BloodBankSchema = new Schema<IBloodBankDocument>(
  {
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
    },
    verificationStatus: { type: String, enum: Object.values(VerificationStatus), default: VerificationStatus.PENDING },
    verificationDocuments: [{ type: String }],
    rejectionReason: { type: String },
    storageUnits: [
      {
        unitId: { type: String, required: true },
        name: { type: String, required: true },
        type: { type: String, required: true },
        capacity: { type: Number, required: true },
        currentOccupancy: { type: Number, default: 0 },
        temperature: { type: Number },
      },
    ],
    operatingHours: {
      open: { type: String },
      close: { type: String },
      days: [{ type: String }],
    },
  },
  { timestamps: true }
);

BloodBankSchema.index({ location: '2dsphere' });

export const BloodBank = mongoose.model<IBloodBankDocument>('BloodBank', BloodBankSchema);
