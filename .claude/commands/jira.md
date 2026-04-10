# Jira – DOCS Project

You are helping manage Jira tickets for the Sumo Logic documentation team.

## Project context

* **Jira project:** DOCS
* **Base URL:** https://sumologic.atlassian.net/browse/DOCS
* **Cloud ID:** 247075db-3b0b-4f1b-92db-51683ab743a6

## Ticket intake

External requests from Sumo Logic employees come in via the JSM portal:
https://sumologic.atlassian.net/servicedesk/customer/portal/26/group/75/create/378

Tickets created via this command are created directly in the DOCS project and
are distinct from portal-submitted requests.

## Team members

| ID | Role | Atlassian Account ID |
|---|---|---|
| Writer 1 | Lead Technical Writer | 628bc65bc65b720069610ad1 |
| Writer 2 | Contractor Technical Writer | 712020:f4a4da3b-21a9-427c-8811-1b0a9f2e34f8 |
| Writer 3 | Contractor Technical Writer | 641adfd7407493675d473e16 |
| Writer 4 | Senior Technical Writer | 640862967655a3223a24ec90 |
| Writer 5 | Manager | 712020:250078b7-52c4-45fd-ac76-327e888c6768 |

## Technical Area → Writer assignments

Use this to set the default assignee when creating tickets, and to filter issues by owner.

| Technical Area | Writer |
|---|---|
| Alerts (Monitors, Sched. Search, Webhooks) | Writer 2 |
| APIs | Writer 1 |
| APM (Traces, RUM) | Writer 1 |
| Apps/Integrations | Writer 2 |
| Automation | Writer 4 |
| Cloud Infrastructure Security | Writer 4 |
| Cloud SIEM | Writer 4 |
| Cloud SOAR | Writer 4 |
| Collectors/Sources | Writer 2 |
| Dashboards | Writer 3 |
| Getting Started (Product/Observability) | Writer 1 |
| Getting Started (Security) | Writer 4 |
| Log Search | Writer 3 |
| Manage (Administrator) | Writer 3 |
| Manage (Analyst) | Writer 3 |
| Manage (Data Forwarding) | Writer 3 |
| Manage (Fields, FERs, Partitions, Data Tiers, Ingestion, Sched Views, Billing, Sharing) | Writer 3 |
| Manage (Security, Users, Roles) | Writer 3 |
| Metrics | Writer 4 |
| Mobot | Writer 1 |
| Observability (AWSO) | Writer 2 |
| Observability (Azure) | Writer 3 |
| Observability (Kubernetes) | Writer 4 |
| Observability (SLO) | Writer 4 |
| Observability (Tracing) | Writer 1 |
| Other | unassigned |
| Platform Services | Writer 4 |
| Sensu | Writer 4 |
| Threat Intelligence | Writer 4 |

## Technical area keyword hints

Use these keywords and file path patterns to suggest the most relevant Technical Area:

**Keywords in content/descriptions:**

- **Alerts**: monitor, alert, scheduled search, webhook, notification
- **APIs**: API, endpoint, REST, SDK, authentication, token
- **APM**: trace, span, RUM, real user monitoring, application performance
- **Apps/Integrations**: app, integration, connector, third-party
- **Automation**: automation, playbook, workflow, orchestration
- **Cloud Infrastructure Security**: CIEM, cloud security, infrastructure security
- **Cloud SIEM**: SIEM, security, threat, detection, rule
- **Cloud SOAR**: SOAR, incident response, security orchestration
- **Collectors/Sources**: collector, source, ingestion, data collection
- **Dashboards**: dashboard, panel, visualization, chart
- **Getting Started**: onboarding, quick start, tutorial, getting started
- **Log Search**: search, query, log query, LogReduce
- **Manage**: admin, user management, role, permission, account, billing, partition, field extraction
- **Metrics**: metric, time series, prometheus, graphite
- **Mobot**: mobot, chatbot, assistant
- **Observability**: AWS Observability, Azure, Kubernetes, SLO, service level, tracing
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

  For all approaches: Type defaults to Task unless user specifies Bug, Story, or Epic. Auto-assign based on the Technical Area → Writer assignments table. Use the Atlassian Account ID from the Team members table to set the assignee.
* **Look up a ticket**. Search by issue key (e.g. DOCS-1234) or keyword.
* **Update a ticket**. Ask which field to update (Description, Assignee, Priority, or Technical Area).
* **Change ticket status**. Move through workflow states: To Do → In Progress → In Review → Done.
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
