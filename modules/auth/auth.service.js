"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const models_1 = require("../../models");
const jwt_1 = require("../../utils/jwt");
class AuthService {
    async register(data) {
        const existingUser = await models_1.User.findOne({ email: data.email });
        if (existingUser) {
            throw { statusCode: 409, code: 'EMAIL_EXISTS', message: 'Email already registered' };
        }
        const user = await models_1.User.create({
            name: data.name,
            email: data.email,
            phone: data.phone,
            passwordHash: data.password,
            role: data.role,
            authProviders: ['local'],
        });
        const payload = {
            userId: user._id.toString(),
            role: user.role,
            email: user.email,
        };
        const tokens = (0, jwt_1.generateTokens)(payload);
        return {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified
            },
            tokens,
        };
    }
    async login(data) {
        const user = await models_1.User.findOne({ email: data.email });
        if (!user) {
            throw { statusCode: 401, code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' };
        }
        const isMatch = await user.comparePassword(data.password);
        if (!isMatch) {
            user.loginAttempts += 1;
            await user.save();
            throw { statusCode: 401, code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' };
        }
        if (!user.isActive) {
            throw { statusCode: 403, code: 'ACCOUNT_DISABLED', message: 'Account disabled' };
        }
        user.lastLoginAt = new Date();
        user.loginAttempts = 0;
        await user.save();
        const payload = {
            userId: user._id.toString(),
            role: user.role,
            email: user.email,
        };
        const tokens = (0, jwt_1.generateTokens)(payload);
        return {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified
            },
            tokens,
        };
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map