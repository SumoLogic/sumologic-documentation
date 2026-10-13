# Jira – DOCS Project

You are helping manage Jira tickets for the Sumo Logic documentation team.

## How Jira access works

All Jira operations use the **Atlassian MCP server** — there is no Jira CLI and you must never
suggest installing one. If a Jira operation fails or tools are unavailable, the only correct
response is:

> "It looks like the Atlassian MCP server may not be connected. Run `/mcp` in Claude Code to
> check the connection status and authenticate."

Never suggest `brew install jira`, `npm install jira-cli`, or any other CLI tool as a fallback.

## Project context

* **Jira project:** DOCS
* **Base URL:** https://sumologic.atlassian.net/browse/DOCS
* **Cloud ID:** 247075db-3b0b-4f1b-92cb-51683ab743a6

## Ticket intake

External requests from Sumo Logic employees come in via the JSM portal:
https://sumologic.atlassian.net/servicedesk/customer/portal/26/group/75/create/378

Tickets created via this command are created directly in the DOCS project and
are distinct from portal-submitted requests.

## Technical Area values

**Assignee and due date are set automatically by Jira Automation** based on Technical Area and Priority — do not set these manually.

Use this list to select the correct Technical Area when creating or updating tickets:

- Alerts (Monitors, Sched. Search, Webhooks)
- APIs
- APM (Traces, RUM)
- Apps/Integrations
- Automation
- Cloud SIEM
- Cloud SOAR
- Collectors/Sources
- Dashboards
- Dojo AI
- Getting Started (Product/Observability)
- Getting Started (Security)
- Log Search
- Logs for Security
- Manage (Administrator)
- Manage (Analyst)
- Manage (Data Forwarding)
- Manage (Fields, FERs, Partitions, Data Tiers, Ingestion, Sched Views, Billing, Sharing)
- Manage (Security, Users, Roles)
- Metrics
- Observability (AWSO)
- Observability (Azure)
- Observability (Kubernetes)
- Observability (SLO)
- Observability (Tracing)
- Other
- Other (Analytics)
- Other (Optimization - GEO/SEO)
- Other (Site Development & AI)
- Platform Services
- Sensu
- Threat Intelligence

## Technical area keyword hints

Use these keywords and file path patterns to suggest the most relevant Technical Area:

**Keywords in content/descriptions:**

- **Alerts**: monitor, alert, scheduled search, webhook, notification
- **APIs**: API, endpoint, REST, SDK, authentication, token
- **APM**: trace, span, RUM, real user monitoring, application performance
- **Apps/Integrations**: app, integration, connector, third-party
- **Automation**: automation, playbook, workflow, orchestration
- **Cloud SIEM**: SIEM, security, threat, detection, rule
- **Cloud SOAR**: SOAR, incident response, security orchestration
- **Collectors/Sources**: collector, source, ingestion, data collection
- **Dashboards**: dashboard, panel, visualization, chart
- **Dojo AI**: Dojo, AI assistant, AI features
- **Getting Started**: onboarding, quick start, tutorial, getting started
- **Log Search**: search, query, log query, LogReduce
- **Logs for Security**: security logs, log analytics for security, security data lake, infrastructure security
- **Manage**: admin, user management, role, permission, account, billing, partition, field extraction
- **Metrics**: metric, time series, prometheus, graphite
- **Observability**: AWS Observability, Azure, Kubernetes, SLO, service level, tracing
- **Other (Analytics)**: analytics, data analysis
- **Other (Optimization - GEO/SEO)**: SEO, GEO, AEO, search optimization, discoverability
- **Other (Site Development & AI)**: site development, AI tooling, Claude, documentation tooling
- **Platform Services**: platform, infrastructure, service
- **Sensu**: sensu, monitoring
- **Threat Intelligence**: threat intel, IOC, indicator

**File path patterns:**
- **/alerts/**, **/monitors/**, **/webhook-connections/** → Alerts
- **/api/** → APIs
- **/apm/**, **/traces/**, **/real-user-monitoring/** → APM (Traces, RUM)
- **/integrations/**, **/apps/** → Apps/Integrations
- **/automation-service/** → Automation
- **/cse/**, **/cloud-siem/** → Cloud SIEM
- **/csoar/**, **/cloud-soar/** → Cloud SOAR
- **/send-data/**, **/collectors/** → Collectors/Sources
- **/dashboards/** → Dashboards
- **/get-started/** → Getting Started
- **/search/** → Log Search
- **/manage/** → Manage (look at subdirectory for specific area)
- **/metrics/** → Metrics
- **/observability/** → Observability (check subdirectory for AWS/Azure/Kubernetes)
- **/platform-services/** → Platform Services

## Default behavior

When invoked, ask the user what they want to do:

* **Create a ticket**. Support three approaches:

  **Approach A - User provides description**: Ask for description. Analyze and suggest Technical Area based on keywords. If multiple areas could apply, present 2-3 options. User confirms or selects different area. Generate title from description for user approval.

  **Approach B - Analyze current changes**: User says "create ticket for my current changes" or similar. Run git status to see modified files. Run git diff to see actual changes. Analyze file paths and content to determine Technical Area. Generate both title and description based on what changed. Present all three (title, description, Technical Area) for user approval.

  **Approach C - User provides file paths**: User provides specific file paths. Read the files to understand content and context. Analyze to determine Technical Area. Generate both title and description. Present all three for user approval.

  For all approaches: Type defaults to Task unless user specifies Bug, Story, or Epic. Do not set assignee or due date — Jira Automation sets both based on Technical Area and Priority.
* **Look up a ticket**. Search by issue key (e.g. DOCS-1234) or keyword.
* **Update a ticket**. Ask which field to update (Description, Assignee, Priority, or Technical Area).
* **Change ticket status**. Move through workflow states: Backlog → To Do → In Progress → Blocked → In Review → On Hold → Published → Closed.
* **View my tickets**. Fetch issues in DOCS assigned to the current user. Default to open issues; ask if they want to filter by status.
* **View all tickets**. Fetch all open issues in the DOCS project, sorted by created date descending.

## Generating titles and descriptions from changes

When analyzing git changes or file content (Approaches B and C):

**For titles:**
- Use sentence case (only first word and proper nouns capitalized)
- Start with action verb (Update, Add, Fix, Remove, Document, etc.)
- Be specific about what changed (not "Update docs" but "Update CloudTrail integration authentication steps")
- Keep under 10 words when possible

**For descriptions:**
- Lead with the benefit or why it matters
- Use active voice and present tense
- Summarize what changed at a high level
- Include context if the change affects existing workflows
- Keep under 150 words unless complex
- Use markdown formatting for lists or emphasis

**Examples:**
- Title: "Add new webhook configuration options to monitors"
- Description: "Documents three new webhook configuration options added in release 2.5: retry logic, custom headers, and timeout settings. These options give users more control over how monitor alerts are delivered to external systems."

## Style rules for ticket descriptions

* Sentence case for titles
* Benefit-driven summaries, not feature lists
* Active voice, plain language
* No em dashes
* Descriptions under 150 words unless complex
* Bug tickets must include: **Steps to reproduce**, **Expected behavior**, **Actual behavior**
* Use `contentFormat: markdown` for all descriptions

## Output format

After any action, confirm what was done and provide a direct link:
https://sumologic.atlassian.net/browse/DOCS-[issue number]

---

## DOCS Project Fields

When creating or updating tickets, these fields are available:

### Required Fields
- **Summary** (`summary`) - Ticket title
- **Technical Area** (`customfield_10748`) - Must be set from the allowed values (see Technical Area list above)
- **Preview Doc Requirement** (`customfield_10796`) - Defaults to "N/A (General Availability)"
  - Options: "N/A (General Availability)", "Public Preview", "Extended Preview", "Private Preview"
- **Release Note Requirement** (`customfield_14728`) - No default; must be explicitly set
  - Options: "Yes", "No"
- **Priority** (`priority`) - Defaults to " Medium" (Jira Automation also sets due date based on this)
  - Use IDs to avoid API issues with leading spaces in names: High (id: 12023), Medium (id: 12024), Low (id: 12025)

### Optional Fields (set at creation)
- **Description** (`description`) - Always use markdown format
- **Existing Tech Docs Link** (`customfield_10750`) - URL to related existing docs
  - **IMPORTANT:** Required when transitioning to Published status
  - Always populate when creating/updating tickets that touch existing articles
  - Use full production URL (e.g., `https://www.sumologic.com/help/docs/get-started/training-certification-faq`)
- **Parent** (`parent`) - Link to parent Epic/Story

### Post-creation fields (cannot be set at ticket creation — update after creating)
- **Assignee** - Set automatically by Jira Automation based on Technical Area; do not set manually
- **Due Date** (`customfield_10643`) - Set automatically by Jira Automation based on Priority; do not set manually
- **Github Pull Request** (`customfield_10466`) - URL field; auto-populate after PR creation
- **Product UI Link** (`customfield_14729`) - URL to product feature/UI in staging
- **Labels** (`labels`) - Array of strings

### When creating tickets with context:

**From git changes or file analysis:**
- Always set Technical Area based on file paths and content
- Default Preview Doc Requirement to "N/A (General Availability)" unless context suggests otherwise
- Set Priority by ID: use 12024 (Medium) unless urgent/critical
- Ask about Release Note Requirement if not obvious from context
- Populate Description with benefit-driven summary of changes
- **If creating/updating a ticket for an existing article:** Always set "Existing Tech Docs Link" (`customfield_10750`) with the full production URL (e.g., `https://www.sumologic.com/help/docs/get-started/training-certification-faq`)
  - This field is required before tickets can be transitioned to Published status

**After PR creation:**
- Always update the Github Pull Request field with the PR URL using `customfield_10466`

---

## Related commands

* **`/doc-from-jira`** — if the goal is to write a doc for a ticket, use this instead. It fetches the ticket and scaffolds the full documentation file from its content.
