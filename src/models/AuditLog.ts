import mongoose, { Schema, Document } from 'mongoose';
import { IAuditLog, AuditAction, UserRole } from '@life-for-all/types';

export interface IAuditLogDocument extends Omit<IAuditLog, '_id'>, Document {}

const AuditLogSchema = new Schema<IAuditLogDocument>(
  {
    actorId: { type: String, required: true, ref: 'User' },
    actorName: { type: String, required: true },
    actorRole: { type: String, enum: Object.values(UserRole), required: true },
    action: { type: String, enum: Object.values(AuditAction), required: true },
    targetType: { type: String, required: true },
    targetId: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
    ipAddress: { type: String, required: true },
    userAgent: { type: String },
    timestamp: { type: Date, default: Date.now },
  },
  // We manually specify timestamp, but can keep timestamps: true for createdAt/updatedAt
  { timestamps: true }
);

AuditLogSchema.index({ timestamp: -1 });
AuditLogSchema.index({ actorId: 1, timestamp: -1 });
AuditLogSchema.index({ action: 1, timestamp: -1 });

export const AuditLog = mongoose.model<IAuditLogDocument>('AuditLog', AuditLogSchema);
