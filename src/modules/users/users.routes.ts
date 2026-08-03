import { Router } from 'express';
import * as usersController from './users.controller';
import { authenticate } from '../../middleware/auth';
import { authorize } from '../../middleware/rbac';
import { validate } from '../../middleware/validate';
import { updateProfileSchema, updateAvailabilitySchema } from './users.validators';
import { UserRole } from '@life-for-all/types';

const router = Router();

router.use(authenticate);

// Profile routes
router.get('/me', usersController.getMe);
router.patch('/me', validate(updateProfileSchema), usersController.updateMe);

// Donor specific routes
router.patch('/me/availability', authorize([UserRole.DONOR]), validate(updateAvailabilitySchema), usersController.updateAvailability);
router.get('/me/history', authorize([UserRole.DONOR]), usersController.getDonationHistory);
router.get('/me/qr-card', authorize([UserRole.DONOR]), usersController.generateDonorQR);

// Public routes (though authenticated)
router.get('/donors/:id', usersController.getPublicDonorProfile);

export default router;
