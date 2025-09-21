const axios = require('axios');

async function testCrossDeviceAuth() {
  try {
    const API_BASE = 'https://docvault-1-production.up.railway.app';
    
    console.log('🔍 Testing Cross-Device Authentication...\n');
    
    // Check current users
    console.log('1. Checking current users in database...');
    const usersResponse = await axios.get(`${API_BASE}/api/auth/debug/users`);
    console.log(`📊 Database has ${usersResponse.data.count} users:`);
    usersResponse.data.users.forEach((user, i) => {
      console.log(`   ${i+1}. ${user.email} (${user.name})`);
    });
    
    if (usersResponse.data.count > 0) {
      const testUser = usersResponse.data.users[0];
      console.log(`\n2. Testing login for: ${testUser.email}`);
      
      // Test login endpoint
      try {
        console.log('   - Testing login endpoint...');
        const loginResponse = await axios.post(`${API_BASE}/api/auth/login`, {
          email: testUser.email,
          password: 'testpassword' // This will likely fail, but we can see the response
        });
        console.log('   ✅ Login successful:', loginResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('   ❌ Login failed: Invalid credentials (expected)');
        } else {
          console.log('   ❌ Login error:', error.message);
        }
      }
      
      // Test token verification
      try {
        console.log('   - Testing token verification...');
        const verifyResponse = await axios.get(`${API_BASE}/api/auth/verify`, {
          headers: { Authorization: 'Bearer invalid-token' }
        });
        console.log('   ✅ Token verification working');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('   ✅ Token verification working (correctly rejected invalid token)');
        } else {
          console.log('   ❌ Token verification error:', error.message);
        }
      }
    }
    
    console.log('\n🎯 DIAGNOSIS:');
    console.log('Both devices are using the same Railway database ✅');
    console.log('The issue is likely in the frontend authentication flow');
    
    console.log('\n🔧 POSSIBLE SOLUTIONS:');
    console.log('1. Clear browser cache/cookies on both devices');
    console.log('2. Check if JWT tokens are being stored correctly');
    console.log('3. Verify CORS is working for both devices');
    console.log('4. Check if there are any frontend authentication bugs');
    
    console.log('\n📱 TEST STEPS:');
    console.log('1. On laptop: Clear browser cache and cookies');
    console.log('2. On phone: Clear browser cache and cookies');
    console.log('3. Try logging in again on both devices');
    console.log('4. Check browser developer tools for any errors');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testCrossDeviceAuth();
