const mongoose = require('mongoose');

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/docuvault';
  
  // Check if we're in production and MongoDB URI is not set
  if (process.env.NODE_ENV === 'production' && !process.env.MONGODB_URI) {
    console.error('MONGODB_URI environment variable is required in production');
    throw new Error('MONGODB_URI environment variable is required in production');
  }
  
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri, { autoIndex: true });
    console.log('MongoDB connected successfully');
    console.log('MongoDB URI:', uri.replace(/\/\/.*@/, '//***:***@')); // Hide credentials in logs
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
}

module.exports = { connectToDatabase };



