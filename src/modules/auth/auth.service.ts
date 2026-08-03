import mongoose from 'mongoose';
import { User, IUserDocument } from '../../models';
import { RegisterDTO, LoginDTO, AuthTokens, TokenPayload } from '@life-for-all/types';
import { generateTokens, verifyRefreshToken } from '../../utils/jwt';
import { sendSMS } from '../../utils/sms';
import { config } from '../../config';
import jwt from 'jsonwebtoken';

// In-memory OTP store
const otpStore = new Map<string, { otp: string; expiresAt: Date }>();

// In-memory fallback users store for when MongoDB is unavailable
const inMemoryUsersStore: Array<{
  _id: string;
  name: string;
  email: string;
  phone?: string;
  passwordHash: string;
  role: 'donor' | 'hospital' | 'blood_bank' | 'admin';
  isVerified: boolean;
  isPhoneVerified: boolean;
  isActive: boolean;
}> = [];

export class AuthService {
  async sendPhoneOTP(phone: string): Promise<{ smsSent: boolean; otp: string }> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min
    otpStore.set(phone, { otp, expiresAt });

    const message = `Your Life For All verification code is: ${otp}. Valid for 10 minutes. Please do not share this OTP with anyone.`;
    const success = await sendSMS(phone, message);
    return { smsSent: success, otp };
  }

  async verifyPhoneOTP(phone: string, otp: string): Promise<void> {
    const record = otpStore.get(phone);
    if (!record) {
      throw { statusCode: 400, code: 'OTP_NOT_FOUND', message: 'OTP not found or expired. Please request a new one.' };
    }
    if (new Date() > record.expiresAt) {
      otpStore.delete(phone);
      throw { statusCode: 400, code: 'OTP_EXPIRED', message: 'OTP has expired. Please request a new one.' };
    }
    if (record.otp !== otp) {
      throw { statusCode: 400, code: 'INVALID_OTP', message: 'Invalid OTP. Please try again.' };
    }
    otpStore.delete(phone);
  }

  async register(data: RegisterDTO): Promise<{ user: any; tokens: AuthTokens }> {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      try {
        const existingUser = await User.findOne({
          $or: [
            { email: data.email.toLowerCase() },
            ...(data.phone ? [{ phone: data.phone }] : [])
          ]
        });
        if (existingUser) {
          throw { statusCode: 409, code: 'USER_ALREADY_REGISTERED', message: 'You are already registered! Please log in to your account.' };
        }

        const extraData = data as any;
        const user = await User.create({
          name: data.name,
          email: data.email,
          phone: data.phone,
          passwordHash: data.password,
          role: data.role,
          age: extraData.age,
          gender: extraData.gender,
          fathersName: extraData.fathersName,
          address: extraData.address,
          state: extraData.state,
          district: extraData.district,
          pincode: extraData.pincode,
          isPhoneVerified: true,
          authProviders: ['local'],
        });

        const payload: TokenPayload = {
          userId: user._id.toString(),
          role: user.role,
          email: user.email,
        };

        const tokens = generateTokens(payload);

        return {
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            age: user.age,
            gender: user.gender,
            fathersName: user.fathersName,
            address: user.address,
            state: user.state,
            district: user.district,
            pincode: user.pincode,
            isVerified: user.isVerified,
            isPhoneVerified: user.isPhoneVerified,
          },
          tokens,
        };
      } catch (error: any) {
        if (error.statusCode) throw error;
        console.warn('MongoDB query failed during registration, using in-memory registration fallback:', error.message);
      }
    }

    // --- FALLBACK IN-MEMORY REGISTRATION ---
    const existingInMem = inMemoryUsersStore.find(
      u => u.email.toLowerCase() === data.email.toLowerCase() || (data.phone && u.phone === data.phone)
    );
    if (existingInMem) {
      throw { statusCode: 409, code: 'USER_ALREADY_REGISTERED', message: 'You are already registered! Please log in to your account.' };
    }

    const extraData = data as any;
    const dummyId = 'mem_usr_' + Date.now() + Math.floor(Math.random() * 1000);
    const newUser = {
      _id: dummyId,
      name: data.name,
      email: data.email,
      phone: data.phone,
      passwordHash: data.password,
      role: data.role as any,
      age: extraData.age,
      gender: extraData.gender,
      fathersName: extraData.fathersName,
      address: extraData.address,
      state: extraData.state,
      district: extraData.district,
      pincode: extraData.pincode,
      isVerified: true,
      isPhoneVerified: true,
      isActive: true,
    };

    inMemoryUsersStore.push(newUser);

    const payload: TokenPayload = {
      userId: dummyId,
      role: data.role as any,
      email: data.email,
    };

    const tokens = generateTokens(payload);

    return {
      user: {
        _id: dummyId,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        age: newUser.age,
        gender: newUser.gender,
        fathersName: newUser.fathersName,
        address: newUser.address,
        state: newUser.state,
        district: newUser.district,
        pincode: newUser.pincode,
        isVerified: true,
        isPhoneVerified: true,
      },
      tokens,
    };
  }

  async login(data: LoginDTO): Promise<{ user: any; tokens: AuthTokens }> {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      try {
        const user = await User.findOne({ email: data.email });
        if (user) {
          const isMatch = await user.comparePassword(data.password);
          if (!isMatch) {
            user.loginAttempts += 1;
            await user.save();
            throw { statusCode: 401, code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' };
          }

          if (!user.isActive) {
            throw { statusCode: 403, code: 'ACCOUNT_DISABLED', message: 'Account disabled' };
          }

          user.lastLoginAt = new Date();
          user.loginAttempts = 0;
          await user.save();

          const payload: TokenPayload = {
            userId: user._id.toString(),
            role: user.role,
            email: user.email,
          };

          const tokens = generateTokens(payload);

          return {
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              role: user.role,
              age: user.age,
              gender: user.gender,
              fathersName: user.fathersName,
              address: user.address,
              state: user.state,
              district: user.district,
              pincode: user.pincode,
              isVerified: user.isVerified,
              isPhoneVerified: user.isPhoneVerified,
            },
            tokens,
          };
        }
      } catch (error: any) {
        if (error.statusCode) throw error;
        console.warn('MongoDB query failed during login, checking in-memory store:', error.message);
      }
    }

    // --- FALLBACK IN-MEMORY LOGIN ---
    const inMemUser = inMemoryUsersStore.find(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (!inMemUser || inMemUser.passwordHash !== data.password) {
      throw { statusCode: 401, code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' };
    }

    const payload: TokenPayload = {
      userId: inMemUser._id,
      role: inMemUser.role,
      email: inMemUser.email,
    };

    const tokens = generateTokens(payload);

    return {
      user: {
        _id: inMemUser._id,
        name: inMemUser.name,
        email: inMemUser.email,
        phone: inMemUser.phone,
        role: inMemUser.role,
        age: (inMemUser as any).age,
        gender: (inMemUser as any).gender,
        fathersName: (inMemUser as any).fathersName,
        address: (inMemUser as any).address,
        state: (inMemUser as any).state,
        district: (inMemUser as any).district,
        pincode: (inMemUser as any).pincode,
        isVerified: true,
        isPhoneVerified: true,
      },
      tokens,
    };
  }

  async refreshToken(token: string): Promise<AuthTokens> {
    try {
      const decoded = verifyRefreshToken(token);
      
      const payload: TokenPayload = {
        userId: decoded.userId,
        role: decoded.role,
        email: decoded.email,
      };

      return generateTokens(payload);
    } catch (error) {
      throw { statusCode: 401, code: 'UNAUTHORIZED', message: 'Invalid or expired refresh token' };
    }
  }

  async forgotPassword(email: string): Promise<void> {
    return;
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    return;
  }

  async verifyEmail(token: string): Promise<void> {
    return;
  }
}

export const authService = new AuthService();
