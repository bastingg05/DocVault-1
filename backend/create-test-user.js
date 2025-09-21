const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema (simplified version)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

async function createTestUser() {
  try {
    console.log('👤 Creating test user...');
    
    const uri = process.env.MONGODB_URI || 'mongodb+srv://bastingg05:gladwin2@bastin0.zvpymix.mongodb.net/docvault?retryWrites=true&w=majority';
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
    
    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('⚠️  Test user already exists, deleting...');
      await User.deleteOne({ email: 'test@example.com' });
    }
    
    // Create new test user
    const hashedPassword = await bcrypt.hash('1234', 10);
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword
    });
    
    await testUser.save();
    console.log('✅ Test user created successfully');
    console.log('📧 Email: test@example.com');
    console.log('🔑 Password: 1234');
    
    // Verify the user was created
    const savedUser = await User.findOne({ email: 'test@example.com' });
    if (savedUser) {
      console.log('✅ User verification successful');
      console.log(`👤 Name: ${savedUser.name}`);
      console.log(`📧 Email: ${savedUser.email}`);
      
      // Test password comparison
      const passwordMatch = await savedUser.comparePassword('1234');
      console.log(`🔑 Password test: ${passwordMatch ? 'PASS' : 'FAIL'}`);
    }
    
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createTestUser();