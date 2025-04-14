import { ObjectId } from 'mongoose';

export interface INotification {
  _id?: string;
  user: ObjectId;
  content: string;
  isRead?: boolean;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
}
