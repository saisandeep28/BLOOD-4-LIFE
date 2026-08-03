"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const models_1 = require("../models");
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'No token provided' } });
            return;
        }
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt.accessSecret);
        // Verify user still exists and is active
        const user = await models_1.User.findById(decoded.userId).select('isActive isVerified');
        if (!user) {
            res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'User not found' } });
            return;
        }
        if (!user.isActive) {
            res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'User account is deactivated' } });
            return;
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({ success: false, error: { code: 'TOKEN_EXPIRED', message: 'Token has expired' } });
            return;
        }
        res.status(401).json({ success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid token' } });
        return;
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.js.map