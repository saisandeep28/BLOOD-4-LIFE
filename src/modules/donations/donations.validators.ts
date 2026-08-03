import { z } from 'zod';
import { bloodGroupSchema, componentTypeSchema } from '../../utils/validators';

export const createDonationSchema = z.object({
  body: z.object({
    donorId: z.string(),
    donorName: z.string(),
    bloodGroup: bloodGroupSchema,
    componentType: componentTypeSchema,
    quantityMl: z.number().min(50).max(600),
    hemoglobinLevel: z.number().optional(),
    notes: z.string().optional(),
  })
});
