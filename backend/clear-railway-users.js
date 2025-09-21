const mongoose = require('mongoose');

// Direct connection to Railway MongoDB
const MONGODB_URI = 'mongodb+srv://bastingg05:gladwin2@bastin0.zvpymix.mongodb.net/docvault?retryWrites=true&w=majority';

async function clearRailwayUsers() {
  try {
    console.log('🗑️  Clearing all users from Railway database...\n');
    
    console.log('1. Connecting to Railway MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to Railway database');
    
    // Get the database
    const db = mongoose.connection.db;
    
    // Check current users
    console.log('\n2. Checking current users...');
    const users = await db.collection('users').find({}).toArray();
    console.log(`Found ${users.length} users:`);
    users.forEach((user, i) => {
      console.log(`   ${i+1}. ${user.email} (${user.name})`);
    });
    
    if (users.length > 0) {
      console.log('\n3. Clearing all users...');
      const deleteResult = await db.collection('users').deleteMany({});
      console.log(`✅ Deleted ${deleteResult.deletedCount} users`);
      
      // Clear documents too
      console.log('\n4. Clearing all documents...');
      const docResult = await db.collection('documents').deleteMany({});
      console.log(`✅ Deleted ${docResult.deletedCount} documents`);
      
      console.log('\n🎉 Railway database is now completely clean!');
    } else {
      console.log('✅ Database is already clean!');
    }
    
  } catch (error) {
    console.error('❌ Error clearing users:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n📡 Database connection closed');
    process.exit(0);
  }
}

clearRailwayUsers();
