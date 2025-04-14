import mongoose from 'mongoose';
import { INotification } from '../interface/notification.inteface';

const notificationSchema = new mongoose.Schema<INotification>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: String,
    isRead: { type: Boolean, default: false },
    type: String,
  },
  {
    timestamps: true,
  },
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
