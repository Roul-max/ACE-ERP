import express from 'express';
import { 
  login, 
  getMe, 
  updateProfile, 
  forgotPassword, 
  resetPassword,
  googleAuth,
  googleCallback
} from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resettoken', resetPassword);

// OAuth
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

// Protected
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

export default router;