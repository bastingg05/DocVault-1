const axios = require('axios');

async function monitorUsers() {
  try {
    const API_BASE = 'https://docvault-1-production.up.railway.app';
    
    console.log('🔍 Monitoring Railway Database Users...\n');
    
    // Check current users
    const usersResponse = await axios.get(`${API_BASE}/api/auth/debug/users`);
    console.log('Current users in Railway database:');
    console.log(`Count: ${usersResponse.data.count}`);
    
    if (usersResponse.data.users.length > 0) {
      usersResponse.data.users.forEach((user, index) => {
        console.log(`${index + 1}. Name: ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   ID: ${user._id}`);
        console.log(`   Created: ${new Date(parseInt(user._id.substring(0, 8), 16))}`);
        console.log('');
      });
    } else {
      console.log('No users found in database');
    }
    
    console.log('📱 To test login on phone:');
    console.log('1. Go to https://doc-vault-1.vercel.app on your phone');
    console.log('2. Try logging in with one of the emails above');
    console.log('3. If login fails, the issue is with phone configuration');
    console.log('4. If login works, the issue is with laptop configuration');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

monitorUsers();
