const axios = require('axios');

async function debugRailwayConnection() {
  try {
    const API_BASE = 'https://docvault-1-production.up.railway.app';
    
    console.log('🔍 Debugging Railway Connection Issues...\n');
    
    // Check if there are multiple databases or collections
    console.log('1. Checking if Railway is using a different database name...');
    
    // Try to get more detailed info about the database
    console.log('2. Checking Railway logs for database connection info...');
    console.log('   - Go to Railway dashboard');
    console.log('   - Check the logs for MongoDB connection messages');
    console.log('   - Look for "MongoDB connected successfully" messages');
    
    // Check if there's a database name mismatch
    console.log('\n3. Possible issues:');
    console.log('   a) Railway might be using a different database name');
    console.log('   b) Railway might be using a different MongoDB cluster');
    console.log('   c) Railway environment variables might be different');
    console.log('   d) Railway might be caching the old database connection');
    
    // Check current users again
    console.log('\n4. Current Railway API response:');
    const usersResponse = await axios.get(`${API_BASE}/api/auth/debug/users`);
    console.log('   Users count:', usersResponse.data.count);
    console.log('   Users:', usersResponse.data.users);
    
    console.log('\n5. RECOMMENDED ACTIONS:');
    console.log('   a) Check Railway environment variables in dashboard');
    console.log('   b) Restart Railway service to clear any cached connections');
    console.log('   c) Verify MONGODB_URI in Railway matches your local .env');
    console.log('   d) Check if Railway is using a different MongoDB cluster');
    
    console.log('\n6. To check Railway environment variables:');
    console.log('   - Go to Railway dashboard');
    console.log('   - Select your project');
    console.log('   - Go to Variables tab');
    console.log('   - Check MONGODB_URI value');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugRailwayConnection();
