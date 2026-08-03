import { Router } from 'express';
import * as inventoryController from './inventory.controller';
import { authenticate } from '../../middleware/auth';
import { authorize } from '../../middleware/rbac';
import { UserRole } from '@life-for-all/types';

const router = Router();

router.use(authenticate);
router.use(authorize([UserRole.HOSPITAL, UserRole.BLOOD_BANK]));

router.post('/', inventoryController.addUnit);
router.get('/', inventoryController.getInventory);
router.patch('/:id/status', inventoryController.updateStatus);

export default router;
