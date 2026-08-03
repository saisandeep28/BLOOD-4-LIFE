import { z } from 'zod';
export declare const registerSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        phone: z.ZodOptional<z.ZodString>;
        password: z.ZodString;
        role: z.ZodNativeEnum<typeof import("@life-for-all/types").UserRole>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        role: import("@life-for-all/types").UserRole;
        name: string;
        password: string;
        phone?: string | undefined;
    }, {
        email: string;
        role: import("@life-for-all/types").UserRole;
        name: string;
        password: string;
        phone?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        role: import("@life-for-all/types").UserRole;
        name: string;
        password: string;
        phone?: string | undefined;
    };
}, {
    body: {
        email: string;
        role: import("@life-for-all/types").UserRole;
        name: string;
        password: string;
        phone?: string | undefined;
    };
}>;
export declare const loginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        email: string;
        password: string;
    }, {
        email: string;
        password: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        password: string;
    };
}, {
    body: {
        email: string;
        password: string;
    };
}>;
export declare const otpRequestSchema: z.ZodObject<{
    body: z.ZodObject<{
        phone: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        phone: string;
    }, {
        phone: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        phone: string;
    };
}, {
    body: {
        phone: string;
    };
}>;
export declare const otpVerifySchema: z.ZodObject<{
    body: z.ZodObject<{
        phone: z.ZodString;
        otp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        phone: string;
        otp: string;
    }, {
        phone: string;
        otp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        phone: string;
        otp: string;
    };
}, {
    body: {
        phone: string;
        otp: string;
    };
}>;
