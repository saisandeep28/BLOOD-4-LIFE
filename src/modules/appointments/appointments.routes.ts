import { Router } from 'express';
import * as appointmentsController from './appointments.controller';
import { authenticate } from '../../middleware/auth';
import { authorize } from '../../middleware/rbac';
import { validate } from '../../middleware/validate';
import { createAppointmentSchema, updateAppointmentSchema } from './appointments.validators';
import { UserRole } from '@life-for-all/types';

const router = Router();

router.use(authenticate);

router.get('/slots', appointmentsController.getSlots);
router.get('/', appointmentsController.getAppointments);
router.post('/', authorize([UserRole.DONOR]), validate(createAppointmentSchema), appointmentsController.bookAppointment);
router.patch('/:id', validate(updateAppointmentSchema), appointmentsController.updateAppointment);

export default router;
