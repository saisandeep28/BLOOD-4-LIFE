import winston from 'winston';
import { config } from '../config';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const consoleFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

export const logger = winston.createLogger({
  level: config.logLevel,
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    config.env === 'production' ? json() : combine(colorize(), consoleFormat)
  ),
  transports: [
    new winston.transports.Console()
  ]
});
