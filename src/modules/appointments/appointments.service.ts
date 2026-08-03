import { Appointment, IAppointmentDocument } from '../../models';
import { AppointmentStatus, UserRole } from '@life-for-all/types';

export class AppointmentsService {
  async getAvailableSlots(facilityId: string, date: string): Promise<any[]> {
    // In a real scenario, this would check business hours and existing appointments
    // For now, generating some dummy slots for the given date
    const targetDate = new Date(date);
    const slots = [];
    
    // Generate slots from 9 AM to 5 PM
    for (let i = 9; i < 17; i++) {
      const slotStart = new Date(targetDate);
      slotStart.setHours(i, 0, 0, 0);
      
      const slotEnd = new Date(targetDate);
      slotEnd.setHours(i, 45, 0, 0); // 45 min slot
      
      slots.push({ slotStart, slotEnd, available: true });
    }
    
    // Check against existing appointments
    const startOfDay = new Date(targetDate.setHours(0,0,0,0));
    const endOfDay = new Date(targetDate.setHours(23,59,59,999));
    
    const existing = await Appointment.find({
      facilityId,
      slotStart: { $gte: startOfDay, $lt: endOfDay },
      status: { $in: [AppointmentStatus.SCHEDULED, AppointmentStatus.CONFIRMED] }
    });
    
    // Mark booked slots as unavailable
    existing.forEach(app => {
      const slot = slots.find(s => s.slotStart.getTime() === app.slotStart.getTime());
      if (slot) {
        slot.available = false;
      }
    });

    return slots;
  }

  async bookAppointment(data: any, donorId: string): Promise<IAppointmentDocument> {
    const appointment = await Appointment.create({
      ...data,
      donorId,
      status: AppointmentStatus.SCHEDULED
    });
    return appointment;
  }

  async getAppointments(userId: string, role: UserRole): Promise<IAppointmentDocument[]> {
    let query: any = {};
    
    if (role === UserRole.DONOR) {
      query.donorId = userId;
    } else if (role === UserRole.HOSPITAL || role === UserRole.BLOOD_BANK) {
      query.facilityId = userId;
    } else {
      // Admin gets all, or maybe scoped based on some logic
    }
    
    return Appointment.find(query).sort({ slotStart: 1 });
  }

  async updateAppointment(id: string, updateData: any, userId: string, role: UserRole): Promise<IAppointmentDocument | null> {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      throw { statusCode: 404, code: 'NOT_FOUND', message: 'Appointment not found' };
    }
    
    // Role based authorization
    if (role === UserRole.DONOR && appointment.donorId !== userId) {
      throw { statusCode: 403, code: 'FORBIDDEN', message: 'Not authorized to update this appointment' };
    }
    
    if ((role === UserRole.HOSPITAL || role === UserRole.BLOOD_BANK) && appointment.facilityId !== userId) {
      throw { statusCode: 403, code: 'FORBIDDEN', message: 'Not authorized to update this appointment' };
    }
    
    Object.assign(appointment, updateData);
    await appointment.save();
    
    return appointment;
  }
}

export const appointmentsService = new AppointmentsService();
