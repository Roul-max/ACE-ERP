import express from 'express';
import { sendNotification, getMyNotifications, markRead } from '../controllers/notification.controller';
import { protect, authorize } from '../middleware/auth.middleware';

const router = express.Router();

router.use(protect);

router.post('/', authorize('admin'), sendNotification);
router.get('/', getMyNotifications);
router.put('/:id/read', markRead);

export default router;