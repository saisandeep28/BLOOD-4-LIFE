import { z } from 'zod';
import { VerificationStatus } from '@life-for-all/types';

export const updateUserStatusSchema = z.object({
  body: z.object({
    isActive: z.boolean().optional(),
    isVerified: z.boolean().optional(),
  })
});

export const verifyEntitySchema = z.object({
  body: z.object({
    status: z.nativeEnum(VerificationStatus),
    rejectionReason: z.string().optional(),
  })
});
