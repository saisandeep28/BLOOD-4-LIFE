import mongoose, { Schema, Document } from 'mongoose';
import { INotification, NotificationType, NotificationChannel, NotificationStatus } from '@life-for-all/types';

export interface INotificationDocument extends Omit<INotification, '_id'>, Document {}

const NotificationSchema = new Schema<INotificationDocument>(
  {
    userId: { type: String, required: true, ref: 'User' },
    type: { type: String, enum: Object.values(NotificationType), required: true },
    channel: { type: String, enum: Object.values(NotificationChannel), required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    payload: { type: Schema.Types.Mixed },
    status: { type: String, enum: Object.values(NotificationStatus), default: NotificationStatus.PENDING },
    sentAt: { type: Date },
    readAt: { type: Date },
    actionUrl: { type: String },
    isCritical: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  // Ensure we define standard timestamps
  { timestamps: true }
);

// TTL index to automatically delete notifications older than 90 days
NotificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });
NotificationSchema.index({ userId: 1, status: 1 });

export const Notification = mongoose.model<INotificationDocument>('Notification', NotificationSchema);
