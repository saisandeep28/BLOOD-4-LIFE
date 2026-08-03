"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLimiter = exports.createRequestLimiter = exports.searchLimiter = exports.authLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const createLimiter = (max, windowMs, message) => {
    return (0, express_rate_limit_1.default)({
        windowMs,
        max,
        standardHeaders: true,
        legacyHeaders: false,
        handler: (req, res) => {
            res.status(429).json({
                success: false,
                error: {
                    code: 'RATE_LIMIT_EXCEEDED',
                    message
                }
            });
        }
    });
};
exports.authLimiter = createLimiter(10, 15 * 60 * 1000, 'Too many auth requests from this IP, please try again after 15 minutes');
exports.searchLimiter = createLimiter(60, 60 * 1000, 'Too many search requests, please try again later');
exports.createRequestLimiter = createLimiter(20, 60 * 60 * 1000, 'Too many blood requests created, please try again later');
exports.apiLimiter = createLimiter(300, 60 * 1000, 'Too many requests, please try again later');
//# sourceMappingURL=rateLimiter.js.map