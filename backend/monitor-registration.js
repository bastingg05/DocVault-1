const axios = require('axios');

async function monitorRegistration() {
  console.log('🔍 Monitoring User Registration...\n');
  
  try {
    // Get initial user count
    const initialResponse = await axios.get('https://docvault-1-production.up.railway.app/api/auth/debug/users');
    const initialCount = initialResponse.data.count;
    
    console.log(`📊 Initial user count: ${initialCount}`);
    console.log('👥 Current users:');
    initialResponse.data.users.forEach((user, i) => {
      console.log(`   ${i+1}. ${user.email} (${user.name})`);
    });
    
    console.log('\n🎯 NOW TEST THIS:');
    console.log('1. Go to https://doc-vault-1.vercel.app on your laptop');
    console.log('2. Try to register a NEW user (different email)');
    console.log('3. Come back here and press Enter to check if user was added');
    console.log('\n⏳ Waiting for you to register a user...');
    
    // Wait for user input
    process.stdin.once('data', async () => {
      try {
        console.log('\n🔍 Checking for new users...');
        const newResponse = await axios.get('https://docvault-1-production.up.railway.app/api/auth/debug/users');
        const newCount = newResponse.data.count;
        
        console.log(`📊 New user count: ${newCount}`);
        
        if (newCount > initialCount) {
          console.log('✅ SUCCESS! New user was added to Railway database');
          console.log('👥 All users now:');
          newResponse.data.users.forEach((user, i) => {
            console.log(`   ${i+1}. ${user.email} (${user.name})`);
          });
          console.log('\n🎉 This means your laptop IS using Railway backend!');
          console.log('The login issue might be something else...');
        } else {
          console.log('❌ No new users found in Railway database');
          console.log('🚨 This means your laptop is NOT using Railway backend!');
          console.log('Check your browser network requests to see what URL it\'s calling');
        }
        
      } catch (error) {
        console.error('❌ Error checking users:', error.message);
      }
      
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

monitorRegistration();
