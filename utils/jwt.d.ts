import { AuthTokens, TokenPayload } from '@life-for-all/types';
export declare const generateTokens: (payload: TokenPayload) => AuthTokens;
export declare const verifyRefreshToken: (token: string) => TokenPayload;
