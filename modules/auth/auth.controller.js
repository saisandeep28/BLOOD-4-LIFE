"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const apiResponse_1 = require("../../utils/apiResponse");
const register = async (req, res, next) => {
    try {
        const result = await auth_service_1.authService.register(req.body);
        (0, apiResponse_1.sendSuccess)(res, result, 201);
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const result = await auth_service_1.authService.login(req.body);
        // In production, we should set refresh token as httpOnly cookie here
        res.cookie('refreshToken', result.tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        (0, apiResponse_1.sendSuccess)(res, result);
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    try {
        res.clearCookie('refreshToken');
        (0, apiResponse_1.sendSuccess)(res, { message: 'Logged out successfully' });
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map