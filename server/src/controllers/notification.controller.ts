import { Request, Response, NextFunction, RequestHandler } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/AppError';
import httpStatus from 'http-status';
import Notification from '../models/notification.model';
import { io } from '../utils/socket';

export const createNotification: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user, content, type } = req.body;
    const notification = await Notification.create({
      user,
      content,
      type,
    });
    if (!notification) {
      throw next(
        new AppError(httpStatus.BAD_REQUEST, 'Notification not created'),
      );
    }
    // Emit the notification to the specific user's room
    io.to(user).emit('notification', notification);

    res.status(httpStatus.OK).json({
      success: true,
      data: notification,
      message: 'Notification created successfully',
    });
  },
);
export const getNotifications: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const notifications = await Notification.find({ user: req.user._id });
    if (!notifications) {
      throw next(
        new AppError(httpStatus.BAD_REQUEST, 'No notifications found'),
      );
    }
    res.status(httpStatus.OK).json({
      success: true,
      data: notifications,
      message: 'Notifications retrieved successfully',
    });
  },
);
