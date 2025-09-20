const mongoose = require('mongoose');

// Direct connection to Railway MongoDB
const MONGODB_URI = 'mongodb+srv://bastingg05:gladwin2@bastin0.zvpymix.mongodb.net/docvault?retryWrites=true&w=majority';

async function clearRailwayDatabase() {
  try {
    console.log('Connecting to Railway MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to Railway database successfully');

    // Get the database
    const db = mongoose.connection.db;
    
    // Clear users collection
    console.log('Clearing users collection...');
    const userResult = await db.collection('users').deleteMany({});
    console.log(`Deleted ${userResult.deletedCount} users`);

    // Clear documents collection
    console.log('Clearing documents collection...');
    const docResult = await db.collection('documents').deleteMany({});
    console.log(`Deleted ${docResult.deletedCount} documents`);

    console.log('✅ Railway database cleanup completed successfully!');
    console.log('All user data and documents have been removed from Railway database.');

  } catch (error) {
    console.error('❌ Error during Railway database cleanup:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
}

clearRailwayDatabase();
