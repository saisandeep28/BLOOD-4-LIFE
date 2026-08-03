import mongoose, { Schema, Document } from 'mongoose';
import { IRecipientProfile } from '@life-for-all/types';

export interface IRecipientProfileDocument extends Omit<IRecipientProfile, '_id'>, Document {}

const RecipientProfileSchema = new Schema<IRecipientProfileDocument>(
  {
    userId: { type: String, required: true, unique: true, ref: 'User' },
    savedDonors: [{ type: String, ref: 'User' }],
    medicalDocuments: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        uploadedAt: { type: Date, default: Date.now },
        mimeType: { type: String, required: true },
        size: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const RecipientProfile = mongoose.model<IRecipientProfileDocument>('RecipientProfile', RecipientProfileSchema);
