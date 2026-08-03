import mongoose, { Document } from 'mongoose';
import { IHospital } from '@life-for-all/types';
export interface IHospitalDocument extends Omit<IHospital, '_id'>, Document {
}
export declare const Hospital: mongoose.Model<IHospitalDocument, {}, {}, {}, mongoose.Document<unknown, {}, IHospitalDocument, {}, {}> & IHospitalDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
