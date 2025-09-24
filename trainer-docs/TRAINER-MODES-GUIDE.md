# Zero Help Training Modes Guide

This guide explains the different difficulty levels available for the Calculator debugging workshop.

## 🎯 Training Modes Available

### 1. 📚 **Full Help Mode** (Default)
**Difficulty**: Beginner Friendly  
**File**: `README.md` (default state)

**What students get:**
- ✅ Clear explanation of workshop purpose
- ✅ Information about 16 intentional bugs
- ✅ Bug hunting guide (`docs/bug-hunting-guide.md`)
- ✅ Bug report template (`docs/bug-report-template.md`)  
- ✅ Testing strategies and debugging tips
- ✅ Assessment rubrics and difficulty levels

**Best for:**
- New developers learning debugging basics
- Structured learning environments
- Students who need guidance and scaffolding

---

### 2. 🚫 **Zero Help Mode** 
**Difficulty**: Intermediate Challenge  
**Setup**: Run `./setup-zero-help.sh`

**What students get:**
- ✅ Basic setup instructions only
- ✅ Two calculator URLs (3000 and 3001)
- ✅ Bug report template for documenting findings
- ❌ No mention of bugs existing
- ❌ No debugging guides or methodology
- ❌ No assessment criteria or difficulty hints
- ❌ No hints about what to look for

**What students must discover:**
- 🔍 That there are differences between versions
- 🔍 That some behaviors are incorrect
- 🔍 How to systematically test functionality
- 🔍 Their own testing methodology (but can use provided template)

**Best for:**
- Developers with some debugging experience
- Testing problem-solving skills
- More realistic debugging scenarios

---

### 3. 💀 **Ultra Zero Help Mode**
**Difficulty**: Maximum Challenge  
**Setup**: Run `./setup-ultra-zero-help.sh`

**What students get:**
- ✅ Minimal setup instructions only
- ✅ Two versions called "Version A" and "Version B"
- ✅ Bug report template for documentation (if they discover it)
- ❌ No hint that either version has problems
- ❌ No mention of bugs, debugging, or workshop purpose
- ❌ Neutral naming (no "buggy" hints)
- ❌ No indication which version is "correct"

**What students must discover:**
- 🔍 That this is even a debugging exercise
- 🔍 Which version (if any) is "correct"
- 🔍 How to approach comparative testing
- 🔍 Complete debugging methodology from scratch

**Best for:**
- Experienced developers
- Assessing natural debugging instincts
- Simulating real-world "something seems wrong" scenarios
- Advanced problem-solving evaluation

---

## 🔄 Switching Between Modes

### To Zero Help Mode:
```bash
./setup-zero-help.sh
```

### To Ultra Zero Help Mode:
```bash
./setup-ultra-zero-help.sh
```

### Back to Full Help Mode:
```bash
./restore-help.sh
```

---

## 📋 What Each Mode Hides

| Feature | Full Help | Zero Help | Ultra Zero Help |
|---------|-----------|-----------|------------------|
| Workshop purpose explained | ✅ | ❌ | ❌ |
| Mentions bugs exist | ✅ | ❌ | ❌ |
| Bug count revealed | ✅ | ❌ | ❌ |
| Debugging guides | ✅ | ❌ | ❌ |
| Bug report templates | ✅ | ✅ | ✅ |
| Assessment criteria | ✅ | ❌ | ❌ |
| "Buggy" in filenames | ✅ | ✅ | ❌ |
| Clear version labeling | ✅ | ✅ | ❌ |
| Trainer documentation | ✅ | Backed up | Backed up |

---

## 🎯 Assessment Strategies by Mode

### Full Help Mode Assessment:
- Focus on **systematic application** of provided methodologies
- Evaluate **thoroughness** in following debugging guides
- Check **completeness** using provided templates
- Assess **understanding** of documented bug categories

### Zero Help Mode Assessment:
- Evaluate **self-directed problem-solving** approach
- Assess **methodology development** skills
- Check **systematic testing** without guidance
- Look for **natural debugging instincts**

### Ultra Zero Help Mode Assessment:
- Assess **problem recognition** abilities
- Evaluate **comparative analysis** skills
- Check **assumption-free investigation** approach
- Look for **pure analytical thinking**

---

## 💡 Trainer Tips

### For Zero Help Mode:
- Students may initially think both versions work fine
- Watch for the moment they discover discrepancies
- Note their natural testing approaches
- Provide hints only if completely stuck

### For Ultra Zero Help Mode:
- Some students may not realize it's a debugging exercise
- May need gentle nudging: "Compare the calculators carefully"
- Excellent for observing natural problem-solving patterns
- Don't reveal the purpose until they discover it themselves

### For All Modes:
- The trainer reference guide (`docs/trainer-bug-reference.md`) is always available to you
- Students will find different bugs depending on their approach
- Use their discoveries as teaching moments
- Adapt difficulty mid-session if needed

---

## 🔧 Technical Details

### Files Affected by Zero Help Setup:
- `README.md` → Minimal version
- `docs/bug-hunting-guide.md` → Moved to `.trainer-files-backup/`
- `docs/trainer-bug-reference.md` → Moved to backup
- `docs/bug-report-template.md` → **KEPT AVAILABLE**
- `PRD.md` → Moved to backup
- `tests/` → Removed
- `package.json` → Simplified (no test scripts)

### Files Affected by Ultra Zero Help Setup:
- All zero help changes, plus:
- `buggy-server.js` → Renamed to `server-alt.js`
- `buggy-version/` → Renamed to `version-b/`
- `dev-start.js` → Neutral output messages
- Server messages → No "buggy" or "debugging" mentions

### Backup Location:
All removed files are stored in `.trainer-files-backup/` and can be restored anytime.

---

## 🎓 Recommended Usage

### Workshop Progression:
1. **Start with Full Help** for new developers
2. **Progress to Zero Help** as skills develop  
3. **Use Ultra Zero Help** for advanced assessment

### Individual Assessment:
- **Full Help**: Baseline skill verification
- **Zero Help**: Problem-solving evaluation
- **Ultra Zero Help**: Advanced analytical assessment

### Team Exercises:
- Give teams different modes to compare approaches
- Have Zero Help teams develop their own methodologies
- Use Ultra Zero Help for leadership/senior developer evaluation

---

*Remember: The trainer reference guide is always available regardless of student mode!*