import mongoose, { Document } from 'mongoose';
import { IRolePermission } from '@life-for-all/types';
export interface IRolePermissionDocument extends Omit<IRolePermission, '_id'>, Document {
}
export declare const RolePermission: mongoose.Model<IRolePermissionDocument, {}, {}, {}, mongoose.Document<unknown, {}, IRolePermissionDocument, {}, {}> & IRolePermissionDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
