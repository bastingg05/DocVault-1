const mongoose = require('mongoose');

async function checkDocuvaultV2() {
  try {
    console.log('🔍 Checking docuvault-v2 database...\n');
    
    // Connect to docuvault-v2 database
    const MONGODB_URI = 'mongodb+srv://bastingg05:gladwin2@bastin0.zvpymix.mongodb.net/docuvault-v2?retryWrites=true&w=majority';
    
    console.log('1. Connecting to docuvault-v2...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to docuvault-v2');
    
    const db = mongoose.connection.db;
    console.log(`📊 Connected to database: ${db.databaseName}`);
    
    // Check users in docuvault-v2
    console.log('\n2. Checking users in docuvault-v2...');
    const users = await db.collection('users').find({}).toArray();
    console.log(`   Users found: ${users.length}`);
    
    users.forEach((user, i) => {
      console.log(`   ${i+1}. ${user.email} (${user.name})`);
    });
    
    // Check documents in docuvault-v2
    console.log('\n3. Checking documents in docuvault-v2...');
    const documents = await db.collection('documents').find({}).toArray();
    console.log(`   Documents found: ${documents.length}`);
    
    console.log('\n🎯 COMPARISON:');
    console.log('docvault database: 1 user (bastin2005@gmail.com)');
    console.log(`docuvault-v2 database: ${users.length} users`);
    
    if (users.length > 0) {
      console.log('\n🚨 FOUND THE ISSUE!');
      console.log('Your app is using "docvault" but some data is in "docuvault-v2"');
      console.log('This explains why users created on one device don\'t appear on the other!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n📡 Database connection closed');
    process.exit(0);
  }
}

checkDocuvaultV2();
