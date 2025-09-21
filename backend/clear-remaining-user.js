const axios = require('axios');

async function clearRemainingUser() {
  try {
    const API_BASE = 'https://docvault-1-production.up.railway.app';
    
    console.log('🗑️  Clearing remaining user from Railway database...\n');
    
    // Check current users
    console.log('1. Checking current users...');
    const usersResponse = await axios.get(`${API_BASE}/api/auth/debug/users`);
    console.log(`Found ${usersResponse.data.count} users:`);
    usersResponse.data.users.forEach((user, i) => {
      console.log(`   ${i+1}. ${user.email} (${user.name})`);
    });
    
    if (usersResponse.data.count > 0) {
      console.log('\n2. Clearing all users...');
      
      // Since we don't have a direct delete endpoint, we'll need to use the database directly
      console.log('⚠️  Note: We need to clear the database directly since there\'s no delete endpoint');
      console.log('This will require connecting to the MongoDB database');
      
      // Let's try to create a simple delete script
      console.log('\n3. Creating database cleanup script...');
      
    } else {
      console.log('✅ Database is already clean!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

clearRemainingUser();
