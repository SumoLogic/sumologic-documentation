# Review Pull Request — Documentation Quality Review

Reviews all changed `.md` files in a pull request using the same checks as `/audit-doc`, then produces a single consolidated PR review comment.

## Workflow

### Step 1: Get the PR

If a PR number or URL is provided, use it. Otherwise run `gh pr list` and ask the user which PR to review.

Extract the PR number from URLs (e.g., `https://github.com/.../pull/6707` → `6707`).

### Step 2: Fetch PR details and diff

Run in parallel:
- `gh pr view <number> --json title,body,author,headRefName,baseRefName,changedFiles`
- `gh pr diff <number>`

### Step 3: Identify changed doc files

From the diff, collect all files with a `.md` extension that were added or modified (ignore deletions). Skip non-doc files (`.ts`, `.json`, `.js`, `.yml`, etc.).

If no `.md` files changed, report: "No documentation files changed in this PR."

### Step 4: Determine doc type for each file

Use the file path to infer the doc type:

| Path pattern | Doc type |
|---|---|
| `blog-service/`, `blog-collector/`, `blog-cse/`, `blog-csoar/`, `blog-developer/` | Release note |
| `docs/integrations/` or `docs/platform-services/automation-service/app-central/` | App doc |
| `docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/` | C2C source doc |
| Everything else under `docs/` | Feature / how-to / concept / reference |

If the type is ambiguous, read the file's frontmatter `tags` field or intro paragraph to confirm.

### Step 5: Read each changed file

Use the Read tool to fetch the full current content of each changed `.md` file (not just the diff lines — the full file is needed to check structure, frontmatter, and links in context).

### Step 6: Apply audit-doc checks to each file

Apply all checks from `/audit-doc` — frontmatter, structure, links, images, style guide, doc-type-specific requirements — using the same severity levels:

- **Critical**: must fix before merging
- **Warning**: should fix
- **Suggestion**: nice to have

See `/audit-doc` for the full checklist. Key things to flag in a PR review:

- Missing or invalid frontmatter fields (`id`, `title`, `description`)
- Branding violations ("Sumo" instead of "Sumo Logic", wrong app/source opener)
- Wrong heading case (sentence case required — only first word and proper nouns capitalized)
- Missing required sections for the doc type
- Negative contractions (can't, won't, don't → cannot, will not, do not)
- "the user" or "users" instead of "you"
- Bare URLs, missing alt text, missing code block language tags
- Release note format violations (date format, `[New]`/`[Updated]` tags, rule ID patterns)

Focus on issues introduced by this PR. If the file has pre-existing issues that weren't touched by the diff, note them briefly but do not block the PR over them.

### Step 7: Produce the review

Output a single consolidated review covering all changed files. Format:

```
## PR review: {PR title}

{N} doc file(s) changed: {list of filenames}

---

### {filename}
**Type**: {doc type}

**Critical issues** (must fix):
- {issue with line reference if possible}

**Warnings** (should fix):
- {issue}

**Suggestions**:
- {issue}

✅ No issues / ⚠️ {N} warnings / ❌ {N} critical

---

### {next filename}
...

---

## Overall

{Pass | Pass with warnings | Needs work}

{1-2 sentence summary of the most important things to address}
```

If a file has no issues: `✅ {filename} — looks good.`

### Step 8: Offer next steps

After the review, offer:
- "Run `/audit-doc {file}` to get a detailed report with line numbers and fix options"
- "Run `/seo-audit {file}` to check discoverability signals"

## Constraints

- **Read-only**. Do not edit any files. The purpose is to surface issues, not fix them.
- **Diff-aware**. Prioritize issues in lines added or modified by the PR. Flag pre-existing issues separately as "pre-existing" if needed.
- **Concise**. This is a PR review, not a full audit report. One line per issue where possible.
- **No duplication**. The checks live in `/audit-doc`. Do not re-list every rule here — apply them, don't describe them.
