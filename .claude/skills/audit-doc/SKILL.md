---
name: audit-doc
trigger: user_invoked
---

# Audit Doc — Documentation Quality Check

Use this skill when the user wants to check documentation quality, validate structure, or ensure adherence to Sumo Logic style guidelines.

## Trigger conditions

This skill should be invoked when:
- User asks to "audit a doc" or "check doc quality"
- User wants to validate documentation before submitting PR
- User mentions "review doc", "check style guide", or "validate frontmatter"
- User wants to find issues in documentation
- User references `/audit-doc` command

## What this skill does

Performs comprehensive quality checks on documentation by:
1. Reading and analyzing the specified markdown file
2. Validating frontmatter fields and format
3. Checking content structure and heading hierarchy
4. Validating links and images (paths, alt text, references)
5. Checking adherence to Sumo Logic style guide
6. Generating detailed audit report with severity levels
7. Offering to fix issues (with user permission)

## Instructions

Follow the detailed instructions in:
`.claude/commands/audit-doc.md`

Key points:

**Severity levels**:
- Critical: Must fix before merging (broken links, missing required fields)
- Warning: Should fix (style violations, formatting issues)
- Suggestion: Nice to have (improvements, enhancements)

**Doc-type specific checks**:
- App docs: Requires app template sections, icon, dashboard screenshots
- Release notes: Date format, version numbers, proper categorization
- Feature docs: Overview, prerequisites, instructions, examples
- C2C sources: Vendor config, authentication steps

**Report format**: Structured with summary, categorized findings, specific line numbers, actionable recommendations

**Safety**: NEVER modify files automatically — always ask user permission before making changes

**Post-audit options**: Auto-fix, selective fix, generate PR checklist, save report
