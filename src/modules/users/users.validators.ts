import { z } from 'zod';
import { geoPointSchema, bloodGroupSchema, phoneSchema } from '../../utils/validators';
import { Gender } from '@life-for-all/types';

export const updateProfileSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is too short').optional(),
    phone: phoneSchema.optional(),
    avatar: z.string().url().optional(),
    // Donor specific fields
    bloodGroup: bloodGroupSchema.optional(),
    dob: z.string().transform((str) => new Date(str)).optional(),
    weight: z.number().min(40).optional(),
    gender: z.nativeEnum(Gender).optional(),
    address: z.string().min(5).optional(),
    city: z.string().min(2).optional(),
    state: z.string().min(2).optional(),
    pincode: z.string().min(4).optional(),
    location: z.object({
      type: z.literal('Point'),
      coordinates: z.tuple([z.number(), z.number()])
    }).optional(),
  })
});

export const updateAvailabilitySchema = z.object({
  body: z.object({
    isAvailable: z.boolean(),
    autoResumeDate: z.string().transform((str) => new Date(str)).optional(),
  })
});
