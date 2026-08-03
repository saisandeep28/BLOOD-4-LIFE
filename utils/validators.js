"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geoPointSchema = exports.userRoleSchema = exports.componentTypeSchema = exports.bloodGroupSchema = exports.phoneSchema = exports.passwordSchema = exports.emailSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("@life-for-all/types");
exports.emailSchema = zod_1.z.string().email('Invalid email address');
exports.passwordSchema = zod_1.z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[\W_]/, 'Password must contain at least one special character');
exports.phoneSchema = zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');
exports.bloodGroupSchema = zod_1.z.nativeEnum(types_1.BloodGroup);
exports.componentTypeSchema = zod_1.z.nativeEnum(types_1.ComponentType);
exports.userRoleSchema = zod_1.z.nativeEnum(types_1.UserRole);
exports.geoPointSchema = zod_1.z.object({
    lat: zod_1.z.number().min(-90).max(90),
    lng: zod_1.z.number().min(-180).max(180),
});
//# sourceMappingURL=validators.js.map