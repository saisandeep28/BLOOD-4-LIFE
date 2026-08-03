import mongoose, { Document } from 'mongoose';
import { IDonorProfile } from '@life-for-all/types';
export interface IDonorProfileDocument extends Omit<IDonorProfile, '_id'>, Document {
}
export declare const DonorProfile: mongoose.Model<IDonorProfileDocument, {}, {}, {}, mongoose.Document<unknown, {}, IDonorProfileDocument, {}, {}> & IDonorProfileDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
