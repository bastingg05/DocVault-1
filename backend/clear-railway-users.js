const mongoose = require('mongoose');

async function clearRailwayUsers() {
  try {
    console.log('🗑️  Clearing all users from Railway database...');
    
    const uri = process.env.MONGODB_URI || 'mongodb+srv://bastingg05:gladwin2@bastin0.zvpymix.mongodb.net/docvault?retryWrites=true&w=majority';
    
    console.log('Connecting to MongoDB...');
    console.log('URI:', uri.replace(/\/\/.*@/, '//***:***@')); // Hide credentials
    
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const dbName = db.databaseName;
    console.log('📊 Database:', dbName);
    
    // Clear users collection
    const usersResult = await db.collection('users').deleteMany({});
    console.log(`👥 Deleted ${usersResult.deletedCount} users`);
    
    // Clear documents collection
    const documentsResult = await db.collection('documents').deleteMany({});
    console.log(`📄 Deleted ${documentsResult.deletedCount} documents`);
    
    // Clear any other collections that might exist
    const collections = await db.listCollections().toArray();
    for (const collection of collections) {
      if (collection.name !== 'users' && collection.name !== 'documents') {
        const result = await db.collection(collection.name).deleteMany({});
        if (result.deletedCount > 0) {
          console.log(`🗑️  Deleted ${result.deletedCount} documents from ${collection.name}`);
        }
      }
    }
    
    // Verify cleanup
    const remainingUsers = await db.collection('users').countDocuments();
    const remainingDocs = await db.collection('documents').countDocuments();
    
    console.log('\n📊 Cleanup Summary:');
    console.log(`  👥 Remaining users: ${remainingUsers}`);
    console.log(`  📄 Remaining documents: ${remainingDocs}`);
    
    if (remainingUsers === 0 && remainingDocs === 0) {
      console.log('✅ Database successfully cleared!');
    } else {
      console.log('⚠️  Some data may still remain');
    }
    
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

clearRailwayUsers();