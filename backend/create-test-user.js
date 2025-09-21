const axios = require('axios');

async function createTestUser() {
  try {
    const API_BASE = 'https://docvault-1-production.up.railway.app';
    
    console.log('👤 Creating test user with password "1234"...\n');
    
    // Create a test user
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: '1234'
    };
    
    console.log('Creating user:', testUser.email);
    
    try {
      const response = await axios.post(`${API_BASE}/api/auth/register`, testUser);
      
      console.log('✅ User created successfully!');
      console.log('Token:', response.data.token ? 'Present' : 'Missing');
      console.log('User:', response.data.user);
      
      // Now test login with the same credentials
      console.log('\n🔍 Testing login with created user...');
      const loginResponse = await axios.post(`${API_BASE}/api/auth/login`, {
        email: testUser.email,
        password: testUser.password
      });
      
      console.log('✅ Login test successful!');
      console.log('Login token:', loginResponse.data.token ? 'Present' : 'Missing');
      
      console.log('\n🎯 TEST CREDENTIALS:');
      console.log('Email:', testUser.email);
      console.log('Password:', testUser.password);
      console.log('\n📱 Now try logging in on both laptop and phone with these credentials!');
      
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log('❌ User already exists');
        console.log('🔧 Try with a different email');
      } else {
        console.log('❌ Registration failed:', error.response?.data?.message || error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createTestUser();
