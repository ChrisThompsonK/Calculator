#!/bin/bash

# Ultra Zero Help Setup - Maximum Difficulty
# This removes even the most subtle hints about there being bugs

echo "💀 Setting up ULTRA ZERO HELP version - Maximum debugging challenge..."

# First run the standard zero help setup
./setup-zero-help.sh

echo ""
echo "🔥 Applying ULTRA stealth mode..."

# Remove any mentions of "buggy" from filenames and content
echo "🕵️  Removing obvious clues..."

# Rename buggy-server.js to something neutral
mv buggy-server.js server-alt.js 2>/dev/null || true

# Rename buggy-version directory to something neutral
mv buggy-version version-b 2>/dev/null || true

# Update dev-start.js to use neutral names
cat > dev-start.js << 'EOF'
#!/usr/bin/env node

const { spawn } = require('child_process');

console.log('🚀 Starting Calculator Development Environment...\n');

// Start primary server (port 3000)
const server1 = spawn('npx', ['nodemon', 'server.js'], {
    stdio: 'pipe',
    env: { ...process.env, PORT: '3000' }
});

// Start secondary server (port 3001)  
const server2 = spawn('npx', ['nodemon', 'server-alt.js'], {
    stdio: 'pipe',
    env: { ...process.env, PORT: '3001' }
});

// Handle output from both servers
server1.stdout.on('data', (data) => {
    console.log(`[SERVER-A] ${data.toString().trim()}`);
});

server1.stderr.on('data', (data) => {
    console.error(`[SERVER-A] ${data.toString().trim()}`);
});

server2.stdout.on('data', (data) => {
    console.log(`[SERVER-B] ${data.toString().trim()}`);
});

server2.stderr.on('data', (data) => {
    console.error(`[SERVER-B] ${data.toString().trim()}`);
});

// Handle shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down development environment...');
    server1.kill('SIGINT');
    server2.kill('SIGINT');
    process.exit(0);
});

console.log('📋 Development Environment Status:');
console.log('=====================================');
console.log('🟢 Calculator Version A: http://localhost:3000');
console.log('🟡 Calculator Version B: http://localhost:3001');
console.log('');
console.log('💡 Pro Tips:');
console.log('   • Both servers auto-reload on file changes');
console.log('   • Use browser dev tools for debugging');
console.log('   • Use Ctrl+C to stop both servers');
console.log('');
EOF

# Update README to be even more minimal
cat > README.md << 'EOF'
# Calculator

Web calculator application.

## Setup

```bash
npm install
npm run dev
```

## Access

- Version A: http://localhost:3000  
- Version B: http://localhost:3001

## Features

Basic calculator functionality.
EOF

# Remove obvious clues from server-alt.js
sed -i '' 's/BUGGY/ALT/g' server-alt.js 2>/dev/null || true
sed -i '' 's/buggy/alt/g' server-alt.js 2>/dev/null || true
sed -i '' 's/intentional bugs/alternative implementation/g' server-alt.js 2>/dev/null || true
sed -i '' '/debugging practice/d' server-alt.js 2>/dev/null || true

echo ""
echo "💀 ULTRA ZERO HELP VERSION READY!"
echo ""
echo "🎯 What students will discover:"
echo "   ❓ Two calculator versions with no explanation why"
echo "   ❓ No hint that one might have issues"
echo "   ❓ Must discover differences themselves"
echo "   ❓ Must figure out testing approach independently"
echo ""
echo "🔥 Challenge Level: MAXIMUM"
echo "   → Students don't even know bugs exist"
echo "   → Must discover through natural usage"
echo "   → Forces development of systematic testing"
echo "   → True real-world debugging scenario"
echo ""
echo "📁 Access points:"
echo "   🟢 Version A (working): http://localhost:3000"
echo "   🟡 Version B (mystery):  http://localhost:3001"
echo ""