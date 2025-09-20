const axios = require('axios');

async function quickCheck() {
  try {
    const API_BASE = 'https://docvault-1-production.up.railway.app';
    const usersResponse = await axios.get(`${API_BASE}/api/auth/debug/users`);
    
    console.log(`📊 Database Status: ${usersResponse.data.count} users`);
    usersResponse.data.users.forEach((user, i) => {
      console.log(`${i+1}. ${user.email} (${user.name})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

quickCheck();
