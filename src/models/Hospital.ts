import mongoose, { Schema, Document } from 'mongoose';
import { IHospital, VerificationStatus } from '@life-for-all/types';

export interface IHospitalDocument extends Omit<IHospital, '_id'>, Document {}

const HospitalSchema = new Schema<IHospitalDocument>(
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
      emergencyPhone: { type: String },
    },
    verificationStatus: { type: String, enum: Object.values(VerificationStatus), default: VerificationStatus.PENDING },
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
  },
  { timestamps: true }
);

HospitalSchema.index({ location: '2dsphere' });

export const Hospital = mongoose.model<IHospitalDocument>('Hospital', HospitalSchema);
