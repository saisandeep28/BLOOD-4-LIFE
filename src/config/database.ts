import mongoose from 'mongoose';
import { config } from './index';

// Disable buffering so Mongoose doesn't freeze for 10 seconds if MongoDB is disconnected
mongoose.set('bufferCommands', false);

export const connectDB = async (): Promise<void> => {
  try {
    console.log(`Connecting to MongoDB at ${config.mongoUri}...`);
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`MongoDB Connected successfully`);
  } catch (error) {
    console.error(`Error connecting to MongoDB:`, error);
    console.warn(`⚠ API server will operate with in-memory fallback mode.`);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error', err);
});
