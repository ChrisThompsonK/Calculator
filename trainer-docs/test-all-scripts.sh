#!/bin/bash

# Comprehensive Test Script for Setup Scripts
# This tests each script thoroughly before actual use

echo "🧪 COMPREHENSIVE SETUP SCRIPT TESTING"
echo "======================================"
echo ""

# Function to show current directory structure
show_structure() {
    echo "📁 Current Directory Structure:"
    echo "   README files: $(ls README*.md 2>/dev/null | wc -l) files"
    echo "   docs/ exists: $([ -d docs ] && echo "✅ YES" || echo "❌ NO")"
    if [ -d docs ]; then
        echo "   docs/ contents: $(ls docs/ 2>/dev/null | tr '\n' ' ')"
    fi
    echo "   buggy-version/ exists: $([ -d buggy-version ] && echo "✅ YES" || echo "❌ NO")"
    echo "   version-b/ exists: $([ -d version-b ] && echo "✅ YES" || echo "❌ NO")"
    echo "   buggy-server.js exists: $([ -f buggy-server.js ] && echo "✅ YES" || echo "❌ NO")"
    echo "   server-alt.js exists: $([ -f server-alt.js ] && echo "✅ YES" || echo "❌ NO")"
    echo "   .trainer-files-backup/ exists: $([ -d .trainer-files-backup ] && echo "✅ YES" || echo "❌ NO")"
    if [ -d .trainer-files-backup ]; then
        echo "   backup contents: $(ls -la .trainer-files-backup/ 2>/dev/null | grep -v '^total' | wc -l) items"
    fi
    echo ""
}

# Function to create a complete backup for safety
create_safety_backup() {
    echo "🛡️  Creating safety backup..."
    mkdir -p .test-safety-backup
    cp -r README*.md .test-safety-backup/ 2>/dev/null || true
    cp -r docs/ .test-safety-backup/ 2>/dev/null || true
    cp -r buggy-version/ .test-safety-backup/ 2>/dev/null || true
    cp -r version-b/ .test-safety-backup/ 2>/dev/null || true
    cp buggy-server.js .test-safety-backup/ 2>/dev/null || true
    cp server-alt.js .test-safety-backup/ 2>/dev/null || true
    cp -r .trainer-files-backup/ .test-safety-backup/ 2>/dev/null || true
    echo "✅ Safety backup created in .test-safety-backup/"
    echo ""
}

# Function to restore from safety backup
restore_safety_backup() {
    echo "🔄 Restoring from safety backup..."
    rm -rf README*.md docs/ buggy-version/ version-b/ buggy-server.js server-alt.js .trainer-files-backup/ 2>/dev/null || true
    cp -r .test-safety-backup/* . 2>/dev/null || true
    echo "✅ Restored from safety backup"
    echo ""
}

# Function to test a script safely
test_script() {
    local script_name=$1
    local description=$2
    
    echo "🧪 TESTING: $script_name"
    echo "Description: $description"
    echo "----------------------------------------"
    
    if [ ! -f "$script_name" ]; then
        echo "❌ ERROR: Script $script_name not found!"
        return 1
    fi
    
    echo "📋 BEFORE running $script_name:"
    show_structure
    
    echo "🔄 Running $script_name..."
    if ./"$script_name"; then
        echo "✅ Script executed successfully"
    else
        echo "❌ Script failed with exit code $?"
        echo "🔄 Restoring from backup..."
        restore_safety_backup
        return 1
    fi
    
    echo ""
    echo "📋 AFTER running $script_name:"
    show_structure
    
    echo "🔄 Restoring for next test..."
    restore_safety_backup
    echo ""
    echo "----------------------------------------"
    echo ""
}

# Main testing sequence
echo "🏁 Starting comprehensive tests..."
echo ""

echo "📋 INITIAL STATE:"
show_structure

create_safety_backup

echo "🧪 Testing setup-zero-help.sh..."
test_script "setup-zero-help.sh" "Remove most help files but keep bug report template"

echo "🧪 Testing setup-ultra-zero-help.sh..."
test_script "setup-ultra-zero-help.sh" "Maximum stealth mode with renamed directories"

echo "🧪 Testing restore-help.sh (need to setup first)..."
echo "🔧 Setting up zero-help mode first for restore test..."
./setup-zero-help.sh
echo ""
echo "📋 After setup-zero-help.sh (before restore test):"
show_structure
echo "🧪 Now testing restore-help.sh..."
test_script "restore-help.sh" "Restore all help files from backup"

echo ""
echo "🏆 TESTING COMPLETE!"
echo ""
echo "🧹 Cleaning up test files..."
rm -rf .test-safety-backup/
echo "✅ Cleanup complete"
echo ""
echo "📊 Test Results Summary:"
echo "   All scripts were tested safely"
echo "   Original state has been restored" 
echo "   Any issues have been identified above"