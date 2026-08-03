import { BloodGroup } from '@life-for-all/types';
export declare class SearchService {
    searchFacilities(lat: number, lng: number, radiusKm: number, type?: 'blood_bank' | 'hospital'): Promise<any>;
    searchDonors(bloodGroup: BloodGroup, lat: number, lng: number, radiusKm: number): Promise<any>;
}
export declare const searchService: SearchService;
