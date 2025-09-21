const mongoose = require('mongoose');

async function checkDocuvaultV2() {
  try {
    // Connect to the docuvault-v2 database specifically
    const uri = 'mongodb+srv://bastingg05:gladwin2@bastin0.zvpymix.mongodb.net/docuvault-v2?retryWrites=true&w=majority';
    
    console.log('Connecting to docuvault-v2 database...');
    console.log('URI:', uri.replace(/\/\/.*@/, '//***:***@')); // Hide credentials
    
    await mongoose.connect(uri);
    console.log('✅ Connected to docuvault-v2 database');
    
    const db = mongoose.connection.db;
    const dbName = db.databaseName;
    console.log('📊 Database name:', dbName);
    
    // List all collections
    const collections = await db.listCollections().toArray();
    console.log('📁 Collections in docuvault-v2:', collections.map(c => c.name));
    
    // Check each collection for documents
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`📄 ${collection.name}: ${count} documents`);
    }
    
    // Check if database is empty
    const totalCollections = collections.length;
    const totalDocuments = await Promise.all(
      collections.map(c => db.collection(c.name).countDocuments())
    );
    const totalDocs = totalDocuments.reduce((sum, count) => sum + count, 0);
    
    console.log('\n📊 Summary:');
    console.log(`  - Collections: ${totalCollections}`);
    console.log(`  - Total documents: ${totalDocs}`);
    
    if (totalDocs === 0) {
      console.log('✅ Database is empty - safe to delete');
    } else {
      console.log('⚠️  Database contains data - review before deletion');
    }
    
    await mongoose.disconnect();
    console.log('✅ Disconnected from docuvault-v2');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkDocuvaultV2();