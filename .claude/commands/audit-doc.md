# Audit Doc — Documentation Quality Check

Use this command to audit a doc for style, structure, links, and frontmatter compliance — run it before submitting any PR, after creating a new doc, or when reviewing community contributions.

## Gotchas

- H1 headings and the `title` frontmatter field use **Title Case**. H2, H3, H4 use **sentence case** (only first word and proper nouns capitalized).
- Skip warnings for legacy docs with an established style, docs tagged `noindex` (temporary drafts), or third-party content not meant to be modified.
- `/audit-doc` does not check SEO/AEO/GEO signals — run `/seo-audit` separately for discoverability.

## When to use this command

* Before submitting a PR to check doc quality
* After creating a new doc to validate structure
* When updating existing docs to ensure consistency
* To identify broken links or missing images
* When reviewing community contributions

## Workflow

### Step 1: Identify the doc to audit

Ask the user for:
* **File path**: Full path to the markdown file to audit
* **Doc type** (optional): App, feature, how-to, concept, reference, release note
* **Strictness level** (optional): Lenient, standard, or strict

If no file path provided, ask user to specify the file.

### Step 2: Read the file

Use the Read tool to read the complete file content.

### Step 3: Analyze frontmatter

Check for required fields and proper formatting:

**Universal requirements:**
* [ ] `id` field present and matches filename (without .md)
* [ ] `title` field present, Title Case, under 60 characters
* [ ] No frontmatter syntax errors (proper YAML format)

**For docs (not release notes):**
* [ ] `description` field present, 100-160 characters
* [ ] Description starts with "The Sumo Logic..."
* [ ] `sidebar_label` (if present) is shorter than title

**For app docs:**
* [ ] `image` field with valid S3 URL or local path
* [ ] `tags` includes "apps" and vendor slug

**For release notes:**
* [ ] `hide_table_of_contents: true` present
* [ ] `image` uses standard Sumo Logic preview URL
* [ ] `keywords` present (unless Collector type)

### Step 4: Check content structure

**Heading hierarchy:**
* [ ] Only one H1 heading (the title in frontmatter)
* [ ] H2 sections used for main sections
* [ ] No skipped heading levels (H2 → H4 without H3)
* [ ] H1 uses Title Case; H2, H3, H4 use sentence case (only first word and proper nouns capitalized)

**Required sections (by doc type):**

**App docs:**
* [ ] Introduction paragraph starting with "The Sumo Logic app for..."
* [ ] "Log and metric types" or "Sample log messages" section
* [ ] "Installing the {App}" section
* [ ] "Viewing {App} dashboards" section
* [ ] "Upgrading the {App}" section
* [ ] "Uninstalling the {App}" section

**Feature docs:**
* [ ] Overview section
* [ ] Prerequisites or requirements (if applicable)
* [ ] Step-by-step instructions
* [ ] Examples or use cases

**How-to guides:**
* [ ] Clear objective statement
* [ ] Prerequisites section
* [ ] Numbered steps
* [ ] Verification or next steps

**Release notes:**
* [ ] Date formatted correctly
* [ ] Changes categorized appropriately
* [ ] Version numbers formatted correctly (if applicable)

### Step 5: Validate links and images

**Links:**
* [ ] All internal links use relative paths starting with `/docs/`
* [ ] No broken fragment links (e.g., `#non-existent-anchor`)
* [ ] External links use HTTPS
* [ ] Link text is descriptive (not "click here")
* [ ] No bare URLs (wrap in markdown link syntax)

**Images:**
* [ ] Image paths valid (exist in `/static/img/` or S3)
* [ ] Alt text provided for all images
* [ ] Image width specified (recommended: 800px for screenshots)
* [ ] useBaseUrl used for local images
* [ ] Proper import statement if using useBaseUrl

### Step 6: Check style guide adherence

Apply Sumo Logic style guide rules:

**Writing style:**
* [ ] Active voice used (not passive)
* [ ] Second person ("you") for user instructions
* [ ] Present tense for current features
* [ ] Concise, clear sentences
* [ ] No marketing speak or excessive adjectives

**Formatting:**
* [ ] Code blocks have language tags (```yaml, ```json, etc.)
* [ ] UI elements use **bold** format
* [ ] File paths and commands use backticks
* [ ] Lists use consistent punctuation
* [ ] No trailing whitespace

**Terminology:**
* [ ] "Sumo Logic" (not "SumoLogic" or "Sumo")
* [ ] Consistent product names (Cloud SIEM, Cloud SOAR)
* [ ] Proper capitalization for features and products
* [ ] No contractions in formal documentation

**Common issues:**
* [ ] No double spaces after periods
* [ ] Consistent list formatting (all bullets or all numbers)
* [ ] Proper date formatting by doc type
* [ ] Version numbers formatted consistently

### Step 7: Generate audit report

Create a comprehensive report with:

**Summary:**
* Total issues found
* Severity breakdown (critical, warning, suggestion)
* Overall quality score (Pass, Pass with warnings, Needs work)

**Detailed findings by category:**
* Frontmatter issues (with specific field names)
* Structure issues (with line numbers)
* Link and image issues (with specific paths)
* Style guide violations (with examples)

**Actionable recommendations:**
* List specific changes needed
* Provide corrected examples where applicable
* Prioritize critical issues first

**Report format:**
```
📋 Documentation Audit Report
File: {file_path}
Type: {doc_type}
Date: {current_date}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ {pass_count} checks passed
⚠️  {warning_count} warnings
❌ {critical_count} critical issues

Overall: {Pass|Pass with warnings|Needs work}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL ISSUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{critical_issues}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WARNINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{warnings}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUGGESTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{suggestions}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{recommendations}
```

### Step 8: Offer to fix issues

After presenting the audit report, ask the user if they would like Claude to:
* Fix all critical issues automatically
* Fix specific issues (user selects which)
* Provide detailed guidance for manual fixes
* Generate a checklist for the PR description

**Important**: Only make changes if explicitly requested by the user.

## Issue severity levels

**Critical** (must fix before merging):
* Missing required frontmatter fields
* Broken links (404 errors)
* Missing images
* Invalid YAML syntax
* Incorrect file structure for doc type

**Warning** (should fix):
* Style guide violations
* Inconsistent formatting
* Missing alt text
* Suboptimal heading hierarchy
* Description too short/long

**Suggestion** (nice to have):
* Could be more concise
* Consider adding examples
* Link to related documentation
* Add screenshots for clarity
* Improve SEO with better keywords

## Doc type-specific checks

### App Documentation

**Required elements:**
* App icon specified in frontmatter
* Standard app template sections present
* Reusable snippets properly imported
* Dashboard descriptions with screenshots
* Sample log messages or queries

**Common issues:**
* Missing "Installing the app" section
* No dashboard screenshots
* Description doesn't start with "The Sumo Logic app for..."
* Missing CID URL mapping (check cid-redirects.json)
* Not listed in sidebar or hub page

### Release Notes

**By type:**

**Cloud SIEM (CSE):**
* Date format with ordinal suffix (12th, 3rd)
* Rule IDs follow pattern (MATCH-SXXXX, etc.)
* Parser paths use full hierarchy
* `[New]`/`[Updated]` tags present

**Collector:**
* Version numbers in **bold**
* CVE/GHSA references formatted correctly
* Section order: Security → Bug → Feature

**Developer:**
* Title starts with "Month DD, YYYY - "
* Keywords confirmed with user
* Breaking changes clearly marked

**Cloud SOAR:**
* Date format: "Month DD, YYYY" (zero-padded)
* Content Release vs Application Update format
* Keywords: automation service, cloud soar, soar

**Service:**
* Title format: "{Feature} ({Category})"
* No date in title
* Category label correct: (Apps), (Collection), etc.

### Feature Documentation

**Required elements:**
* Clear overview of what the feature does
* Prerequisites or requirements section
* Step-by-step instructions
* Examples or use cases
* Links to related docs

**Common issues:**
* Too much marketing language
* Missing prerequisites
* No examples provided
* Unclear instructions
* Not linked from parent page

## Audit checklist summary

Use this checklist template for the report:

**Frontmatter (Critical)**
- [ ] Required fields present and valid
- [ ] Title formatted correctly
- [ ] Description within character limits
- [ ] Tags/keywords appropriate

**Structure (Warning)**
- [ ] Heading hierarchy correct
- [ ] Required sections present
- [ ] Logical organization
- [ ] No orphaned content

**Links & Images (Critical for broken, Warning for style)**
- [ ] All links valid (not 404)
- [ ] Relative paths used correctly
- [ ] Images exist and load
- [ ] Alt text provided

**Style Guide (Warning/Suggestion)**
- [ ] Active voice
- [ ] Clear, concise language
- [ ] Proper terminology
- [ ] Consistent formatting

**Technical (Critical/Warning)**
- [ ] Code blocks have language tags
- [ ] Commands/paths use correct formatting
- [ ] Examples work correctly
- [ ] Version numbers accurate

## Safety principles

* **Do not modify files automatically**. Always ask permission first
* **Provide specific line numbers** for issues when possible
* **Explain why something is an issue**, not just that it is
* **Prioritize critical issues** that break builds or user experience
* **Be constructive**. Suggest fixes, don't just criticize
* **Consider context**. Some style variations may be intentional
* **Check reusable content**. Snippets may be defined elsewhere

## Post-audit options

After completing the audit, offer these options:

1. **Auto-fix critical issues**. Fix required frontmatter, broken links
2. **Fix specific issues**. User selects which to fix
3. **Generate PR checklist**. Create checklist from findings
4. **Detailed style guide**. Link to specific style guide sections
5. **Save audit report**. Export findings to file
6. **Run again**. After user makes changes manually

## Advanced features

**Comparative audit:**
Compare doc against similar docs in the category to identify inconsistencies.

**Batch audit:**
Audit multiple files in a directory and generate summary report.

**Trend analysis:**
Track common issues across multiple audits to identify systemic problems.

**Integration checking:**
* Verify doc is in sidebar navigation
* Check if hub page card exists
* Validate CID URL mapping
* Confirm cross-references

## Related commands

`/audit-doc` covers structure, style, links, frontmatter, and required sections. It does not
check SEO/AEO/GEO signals. For discoverability, run both:

* **`/seo-audit`** — checks title length, description quality, question headings, GEO patterns
* **`/geo-optimize`** — rewrites content to improve AI citation and search visibility
