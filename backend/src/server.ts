import app from './app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from './config/logger';
import User from './models/User';

dotenv.config();

const PORT = process.env.PORT || 5000;
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

const MONGO_URI = process.env.MONGO_URI;

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    logger.info('Connected to MongoDB');

    // Seed Admin User if not exists
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        name: 'System Admin',
        email: 'admin@university.com',
        password: 'admin123', // Will be hashed by pre-save hook
        role: 'admin',
        isActive: true
      });
      logger.info('Admin user seeded: admin@university.com / admin123');
    }

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    (process as any).exit(1);
  }
};

startServer();