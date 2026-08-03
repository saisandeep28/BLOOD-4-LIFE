import { z } from 'zod';
import { VolunteerTaskStatus } from '@life-for-all/types';

export const updateTaskStatusSchema = z.object({
  body: z.object({
    status: z.nativeEnum(VolunteerTaskStatus),
    notes: z.string().optional(),
  })
});
