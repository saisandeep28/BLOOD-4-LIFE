import { IRequestDocument } from '../../models';
import { RequestStatus } from '@life-for-all/types';
export declare class RequestsService {
    createRequest(data: any, userId: string, role: string): Promise<IRequestDocument>;
    findMatchesForRequest(requestId: string): Promise<void>;
    getNearbyRequests(city: string, limit?: number): Promise<IRequestDocument[]>;
    updateRequestStatus(requestId: string, status: RequestStatus): Promise<IRequestDocument | null>;
}
export declare const requestsService: RequestsService;
