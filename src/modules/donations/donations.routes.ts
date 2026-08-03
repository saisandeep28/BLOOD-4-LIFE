import { Router } from 'express';
import * as donationsController from './donations.controller';
import { authenticate } from '../../middleware/auth';
import { authorize } from '../../middleware/rbac';
import { validate } from '../../middleware/validate';
import { createDonationSchema } from './donations.validators';
import { UserRole } from '@life-for-all/types';

const router = Router();

router.use(authenticate);

router.get('/', donationsController.getDonations);
router.get('/:id/certificate', donationsController.getCertificate);

// Only hospitals and blood banks can record a donation
router.post('/', authorize([UserRole.HOSPITAL, UserRole.BLOOD_BANK]), validate(createDonationSchema), donationsController.recordDonation);

export default router;
