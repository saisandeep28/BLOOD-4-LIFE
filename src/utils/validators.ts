import { z } from 'zod';
import { BloodGroup, ComponentType, UserRole } from '@life-for-all/types';

export const emailSchema = z.string().email('Invalid email address');
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[\W_]/, 'Password must contain at least one special character');
  
export const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');

export const bloodGroupSchema = z.nativeEnum(BloodGroup);
export const componentTypeSchema = z.nativeEnum(ComponentType);
export const userRoleSchema = z.nativeEnum(UserRole);

export const geoPointSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});
