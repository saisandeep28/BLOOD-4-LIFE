import mongoose, { Document } from 'mongoose';
import { IBloodBank } from '@life-for-all/types';
export interface IBloodBankDocument extends Omit<IBloodBank, '_id'>, Document {
}
export declare const BloodBank: mongoose.Model<IBloodBankDocument, {}, {}, {}, mongoose.Document<unknown, {}, IBloodBankDocument, {}, {}> & IBloodBankDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
