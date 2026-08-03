import { z } from 'zod';
import { AppointmentStatus } from '@life-for-all/types';

export const createAppointmentSchema = z.object({
  body: z.object({
    facilityId: z.string(),
    facilityType: z.enum(['hospital', 'blood_bank']),
    facilityName: z.string(),
    slotStart: z.string().transform((str) => new Date(str)),
    slotEnd: z.string().transform((str) => new Date(str)),
    notes: z.string().optional(),
  })
});

export const updateAppointmentSchema = z.object({
  body: z.object({
    status: z.nativeEnum(AppointmentStatus).optional(),
    cancelReason: z.string().optional(),
    notes: z.string().optional(),
    slotStart: z.string().transform((str) => new Date(str)).optional(),
    slotEnd: z.string().transform((str) => new Date(str)).optional(),
  })
});
