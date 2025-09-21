const axios = require('axios');

async function testPassword1234() {
  try {
    const API_BASE = 'https://docvault-1-production.up.railway.app';
    
    console.log('🔍 Testing Login with password "1234"...\n');
    
    // First, let's check if the user still exists
    console.log('1. Checking current users...');
    const usersResponse = await axios.get(`${API_BASE}/api/auth/debug/users`);
    console.log(`📊 Database has ${usersResponse.data.count} users:`);
    usersResponse.data.users.forEach((user, i) => {
      console.log(`   ${i+1}. ${user.email} (${user.name})`);
    });
    
    if (usersResponse.data.count === 0) {
      console.log('\n❌ No users found in database!');
      console.log('🔧 You need to create a new user first');
      return;
    }
    
    // Test login with password 1234
    console.log('\n2. Testing login with password "1234"...');
    try {
      const response = await axios.post(`${API_BASE}/api/auth/login`, {
        email: usersResponse.data.users[0].email,
        password: '1234'
      });
      
      console.log('✅ LOGIN SUCCESSFUL!');
      console.log('Token:', response.data.token ? 'Present' : 'Missing');
      console.log('User:', response.data.user);
      console.log('\n🎉 The password "1234" works!');
      
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('❌ Password "1234" failed');
        console.log('🔧 The user might have been created with a different password');
        console.log('Try creating a new user with password "1234"');
      } else {
        console.log('❌ Error:', error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testPassword1234();
