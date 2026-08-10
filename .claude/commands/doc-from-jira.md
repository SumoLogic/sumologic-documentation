# Doc from Jira — Scaffold a Doc from a Jira Ticket

Pulls a Jira ticket from the DOCS project, extracts the content requirements, and scaffolds a fully structured documentation file ready for writing. Eliminates the blank-page problem and keeps the doc aligned with the ticket spec from the start.

## What this command does

When you invoke `/doc-from-jira`, Claude will:

1. **Fetch the Jira ticket**. Pull title, description, acceptance criteria, and linked resources
2. **Determine doc type**. Feature, how-to, concept, reference, or troubleshooting
3. **Infer the file path**. Based on the technical area and content type
4. **Scaffold the doc**. Generate a file with correct frontmatter, structure, and placeholder sections pre-populated from the ticket
5. **Update sidebars.ts**. Add the new doc to navigation (with user approval)
6. **Link back to Jira**. Set the Jira ticket to In Progress if not already

## When to use this command

* Starting a new doc for a DOCS ticket
* When a ticket has a detailed description or acceptance criteria worth preserving
* For tickets with linked specs, PRDs, or engineering docs to pull context from
* When you want to ensure the doc structure is aligned with what was requested

## When NOT to use this command

* **App integrations** — use `/app-doc` instead
* **Cloud-to-Cloud sources** — use `/c2c-source-doc` instead
* **Release notes** — use the appropriate `/release-note-*` command instead
* Tickets that do not require a net-new doc (pure updates, typo fixes)

---

## Workflow

### Step 1: Get the ticket number

If the user provides a ticket number (e.g., `DOCS-1234`), use it directly.

If the user says "use my current ticket" or "use the branch ticket", extract the ticket number from the current git branch name (pattern: `DOCS-\d+`).

If no ticket is found, ask the user for the ticket number.

### Step 2: Fetch the ticket

Use the Jira MCP tool to fetch the ticket:
- **Cloud ID**: `247075db-3b0b-4f1b-92db-51683ab743a6`
- **Issue key**: the provided DOCS-XXXX number

Extract from the ticket:
- **Summary** (title)
- **Description** — full body including any acceptance criteria, requirements, or spec notes
- **Assignee**
- **Labels** or components (for routing to the right doc area)
- **Linked issues** or remote links (PRDs, engineering specs, Confluence pages — note them for reference)

If the ticket has a Confluence link or spec document linked, note the URL so the user can reference it while writing.

### Step 3: Determine doc type

Analyze the ticket summary and description to determine the doc type:

| Doc type | Signals in ticket |
|----------|------------------|
| **Feature doc** | "document the new X feature", "add docs for X", "X was released" |
| **How-to guide** | "how to configure", "steps to set up", "walkthrough for" |
| **Concept doc** | "explain X", "overview of X", "what is X" |
| **Reference doc** | "list all X", "API reference for X", "parameters for X" |
| **Troubleshooting doc** | "common errors for X", "troubleshooting X", "why does X fail" |

If unclear from the ticket, ask the user which type fits best. Offer the two most likely options based on the description.

### Step 4: Infer the file path

Use the technical area and doc type to suggest the most likely file path.

**Use the Jira technical area field if available**, or infer from the ticket description using the keyword hints from the jira command:

| Technical area | Base path |
|---------------|-----------|
| Alerts | `docs/alerts/` |
| APIs | `docs/api/` |
| APM | `docs/apm/` |
| Apps/Integrations | `docs/integrations/` |
| Automation | `docs/platform-services/automation-service/` |
| Cloud SIEM | `docs/cse/` |
| Cloud SOAR | `docs/cloud-soar/` |
| Collectors/Sources | `docs/send-data/` |
| Dashboards | `docs/dashboards/` |
| Getting Started | `docs/get-started/` |
| Log Search | `docs/search/` |
| Manage | `docs/manage/` |
| Metrics | `docs/metrics/` |
| Observability | `docs/observability/` |
| Platform Services | `docs/platform-services/` |

Suggest a full file path and filename. Use kebab-case. Present it to the user for confirmation before creating the file.

Check that the file does not already exist before proposing the path. If a file already exists at the proposed path, alert the user and ask if they want to edit the existing file instead.

### Step 5: Generate frontmatter

Derive each field from the ticket content:

```yaml
---
id: {filename-without-extension}
title: {Title derived from ticket summary — Title Case, under 60 chars}
sidebar_label: {Shorter label if title is over 40 chars}
description: {1–2 sentences drawn from the ticket description — 140–160 chars, action-led}
keywords:
  - {primary feature or product name from ticket}
  - {secondary keyword from description}
  - {use case or action keyword}
---
```

**Rules:**
- `id` must match the filename without `.md`
- `title` must be Title Case and under 60 characters; if the ticket summary is longer, shorten it and note the change
- `description` must be 140–160 characters; do not start with "This page" or "This doc"
- Do not add a `slug` field unless the user explicitly requests it
- Do not add `robots: noindex` unless the user explicitly requests it

### Step 6: Generate the doc scaffold

Use the appropriate structure for the doc type. Pre-populate placeholder sections with context extracted from the ticket. Use `{placeholder}` markers for content the writer needs to fill in manually.

#### Feature doc scaffold

```markdown
---
{frontmatter}
---

{Opening paragraph — what the feature is and why it matters. Drawn from ticket description. 2–3 sentences.}

## About {feature name}

{Detailed explanation. Drawn from ticket description or spec. Replace with full content.}

## Prerequisites

{From ticket acceptance criteria or description. Add a placeholder if not specified.}

- {Requirement 1.}
- {Requirement 2.}

## Configure {feature name}

{Step-by-step instructions. Add numbered steps based on ticket requirements.}

1. {Step 1.}
1. {Step 2.}
1. {Step 3.}

## {Additional sections as needed based on ticket}

## Additional information

- [{Related doc title}]({path}).
```

#### How-to guide scaffold

```markdown
---
{frontmatter}
---

{Opening paragraph — what the user will accomplish. 1 sentence.}

## Prerequisites

- {Requirement 1 from ticket.}
- {Requirement 2 from ticket.}

## Step 1: {First major action from ticket}

{Instructions.}

## Step 2: {Second major action}

{Instructions.}

## Verify

{How to confirm success.}

## Next steps

- [{Related task}]({path}).
```

#### Concept doc scaffold

```markdown
---
{frontmatter}
---

{Opening paragraph — direct definition of the concept. 2–3 sentences from ticket.}

## Key concepts

- **{Term 1}**: {Definition.}
- **{Term 2}**: {Definition.}

## How it works

{Explanation of the concept, architecture, or workflow. From ticket description.}

## Use cases

{When and why you would use this.}

## Additional information

- [{Related doc}]({path}).
```

#### Reference doc scaffold

```markdown
---
{frontmatter}
---

{Opening paragraph — what this reference covers. 1–2 sentences.}

## {Category from ticket}

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| {param1} | {type} | {description} | {Yes/No} |

## Examples

```{language}
{example from ticket or placeholder}
```

## Additional information

- [{Related doc}]({path}).
```

#### Troubleshooting doc scaffold

```markdown
---
{frontmatter}
---

{Opening paragraph — what issues this page covers. From ticket.}

## {Issue 1 from ticket}

**Symptom**: {What the user experiences.}

**Cause**: {Why this happens.}

**Solution**:

1. {Step to resolve.}
1. {Step to verify.}

## Get help

If you continue to experience issues:
- [Contact Support](https://support.sumologic.com/support/s).
- [Visit Community](https://sumologic.my.site.com/support/s/).
```

### Step 7: Write the file

Use the Write tool to create the file at the confirmed path. After writing, confirm the path and tell the user which sections need manual completion.

### Step 8: Add to sidebars.ts (with approval)

Ask the user if they want the doc added to `sidebars.ts` now or after the content is written.

If they say yes:
1. Read `sidebars.ts`
2. Find the category matching the doc's path
3. Add the doc ID to the items array
4. Maintain alphabetical order within the category (unless the category is ordered by importance)
5. Show the proposed change and wait for approval before writing

If they say later, remind them in the post-completion message.

### Step 9: Set Jira ticket to In Progress (optional)

Ask if the user wants to move the Jira ticket to **In Progress**. If yes, use the Jira MCP tool to transition the ticket. Do not change the ticket status without asking.

---

## Post-completion message

After creating the file, tell the user:

```
Doc scaffolded from DOCS-{ticket_number}

File created: {file_path}
Jira ticket: https://sumologic.atlassian.net/browse/DOCS-{ticket_number}

Sections to complete:
- {List of placeholder sections}

Next steps:
1. Fill in the placeholder sections
2. Add to sidebars.ts (if not done): find {category} in sidebars.ts and add '{doc-id}'
3. Run yarn start to preview: http://localhost:3000/docs/{doc-path}
4. Run /seo-audit {file-path} to check discoverability before PR
5. Submit PR: "DOCS-{ticket_number} - {doc title}"
```

---

## Error handling

**Jira tools unavailable (MCP not connected):**
- Do not suggest installing a Jira CLI or any command-line Jira tool
- Tell the user: "It looks like the Atlassian MCP server may not be connected. Run `/mcp` in
  Claude Code to check the connection status and authenticate."

**Ticket not found:**
- Show the ticket number that was tried
- Ask the user to verify the number
- Offer to search for tickets by keyword using the Jira tool

**Ticket is a bug or task with no content requirements:**
- Tell the user this ticket does not appear to require a new doc
- Offer to open the ticket so the user can review it
- Ask if they want to create a doc anyway

**File already exists at the proposed path:**
- Alert the user immediately
- Show the existing file's title and description
- Ask if they want to edit the existing file, use a different path, or overwrite (with confirmation)

**Title over 60 characters:**
- Show the original ticket summary
- Suggest a shortened version
- Ask the user to confirm before using it

**Description cannot be derived from ticket:**
- Note that the description field needs to be written manually
- Leave a `{TODO: write description}` placeholder in the frontmatter
- Flag it in the post-completion message

---

## Safety principles

* **Do not create a file without user confirmation of the path**
* **Do not alter Jira ticket status without asking**
* **Do not fabricate content** — scaffold only; placeholder text should be clearly marked
* **Preserve ticket content** — use the ticket description verbatim where it fits; do not paraphrase into incorrect facts
* **Check for existing files** before writing to avoid accidental overwrites
