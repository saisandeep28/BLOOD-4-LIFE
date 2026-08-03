import axios from 'axios';
import { config } from '../config';
import { logger } from './logger';

export const sendSMS = async (to: string, message: string): Promise<boolean> => {
  const { accountSid, authToken, phoneNumber } = config.twilio;

  // 1. If Twilio is configured, use it
  if (accountSid && authToken && phoneNumber && !accountSid.includes('your-twilio-sid')) {
    try {
      const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

      const params = new URLSearchParams();
      params.append('To', to);
      params.append('From', phoneNumber);
      params.append('Body', message);

      await axios.post(url, params.toString(), {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      logger.info(`SMS sent successfully via Twilio to ${to}`);
      return true;
    } catch (error: any) {
      const errorDetails = error?.response?.data || error.message;
      logger.error(`Error sending SMS via Twilio to ${to}:`, errorDetails);
      // Fallback to TextBelt if Twilio fails
    }
  }

  // 2. If Twilio is not configured or fails, use TextBelt (free public gateway, no account required)
  logger.info(`Attempting to send SMS to ${to} via TextBelt (free public gateway)...`);
  try {
    const res = await axios.post('https://textbelt.com/text', {
      phone: to,
      message: message,
      key: 'textbelt',
    });

    if (res.data && res.data.success) {
      logger.info(`SMS sent successfully via TextBelt to ${to}. Remaining quota: ${res.data.quotaRemaining}`);
      return true;
    } else {
      logger.warn(`TextBelt rejected send to ${to}: ${res.data.error || 'Unknown error'}`);
      return false;
    }
  } catch (error: any) {
    logger.error(`Error sending SMS via TextBelt to ${to}:`, error.message);
    return false;
  }
};
