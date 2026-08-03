import { Router } from 'express';
import * as authController from './auth.controller';
import { validate } from '../../middleware/validate';
import { authLimiter } from '../../middleware/rateLimiter';
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from './auth.validators';

const router = Router();

router.post('/send-otp', authLimiter, authController.sendOTP);
router.post('/verify-otp', authLimiter, authController.verifyOTP);
router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refreshToken);
router.post('/password/forgot', authLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
router.post('/password/reset', authLimiter, validate(resetPasswordSchema), authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);

export default router;
