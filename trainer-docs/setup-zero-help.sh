#!/bin/bash

# Zero Help Setup Script
# This script creates a version with no documentation hints for students

echo "🚫 Setting up ZERO HELP version for ultimate debugging challenge..."

# Create backup directory for help files (for trainers to restore later)
mkdir -p .trainer-files-backup

# Move most help files to backup, but keep bug report template
echo "📦 Backing up help files..."
mv README.md .trainer-files-backup/ 2>/dev/null || true
mv PRD.md .trainer-files-backup/ 2>/dev/null || true
mv PROJECT-SUMMARY.md .trainer-files-backup/ 2>/dev/null || true

# Backup docs but keep bug report template
mkdir -p .trainer-files-backup/docs 2>/dev/null || true
mv docs/bug-hunting-guide.md .trainer-files-backup/docs/ 2>/dev/null || true
mv docs/trainer-bug-reference.md .trainer-files-backup/docs/ 2>/dev/null || true
# Keep bug-report-template.md available for students

# Replace with minimal README
echo "📝 Installing minimal README..."
mv README-zero-help.md README.md

# Remove any test files that might give hints
echo "🧹 Cleaning up test files..."
rm -rf tests/ 2>/dev/null || true
rm -f test-api.js 2>/dev/null || true

# Clean up package.json scripts that mention testing
echo "⚙️  Simplifying package.json..."
# Create a minimal package.json without test scripts
cat > package.json << 'EOF'
{
  "name": "calculator-app",
  "version": "1.0.0",
  "description": "A simple calculator application",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "start:buggy": "node buggy-server.js",
    "dev": "node dev-start.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "helmet": "^7.0.0",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  },
  "keywords": ["calculator", "education"],
  "author": "Engineering Academy",
  "license": "MIT"
}
EOF

# Remove any obvious debugging hints from server files
echo "🔧 Cleaning server files..."
# Remove console.log statements that might give hints
sed -i '' '/console\.log.*BUG/d' server.js 2>/dev/null || true
sed -i '' '/console\.log.*DEBUG/d' server.js 2>/dev/null || true
sed -i '' '/console\.log.*BUG/d' buggy-server.js 2>/dev/null || true
sed -i '' '/console\.log.*DEBUG/d' buggy-server.js 2>/dev/null || true

echo ""
echo "✅ Zero help version ready!"
echo ""
echo "📋 What students will have:"
echo "   ✓ Working calculator on http://localhost:3000"
echo "   ✓ Buggy calculator on http://localhost:3001"
echo "   ✓ Minimal README with setup instructions only"
echo "   ✓ Bug report template for documenting findings"
echo "   ✓ No hints about what to look for"
echo "   ✓ No debugging guides or methodology help"
echo ""
echo "📋 What's been hidden:"
echo "   🚫 All documentation about bugs existing"
echo "   🚫 Bug hunting guides and methodology"
echo "   🚫 Trainer reference materials"
echo "   🚫 Test files that might give hints"
echo "   ✅ Bug report template kept for documentation"
echo ""
echo "🎯 Students must now:"
echo "   → Discover there are bugs on their own"
echo "   → Figure out testing methodology"
echo "   → Develop their own bug tracking system"
echo "   → Use pure debugging skills and tools"
echo ""
echo "📁 Trainer files backed up to: .trainer-files-backup/"
echo "💡 To restore help files: run restore-help.sh"
echo ""