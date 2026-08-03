import nodemailer from 'nodemailer';
import { config } from '../config';
import { logger } from './logger';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.port === 465,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

export const sendEmail = async (to: string, subject: string, html: string): Promise<boolean> => {
  if (!config.email.user) {
    logger.warn('Email provider not configured, skipping sendEmail');
    return false;
  }
  
  try {
    await transporter.sendMail({
      from: config.email.from,
      to,
      subject,
      html,
    });
    return true;
  } catch (error) {
    logger.error('Error sending email:', error);
    return false;
  }
};
