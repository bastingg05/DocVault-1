const mongoose = require('mongoose');

async function analyzeDatabases() {
  try {
    console.log('🔍 Analyzing MongoDB databases...\n');
    
    // Check main docvault database
    console.log('📊 Checking main docvault database...');
    const mainUri = 'mongodb+srv://bastingg05:gladwin2@bastin0.zvpymix.mongodb.net/docvault?retryWrites=true&w=majority';
    
    await mongoose.connect(mainUri);
    const mainDb = mongoose.connection.db;
    const mainCollections = await mainDb.listCollections().toArray();
    
    let mainTotalDocs = 0;
    for (const collection of mainCollections) {
      const count = await mainDb.collection(collection.name).countDocuments();
      mainTotalDocs += count;
      console.log(`  📄 ${collection.name}: ${count} documents`);
    }
    
    console.log(`  📊 Total documents in docvault: ${mainTotalDocs}\n`);
    await mongoose.disconnect();
    
    // Check docuvault-v2 database
    console.log('📊 Checking docuvault-v2 database...');
    const v2Uri = 'mongodb+srv://bastingg05:gladwin2@bastin0.zvpymix.mongodb.net/docuvault-v2?retryWrites=true&w=majority';
    
    await mongoose.connect(v2Uri);
    const v2Db = mongoose.connection.db;
    const v2Collections = await v2Db.listCollections().toArray();
    
    let v2TotalDocs = 0;
    for (const collection of v2Collections) {
      const count = await v2Db.collection(collection.name).countDocuments();
      v2TotalDocs += count;
      console.log(`  📄 ${collection.name}: ${count} documents`);
    }
    
    console.log(`  📊 Total documents in docuvault-v2: ${v2TotalDocs}\n`);
    await mongoose.disconnect();
    
    // Analysis and recommendations
    console.log('🎯 Analysis and Recommendations:');
    console.log('================================');
    
    if (v2TotalDocs === 0) {
      console.log('✅ docuvault-v2 is empty - SAFE TO DELETE');
      console.log('   This database contains no data and can be safely removed.');
    } else {
      console.log('⚠️  docuvault-v2 contains data - REVIEW BEFORE DELETION');
      console.log('   Consider backing up data before deletion.');
    }
    
    if (mainTotalDocs > 0) {
      console.log('✅ docvault (main) contains data - KEEP THIS DATABASE');
      console.log('   This is your active database with user data.');
    } else {
      console.log('⚠️  docvault (main) is empty - CHECK YOUR APPLICATION');
      console.log('   Make sure your app is connecting to the right database.');
    }
    
    console.log('\n📋 Next Steps:');
    console.log('1. Delete docuvault-v2 database in MongoDB Atlas dashboard');
    console.log('2. Verify your app uses the docvault database');
    console.log('3. Test your application to ensure everything works');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

analyzeDatabases();