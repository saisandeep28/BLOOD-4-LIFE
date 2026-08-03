import { z } from 'zod';
import { BloodGroup, ComponentType, UserRole } from '@life-for-all/types';
export declare const emailSchema: z.ZodString;
export declare const passwordSchema: z.ZodString;
export declare const phoneSchema: z.ZodString;
export declare const bloodGroupSchema: z.ZodNativeEnum<typeof BloodGroup>;
export declare const componentTypeSchema: z.ZodNativeEnum<typeof ComponentType>;
export declare const userRoleSchema: z.ZodNativeEnum<typeof UserRole>;
export declare const geoPointSchema: z.ZodObject<{
    lat: z.ZodNumber;
    lng: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    lat: number;
    lng: number;
}, {
    lat: number;
    lng: number;
}>;
