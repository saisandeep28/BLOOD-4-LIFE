import mongoose, { Document } from 'mongoose';
import { INotification } from '@life-for-all/types';
export interface INotificationDocument extends Omit<INotification, '_id'>, Document {
}
export declare const Notification: mongoose.Model<INotificationDocument, {}, {}, {}, mongoose.Document<unknown, {}, INotificationDocument, {}, {}> & INotificationDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
