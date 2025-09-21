const mongoose = require('mongoose');

async function cleanupDatabases() {
  try {
    console.log('🧹 Cleaning up databases - keeping only one...\n');
    
    // First, let's check what's in each database
    console.log('1. Checking docvault database...');
    const docvaultURI = 'mongodb+srv://bastingg05:gladwin2@bastin0.zvpymix.mongodb.net/docvault?retryWrites=true&w=majority';
    await mongoose.connect(docvaultURI);
    const docvaultDb = mongoose.connection.db;
    
    const docvaultUsers = await docvaultDb.collection('users').find({}).toArray();
    const docvaultDocs = await docvaultDb.collection('documents').find({}).toArray();
    
    console.log(`   Users: ${docvaultUsers.length}`);
    console.log(`   Documents: ${docvaultDocs.length}`);
    
    await mongoose.connection.close();
    
    console.log('\n2. Checking docuvault-v2 database...');
    const docuvaultV2URI = 'mongodb+srv://bastingg05:gladwin2@bastin0.zvpymix.mongodb.net/docuvault-v2?retryWrites=true&w=majority';
    await mongoose.connect(docuvaultV2URI);
    const docuvaultV2Db = mongoose.connection.db;
    
    const docuvaultV2Users = await docuvaultV2Db.collection('users').find({}).toArray();
    const docuvaultV2Docs = await docuvaultV2Db.collection('documents').find({}).toArray();
    
    console.log(`   Users: ${docuvaultV2Users.length}`);
    console.log(`   Documents: ${docuvaultV2Docs.length}`);
    
    await mongoose.connection.close();
    
    console.log('\n3. Database Analysis:');
    console.log(`   docvault: ${docvaultUsers.length} users, ${docvaultDocs.length} documents`);
    console.log(`   docuvault-v2: ${docuvaultV2Users.length} users, ${docuvaultV2Docs.length} documents`);
    
    if (docuvaultV2Users.length === 0 && docuvaultV2Docs.length === 0) {
      console.log('\n✅ docuvault-v2 is empty - safe to delete');
      console.log('🎯 RECOMMENDATION: Delete docuvault-v2 database in MongoDB Atlas');
      console.log('\n📋 Steps to delete docuvault-v2:');
      console.log('1. Go to MongoDB Atlas dashboard');
      console.log('2. Find the docuvault-v2 database');
      console.log('3. Click the trash/delete icon');
      console.log('4. Confirm deletion');
      console.log('\n✅ Your app will continue using docvault database');
    } else {
      console.log('\n⚠️  docuvault-v2 has data - manual review needed');
      console.log('Check if you need to migrate any data from docuvault-v2 to docvault');
    }
    
    console.log('\n🎯 FINAL RESULT:');
    console.log('✅ Keep: docvault (your active database)');
    console.log('❌ Delete: docuvault-v2 (empty database)');
    console.log('🔧 Your app will continue working with docvault only');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    console.log('\n📡 Database connection closed');
    process.exit(0);
  }
}

cleanupDatabases();
