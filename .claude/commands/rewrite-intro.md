# Rewrite Intro — Documentation Opening Paragraph Rewrite

Rewrites the intro/opening paragraph of a documentation page to match Sumo Logic voice and tone standards.

## What this command does

When you invoke `/rewrite-intro`, Claude will:

1. **Fetch the style guide**. Get latest voice and tone rules from live style guide
2. **Read the documentation file**. Analyze the current introduction
3. **Identify issues**. Find voice/tone violations, branding issues, clarity problems
4. **Rewrite the intro**. Create a new opening that matches Sumo Logic standards
5. **Present changes**. Show before/after with explanation of what changed
6. **Apply edits**. Update the file with user approval

## When to use this command

* Improving existing documentation intros that don't match Sumo Logic voice
* Converting formal or stiff language to conversational tone
* Fixing branding issues (missing app/source openers)
* Simplifying overly complex opening paragraphs
* Applying 8th-grade reading level to introductions
* Fixing passive voice in opening content

## Workflow

### Step 1: Fetch Style Guide

Before rewriting, always fetch the live style guide:
- https://www.sumologic.com/help/docs/contributing/style-guide/
- https://www.sumologic.com/help/docs/contributing/word-list/

These contain the authoritative voice and tone rules.

### Step 2: Get the File

Ask the user which file to rewrite if not specified. Accept:
- **Full path**: `/Users/kpohas/sumologic-documentation/docs/integrations/amazon-aws/cloudtrail.md`
- **Relative path**: `docs/integrations/amazon-aws/cloudtrail.md`
- **Filename only**: `cloudtrail.md` (search for it)

### Step 3: Analyze Current Intro

Read the file and identify:

1. **The introduction section**
   - Usually first 1-3 paragraphs after frontmatter
   - Before the first H2 heading
   - May include multiple paragraphs

2. **Document type**
   - App doc (requires app opener)
   - C2C source doc (requires source opener)
   - Feature documentation
   - Tutorial or guide
   - Release note

3. **Current issues**
   - Voice and tone violations
   - Branding compliance
   - Reading level
   - Clarity and conciseness

### Step 4: Apply Rewrite Rules

#### Branding Requirements

**App docs MUST open with:**
```markdown
The Sumo Logic app for [Vendor] [what it does and why you'd use it].
```

Examples:
- "The Sumo Logic app for AWS CloudTrail provides comprehensive visibility into AWS API activity and security events."
- "The Sumo Logic app for Salesforce helps you monitor user activity, track performance, and analyze security events."

**C2C source docs MUST open with:**
```markdown
The Sumo Logic source for [Vendor] [what it does].
```

Examples:
- "The Sumo Logic source for Okta collects authentication logs, system logs, and user activity events."
- "The Sumo Logic source for GitHub ingests repository events, pull request activity, and security alerts."

#### Voice and Tone Principles

**Address reader as "you":**
- ❌ "Users can configure the source"
- ✅ "You can configure the source"
- ❌ "One should consider performance"
- ✅ "You should consider performance"

**Active voice:**
- ❌ "Data is collected by the Collector"
- ✅ "The Collector collects data"
- ❌ "Logs are parsed and indexed"
- ✅ "Sumo Logic parses and indexes logs"

**Conversational but professional:**
- ❌ "This document delineates the methodology for configuration"
- ✅ "This guide explains how to configure the source"
- ❌ "Utilize the subsequent instructions"
- ✅ "Follow these steps"

**8th-grade reading level:**
- Short sentences (under 20 words)
- Common words over technical jargon
- Simple sentence structure
- One idea per sentence

**No "please" in directives:**
- ❌ "Please configure the source"
- ✅ "Configure the source"
- ❌ "Please refer to the documentation"
- ✅ "Learn more in the documentation"

**Use "need to" not "must":**
- ❌ "You must configure authentication"
- ✅ "You need to configure authentication"

**No filler adjectives:**
- ❌ "very important", "simply click", "just add", "easy to use", "straightforward process"
- ✅ Remove or rewrite without filler

**Spell out negative contractions:**
- ❌ "can't", "won't", "don't", "isn't"
- ✅ "cannot", "will not", "do not", "is not"

#### Introduction Structure

Good intros typically follow this pattern:

1. **What this is** (1-2 sentences)
   - For apps: Branded opener + what it monitors
   - For sources: Branded opener + what data it collects
   - For features: What the feature does

2. **Why you'd use it** (1-2 sentences)
   - Key benefits
   - Main use cases
   - Problems it solves

3. **What you'll learn** (1 sentence, optional for tutorials/guides)
   - "This guide shows you how to..."
   - "You'll learn to..."

**Example - App doc intro:**
```markdown
The Sumo Logic app for AWS CloudTrail provides visibility into AWS account activity and API usage. The app includes dashboards that help you monitor user activity, detect security threats, and maintain compliance. This guide shows you how to install the app and configure data collection.
```

**Example - Source doc intro:**
```markdown
The Sumo Logic source for Okta collects authentication logs, system logs, and user activity events from your Okta organization. You can use this data to monitor login patterns, detect suspicious activity, and audit user permissions. This guide explains how to configure the source and verify data collection.
```

### Step 5: Present Rewrite

Show the user:

```markdown
## Current intro
[Show original text with line numbers]

## Rewritten intro
[Show new text]

## Changes made
- Fixed passive voice in sentence 2: "data is collected" → "the source collects data"
- Added proper app opener branding: "The Sumo Logic app for [Vendor]..."
- Removed filler words: "simply", "just", "easy" (3 instances)
- Spelled out "can't" → "cannot"
- Broke 42-word sentence into two shorter sentences
- Changed "users can" → "you can" (addressing reader directly)
- Simplified "utilize" → "use", "in order to" → "to"
- Reduced reading level from 11th grade to 8th grade
```

Be specific about what changed and why.

### Step 6: Apply Changes

After user approval:

1. **Use Edit tool** to replace the intro section
2. **Preserve all other content**. only replace the intro paragraphs
3. **Maintain formatting**. keep existing markdown structure, images, code blocks
4. **Confirm success**. Let user know the changes were applied

## Safety Guidelines

- **NEVER modify files automatically**. always show the rewrite and get user approval first
- **Preserve existing content**. only replace the intro section, don't touch anything else
- **Maintain formatting**. keep existing markdown structure, line breaks, spacing
- **Don't change frontmatter**. unless specifically asked
- **Verify document type**. apply correct branding rules (app vs. source vs. feature)

## Edge Cases

### No intro exists
If the doc has no introduction:
- Offer to write one from scratch
- Use document type to determine opener format
- Ask user for key information (what it does, why use it)

### Intro is already good
If intro already meets standards:
- Tell the user it's in good shape
- Suggest only minor tweaks if any
- Don't rewrite just for the sake of rewriting

### Multiple intro paragraphs
If there are 3+ intro paragraphs:
- Ask user which paragraphs to include in rewrite scope
- Consider if all are needed (may be too long)
- Suggest condensing if appropriate

### Different doc types
Apply appropriate rules:
- **App docs**: Must have app opener
- **Source docs**: Must have source opener
- **Feature docs**: No special opener, focus on clarity
- **Tutorials**: Include "what you'll learn"
- **Release notes**: Different format, may not need rewrite

### Technical content
If intro contains necessary technical terms:
- Keep technical terms that are unavoidable
- Define acronyms on first use
- Simplify surrounding prose
- Don't sacrifice accuracy for simplicity

## Examples

### Example 1: App Doc

**User:** `/rewrite-intro docs/integrations/amazon-aws/cloudtrail.md`

**Original:**
```
CloudTrail is utilized by organizations to monitor AWS API activity. The application can be used by users to gain visibility into account activity. Data is collected and visualized through various dashboards which are very helpful for security teams.
```

**Rewritten:**
```
The Sumo Logic app for AWS CloudTrail provides visibility into AWS account activity and API usage. You can monitor user actions, detect security threats, and maintain compliance with pre-built dashboards and alerts.
```

**Changes:**
- Added proper app opener: "The Sumo Logic app for AWS CloudTrail"
- Changed passive voice: "Data is collected" → "You can monitor"
- Addressed reader as "you" instead of "users"
- Removed filler: "very helpful"
- Simplified: "utilized" → "provides", "gain visibility" → "monitor"
- Combined ideas into two focused sentences

### Example 2: Source Doc

**User:** `/rewrite-intro docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/okta-source.md`

**Original:**
```
This source integration is designed to collect logs from Okta. Users must configure the source properly. The logs that are collected can include authentication events and system logs.
```

**Rewritten:**
```
The Sumo Logic source for Okta collects authentication logs, system logs, and user activity events from your Okta organization. You can use this data to monitor login patterns, detect suspicious activity, and audit user permissions.
```

**Changes:**
- Added proper source opener: "The Sumo Logic source for Okta"
- Removed passive voice: "logs that are collected" → "collects authentication logs"
- Changed "Users must" → "You can"
- Added value proposition (what you can do with the data)
- More specific about log types

### Example 3: Feature Doc

**User:** `/rewrite-intro docs/metrics/introduction.md`

**Original:**
```
Metrics are utilized within Sumo Logic to provide quantitative measurements of your infrastructure and applications. This functionality is very powerful and can be used by organizations to monitor performance. The system enables users to create visualizations.
```

**Rewritten:**
```
Metrics provide quantitative measurements of your infrastructure and applications. You can track performance trends, set up alerts, and create visualizations to monitor system health in real time.
```

**Changes:**
- Removed passive voice: "are utilized" → "provide"
- Changed "users" → "You"
- Removed filler: "very powerful"
- Simplified: "This functionality" → direct statement
- Added specific use cases (track, alert, visualize)

## Tips for Good Rewrites

1. **Lead with value**. Start with what it is and what it does, not background
2. **Be specific**. "monitor login patterns" not "gain visibility"
3. **Show benefits**. Tell the reader why they should care
4. **Keep it short**. 2-3 sentences is usually enough for an intro
5. **Match document type**. Apps and sources have specific openers
6. **Test reading level**. Read it aloud; if it sounds stiff, simplify
7. **Focus on the user**. "You can..." not "This allows users to..."

## After the Rewrite

Once applied, suggest:
- Review the rest of the document for similar issues
- Consider using `/tone-check` on the full file
- Verify that the intro flows into the next section
