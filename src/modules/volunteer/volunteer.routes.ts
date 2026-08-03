import { Router } from 'express';
import * as volunteerController from './volunteer.controller';
import { authenticate } from '../../middleware/auth';
import { authorize } from '../../middleware/rbac';
import { validate } from '../../middleware/validate';
import { updateTaskStatusSchema } from './volunteer.validators';
import { UserRole } from '@life-for-all/types';

const router = Router();

router.use(authenticate);

router.get('/tasks', volunteerController.getTasks);
router.post('/tasks/:id/accept', authorize([UserRole.VOLUNTEER]), volunteerController.acceptTask);
router.patch('/tasks/:id/status', authorize([UserRole.VOLUNTEER]), validate(updateTaskStatusSchema), volunteerController.updateTaskStatus);

export default router;
