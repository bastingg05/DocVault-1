// Debug script to check what backend the frontend is using
const API_BASE = import.meta.env.VITE_API_BASE || 'https://docvault-1-production.up.railway.app';

console.log('🔍 Frontend Connection Debug:');
console.log('API_BASE:', API_BASE);
console.log('Environment:', import.meta.env.MODE);

// Test the connection
async function testConnection() {
  try {
    console.log('Testing connection to:', API_BASE);
    
    const response = await fetch(`${API_BASE}/health`);
    const data = await response.json();
    
    console.log('✅ Connection successful:', data);
    
    // Test auth endpoint
    const authResponse = await fetch(`${API_BASE}/api/auth/debug/users`);
    const authData = await authResponse.json();
    
    console.log('✅ Auth endpoint working, users:', authData.count);
    
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
}

testConnection();
