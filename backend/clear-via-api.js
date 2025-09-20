const axios = require('axios');

async function clearDataViaAPI() {
  try {
    const API_BASE = 'https://docvault-1-production.up.railway.app';
    
    console.log('Checking current users...');
    const usersResponse = await axios.get(`${API_BASE}/api/auth/debug/users`);
    console.log('Current users:', usersResponse.data);
    
    if (usersResponse.data.count > 0) {
      console.log('Found users in database. The Railway backend might be using a different database connection.');
      console.log('You may need to:');
      console.log('1. Check Railway environment variables');
      console.log('2. Restart the Railway service');
      console.log('3. Or manually clear the database through Railway dashboard');
    } else {
      console.log('✅ Database is already clean!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

clearDataViaAPI();
