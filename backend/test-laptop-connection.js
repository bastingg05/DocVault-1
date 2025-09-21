const axios = require('axios');

async function testLaptopConnection() {
  console.log('🔍 Testing Laptop Frontend Connection...\n');
  
  try {
    // Test 1: Check Railway backend health
    console.log('1. Testing Railway backend health...');
    const healthResponse = await axios.get('https://docvault-1-production.up.railway.app/health');
    console.log('✅ Railway backend is healthy:', healthResponse.data.status);
    
    // Test 2: Check current users in Railway database
    console.log('\n2. Checking Railway database users...');
    const usersResponse = await axios.get('https://docvault-1-production.up.railway.app/api/auth/debug/users');
    console.log(`📊 Railway database has ${usersResponse.data.count} users:`);
    usersResponse.data.users.forEach((user, i) => {
      console.log(`   ${i+1}. ${user.email} (${user.name})`);
    });
    
    // Test 3: Test Vercel frontend
    console.log('\n3. Testing Vercel frontend...');
    try {
      const vercelResponse = await axios.get('https://doc-vault-1.vercel.app');
      console.log('✅ Vercel frontend is accessible');
    } catch (error) {
      console.log('❌ Vercel frontend issue:', error.message);
    }
    
    // Test 4: Check if there are any local servers running
    console.log('\n4. Checking for local servers...');
    try {
      const localResponse = await axios.get('http://localhost:5051/health', { timeout: 1000 });
      console.log('⚠️  Local backend detected on port 5051:', localResponse.data);
    } catch (error) {
      console.log('✅ No local backend running on port 5051');
    }
    
    try {
      const localFrontendResponse = await axios.get('http://localhost:5173', { timeout: 1000 });
      console.log('⚠️  Local frontend detected on port 5173');
    } catch (error) {
      console.log('✅ No local frontend running on port 5173');
    }
    
    console.log('\n📋 DIAGNOSIS:');
    console.log('- Railway backend: Working');
    console.log('- Railway database: Has users');
    console.log('- Vercel frontend: Should be working');
    console.log('\n🎯 NEXT STEPS:');
    console.log('1. Go to https://doc-vault-1.vercel.app on your laptop');
    console.log('2. Open browser developer tools (F12)');
    console.log('3. Go to Network tab');
    console.log('4. Try to register a new user');
    console.log('5. Check what URL the registration request goes to');
    console.log('6. If it goes to localhost:5051, that\'s the problem!');
    
  } catch (error) {
    console.error('❌ Error during testing:', error.message);
  }
}

testLaptopConnection();
