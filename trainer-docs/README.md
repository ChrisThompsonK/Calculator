# Calculator Workshop - Trainer Documentation 👨‍🏫

This folder contains all documentation and tools specifically designed for workshop trainers and instructors.

## 📚 Documentation Files

### Core Training Guides
- **`bug-hunting-guide.md`** - Complete instructor guide with all bugs, locations, and solutions
- **`TRAINER-MODES-GUIDE.md`** - Complete guide to workshop difficulty modes
- **`trainer-bug-reference.md`** - Quick reference list of all 16 bugs with solutions
- **`SCRIPT-TESTING-REPORT.md`** - Comprehensive testing report for all setup scripts

### Project Documentation
- **`PRD.md`** - Product Requirements Document for the calculator project
- **`PROJECT-SUMMARY.md`** - High-level project overview and architecture

## 🛠️ Setup Scripts

### Mode Configuration
- **`setup-zero-help.sh`** - Remove most help files (intermediate difficulty)
- **`setup-ultra-zero-help.sh`** - Maximum stealth mode (expert difficulty)
- **`restore-help.sh`** - Restore all help documentation

### Testing & Demonstration
- **`test-all-scripts.sh`** - Comprehensive safety testing for all setup scripts
- **`demo-modes.sh`** - Quick demonstration of different training modes

## 🎯 Quick Start for Trainers

### 1. Choose Workshop Difficulty

```bash
# For beginners (full help available)
# No action needed - use default state

# For intermediate students
./setup-zero-help.sh

# For advanced students  
./setup-ultra-zero-help.sh
```

### 2. During Workshop

- Monitor student progress using `trainer-bug-reference.md`
- Students use `bug-report-template.md` (in main docs/ folder)
- Switch modes anytime with the setup scripts

### 3. After Workshop

```bash
# Restore full documentation
./restore-help.sh
```

## 📋 Workshop Modes Overview

| Mode | Difficulty | Documentation Available | Best For |
|------|------------|------------------------|----------|
| **Full Help** | Beginner | Complete guides + bug hints | Learning debugging methodology |
| **Zero Help** | Intermediate | Bug template only | Practicing systematic testing |
| **Ultra Zero Help** | Expert | Neutral naming, no hints | Real-world debugging simulation |

## 🔧 Safety Features

- All scripts create automatic backups
- `test-all-scripts.sh` validates safety before use
- Git repository provides ultimate backup
- Non-destructive operations with graceful error handling

## 📁 File Organization

**Student-Facing Files** (main directory):
- Calculator application files
- Basic setup instructions
- Bug report template (when applicable)

**Trainer-Only Files** (this folder):
- Complete bug solutions
- Setup and configuration scripts
- Workshop methodology guides
- Testing and validation tools

## 💡 Tips for Effective Workshops

1. **Pre-Workshop**: Run `test-all-scripts.sh` to verify everything works
2. **Mode Selection**: Match difficulty to student experience level
3. **Bug Tracking**: Use the reference guide to provide targeted hints
4. **Safety**: Scripts auto-backup, but git provides additional safety net
5. **Flexibility**: Switch modes mid-workshop if difficulty needs adjustment

## 🆘 Troubleshooting

**If students can't start the calculator:**
```bash
npm install
npm run dev
```

**If setup scripts fail:**
```bash
git restore .  # Restore from git
# Then re-run desired setup script
```

**If backup/restore issues:**
- Check `.trainer-files-backup/` directory exists
- Use `git restore .` as ultimate fallback

---

**Happy Teaching!** 🚀 The calculator workshop provides a comprehensive, professional debugging training environment.