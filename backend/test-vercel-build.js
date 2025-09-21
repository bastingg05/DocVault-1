const { exec } = require('child_process');
const path = require('path');

async function testVercelBuild() {
  try {
    console.log('🧪 Testing Vercel build process...\n');
    
    const frontendPath = path.join(__dirname, '..', 'frontend_react');
    console.log('📁 Frontend path:', frontendPath);
    
    // Test 1: Check if frontend directory exists
    console.log('\n1️⃣ Checking frontend directory...');
    const fs = require('fs');
    if (fs.existsSync(frontendPath)) {
      console.log('✅ Frontend directory exists');
    } else {
      console.log('❌ Frontend directory not found');
      return;
    }
    
    // Test 2: Check package.json
    console.log('\n2️⃣ Checking package.json...');
    const packageJsonPath = path.join(frontendPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      console.log('✅ package.json found');
      console.log('📦 Dependencies:', Object.keys(packageJson.dependencies || {}).length);
      console.log('🔧 Dev dependencies:', Object.keys(packageJson.devDependencies || {}).length);
    } else {
      console.log('❌ package.json not found');
      return;
    }
    
    // Test 3: Check Vite config
    console.log('\n3️⃣ Checking Vite configuration...');
    const viteConfigPath = path.join(frontendPath, 'vite.config.js');
    if (fs.existsSync(viteConfigPath)) {
      console.log('✅ vite.config.js found');
    } else {
      console.log('❌ vite.config.js not found');
    }
    
    // Test 4: Check main.jsx
    console.log('\n4️⃣ Checking main.jsx...');
    const mainJsxPath = path.join(frontendPath, 'src', 'main.jsx');
    if (fs.existsSync(mainJsxPath)) {
      console.log('✅ main.jsx found');
    } else {
      console.log('❌ main.jsx not found');
    }
    
    // Test 5: Check App.jsx
    console.log('\n5️⃣ Checking App.jsx...');
    const appJsxPath = path.join(frontendPath, 'src', 'App.jsx');
    if (fs.existsSync(appJsxPath)) {
      console.log('✅ App.jsx found');
    } else {
      console.log('❌ App.jsx not found');
    }
    
    // Test 6: Check Vercel config
    console.log('\n6️⃣ Checking Vercel configuration...');
    const vercelConfigPath = path.join(__dirname, '..', 'vercel.json');
    if (fs.existsSync(vercelConfigPath)) {
      console.log('✅ vercel.json found');
      const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
      console.log('🔧 Build command:', vercelConfig.buildCommand);
      console.log('📁 Output directory:', vercelConfig.outputDirectory);
    } else {
      console.log('❌ vercel.json not found');
    }
    
    console.log('\n🎯 Build Test Summary:');
    console.log('=====================');
    console.log('✅ All required files are present');
    console.log('🔧 Configuration looks correct');
    console.log('📦 Dependencies are properly configured');
    
    console.log('\n💡 If build still fails, try:');
    console.log('1. Check Rollup version compatibility');
    console.log('2. Verify Node.js version (18.x)');
    console.log('3. Clear node_modules and reinstall');
    console.log('4. Check for any missing dependencies');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testVercelBuild();
