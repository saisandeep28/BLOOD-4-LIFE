import { Donation, IDonationDocument, DonorProfile, User } from '../../models';
import { UserRole } from '@life-for-all/types';
import crypto from 'crypto';

export class DonationsService {
  async recordDonation(data: any, facilityId: string, facilityType: string, facilityName: string): Promise<IDonationDocument> {
    const certificateId = `CERT-${Date.now()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
    
    const donation = await Donation.create({
      ...data,
      facilityId,
      facilityType,
      facilityName,
      certificateId,
      date: new Date()
    });

    // Update donor profile stats
    const donorProfile = await DonorProfile.findOne({ userId: data.donorId });
    if (donorProfile) {
      donorProfile.totalDonations += 1;
      donorProfile.lastDonationDate = new Date();
      // Calculate next eligible date (e.g., +90 days)
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + 90);
      donorProfile.nextEligibleDate = nextDate;
      donorProfile.isAvailable = false;
      donorProfile.autoResumeDate = nextDate;
      donorProfile.rewardPoints += 100; // Add points
      await donorProfile.save();
    }

    return donation;
  }

  async getDonations(userId: string, role: UserRole): Promise<IDonationDocument[]> {
    let query: any = {};
    
    if (role === UserRole.DONOR) {
      query.donorId = userId;
    } else if (role === UserRole.HOSPITAL || role === UserRole.BLOOD_BANK) {
      query.facilityId = userId;
    }
    
    return Donation.find(query).sort({ date: -1 });
  }

  async getCertificate(id: string, userId: string, role: UserRole): Promise<any> {
    const donation = await Donation.findById(id);
    if (!donation) {
      throw { statusCode: 404, code: 'NOT_FOUND', message: 'Donation not found' };
    }
    
    if (role === UserRole.DONOR && donation.donorId !== userId) {
      throw { statusCode: 403, code: 'FORBIDDEN', message: 'Not authorized to view this certificate' };
    }

    // In a real application, we would generate a PDF or an image certificate here
    // For now we just return the donation data with a fake URL
    return {
      certificateUrl: donation.certificateUrl || `https://api.lifeforall.example.com/certificates/${donation.certificateId}.pdf`,
      certificateId: donation.certificateId,
      donation
    };
  }
}

export const donationsService = new DonationsService();
