import mongoose, { Document } from 'mongoose';
import { IRequest } from '@life-for-all/types';
export interface IRequestDocument extends Omit<IRequest, '_id'>, Document {
}
export declare const Request: mongoose.Model<IRequestDocument, {}, {}, {}, mongoose.Document<unknown, {}, IRequestDocument, {}, {}> & IRequestDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
