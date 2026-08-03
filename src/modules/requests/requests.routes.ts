import { Router } from 'express';
import * as requestsController from './requests.controller';
import { authenticate } from '../../middleware/auth';
import { createRequestLimiter } from '../../middleware/rateLimiter';
import { z } from 'zod';
import { validate } from '../../middleware/validate';
import { bloodGroupSchema, geoPointSchema } from '../../utils/validators';
import { UrgencyLevel } from '@life-for-all/types';

const router = Router();

const createSchema = z.object({
  body: z.object({
    bloodGroup: bloodGroupSchema,
    unitsNeeded: z.number().min(1).max(10),
    urgencyLevel: z.nativeEnum(UrgencyLevel),
    location: z.object({
      type: z.literal('Point'),
      coordinates: z.tuple([z.number(), z.number()])
    }),
    city: z.string(),
    reason: z.string().optional(),
    patientName: z.string().optional(),
    patientAge: z.number().optional(),
  })
});

router.use(authenticate);

router.post('/', createRequestLimiter, validate(createSchema), requestsController.createRequest);
router.get('/nearby', requestsController.getNearbyRequests);
router.patch('/:id/status', requestsController.updateStatus);

export default router;
