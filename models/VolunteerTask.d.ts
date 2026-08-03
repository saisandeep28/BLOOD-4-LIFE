import mongoose, { Document } from 'mongoose';
import { IVolunteerTask } from '@life-for-all/types';
export interface IVolunteerTaskDocument extends Omit<IVolunteerTask, '_id'>, Document {
}
export declare const VolunteerTask: mongoose.Model<IVolunteerTaskDocument, {}, {}, {}, mongoose.Document<unknown, {}, IVolunteerTaskDocument, {}, {}> & IVolunteerTaskDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
