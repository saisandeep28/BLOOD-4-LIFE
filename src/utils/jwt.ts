import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AuthTokens, TokenPayload } from '@life-for-all/types';

export const generateTokens = (payload: TokenPayload): AuthTokens => {
  const accessToken = jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiry as any,
  });

  const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiry as any,
  });

  // Extract expiry duration (simplistic, assumes standard '15m' etc form or defaults)
  return {
    accessToken,
    refreshToken,
    expiresIn: 15 * 60, // e.g. 15 mins in seconds, would parse dynamic in prod
  };
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, config.jwt.refreshSecret) as TokenPayload;
};
