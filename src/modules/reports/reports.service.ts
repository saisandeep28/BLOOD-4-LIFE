import { Donation, BloodUnit } from '../../models';
import { UserRole } from '@life-for-all/types';

export class ReportsService {
  async getDonationReport(userId: string, role: UserRole, startDate?: string, endDate?: string): Promise<any> {
    const query: any = {};
    
    if (role === UserRole.DONOR) {
      query.donorId = userId;
    } else if (role === UserRole.HOSPITAL || role === UserRole.BLOOD_BANK) {
      query.facilityId = userId;
    }
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    const donations = await Donation.find(query).sort({ date: -1 });
    
    // Aggregate some basic stats
    const totalDonations = donations.length;
    const totalVolume = donations.reduce((sum, d) => sum + d.quantityMl, 0);
    const byBloodGroup = donations.reduce((acc, d) => {
      acc[d.bloodGroup] = (acc[d.bloodGroup] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      summary: { totalDonations, totalVolume, byBloodGroup },
      data: donations
    };
  }

  async getInventoryReport(facilityId: string): Promise<any> {
    const units = await BloodUnit.find({ facilityId });
    
    const totalUnits = units.length;
    
    const byStatus = units.reduce((acc, u) => {
      acc[u.status] = (acc[u.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const byBloodGroup = units.reduce((acc, u) => {
      acc[u.bloodGroup] = (acc[u.bloodGroup] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Expiring within 7 days
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const expiringSoon = units.filter(u => u.expiryDate <= nextWeek && u.status === 'available').length;
    
    return {
      summary: { totalUnits, byStatus, byBloodGroup, expiringSoon },
      data: units
    };
  }

  async exportReport(type: string, userId: string, role: UserRole): Promise<any> {
    // In a real app, generate CSV or PDF
    // For now, return mock URL
    return {
      downloadUrl: `https://api.lifeforall.example.com/exports/${type}_report_${Date.now()}.csv`
    };
  }
}

export const reportsService = new ReportsService();
