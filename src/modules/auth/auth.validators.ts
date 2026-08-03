import { z } from 'zod';
import { emailSchema, passwordSchema, phoneSchema, userRoleSchema } from '../../utils/validators';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is too short'),
    email: emailSchema,
    phone: phoneSchema.optional(),
    password: passwordSchema,
    role: userRoleSchema,
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1, 'Password is required'),
  })
});

export const otpRequestSchema = z.object({
  body: z.object({
    phone: phoneSchema,
  })
});

export const otpVerifySchema = z.object({
  body: z.object({
    phone: phoneSchema,
    otp: z.string().length(6),
  })
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
  })
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1, 'Token is required'),
    newPassword: passwordSchema,
  })
});
