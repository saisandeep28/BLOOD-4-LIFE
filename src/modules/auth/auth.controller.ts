import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { sendSuccess } from '../../utils/apiResponse';

export const sendOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ success: false, error: { code: 'MISSING_PHONE', message: 'Phone number is required' } });
      return;
    }
    const result = await authService.sendPhoneOTP(phone);
    if (!result.smsSent) {
      sendSuccess(res, {
        smsSent: false,
        otp: result.otp,
        message: `Could not deliver SMS directly to your phone. Use this developer bypass OTP: ${result.otp}`
      });
    } else {
      sendSuccess(res, {
        smsSent: true,
        message: 'OTP sent to your phone number. Valid for 10 minutes.'
      });
    }
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      res.status(400).json({ success: false, error: { code: 'MISSING_FIELDS', message: 'Phone number and OTP are required' } });
      return;
    }
    await authService.verifyPhoneOTP(phone, otp);
    sendSuccess(res, { message: 'Phone number verified successfully.' });
  } catch (error) {
    next(error);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await authService.register(req.body);
    sendSuccess(res, result, 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await authService.login(req.body);
    // In production, we should set refresh token as httpOnly cookie here
    res.cookie('refreshToken', result.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    sendSuccess(res, result);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.clearCookie('refreshToken');
    sendSuccess(res, { message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'No refresh token provided' } });
      return;
    }

    const result = await authService.refreshToken(token);
    
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    sendSuccess(res, result);
  } catch (error) {
    res.clearCookie('refreshToken');
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await authService.forgotPassword(req.body.email);
    sendSuccess(res, { message: 'If that email is registered, a password reset link has been sent.' });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await authService.resetPassword(req.body.token, req.body.newPassword);
    sendSuccess(res, { message: 'Password has been reset successfully.' });
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await authService.verifyEmail(req.params.token);
    sendSuccess(res, { message: 'Email verified successfully.' });
  } catch (error) {
    next(error);
  }
};
