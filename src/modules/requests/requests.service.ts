import { Request, IRequestDocument, DonorProfile } from '../../models';
import { RequestStatus, DonorMatchStatus, BloodGroup } from '@life-for-all/types';
import { io } from '../../index';

export class RequestsService {
  async createRequest(data: any, userId: string, role: string): Promise<IRequestDocument> {
    const request = await Request.create({
      requesterId: userId,
      requesterRole: role,
      bloodGroup: data.bloodGroup,
      unitsNeeded: data.unitsNeeded,
      urgencyLevel: data.urgencyLevel,
      location: data.location,
      city: data.city,
      radiusKm: data.radiusKm || 10,
      reason: data.reason,
      patientName: data.patientName,
      patientAge: data.patientAge,
      unitsFulfilled: 0,
      escalationLevel: 0,
      status: RequestStatus.SUBMITTED,
    });

    // Fire & Forget: Find matching donors
    this.findMatchesForRequest(request._id.toString());

    return request;
  }

  async findMatchesForRequest(requestId: string): Promise<void> {
    const request = await Request.findById(requestId);
    if (!request) return;

    // Simplified geonear matching
    const matchingDonors = await DonorProfile.find({
      bloodGroup: request.bloodGroup, // Exact match for simplicity, can expand to compatible types
      isAvailable: true,
      location: {
        $near: {
          $geometry: request.location,
          $maxDistance: request.radiusKm * 1000 // Convert km to meters
        }
      }
    }).limit(20);

    const matches = matchingDonors.map(donor => ({
      donorId: donor.userId,
      donorName: 'Anonymous Donor',
      status: DonorMatchStatus.NOTIFIED,
      notifiedAt: new Date()
    }));

    if (matches.length > 0) {
      request.matchedDonors = matches;
      await request.save();

      // Emit real-time socket events
      matches.forEach(match => {
        io.of('/notifications').to(match.donorId).emit('new_blood_request', {
          requestId: request._id,
          bloodGroup: request.bloodGroup,
          urgency: request.urgencyLevel,
          distance: 'Nearby' // Calculate actual distance
        });
      });
    }
  }

  async getNearbyRequests(city: string, limit: number = 10): Promise<IRequestDocument[]> {
    return Request.find({ 
      city, 
      status: { $in: [RequestStatus.SUBMITTED, RequestStatus.MATCHING, RequestStatus.IN_PROGRESS] } 
    })
    .sort({ urgencyLevel: -1, createdAt: -1 })
    .limit(limit);
  }

  async updateRequestStatus(requestId: string, status: RequestStatus): Promise<IRequestDocument | null> {
    const request = await Request.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );
    if (request) {
      io.of('/requests').to(requestId).emit('status_update', { status: request.status });
    }
    return request;
  }
}

export const requestsService = new RequestsService();
