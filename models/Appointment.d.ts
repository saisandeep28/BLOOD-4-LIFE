import mongoose, { Document } from 'mongoose';
import { IAppointment } from '@life-for-all/types';
export interface IAppointmentDocument extends Omit<IAppointment, '_id'>, Document {
}
export declare const Appointment: mongoose.Model<IAppointmentDocument, {}, {}, {}, mongoose.Document<unknown, {}, IAppointmentDocument, {}, {}> & IAppointmentDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
