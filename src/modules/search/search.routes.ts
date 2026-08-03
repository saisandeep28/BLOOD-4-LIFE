import { Router } from 'express';
import * as searchController from './search.controller';
import { searchLimiter } from '../../middleware/rateLimiter';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.use(searchLimiter);

// Public search for facilities (donors finding places to donate)
router.get('/facilities', searchController.searchFacilities);

// Protected search for donors (hospitals finding donors)
router.get('/donors', authenticate, searchController.searchDonors);

export default router;
