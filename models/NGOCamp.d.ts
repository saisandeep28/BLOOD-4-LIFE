import mongoose, { Document } from 'mongoose';
import { INGOCamp } from '@life-for-all/types';
export interface INGOCampDocument extends Omit<INGOCamp, '_id'>, Document {
}
export declare const NGOCamp: mongoose.Model<INGOCampDocument, {}, {}, {}, mongoose.Document<unknown, {}, INGOCampDocument, {}, {}> & INGOCampDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
