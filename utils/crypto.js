"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomToken = exports.generateOTP = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateOTP = (length = 6) => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[crypto_1.default.randomInt(0, 10)];
    }
    return otp;
};
exports.generateOTP = generateOTP;
const generateRandomToken = (bytes = 32) => {
    return crypto_1.default.randomBytes(bytes).toString('hex');
};
exports.generateRandomToken = generateRandomToken;
//# sourceMappingURL=crypto.js.map