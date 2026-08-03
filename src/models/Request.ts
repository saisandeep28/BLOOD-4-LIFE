import mongoose, { Schema, Document } from 'mongoose';
import { IRequest, UserRole, BloodGroup, ComponentType, UrgencyLevel, RequestStatus, DonorMatchStatus } from '@life-for-all/types';

export interface IRequestDocument extends Omit<IRequest, '_id'>, Document {}

const RequestSchema = new Schema<IRequestDocument>(
  {
    requesterId: { type: String, required: true, ref: 'User' },
    requesterRole: { type: String, enum: Object.values(UserRole), required: true },
    bloodGroup: { type: String, enum: Object.values(BloodGroup), required: true },
    componentType: { type: String, enum: Object.values(ComponentType) },
    unitsNeeded: { type: Number, required: true },
    unitsFulfilled: { type: Number, default: 0 },
    urgencyLevel: { type: String, enum: Object.values(UrgencyLevel), required: true },
    hospitalId: { type: String, ref: 'Hospital' },
    hospitalName: { type: String },
    patientName: { type: String },
    patientAge: { type: Number },
    reason: { type: String },
    status: { type: String, enum: Object.values(RequestStatus), default: RequestStatus.SUBMITTED },
    matchedDonors: [
      {
        donorId: { type: String, ref: 'User', required: true },
        donorName: { type: String },
        status: { type: String, enum: Object.values(DonorMatchStatus), default: DonorMatchStatus.NOTIFIED },
        notifiedAt: { type: Date, default: Date.now },
        respondedAt: { type: Date },
        distance: { type: Number },
        matchScore: { type: Number },
      },
    ],
    location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true },
    },
    city: { type: String, required: true },
    radiusKm: { type: Number, required: true, default: 10 },
    escalationLevel: { type: Number, default: 0 },
    medicalDocuments: [{ type: String }],
    notes: { type: String },
    fulfilledAt: { type: Date },
    cancelledAt: { type: Date },
    cancelReason: { type: String },
    slaDeadline: { type: Date },
  },
  { timestamps: true }
);

RequestSchema.index({ location: '2dsphere' });
RequestSchema.index({ status: 1, urgencyLevel: 1, createdAt: -1 });
RequestSchema.index({ requesterId: 1 });

export const Request = mongoose.model<IRequestDocument>('Request', RequestSchema);
