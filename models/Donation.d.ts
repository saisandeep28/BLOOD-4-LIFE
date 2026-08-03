import mongoose, { Document } from 'mongoose';
import { IDonation } from '@life-for-all/types';
export interface IDonationDocument extends Omit<IDonation, '_id'>, Document {
}
export declare const Donation: mongoose.Model<IDonationDocument, {}, {}, {}, mongoose.Document<unknown, {}, IDonationDocument, {}, {}> & IDonationDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
