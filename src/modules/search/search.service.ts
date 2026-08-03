import { BloodBank, Hospital, DonorProfile } from '../../models';
import { BloodGroup } from '@life-for-all/types';

export class SearchService {
  async searchFacilities(lat: number, lng: number, radiusKm: number, type?: 'blood_bank' | 'hospital'): Promise<any> {
    const query: any = {
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: radiusKm * 1000
        }
      }
    };

    let results: any[] = [];
    
    if (!type || type === 'blood_bank') {
      const banks = await BloodBank.find(query).limit(20);
      results = [...results, ...banks.map(b => ({ ...b.toObject(), facilityType: 'blood_bank' }))];
    }
    
    if (!type || type === 'hospital') {
      const hospitals = await Hospital.find(query).limit(20);
      results = [...results, ...hospitals.map(h => ({ ...h.toObject(), facilityType: 'hospital' }))];
    }

    return results;
  }

  async searchDonors(bloodGroup: BloodGroup, lat: number, lng: number, radiusKm: number): Promise<any> {
    const donors = await DonorProfile.find({
      bloodGroup,
      isAvailable: true,
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: radiusKm * 1000
        }
      }
    }).limit(50).populate('userId', 'name avatar role');

    return donors;
  }
}

export const searchService = new SearchService();
