import express from 'express';
import { isAuthenticatedUser } from '../middleware/authGuard';
import {
  createNotification,
  getNotifications,
} from '../controllers/notification.controller';
import validateRequest from '../middleware/validateRequest';
import { notificationSchema } from '../validation/notification.validation';
const router = express.Router();

router.post(
  '/create',
  isAuthenticatedUser,
  validateRequest(notificationSchema),
  createNotification,
);
router.get('/', isAuthenticatedUser, getNotifications);

export default router;
