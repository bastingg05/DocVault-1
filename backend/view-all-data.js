const mongoose = require('mongoose');

async function viewAllData() {
  try {
    console.log('📊 Viewing all data in MongoDB Atlas...\n');
    
    const uri = process.env.MONGODB_URI || 'mongodb+srv://bastingg05:gladwin2@bastin0.zvpymix.mongodb.net/docvault?retryWrites=true&w=majority';
    
    console.log('Connecting to MongoDB...');
    console.log('URI:', uri.replace(/\/\/.*@/, '//***:***@')); // Hide credentials
    
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const dbName = db.databaseName;
    console.log('📊 Database:', dbName);
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('\n📁 Collections:');
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`  📄 ${collection.name}: ${count} documents`);
    }
    
    // Show users
    const users = await db.collection('users').find({}).toArray();
    console.log('\n👥 Users:');
    if (users.length === 0) {
      console.log('  No users found');
    } else {
      users.forEach((user, index) => {
        console.log(`  ${index + 1}. ${user.name} (${user.email})`);
        console.log(`     Created: ${user.createdAt || 'Unknown'}`);
      });
    }
    
    // Show documents
    const documents = await db.collection('documents').find({}).toArray();
    console.log('\n📄 Documents:');
    if (documents.length === 0) {
      console.log('  No documents found');
    } else {
      documents.forEach((doc, index) => {
        console.log(`  ${index + 1}. ${doc.name} (${doc.category})`);
        console.log(`     Owner: ${doc.userId || 'Unknown'}`);
        console.log(`     Created: ${doc.createdAt || 'Unknown'}`);
      });
    }
    
    // Database statistics
    console.log('\n📊 Database Statistics:');
    console.log(`  👥 Total users: ${users.length}`);
    console.log(`  📄 Total documents: ${documents.length}`);
    console.log(`  📁 Total collections: ${collections.length}`);
    
    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

viewAllData();