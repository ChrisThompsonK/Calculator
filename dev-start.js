#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Calculator Development Environment...\n');

// Start the working version server
const workingServer = spawn('nodemon', ['server.js'], {
    stdio: 'pipe',
    env: { ...process.env, PORT: 3000 }
});

// Start the buggy version server
const buggyServer = spawn('nodemon', ['buggy-server.js'], {
    stdio: 'pipe',
    env: { ...process.env, BUGGY_PORT: 3001 }
});

// Handle working server output
workingServer.stdout.on('data', (data) => {
    process.stdout.write(`[WORKING] ${data}`);
});

workingServer.stderr.on('data', (data) => {
    process.stderr.write(`[WORKING ERROR] ${data}`);
});

// Handle buggy server output
buggyServer.stdout.on('data', (data) => {
    process.stdout.write(`[BUGGY] ${data}`);
});

buggyServer.stderr.on('data', (data) => {
    process.stderr.write(`[BUGGY ERROR] ${data}`);
});

// Handle server exits
workingServer.on('close', (code) => {
    console.log(`\n[WORKING] Server exited with code ${code}`);
});

buggyServer.on('close', (code) => {
    console.log(`\n[BUGGY] Server exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down development environment...');
    workingServer.kill('SIGINT');
    buggyServer.kill('SIGINT');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down development environment...');
    workingServer.kill('SIGTERM');
    buggyServer.kill('SIGTERM');
    process.exit(0);
});

// Display startup information
setTimeout(() => {
    console.log('\n📋 Development Environment Status:');
    console.log('=====================================');
    console.log('✅ Working Calculator: http://localhost:3000');
    console.log('🐛 Buggy Calculator:  http://localhost:3001');
    console.log('🔍 API Documentation: See README.md');
    console.log('\n💡 Pro Tips:');
    console.log('   • Use VS Code debugger with "Attach to Node" for server-side debugging');
    console.log('   • Both servers auto-reload on file changes');
    console.log('   • Check browser dev tools for client-side debugging');
    console.log('   • Use Ctrl+C to stop both servers');
    console.log('\n🎯 Workshop Instructions:');
    console.log('   1. Open buggy version in browser');
    console.log('   2. Test features and identify bugs');
    console.log('   3. Use browser dev tools and VS Code debugger');
    console.log('   4. Document findings in bug-report-template.md');
    console.log('\n');
}, 2000);