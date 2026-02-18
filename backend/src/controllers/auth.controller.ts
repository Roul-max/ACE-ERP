import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret_key', {
    expiresIn: '30d',
  });
};

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id as unknown as string),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req: any, res: any) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const updateProfile = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        token: generateToken(updatedUser._id as unknown as string),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Forgot Password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
export const forgotPassword = async (req: any, res: any) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            // We return 200 to prevent email enumeration
            return res.status(200).json({ message: 'Email sent' });
        }

        // Get reset token
        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        // Create reset url
        // In production, this points to your frontend URL
        const resetUrl = `${req.protocol}://${req.get('host')}/#/reset-password/${resetToken}`; 
        
        // Mock sending email
        console.log('====================================');
        console.log(`Password Reset Link for ${email}:`);
        console.log(resetUrl);
        console.log('====================================');

        res.status(200).json({ message: 'Email sent' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Reset Password
// @route   PUT /api/v1/auth/reset-password/:resettoken
// @access  Public
export const resetPassword = async (req: any, res: any) => {
  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.resettoken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id as unknown as string),
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Redirect to Google Auth
// @route   GET /api/v1/auth/google
// @access  Public
export const googleAuth = (req: any, res: any) => {
  // Simulator: Immediately redirect to callback with mock code
  res.redirect('/api/v1/auth/google/callback?code=mock_code_123');
};

// @desc    Google Auth Callback
// @route   GET /api/v1/auth/google/callback
// @access  Public
export const googleCallback = async (req: any, res: any) => {
  try {
    // Mocking finding/creating a user
    let user = await User.findOne({ email: 'googleuser@university.com' });
    
    if (!user) {
      user = await User.create({
        name: 'Google User',
        email: 'googleuser@university.com',
        password: crypto.randomBytes(10).toString('hex'), // Random password
        role: 'student'
      });
    }

    const token = generateToken(user._id as unknown as string);

    // Redirect to frontend with token
    res.redirect(`http://localhost:5173/#/login?token=${token}`);
  } catch (error) {
    res.redirect(`http://localhost:5173/#/login?error=Google_Auth_Failed`);
  }
};
