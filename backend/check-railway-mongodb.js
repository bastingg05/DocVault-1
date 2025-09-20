const axios = require('axios');

async function checkRailwayMongoDB() {
  try {
    const API_BASE = 'https://docvault-1-production.up.railway.app';
    
    console.log('🔍 Checking Railway MongoDB configuration...\n');
    
    // Check health endpoint for any database info
    console.log('1. Checking health endpoint...');
    try {
      const healthResponse = await axios.get(`${API_BASE}/health`);
      console.log('Health response:', healthResponse.data);
    } catch (error) {
      console.log('Health endpoint error:', error.message);
    }
    
    // Check if there's a debug endpoint for database info
    console.log('\n2. Checking for database debug endpoint...');
    try {
      const debugResponse = await axios.get(`${API_BASE}/api/auth/debug/users`);
      console.log('Debug users response:', debugResponse.data);
      
      if (debugResponse.data.users && debugResponse.data.users.length > 0) {
        console.log('\n📊 Database Analysis:');
        console.log(`- Total users: ${debugResponse.data.count}`);
        console.log('- User details:');
        debugResponse.data.users.forEach((user, index) => {
          console.log(`  ${index + 1}. Name: ${user.name}`);
          console.log(`     Email: ${user.email}`);
          console.log(`     ID: ${user._id}`);
          console.log(`     Created: ${new Date(user._id.toString().substring(0, 8), 16)}`);
        });
      }
    } catch (error) {
      console.log('Debug endpoint error:', error.message);
    }
    
    // Check if we can get any environment info
    console.log('\n3. Checking for environment info...');
    try {
      const envResponse = await axios.get(`${API_BASE}/api/debug/env`);
      console.log('Environment info:', envResponse.data);
    } catch (error) {
      console.log('Environment endpoint not available');
    }
    
    console.log('\n🔍 Analysis Summary:');
    console.log('- If users exist in Railway but not in your local database,');
    console.log('  Railway is likely using a different MongoDB connection');
    console.log('- Check Railway environment variables in your dashboard');
    console.log('- Compare MONGODB_URI between local .env and Railway settings');
    
  } catch (error) {
    console.error('❌ Error checking Railway MongoDB:', error.message);
  }
}

checkRailwayMongoDB();
