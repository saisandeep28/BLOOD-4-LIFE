"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const logger_1 = require("./logger");
const transporter = nodemailer_1.default.createTransport({
    host: config_1.config.email.host,
    port: config_1.config.email.port,
    secure: config_1.config.email.port === 465,
    auth: {
        user: config_1.config.email.user,
        pass: config_1.config.email.pass,
    },
});
const sendEmail = async (to, subject, html) => {
    if (!config_1.config.email.user) {
        logger_1.logger.warn('Email provider not configured, skipping sendEmail');
        return false;
    }
    try {
        await transporter.sendMail({
            from: config_1.config.email.from,
            to,
            subject,
            html,
        });
        return true;
    }
    catch (error) {
        logger_1.logger.error('Error sending email:', error);
        return false;
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.js.map