import mongoose from 'mongoose';
import { z } from 'zod';

export const notificationSchema = z.object({
  user: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid MongoDB ObjectId',
  }),
  content: z.string().min(1, 'Content is required'),
  type: z.string().min(1, 'Notification type is required'),
});

export type NotificationSchema = z.infer<typeof notificationSchema>;
