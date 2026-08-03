import mongoose, { Schema, Document } from 'mongoose';
import { INGOCamp } from '@life-for-all/types';

export interface INGOCampDocument extends Omit<INGOCamp, '_id'>, Document {}

const NGOCampSchema = new Schema<INGOCampDocument>(
  {
    ngoId: { type: String, required: true, ref: 'User' },
    ngoName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
    },
    address: { type: String, required: true },
    city: { type: String, required: true },
    scheduledDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    registeredDonors: [{ type: String, ref: 'User' }],
    maxCapacity: { type: Number, required: true },
    outcomeStats: {
      totalDonors: { type: Number, default: 0 },
      totalUnitsCollected: { type: Number, default: 0 },
      bloodGroupBreakdown: { type: Map, of: Number, default: {} },
    },
    status: { type: String, enum: ['upcoming', 'ongoing', 'completed', 'cancelled'], default: 'upcoming' },
    contactInfo: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  { timestamps: true }
);

NGOCampSchema.index({ location: '2dsphere' });
NGOCampSchema.index({ city: 1, status: 1 });

export const NGOCamp = mongoose.model<INGOCampDocument>('NGOCamp', NGOCampSchema);
