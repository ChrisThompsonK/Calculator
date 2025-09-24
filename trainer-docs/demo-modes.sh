#!/bin/bash

# Demo Script - Shows the different help modes in action
# This demonstrates what students will see in each mode

echo "🎭 CALCULATOR WORKSHOP MODES DEMONSTRATION"
echo "=========================================="
echo ""

show_current_state() {
    echo "📋 Current State:"
    echo "   README.md exists: $([ -f README.md ] && echo "✅" || echo "❌")"
    echo "   docs/ exists: $([ -d docs ] && echo "✅" || echo "❌")"  
    echo "   Backup exists: $([ -d .trainer-files-backup ] && echo "✅" || echo "❌")"
    
    if [ -f README.md ]; then
        local first_line=$(head -n1 README.md 2>/dev/null)
        echo "   README starts with: '$first_line'"
    fi
    
    echo "   Servers available:"
    echo "     - Working: $([ -f server.js ] && echo "✅ server.js" || echo "❌")"
    echo "     - Buggy: $([ -f buggy-server.js ] && echo "✅ buggy-server.js" || [ -f server-alt.js ] && echo "✅ server-alt.js" || echo "❌")"
    echo ""
}

echo "🏁 STARTING STATE (Full Help Mode)"
show_current_state

echo "Press any key to demonstrate Zero Help Mode..."
read -n 1

echo ""
echo "🚫 SWITCHING TO ZERO HELP MODE"
echo "Running: ./setup-zero-help.sh"
echo ""
./setup-zero-help.sh

echo ""
echo "📋 What students see in Zero Help Mode:"
echo "----------------------------------------"
head -n 15 README.md 2>/dev/null || echo "No README found"

echo ""
show_current_state

echo "Press any key to demonstrate Ultra Zero Help Mode..."
read -n 1

echo ""
echo "💀 SWITCHING TO ULTRA ZERO HELP MODE"
echo "Running: ./setup-ultra-zero-help.sh"
echo ""
./setup-ultra-zero-help.sh

echo ""
echo "📋 What students see in Ultra Zero Help Mode:"
echo "----------------------------------------------"
cat README.md 2>/dev/null || echo "No README found"

echo ""
show_current_state

echo "Press any key to restore Full Help Mode..."
read -n 1

echo ""
echo "📚 RESTORING FULL HELP MODE"
echo "Running: ./restore-help.sh"
echo ""
./restore-help.sh

echo ""
echo "📋 Back to Full Help Mode:"
echo "--------------------------"
head -n 10 README.md 2>/dev/null || echo "No README found"

echo ""
show_current_state

echo "🎭 DEMONSTRATION COMPLETE!"
echo ""
echo "🎯 Summary of what you just saw:"
echo "   📚 Full Help: Complete documentation and guidance"
echo "   🚫 Zero Help: Minimal setup info, no debugging hints"
echo "   💀 Ultra Zero: No hint that bugs even exist"
echo ""
echo "💡 Choose the appropriate mode for your training needs!"