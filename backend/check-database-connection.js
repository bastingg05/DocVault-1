const mongoose = require('mongoose');

async function checkDatabaseConnection() {
  try {
    console.log('🔍 Checking which database your app is connected to...\n');
    
    // Your current connection string
    const MONGODB_URI = 'mongodb+srv://bastingg05:gladwin2@bastin0.zvpymix.mongodb.net/docvault?retryWrites=true&w=majority';
    
    console.log('1. Connecting to:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected successfully');
    
    const db = mongoose.connection.db;
    console.log(`📊 Connected to database: ${db.databaseName}`);
    
    // Check users in this database
    console.log('\n2. Checking users in this database...');
    const users = await db.collection('users').find({}).toArray();
    console.log(`   Users found: ${users.length}`);
    
    users.forEach((user, i) => {
      console.log(`   ${i+1}. ${user.email} (${user.name})`);
    });
    
    // Check documents in this database
    console.log('\n3. Checking documents in this database...');
    const documents = await db.collection('documents').find({}).toArray();
    console.log(`   Documents found: ${documents.length}`);
    
    console.log('\n🎯 ANALYSIS:');
    console.log(`Your app is connected to: ${db.databaseName}`);
    console.log('If you see different users in MongoDB Atlas,');
    console.log('your app might be using a different database than expected.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n📡 Database connection closed');
    process.exit(0);
  }
}

checkDatabaseConnection();
