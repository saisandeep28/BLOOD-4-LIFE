import { User, AuditLog, Hospital, BloodBank, Request, Donation } from '../../models';
import { VerificationStatus, UserRole, AuditAction } from '@life-for-all/types';

export class AdminService {
  async getUsers(page: number = 1, limit: number = 20, role?: UserRole): Promise<any> {
    const query = role ? { role } : {};
    
    const users = await User.find(query)
      .select('-passwordHash -twoFASecret')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
      
    const total = await User.countDocuments(query);
    
    return {
      users,
      meta: {
        page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async updateUserStatus(id: string, data: any): Promise<any> {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    ).select('-passwordHash -twoFASecret');
    return user;
  }

  async verifyEntity(entityId: string, status: VerificationStatus, rejectionReason?: string): Promise<any> {
    // Determine if it's a Hospital or BloodBank based on existence
    let entity: any = await Hospital.findById(entityId);
    let entityType = 'hospital';
    
    if (!entity) {
      entity = await BloodBank.findById(entityId);
      entityType = 'blood_bank';
    }
    
    if (!entity) {
      throw { statusCode: 404, code: 'NOT_FOUND', message: 'Facility not found' };
    }
    
    entity.verificationStatus = status;
    if (rejectionReason) {
      entity.rejectionReason = rejectionReason;
    }
    
    await entity.save();
    
    // Also update the associated User's isVerified flag
    await User.findByIdAndUpdate(entity.userId, { isVerified: status === VerificationStatus.APPROVED });
    
    return entity;
  }

  async getAuditLogs(page: number = 1, limit: number = 50): Promise<any> {
    const logs = await AuditLog.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ timestamp: -1 });
      
    const total = await AuditLog.countDocuments();
    
    return {
      logs,
      meta: {
        page,
        pageSize: limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getAnalytics(): Promise<any> {
    // Gather platform wide analytics
    const totalUsers = await User.countDocuments();
    
    const roleStats = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);
    
    const totalHospitals = await Hospital.countDocuments();
    const totalBloodBanks = await BloodBank.countDocuments();
    const activeRequests = await Request.countDocuments({ status: { $in: ['submitted', 'matching', 'in_progress'] } });
    const totalDonations = await Donation.countDocuments();

    return {
      totalUsers,
      totalHospitals,
      totalBloodBanks,
      activeRequests,
      totalDonations,
      roles: roleStats.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {} as Record<string, number>)
    };
  }
}

export const adminService = new AdminService();
