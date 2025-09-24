#!/bin/bash

# Restore Help Files Script
# This script restores all the help files for trainers

echo "📚 Restoring help files from backup..."

# Check if backup exists
if [ ! -d ".trainer-files-backup" ]; then
    echo "❌ No backup found. Help files may not have been backed up."
    exit 1
fi

# Restore files from backup
echo "📦 Restoring documentation..."
mv .trainer-files-backup/README.md README-with-help.md 2>/dev/null || true
mv .trainer-files-backup/PRD.md . 2>/dev/null || true
mv .trainer-files-backup/PROJECT-SUMMARY.md . 2>/dev/null || true

# Restore docs files (bug-report-template.md should already be there)
mv .trainer-files-backup/docs/bug-hunting-guide.md docs/ 2>/dev/null || true
mv .trainer-files-backup/docs/trainer-bug-reference.md docs/ 2>/dev/null || true

# Keep the current minimal README as an option
mv README.md README-zero-help.md 2>/dev/null || true
mv README-with-help.md README.md 2>/dev/null || true

echo "✅ Help files restored!"
echo ""
echo "📋 Available versions:"
echo "   📚 README.md - Full help version (active)"
echo "   🚫 README-zero-help.md - Minimal version" 
echo "   📁 docs/ - All documentation restored"
echo ""
echo "💡 To switch back to zero help: run setup-zero-help.sh"
echo ""