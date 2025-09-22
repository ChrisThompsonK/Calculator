#!/usr/bin/env node

// Simple API test script
const http = require('http');

function testEndpoint(port, path, method = 'GET', data = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: port,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    data: body
                });
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }

        req.end();
    });
}

async function runTests() {
    console.log('🧪 Testing Calculator API Endpoints...\n');

    try {
        // Test working server health
        console.log('Testing Working Server (port 3000):');
        const healthWorking = await testEndpoint(3000, '/api/health');
        console.log(`  ✅ Health Check: ${healthWorking.status} - ${healthWorking.data}`);

        // Test calculation endpoint
        const calcWorking = await testEndpoint(3000, '/api/calculate', 'POST', {
            expression: '5 + 3 * 2'
        });
        console.log(`  ✅ Calculate: ${calcWorking.status} - ${calcWorking.data}`);

        console.log('\nTesting Buggy Server (port 3001):');
        // Test buggy server health
        const healthBuggy = await testEndpoint(3001, '/api/health');
        console.log(`  🐛 Health Check: ${healthBuggy.status} - ${healthBuggy.data}`);

        // Test buggy calculation endpoint
        const calcBuggy = await testEndpoint(3001, '/api/calculate', 'POST', {
            expression: '5 + 3 * 2'
        });
        console.log(`  🐛 Calculate: ${calcBuggy.status} - ${calcBuggy.data}`);

        console.log('\n✅ API testing complete!');
        console.log('\n🎯 Both servers are running and responding to API calls.');
        console.log('📋 Ready for debugging workshop!');

    } catch (error) {
        console.error('❌ Error testing APIs:', error.message);
        console.log('\n💡 Make sure both servers are running with "npm run dev"');
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    runTests();
}

module.exports = { testEndpoint, runTests };