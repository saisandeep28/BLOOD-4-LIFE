"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpVerifySchema = exports.otpRequestSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const validators_1 = require("../../utils/validators");
exports.registerSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, 'Name is too short'),
        email: validators_1.emailSchema,
        phone: validators_1.phoneSchema.optional(),
        password: validators_1.passwordSchema,
        role: validators_1.userRoleSchema,
    })
});
exports.loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(1, 'Password is required'),
    })
});
exports.otpRequestSchema = zod_1.z.object({
    body: zod_1.z.object({
        phone: validators_1.phoneSchema,
    })
});
exports.otpVerifySchema = zod_1.z.object({
    body: zod_1.z.object({
        phone: validators_1.phoneSchema,
        otp: zod_1.z.string().length(6),
    })
});
//# sourceMappingURL=auth.validators.js.map