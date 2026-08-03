import { IUserDocument } from '../../models';
import { RegisterDTO, LoginDTO, AuthTokens } from '@life-for-all/types';
export declare class AuthService {
    register(data: RegisterDTO): Promise<{
        user: Partial<IUserDocument>;
        tokens: AuthTokens;
    }>;
    login(data: LoginDTO): Promise<{
        user: Partial<IUserDocument>;
        tokens: AuthTokens;
    }>;
}
export declare const authService: AuthService;
