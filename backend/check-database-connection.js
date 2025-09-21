const mongoose = require('mongoose');

async function checkDatabaseConnection() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb+srv://bastingg05:gladwin2@bastin0.zvpymix.mongodb.net/docvault?retryWrites=true&w=majority';
    
    console.log('Connecting to MongoDB...');
    console.log('URI:', uri.replace(/\/\/.*@/, '//***:***@')); // Hide credentials
    
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB successfully');
    
    // Check which database we're connected to
    const db = mongoose.connection.db;
    const dbName = db.databaseName;
    console.log('📊 Database name:', dbName);
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));
    
    // Check users collection
    const users = await db.collection('users').find({}).toArray();
    console.log('👥 Users count:', users.length);
    
    // Check documents collection
    const documents = await db.collection('documents').find({}).toArray();
    console.log('📄 Documents count:', documents.length);
    
    // Show sample users
    if (users.length > 0) {
      console.log('👤 Sample users:');
      users.slice(0, 3).forEach(user => {
        console.log(`  - ${user.name} (${user.email})`);
      });
    }
    
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkDatabaseConnection();