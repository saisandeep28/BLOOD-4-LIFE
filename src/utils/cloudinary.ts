import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config';
import { logger } from './logger';
import fs from 'fs';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

export const uploadToCloudinary = async (localFilePath: string, folder: string = 'life-for-all'): Promise<string | null> => {
  if (!config.cloudinary.apiKey) {
    logger.warn('Cloudinary not configured, returning local path as fallback');
    return localFilePath;
  }
  
  try {
    const result = await cloudinary.uploader.upload(localFilePath, { folder });
    // Remove file from local uploads dir after successful upload
    fs.unlinkSync(localFilePath);
    return result.secure_url;
  } catch (error) {
    logger.error('Error uploading to Cloudinary:', error);
    return null;
  }
};
