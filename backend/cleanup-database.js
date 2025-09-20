const mongoose = require('mongoose');
const User = require('./src/models/User');
const Document = require('./src/models/Document');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

async function cleanupDatabase() {
  try {
    // Connect to database - use Railway MongoDB URI
    const uri = process.env.MONGODB_URI || 'mongodb+srv://bastingg05:gladwin2@bastin0.zvpymix.mongodb.net/docvault?retryWrites=true&w=majority';
    console.log('Connecting to database...');
    await mongoose.connect(uri);
    console.log('Connected to database successfully');

    // Clear all users
    console.log('Clearing all users...');
    const userResult = await User.deleteMany({});
    console.log(`Deleted ${userResult.deletedCount} users`);

    // Clear all documents
    console.log('Clearing all documents...');
    const docResult = await Document.deleteMany({});
    console.log(`Deleted ${docResult.deletedCount} documents`);

    // Clear uploads directory
    console.log('Clearing uploads directory...');
    const uploadsDir = path.join(__dirname, 'uploads');
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      for (const file of files) {
        if (file !== '.gitkeep') { // Keep .gitkeep file
          fs.unlinkSync(path.join(uploadsDir, file));
          console.log(`Deleted file: ${file}`);
        }
      }
      console.log(`Cleared ${files.length} files from uploads directory`);
    }

    console.log('✅ Database cleanup completed successfully!');
    console.log('All user data, documents, and uploaded files have been removed.');

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
}

// Run cleanup
cleanupDatabase();
