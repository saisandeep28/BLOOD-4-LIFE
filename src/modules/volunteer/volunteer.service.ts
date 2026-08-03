import { VolunteerTask, IVolunteerTaskDocument } from '../../models';
import { VolunteerTaskStatus } from '@life-for-all/types';

export class VolunteerService {
  async getTasks(city?: string, status?: VolunteerTaskStatus, lat?: number, lng?: number, radiusKm: number = 10): Promise<IVolunteerTaskDocument[]> {
    let query: any = {};
    
    if (status) {
      query.status = status;
    } else {
      query.status = VolunteerTaskStatus.PENDING; // Default to pending
    }

    if (lat && lng) {
      query.location = {
        $near: {
          $geometry: { type: 'Point', coordinates: [lng, lat] },
          $maxDistance: radiusKm * 1000
        }
      };
    } else if (city) {
      query.city = city;
    }
    
    return VolunteerTask.find(query).sort({ createdAt: -1 }).limit(50);
  }

  async acceptTask(taskId: string, volunteerId: string): Promise<IVolunteerTaskDocument> {
    const task = await VolunteerTask.findOneAndUpdate(
      { _id: taskId, status: VolunteerTaskStatus.PENDING },
      { 
        volunteerId, 
        status: VolunteerTaskStatus.ACCEPTED,
        acceptedAt: new Date()
      },
      { new: true }
    );
    
    if (!task) {
      throw { statusCode: 404, code: 'NOT_FOUND', message: 'Task not found or already accepted' };
    }
    
    return task;
  }

  async updateTaskStatus(taskId: string, volunteerId: string, status: VolunteerTaskStatus, notes?: string): Promise<IVolunteerTaskDocument> {
    const task = await VolunteerTask.findOne({ _id: taskId });
    
    if (!task) {
      throw { statusCode: 404, code: 'NOT_FOUND', message: 'Task not found' };
    }
    
    if (task.volunteerId !== volunteerId) {
      throw { statusCode: 403, code: 'FORBIDDEN', message: 'You are not assigned to this task' };
    }
    
    task.status = status;
    if (notes) task.notes = notes;
    
    if (status === VolunteerTaskStatus.COMPLETED) {
      task.completedAt = new Date();
    }
    
    await task.save();
    return task;
  }
}

export const volunteerService = new VolunteerService();
