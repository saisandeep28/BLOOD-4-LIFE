import { Router } from 'express';
import * as reportsController from './reports.controller';
import { authenticate } from '../../middleware/auth';
import { authorize } from '../../middleware/rbac';
import { UserRole } from '@life-for-all/types';

const router = Router();

router.use(authenticate);

router.get('/donations', reportsController.getDonationsReport);
router.get('/inventory', authorize([UserRole.HOSPITAL, UserRole.BLOOD_BANK, UserRole.ADMIN, UserRole.SUPER_ADMIN]), reportsController.getInventoryReport);
router.get('/export', reportsController.exportReport);

export default router;
