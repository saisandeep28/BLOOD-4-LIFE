"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const config_1 = require("../config");
const { combine, timestamp, printf, colorize, errors, json } = winston_1.default.format;
const consoleFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});
exports.logger = winston_1.default.createLogger({
    level: config_1.config.logLevel,
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), config_1.config.env === 'production' ? json() : combine(colorize(), consoleFormat)),
    transports: [
        new winston_1.default.transports.Console()
    ]
});
//# sourceMappingURL=logger.js.map