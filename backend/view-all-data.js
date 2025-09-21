const mongoose = require('mongoose');

// Direct connection to Railway MongoDB
const MONGODB_URI = 'mongodb+srv://bastingg05:gladwin2@bastin0.zvpymix.mongodb.net/docvault?retryWrites=true&w=majority';

async function viewAllData() {
  try {
    console.log('🗄️  Viewing All MongoDB Data...\n');
    
    console.log('1. Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    const db = mongoose.connection.db;
    
    // List all collections
    console.log('\n2. Available Collections:');
    const collections = await db.listCollections().toArray();
    collections.forEach((collection, i) => {
      console.log(`   ${i+1}. ${collection.name}`);
    });
    
    // View users collection
    console.log('\n3. 👥 USERS Collection:');
    const users = await db.collection('users').find({}).toArray();
    console.log(`   Total users: ${users.length}`);
    
    if (users.length > 0) {
      users.forEach((user, i) => {
        console.log(`   ${i+1}. Name: ${user.name}`);
        console.log(`      Email: ${user.email}`);
        console.log(`      ID: ${user._id}`);
        console.log(`      Created: ${user.createdAt || 'Unknown'}`);
        console.log('');
      });
    } else {
      console.log('   No users found');
    }
    
    // View documents collection
    console.log('4. 📄 DOCUMENTS Collection:');
    const documents = await db.collection('documents').find({}).toArray();
    console.log(`   Total documents: ${documents.length}`);
    
    if (documents.length > 0) {
      documents.forEach((doc, i) => {
        console.log(`   ${i+1}. Title: ${doc.title || 'Untitled'}`);
        console.log(`      Filename: ${doc.filename || 'Unknown'}`);
        console.log(`      User: ${doc.userId || 'Unknown'}`);
        console.log(`      Size: ${doc.size || 'Unknown'} bytes`);
        console.log(`      Created: ${doc.createdAt || 'Unknown'}`);
        console.log('');
      });
    } else {
      console.log('   No documents found');
    }
    
    // Database stats
    console.log('5. 📊 Database Statistics:');
    const stats = await db.stats();
    console.log(`   Database name: ${stats.db}`);
    console.log(`   Collections: ${stats.collections}`);
    console.log(`   Data size: ${(stats.dataSize / 1024).toFixed(2)} KB`);
    console.log(`   Storage size: ${(stats.storageSize / 1024).toFixed(2)} KB`);
    
    console.log('\n🌐 MongoDB Atlas Dashboard:');
    console.log('   URL: https://cloud.mongodb.com/');
    console.log('   Cluster: bastin0');
    console.log('   Database: docvault');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n📡 Database connection closed');
    process.exit(0);
  }
}

viewAllData();
