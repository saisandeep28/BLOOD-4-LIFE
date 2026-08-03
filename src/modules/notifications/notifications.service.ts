import { Notification, INotificationDocument, User } from '../../models';
import { NotificationStatus, UserRole } from '@life-for-all/types';
import { io } from '../../index';

export class NotificationsService {
  async getUserNotifications(userId: string): Promise<INotificationDocument[]> {
    return Notification.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);
  }

  async markAsRead(id: string, userId: string): Promise<INotificationDocument | null> {
    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId },
      { status: NotificationStatus.READ, readAt: new Date() },
      { new: true }
    );
    return notification;
  }

  async broadcast(data: any): Promise<void> {
    const { title, message, type, channel, targetRoles } = data;
    
    // Find target users
    let query = {};
    if (targetRoles && targetRoles.length > 0) {
      query = { role: { $in: targetRoles } };
    }
    
    const users = await User.find(query).select('_id');
    
    // Create notifications in DB
    const notifications = users.map(user => ({
      userId: user._id,
      title,
      message,
      type,
      channel,
      status: NotificationStatus.SENT,
      sentAt: new Date()
    }));
    
    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
      
      // Emit via socket if IN_APP
      if (channel === 'in_app' || !channel) {
        // Emit to a general broadcast room or individual rooms depending on scale
        // For simple scale:
        io.of('/notifications').emit('broadcast', {
          title,
          message,
          type,
          createdAt: new Date()
        });
      }
    }
  }
}

export const notificationsService = new NotificationsService();
