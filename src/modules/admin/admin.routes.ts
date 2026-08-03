import { Router } from 'express';
import * as adminController from './admin.controller';
import { authenticate } from '../../middleware/auth';
import { authorize } from '../../middleware/rbac';
import { validate } from '../../middleware/validate';
import { updateUserStatusSchema, verifyEntitySchema } from './admin.validators';
import { UserRole } from '@life-for-all/types';

const router = Router();

// Apply auth and admin-only authorization to all routes
router.use(authenticate);
router.use(authorize([UserRole.ADMIN, UserRole.SUPER_ADMIN]));

router.get('/users', adminController.getUsers);
router.patch('/users/:id', validate(updateUserStatusSchema), adminController.updateUserStatus);
router.patch('/verify/:entityId', validate(verifyEntitySchema), adminController.verifyEntity);
router.get('/audit-logs', adminController.getAuditLogs);
router.get('/analytics', adminController.getAnalytics);

export default router;
