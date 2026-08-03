import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser, UserRole } from '@life-for-all/types';

export interface IUserDocument extends Omit<IUser, '_id'>, Document {
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument>(
  {
    role: { type: String, enum: Object.values(UserRole), required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, sparse: true, unique: true },
    passwordHash: { type: String },
    avatar: { type: String },
    authProviders: [{ type: String }],
    isVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    twoFAEnabled: { type: Boolean, default: false },
    twoFASecret: { type: String },
    isActive: { type: Boolean, default: true },
    age: { type: String },
    gender: { type: String },
    fathersName: { type: String },
    address: { type: String },
    state: { type: String },
    district: { type: String },
    pincode: { type: String },
    lastLoginAt: { type: Date },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    employerId: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash') || !this.passwordHash) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  if (!this.passwordHash) return false;
  return bcrypt.compare(password, this.passwordHash);
};

export const User = mongoose.model<IUserDocument>('User', UserSchema);
