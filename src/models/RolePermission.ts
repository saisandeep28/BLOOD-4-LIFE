import mongoose, { Schema, Document } from 'mongoose';
import { IRolePermission, UserRole } from '@life-for-all/types';

export interface IRolePermissionDocument extends Omit<IRolePermission, '_id'>, Document {}

const RolePermissionSchema = new Schema<IRolePermissionDocument>(
  {
    roleName: { type: String, enum: Object.values(UserRole), required: true, unique: true },
    permissions: [{ type: String, required: true }],
    description: { type: String, required: true },
    isCustom: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const RolePermission = mongoose.model<IRolePermissionDocument>('RolePermission', RolePermissionSchema);
