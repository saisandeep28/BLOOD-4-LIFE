import mongoose, { Document } from 'mongoose';
import { IUser } from '@life-for-all/types';
export interface IUserDocument extends Omit<IUser, '_id'>, Document {
    comparePassword(password: string): Promise<boolean>;
}
export declare const User: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument, {}, {}> & IUserDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
