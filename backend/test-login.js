const axios = require('axios');

async function testLogin() {
  try {
    const API_BASE = 'https://docvault-1-production.up.railway.app';
    
    console.log('🔍 Testing Login for basting2005@gmail.com...\n');
    
    // Test with different possible passwords
    const passwords = [
      'password',
      '123456',
      'test123',
      'admin',
      'bastin',
      'Bastin',
      'Bastin2005',
      'bastin2005'
    ];
    
    for (const password of passwords) {
      try {
        console.log(`Testing password: "${password}"`);
        
        const response = await axios.post(`${API_BASE}/api/auth/login`, {
          email: 'basting2005@gmail.com',
          password: password
        });
        
        console.log('✅ LOGIN SUCCESSFUL!');
        console.log('Token:', response.data.token ? 'Present' : 'Missing');
        console.log('User:', response.data.user);
        console.log('Password that worked:', password);
        return;
        
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log(`❌ Password "${password}" failed`);
        } else {
          console.log(`❌ Error with password "${password}":`, error.message);
        }
      }
    }
    
    console.log('\n❌ None of the common passwords worked');
    console.log('🔧 You need to either:');
    console.log('1. Remember the exact password you used');
    console.log('2. Create a new user with a known password');
    console.log('3. Reset the password (if that feature exists)');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testLogin();
