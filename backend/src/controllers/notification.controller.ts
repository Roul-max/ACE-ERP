import { Request, Response } from 'express';
import Notification from '../models/Notification';
import User from '../models/User';

export const sendNotification = async (req: any, res: any) => {
  try {
    const { recipientId, title, message, type } = req.body;
    
    // If recipientId is provided, send to specific user
    // If not, it could be a broadcast (simplified here to require recipient or separate broadcast logic)
    
    if (!recipientId) {
        // Broadcast example: send to all users
        const users = await User.find({ isActive: true });
        const notifications = users.map(user => ({
            recipient: user._id,
            title,
            message,
            type
        }));
        await Notification.insertMany(notifications);
        return res.status(201).json({ message: `Sent to ${users.length} users` });
    }

    const notification = await Notification.create({
      recipient: recipientId,
      title,
      message,
      type
    });
    
    res.status(201).json(notification);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyNotifications = async (req: any, res: any) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id }).sort('-createdAt');
    res.json(notifications);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const markRead = async (req: any, res: any) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { read: true });
        res.json({ success: true });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}