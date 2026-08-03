import mongoose, { Schema, Document } from 'mongoose';
import { IDonorProfile, BloodGroup, Gender, BadgeTier } from '@life-for-all/types';

export interface IDonorProfileDocument extends Omit<IDonorProfile, '_id'>, Document {}

const DonorProfileSchema = new Schema<IDonorProfileDocument>(
  {
    userId: { type: String, required: true, unique: true, ref: 'User' },
    bloodGroup: { type: String, enum: Object.values(BloodGroup), required: true },
    dob: { type: Date, required: true },
    weight: { type: Number, required: true },
    gender: { type: String, enum: Object.values(Gender), required: true },
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
    badgeTier: { type: String, enum: Object.values(BadgeTier), default: BadgeTier.BRONZE },
    totalDonations: { type: Number, default: 0 },
    donationStreak: { type: Number, default: 0 },
    responseRate: { type: Number, default: 100 },
    reliabilityScore: { type: Number, default: 100 },
  },
  { timestamps: true }
);

// Geospatial index for location-based searching
DonorProfileSchema.index({ location: '2dsphere' });
// Compound index for matching
DonorProfileSchema.index({ bloodGroup: 1, isAvailable: 1, location: '2dsphere' });

export const DonorProfile = mongoose.model<IDonorProfileDocument>('DonorProfile', DonorProfileSchema);
