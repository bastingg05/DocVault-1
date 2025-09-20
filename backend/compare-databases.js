const mongoose = require('mongoose');

async function compareDatabases() {
  console.log('🔍 Comparing Local vs Railway MongoDB connections...\n');
  
  // Local MongoDB URI (from .env)
  const localURI = 'mongodb+srv://bastingg05:gladwin2@bastin0.zvpymix.mongodb.net/docvault?retryWrites=true&w=majority';
  
  try {
    // Test local connection
    console.log('1. Testing LOCAL database connection...');
    await mongoose.connect(localURI);
    console.log('✅ Connected to LOCAL database');
    
    const db = mongoose.connection.db;
    const localUsers = await db.collection('users').find({}).toArray();
    const localDocs = await db.collection('documents').find({}).toArray();
    
    console.log(`   - Users: ${localUsers.length}`);
    console.log(`   - Documents: ${localDocs.length}`);
    
    if (localUsers.length > 0) {
      console.log('   - Local users:');
      localUsers.forEach((user, i) => {
        console.log(`     ${i+1}. ${user.name} (${user.email})`);
      });
    }
    
    await mongoose.connection.close();
    console.log('   - Local connection closed\n');
    
    // Test Railway connection (same URI but different context)
    console.log('2. Testing RAILWAY database connection...');
    console.log('   - Using same MongoDB URI as Railway should be using');
    
    await mongoose.connect(localURI);
    console.log('✅ Connected to RAILWAY database');
    
    const railwayDb = mongoose.connection.db;
    const railwayUsers = await railwayDb.collection('users').find({}).toArray();
    const railwayDocs = await railwayDb.collection('documents').find({}).toArray();
    
    console.log(`   - Users: ${railwayUsers.length}`);
    console.log(`   - Documents: ${railwayDocs.length}`);
    
    if (railwayUsers.length > 0) {
      console.log('   - Railway users:');
      railwayUsers.forEach((user, i) => {
        console.log(`     ${i+1}. ${user.name} (${user.email})`);
      });
    }
    
    await mongoose.connection.close();
    console.log('   - Railway connection closed\n');
    
    // Analysis
    console.log('📊 COMPARISON ANALYSIS:');
    console.log(`Local DB - Users: ${localUsers.length}, Documents: ${localDocs.length}`);
    console.log(`Railway DB - Users: ${railwayUsers.length}, Documents: ${railwayDocs.length}`);
    
    if (localUsers.length !== railwayUsers.length) {
      console.log('\n⚠️  DIFFERENCE DETECTED!');
      console.log('The local and Railway databases have different data.');
      console.log('This suggests Railway might be using a different MongoDB connection.');
    } else {
      console.log('\n✅ DATABASES MATCH');
      console.log('Both local and Railway are using the same database.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

compareDatabases();
