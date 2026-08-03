"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = require("../config");
const logger_1 = require("./logger");
const fs_1 = __importDefault(require("fs"));
cloudinary_1.v2.config({
    cloud_name: config_1.config.cloudinary.cloudName,
    api_key: config_1.config.cloudinary.apiKey,
    api_secret: config_1.config.cloudinary.apiSecret,
});
const uploadToCloudinary = async (localFilePath, folder = 'life-for-all') => {
    if (!config_1.config.cloudinary.apiKey) {
        logger_1.logger.warn('Cloudinary not configured, returning local path as fallback');
        return localFilePath;
    }
    try {
        const result = await cloudinary_1.v2.uploader.upload(localFilePath, { folder });
        // Remove file from local uploads dir after successful upload
        fs_1.default.unlinkSync(localFilePath);
        return result.secure_url;
    }
    catch (error) {
        logger_1.logger.error('Error uploading to Cloudinary:', error);
        return null;
    }
};
exports.uploadToCloudinary = uploadToCloudinary;
//# sourceMappingURL=cloudinary.js.map