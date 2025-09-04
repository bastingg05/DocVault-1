const mongoose = require('mongoose');

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/docuvault';
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { autoIndex: true });
  console.log('MongoDB connected');
}

module.exports = { connectToDatabase };



