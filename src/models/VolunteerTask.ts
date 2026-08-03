import mongoose, { Schema, Document } from 'mongoose';
import { IVolunteerTask, VolunteerTaskStatus } from '@life-for-all/types';

export interface IVolunteerTaskDocument extends Omit<IVolunteerTask, '_id'>, Document {}

const VolunteerTaskSchema = new Schema<IVolunteerTaskDocument>(
  {
    requestId: { type: String, ref: 'Request' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    volunteerId: { type: String, ref: 'User' },
    assignedBy: { type: String, ref: 'User' },
    status: { type: String, enum: Object.values(VolunteerTaskStatus), default: VolunteerTaskStatus.PENDING },
    location: {
      type: { type: String, enum: ['Point'] },
      coordinates: { type: [Number] },
    },
    city: { type: String, required: true },
    acceptedAt: { type: Date },
    completedAt: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

VolunteerTaskSchema.index({ city: 1, status: 1 });
VolunteerTaskSchema.index({ volunteerId: 1, status: 1 });
VolunteerTaskSchema.index({ location: '2dsphere' });

export const VolunteerTask = mongoose.model<IVolunteerTaskDocument>('VolunteerTask', VolunteerTaskSchema);
