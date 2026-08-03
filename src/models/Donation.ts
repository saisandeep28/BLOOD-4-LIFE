import mongoose, { Schema, Document } from 'mongoose';
import { IDonation, BloodGroup, ComponentType } from '@life-for-all/types';

export interface IDonationDocument extends Omit<IDonation, '_id'>, Document {}

const DonationSchema = new Schema<IDonationDocument>(
  {
    donorId: { type: String, required: true, ref: 'User' },
    donorName: { type: String, required: true },
    unitId: { type: String, ref: 'BloodUnit' },
    facilityId: { type: String, required: true },
    facilityType: { type: String, enum: ['hospital', 'blood_bank'], required: true },
    facilityName: { type: String, required: true },
    bloodGroup: { type: String, enum: Object.values(BloodGroup), required: true },
    componentType: { type: String, enum: Object.values(ComponentType), required: true },
    date: { type: Date, required: true, default: Date.now },
    quantityMl: { type: Number, required: true },
    certificateUrl: { type: String },
    certificateId: { type: String },
    hemoglobinLevel: { type: Number },
    notes: { type: String },
  },
  { timestamps: true }
);

DonationSchema.index({ donorId: 1, date: -1 });
DonationSchema.index({ facilityId: 1, date: -1 });

export const Donation = mongoose.model<IDonationDocument>('Donation', DonationSchema);
