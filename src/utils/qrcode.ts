import QRCode from 'qrcode';
import { logger } from './logger';

export const generateQRCode = async (data: string): Promise<string | null> => {
  try {
    const qrDataUrl = await QRCode.toDataURL(data);
    return qrDataUrl;
  } catch (error) {
    logger.error('Error generating QR code:', error);
    return null;
  }
};
