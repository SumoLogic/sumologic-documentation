# Tone Check — Sumo Logic Voice and Tone Validation

Validates documentation against Sumo Logic voice and tone rules, identifying violations and suggesting fixes.

## What this command does

When you invoke `/tone-check`, Claude will:

1. **Fetch style guide**. Get latest voice and tone rules
2. **Read documentation**. Analyze the specified file
3. **Identify violations**. Find voice/tone issues with line numbers
4. **Generate report**. Categorize by severity (Critical, Warning, Suggestion)
5. **Offer fixes**. Show specific corrections
6. **Apply changes**. Update with user approval

## When to use this command

* Before submitting a pull request
* After writing new documentation
* Validating existing docs for compliance
* Checking docs flagged in reviews
* Ensuring voice/tone consistency
* Training on Sumo Logic style

## Workflow

### Step 1: Fetch Style Guide

Always fetch before analyzing:
- https://www.sumologic.com/help/docs/contributing/style-guide/
- https://www.sumologic.com/help/docs/contributing/word-list/

These are the authoritative sources for voice and tone rules.

### Step 2: Get the File

Ask user which file to check if not specified:
- **Full path**: `/Users/kpohas/sumologic-documentation/docs/integrations/amazon-aws/cloudtrail.md`
- **Relative path**: `docs/integrations/amazon-aws/cloudtrail.md`
- **Filename**: `cloudtrail.md` (search for it)

### Step 3: Analyze Voice and Tone

Check for specific violations in order of severity:

## Critical Issues (Must Fix)

These MUST be fixed before merging.

### Wrong Pronouns

❌ **Violations:**
- "the user can configure"
- "users should navigate"
- "one can access"
- "customers will receive"

✅ **Correct:**
- "you can configure"
- "you should navigate" or "Navigate"
- "you can access"
- "you'll receive"

**Why it matters:** Directly addressing the reader as "you" is conversational and engaging. Third-person references ("the user", "one") create distance and feel institutional.

### Negative Contractions

❌ **Violations:**
- can't → **cannot**
- won't → **will not**
- don't → **do not**
- isn't → **is not**
- aren't → **are not**
- wasn't → **was not**
- weren't → **were not**
- hasn't → **has not**
- haven't → **have not**
- didn't → **did not**
- doesn't → **does not**
- shouldn't → **should not**
- wouldn't → **would not**
- couldn't → **could not**

✅ **Correct:** Always spell out negative contractions

**Why it matters:** This is a firm Sumo Logic style rule. Negative contractions must always be spelled out, even in conversational tone.

**Positive contractions are OK:**
- you'll, they're, we're, it's, you've, we've

### Incorrect Branding

❌ **Violations:**
- "Sumo" (in prose, not code)
- App doc without proper opener
- Source doc without proper opener

✅ **Correct:**
- "Sumo Logic" or "we"
- App docs: "The Sumo Logic app for [Vendor]..."
- Source docs: "The Sumo Logic source for [Vendor]..."

**Why it matters:** Consistent branding and proper document openers establish authority and professionalism.

## Warnings (Should Fix)

These should be fixed but won't block merging.

### Passive Voice

Passive voice is wordy and less direct.

❌ **Passive examples:**
- "Data is ingested by Sumo Logic"
- "The dashboard can be configured by users"
- "Logs are parsed and indexed"
- "Alerts are triggered when thresholds are exceeded"
- "The source can be set up in minutes"

✅ **Active alternatives:**
- "Sumo Logic ingests data"
- "You can configure the dashboard"
- "Sumo Logic parses and indexes logs"
- "Sumo Logic triggers alerts when thresholds are exceeded"
- "You can set up the source in minutes"

**How to identify:**
- Look for "is/are/was/were + past participle"
- Look for "by [actor]" phrases
- Ask: "Who/what is doing the action?"

**When passive is OK:**
- When the actor is unknown or unimportant
- In technical specifications
- In rare cases for emphasis

### "Please" in Directives

Don't use "please" in task instructions.

❌ **Violations:**
- "Please configure the source"
- "Please click **Save**"
- "Please refer to the documentation"
- "Please note that..."

✅ **Correct:**
- "Configure the source"
- "Click **Save**"
- "Learn more in the documentation" or "See [link]"
- "Note that..." or just state the fact

**Why it matters:** Instructional directives should be clear and confident, not apologetic. "Please" makes them sound tentative.

### "Must" Instead of "Need To"

Prefer "need to" over "must" for a friendlier tone.

❌ **Violations:**
- "You must configure authentication"
- "Users must have admin access"
- "You must restart the service"

✅ **Correct:**
- "You need to configure authentication"
- "You need admin access"
- "You need to restart the service"

**Exception:** "Must" is OK for hard requirements in technical specifications or legal compliance.

### Filler Adjectives

Remove words that add no meaning.

❌ **Common fillers:**
- **very** (very important, very useful)
- **simply** (simply click, simply add)
- **just** (just navigate, just enter)
- **easy** (easy to use, easy to configure)
- **straightforward** (straightforward process)
- **quickly** (quickly set up) — unless specific time is meant
- **easily** (easily configure)
- **basic** (basic setup) — unless contrasting with advanced

✅ **Correct:**
- "important" (not "very important")
- "click" (not "simply click")
- "navigate" (not "just navigate")
- "configure" (not "easy to configure")
- Remove or rewrite without filler

**Why it matters:** Filler words dilute meaning and make content less confident. They often telegraph that something is harder than claimed.

## Suggestions (Nice to Have)

These improve quality but are lower priority.

### Overly Formal Language

Replace stiff, institutional language with conversational alternatives.

❌ **Formal:**
- utilize → **use**
- in order to → **to**
- due to the fact that → **because**
- at this point in time → **now**
- in the event that → **if**
- prior to → **before**
- subsequent to → **after**
- commence → **start, begin**
- terminate → **end, stop**
- ascertain → **find out, determine**
- facilitate → **help, enable**
- leverage → **use**

✅ **Conversational:** Use simpler alternatives

### Uncommon Contractions

Avoid contractions that sound awkward when read aloud.

❌ **Uncommon:**
- should've
- it'll
- they'd
- you'd
- there'd

✅ **Alternatives:**
- "should have" or rewrite
- "it will" or rewrite
- "they would" or rewrite
- "you would" or rewrite
- "there would" or rewrite

**Common contractions are OK:**
- you'll, they're, we're, it's, you've, we've, that's, here's

### Regional Idioms

Avoid phrases that may not translate well.

❌ **Regional idioms:**
- "hit the ground running"
- "low-hanging fruit"
- "ballpark figure"
- "touch base"
- "circle back"
- "boil the ocean"

✅ **Clear alternatives:**
- "start quickly"
- "quick wins" or "easy improvements"
- "rough estimate"
- "check in" or "follow up"
- "revisit this"
- "attempt too much"

### Step 4: Generate Report

Format the report with severity levels:

```markdown
# Tone Check Report
**File**: docs/integrations/amazon-aws/cloudtrail.md
**Date**: March 23, 2026
**Status**: ⚠️ 12 issues found

## Summary
- 3 Critical issues (must fix)
- 6 Warnings (should fix)
- 3 Suggestions (nice to have)

---

## Critical Issues (Must Fix)

### Wrong Pronouns (2 instances)

**Line 45:**
```
the user can configure the source
```
→ Should be: `you can configure the source`

**Line 67:**
```
Users should navigate to the Collection page
```
→ Should be: `You should navigate to the Collection page` or `Navigate to the Collection page`

---

### Negative Contractions (1 instance)

**Line 89:**
```
The field can't be modified after creation
```
→ Should be: `The field cannot be modified after creation`

---

## Warnings (Should Fix)

### Passive Voice (4 instances)

**Line 23:**
```
Data is collected by the Collector
```
→ Should be: `The Collector collects data`

**Line 34:**
```
Logs are parsed and indexed by Sumo Logic
```
→ Should be: `Sumo Logic parses and indexes logs`

**Line 56:**
```
The dashboard can be customized by users
```
→ Should be: `You can customize the dashboard`

**Line 78:**
```
Alerts are triggered when thresholds are exceeded
```
→ Should be: `Sumo Logic triggers alerts when thresholds are exceeded`

---

### "Please" in Directives (2 instances)

**Line 12:**
```
Please click **Save** to apply changes.
```
→ Should be: `Click **Save** to apply changes.`

**Line 91:**
```
Please refer to the troubleshooting guide for help.
```
→ Should be: `See the troubleshooting guide for help.` or `Learn more in the troubleshooting guide.`

---

## Suggestions (Nice to Have)

### Filler Words (3 instances)

**Line 15:**
```
Simply click the **Add** button to begin.
```
→ Should be: `Click the **Add** button to begin.`

**Line 42:**
```
This feature is very important for security.
```
→ Should be: `This feature is important for security.`

**Line 73:**
```
The source is easy to configure in just a few steps.
```
→ Should be: `Configure the source in a few steps.` or `You can configure the source in a few steps.`

---

## Next Steps

Would you like me to:
1. **Auto-fix all issues**. Apply all corrections automatically
2. **Fix critical issues only**. Just fix the must-have items
3. **Show specific fixes**. Let me walk through each fix
4. **Generate checklist**. Create a manual review checklist
5. **Export report**. Save this report as a markdown file
```

### Step 5: Offer Fixes

After presenting the report, ask what the user wants to do:

**Option 1: Auto-fix all**
- Apply all corrections using Edit tool
- Show summary of changes made
- Re-run tone check to verify

**Option 2: Fix by severity**
- Critical only
- Critical + warnings
- Custom selection

**Option 3: Manual review**
- User fixes themselves
- Provide checklist
- Available for questions

## Safety Guidelines

- **NEVER modify automatically without asking**. always present report first
- **Provide context**. explain WHY something violates tone rules, not just WHAT
- **Show specific fixes**. don't just flag issues, suggest corrections with line numbers
- **Preserve technical accuracy**. tone fixes should not change meaning
- **Respect user decisions**. if they decline a fix, respect that choice

## What NOT to Flag

1. **Code blocks**. Don't check voice/tone in code snippets
2. **Quoted content**. Don't flag violations in quotations
3. **Product names**. Don't flag "Sumo" in product names like "Sumo App"
4. **URLs and paths**. Don't check tone in technical identifiers
5. **Examples of wrong usage**. Don't flag intentionally incorrect examples
6. **Comments or notes**. May use different tone

## Edge Cases

### No Issues Found

If content passes all checks:
```markdown
# Tone Check Report
**File**: docs/integrations/amazon-aws/cloudtrail.md
**Status**: ✅ All checks passed

This document meets all Sumo Logic voice and tone standards:
- No pronoun violations
- No negative contractions
- No passive voice
- No "please" in directives
- No filler words
- Proper branding

Great work!
```

### Too Many Issues

If there are 20+ violations:
```markdown
# Tone Check Report
**Status**: ⚠️ 47 issues found

This document has significant voice and tone issues. I recommend:

1. Start with critical issues (12 found)
2. Review patterns (passive voice appears 23 times)
3. Consider rewriting sections instead of fixing individually
4. Use /rewrite-intro for the opening
5. Use /simplify for complex sections

Would you like me to:
- Fix all critical issues first?
- Rewrite the most problematic sections?
- Provide a training overview of the main issues?
```

### Mixed Content Types

Different sections may have different standards:
- **Prose**: Apply all voice/tone rules
- **Code**: Skip tone checks
- **Examples**: Check explanatory text, not examples themselves
- **Quotes**: Don't check quoted content
- **Technical specs**: More lenient on passive voice

### Document-Specific Exceptions

Some documents may have valid exceptions:
- **API reference**: May use passive voice for specifications
- **Release notes**: May use past tense and passive voice
- **Legal/compliance**: May need formal language
- **Migration guides**: May reference "users" when describing old vs. new behavior

Flag these as suggestions, not critical issues.

## After the Tone Check

Suggest next steps:
- If many issues: Use `/rewrite-intro` or `/simplify` on problematic sections
- If clean: Ready for PR
- If medium issues: Fix and re-run tone check
- Consider running `/audit-doc` for full quality check

## Common Patterns

### Serial Offenders

**Passive voice throughout:**
```
Recommend: "I found 15 instances of passive voice. Would you like me to convert them all to active voice?"
```

**Wrong pronouns everywhere:**
```
Recommend: "The document consistently uses 'users' instead of 'you'. Let me update all 12 instances."
```

**Filler word addiction:**
```
Recommend: "'Simply' appears 8 times and 'just' appears 11 times. These can all be removed."
```

### One-Off Violations

For 1-2 violations, just fix them:
```
"Found one negative contraction on line 45. Should I fix it?"
```

## Tips for Running Tone Checks

1. **Run early and often**. Catch issues before they multiply
2. **Check before PRs**. Don't let violations reach review
3. **Use with /simplify**. Tone check after simplifying content
4. **Train your eye**. Learn common patterns to avoid them
5. **Focus on critical first**. Don't get bogged down in suggestions
6. **Batch similar fixes**. Fix all passive voice at once
7. **Re-run after fixes**. Verify all issues resolved
