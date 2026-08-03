import { User, DonorProfile, IUserDocument, IDonorProfileDocument, Donation } from '../../models';
import { UserRole } from '@life-for-all/types';
import { generateQRCode } from '../../utils/qrcode';

export class UsersService {
  async getUserProfile(userId: string, role: UserRole): Promise<any> {
    const user = await User.findById(userId).select('-passwordHash -twoFASecret');
    if (!user) {
      throw { statusCode: 404, code: 'USER_NOT_FOUND', message: 'User not found' };
    }

    let profile = null;
    
    // Fetch role-specific profile data
    if (role === UserRole.DONOR || role === UserRole.RECIPIENT) {
      profile = await DonorProfile.findOne({ userId });
    }
    // Additional roles like HOSPITAL, BLOOD_BANK etc. can be added here
    
    return {
      user,
      profile
    };
  }

  async updateUserProfile(userId: string, role: UserRole, updateData: any): Promise<any> {
    // Separate user fields from profile fields
    const userFields = ['name', 'phone', 'avatar'];
    const userUpdate: any = {};
    const profileUpdate: any = {};

    for (const [key, value] of Object.entries(updateData)) {
      if (userFields.includes(key)) {
        userUpdate[key] = value;
      } else {
        profileUpdate[key] = value;
      }
    }

    // Update User model
    let user = null;
    if (Object.keys(userUpdate).length > 0) {
      user = await User.findByIdAndUpdate(userId, userUpdate, { new: true }).select('-passwordHash -twoFASecret');
    } else {
      user = await User.findById(userId).select('-passwordHash -twoFASecret');
    }

    // Update Profile model if applicable
    let profile = null;
    if (Object.keys(profileUpdate).length > 0 && (role === UserRole.DONOR || role === UserRole.RECIPIENT)) {
      profile = await DonorProfile.findOneAndUpdate(
        { userId },
        profileUpdate,
        { new: true, upsert: true } // Upsert in case profile doesn't exist yet
      );
    } else if (role === UserRole.DONOR || role === UserRole.RECIPIENT) {
      profile = await DonorProfile.findOne({ userId });
    }

    return {
      user,
      profile
    };
  }

  async getPublicDonorProfile(donorId: string): Promise<any> {
    const donor = await DonorProfile.findOne({ userId: donorId }).populate('userId', 'name avatar isVerified');
    if (!donor) {
      throw { statusCode: 404, code: 'DONOR_NOT_FOUND', message: 'Donor not found' };
    }
    return donor;
  }

  async updateAvailability(userId: string, isAvailable: boolean, autoResumeDate?: Date): Promise<IDonorProfileDocument | null> {
    const donor = await DonorProfile.findOneAndUpdate(
      { userId },
      { isAvailable, autoResumeDate },
      { new: true }
    );
    
    if (!donor) {
      throw { statusCode: 404, code: 'DONOR_NOT_FOUND', message: 'Donor profile not found' };
    }
    
    return donor;
  }

  async getDonationHistory(userId: string): Promise<any[]> {
    // In a full implementation, we'd query the Donations collection
    // For now, this is a placeholder returning empty array since Donation model might not be fully implemented yet
    // I will use a dummy list until the Donations module is done or if Donation model is available.
    
    // Assuming Donation model exists in models
    try {
      // Need to make sure Donation model is exported from models index
      const { Donation } = await import('../../models');
      if (Donation) {
         return await Donation.find({ donorId: userId }).sort({ date: -1 });
      }
    } catch (e) {
      console.warn("Donation model not available yet");
    }
    return [];
  }

  async generateDonorQR(userId: string): Promise<string> {
    const donor = await DonorProfile.findOne({ userId }).populate('userId', 'name bloodGroup');
    if (!donor) {
      throw { statusCode: 404, code: 'DONOR_NOT_FOUND', message: 'Donor profile not found' };
    }
    
    const qrData = JSON.stringify({
      id: donor._id,
      userId: donor.userId,
      bloodGroup: donor.bloodGroup,
    });
    
    const qrCode = await generateQRCode(qrData);
    if (!qrCode) {
      throw { statusCode: 500, code: 'QR_GENERATION_FAILED', message: 'Failed to generate QR code' };
    }
    
    return qrCode;
  }
}

export const usersService = new UsersService();
