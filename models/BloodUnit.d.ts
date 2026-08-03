import mongoose, { Document } from 'mongoose';
import { IBloodUnit } from '@life-for-all/types';
export interface IBloodUnitDocument extends Omit<IBloodUnit, '_id'>, Document {
}
export declare const BloodUnit: mongoose.Model<IBloodUnitDocument, {}, {}, {}, mongoose.Document<unknown, {}, IBloodUnitDocument, {}, {}> & IBloodUnitDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
