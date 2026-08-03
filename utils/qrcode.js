"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQRCode = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const logger_1 = require("./logger");
const generateQRCode = async (data) => {
    try {
        const qrDataUrl = await qrcode_1.default.toDataURL(data);
        return qrDataUrl;
    }
    catch (error) {
        logger_1.logger.error('Error generating QR code:', error);
        return null;
    }
};
exports.generateQRCode = generateQRCode;
//# sourceMappingURL=qrcode.js.map