import mongoose, { Document } from 'mongoose';
import { IRecipientProfile } from '@life-for-all/types';
export interface IRecipientProfileDocument extends Omit<IRecipientProfile, '_id'>, Document {
}
export declare const RecipientProfile: mongoose.Model<IRecipientProfileDocument, {}, {}, {}, mongoose.Document<unknown, {}, IRecipientProfileDocument, {}, {}> & IRecipientProfileDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
