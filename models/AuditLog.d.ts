import mongoose, { Document } from 'mongoose';
import { IAuditLog } from '@life-for-all/types';
export interface IAuditLogDocument extends Omit<IAuditLog, '_id'>, Document {
}
export declare const AuditLog: mongoose.Model<IAuditLogDocument, {}, {}, {}, mongoose.Document<unknown, {}, IAuditLogDocument, {}, {}> & IAuditLogDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
