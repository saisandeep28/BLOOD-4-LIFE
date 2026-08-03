import { Router } from 'express';
import * as notificationsController from './notifications.controller';
import { authenticate } from '../../middleware/auth';
import { authorize } from '../../middleware/rbac';
import { validate } from '../../middleware/validate';
import { broadcastSchema } from './notifications.validators';
import { UserRole } from '@life-for-all/types';

const router = Router();

router.use(authenticate);

router.get('/', notificationsController.getNotifications);
router.patch('/:id/read', notificationsController.markAsRead);

// Only admins can broadcast
router.post('/broadcast', authorize([UserRole.ADMIN, UserRole.SUPER_ADMIN]), validate(broadcastSchema), notificationsController.broadcast);

export default router;
