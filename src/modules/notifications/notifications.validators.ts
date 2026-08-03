import { z } from 'zod';
import { NotificationType, NotificationChannel } from '@life-for-all/types';

export const broadcastSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    message: z.string().min(1),
    type: z.nativeEnum(NotificationType).default(NotificationType.BROADCAST),
    channel: z.nativeEnum(NotificationChannel).default(NotificationChannel.IN_APP),
    targetRoles: z.array(z.string()).optional(),
  })
});
