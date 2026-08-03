import mongoose, { Schema, Document } from 'mongoose';
import { IAppointment, AppointmentStatus } from '@life-for-all/types';

export interface IAppointmentDocument extends Omit<IAppointment, '_id'>, Document {}

const AppointmentSchema = new Schema<IAppointmentDocument>(
  {
    donorId: { type: String, required: true, ref: 'User' },
    facilityId: { type: String, required: true },
    facilityType: { type: String, enum: ['hospital', 'blood_bank'], required: true },
    facilityName: { type: String, required: true },
    slotStart: { type: Date, required: true },
    slotEnd: { type: Date, required: true },
    status: { type: String, enum: Object.values(AppointmentStatus), default: AppointmentStatus.SCHEDULED },
    remindersSent: [{ type: Date }],
    notes: { type: String },
    cancelReason: { type: String },
  },
  { timestamps: true }
);

AppointmentSchema.index({ donorId: 1 });
AppointmentSchema.index({ facilityId: 1, slotStart: 1 });

export const Appointment = mongoose.model<IAppointmentDocument>('Appointment', AppointmentSchema);
