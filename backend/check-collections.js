const mongoose = require('mongoose');

// Direct connection to Railway MongoDB
const MONGODB_URI = 'mongodb+srv://bastingg05:gladwin2@bastin0.zvpymix.mongodb.net/docvault?retryWrites=true&w=majority';

async function checkCollections() {
  try {
    console.log('Connecting to Railway MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to Railway database successfully');

    // Get the database
    const db = mongoose.connection.db;
    
    // List all collections
    console.log('Checking collections...');
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));

    // Check each collection for documents
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`Collection '${collection.name}': ${count} documents`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
}

checkCollections();
