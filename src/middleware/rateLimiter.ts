import rateLimit from 'express-rate-limit';

const createLimiter = (max: number, windowMs: number, message: string) => {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message
        }
      });
    }
  });
};

export const authLimiter = createLimiter(10, 15 * 60 * 1000, 'Too many auth requests from this IP, please try again after 15 minutes');
export const searchLimiter = createLimiter(60, 60 * 1000, 'Too many search requests, please try again later');
export const createRequestLimiter = createLimiter(20, 60 * 60 * 1000, 'Too many blood requests created, please try again later');
export const apiLimiter = createLimiter(300, 60 * 1000, 'Too many requests, please try again later');
