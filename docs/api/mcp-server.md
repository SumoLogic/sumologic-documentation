---
id: mcp-server
title: Sumo Logic MCP Server
sidebar_label: MCP Server ✨
description: Connect your AI tools to Sumo Logic via MCP to query logs, manage insights, and investigate security incidents using Claude Code CLI.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Sumo Logic MCP server lets MCP clients (external AI models) connect to Sumo Logic to query logs, investigate security insights, manage alerts and dashboards, and more. Use natural language to bring Sumo Logic search, evidence, and platform context into the AI tools you already use, such as developer IDEs, security workflows, and enterprise AI platforms.

<!-- Training/course link? -->   

## Prerequisites

### MCP server URL for your deployment

Because OAuth tokens are bound to a single Sumo Logic deployment, you'll need to use the exact MCP server URL that matches yours:

| Deployment | MCP Server URL |
| :--- | :--- |
| Asia Pacific (Seoul) | `https://mcp.kr.sumologic.com/mcp` |
| Asia Pacific (Sydney) | `https://mcp.au.sumologic.com/mcp` |
| Asia Pacific (Tokyo) | `https://mcp.jp.sumologic.com/mcp` |
| Canada (Central) | `https://mcp.ca.sumologic.com/mcp` |
| Europe (Frankfurt) | `https://mcp.de.sumologic.com/mcp` |
| US East (N. Virginia) | `https://mcp.sumologic.com/mcp` |
| US East (N. Virginia) - FedRAMP | `https://mcp.fed.sumologic.com/mcp` |
| US West (Oregon) | `https://mcp.us2.sumologic.com/mcp` |

:::note
The MCP server is not currently supported in the Europe (Ireland) and Europe (Zurich) deployments.
:::

### MCP-compatible client

The client must support remote HTTP/SSE transport and OAuth 2.0. The setup steps below use the [Claude Code CLI](https://code.claude.com/docs/en/quickstart), which requires a paid Claude subscription or an Anthropic Console account.

[CIMD](https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/) is the recommended authentication mechanism for MCP clients. To learn how CIMD works, see [client.dev](https://client.dev/); for how Sumo Logic implements OAuth 2.0 and CIMD, including how an administrator enables it, see [OAuth Client Setup](/docs/manage/security/oauth).

For client compatibility questions, contact [Sumo Logic Support](https://support.sumologic.com/support/s).

## Enable or disable the MCP server

MCP server access is enabled by default. An administrator can turn it on or off for your entire organization.

1. In the main Sumo Logic menu, select **Administration** > **Feature Management**.
1. In the **MCP Server access** row, use the **Enabled** toggle to turn the MCP server on or off.<br/><img src={useBaseUrl('img/api/mcp/mcp-feature-management.png')} alt="Feature Management page showing the AI features and MCP Server access toggles" style={{border: '1px solid gray'}} width="800" />

Enabling MCP Server access makes the server available for connection. Clients still authenticate with OAuth 2.0, and CIMD is enabled separately on the Policies page. See [Prerequisites](#prerequisites) and [OAuth Client Setup](/docs/manage/security/oauth).

Disabling the MCP server prevents MCP clients from connecting, but does not delete any data. MCP Server access is a separate setting from the **AI features** toggle, which governs Mobot, Parse Assist, and the SOC Analyst Agent, so you can enable or disable the MCP server independently of those capabilities.

## Configure in Claude Code CLI

Claude Code CLI uses OAuth 2.0 with CIMD. You do not need to create OAuth credentials before setup. Browser-based login handles authentication and token refresh automatically.

### Setup

1. In a Terminal window, register the MCP server. Replace `<MCP-server-URL>` with your deployment's URL from the [Prerequisites table](#prerequisites). Choose a scope:
   * **User scope** (available in all directories, recommended).
     ```bash
     claude mcp add --scope user --transport http \
       sumo-logic "<MCP-server-URL>"
     ```
   * **Project scope** (available only in the current directory, writes to `.mcp.json`).
     ```bash
     claude mcp add --scope project --transport http \
       sumo-logic "<MCP-server-URL>"
     ```
1. Launch Claude Code. With **user scope**, run `claude` from any directory. With **project scope**, run it from the directory where you registered the server.
   ```bash
   claude
   ```
1. In Claude Code, run `/mcp`.
1. Select **sumo-logic** and then **Authenticate**.
1. Claude Code opens a browser window. Log in with your Sumo Logic credentials. If your org uses an identity provider, click **Sign in with your identity provider**, navigate to your org, and complete sign-in.
1. Verify the connection with `/mcp` to confirm the server is connected.<br/><img src={useBaseUrl('img/api/mcp/claude-mcp-connected.png')} alt="Claude Code CLI showing Sumo Logic MCP server connected" width="600"/>
1. Prompt Claude Code to `List my available MCP tools` to see what you can do. You can also refer to [Available MCP Tools](#available-mcp-tools).

:::tip
For more consistent investigation results, set up the [sumo-investigator skill for Claude Code](#improve-investigations-with-the-sumo-investigator-skill).
:::

### Switching organizations

To connect to a different Sumo Logic org:
1. In Claude Code, run `/mcp`.
1. Select **sumo-logic** > **Clear authentication**.
1. Select **Authenticate** and log in to the new org.

:::note
If you previously granted consent for an org, you will not be prompted again. To revoke consent, go to your Sumo Logic user settings and remove the app under **Personal Authorized Apps** (next to Personal Access Tokens).
:::

### Manual OAuth setup

CIMD is the default, recommended setup for most MCP server users. If your MCP client does not support CIMD, you'll need to connect with a manually created, pre-registered OAuth client instead. Sumo Logic supports two OAuth 2.0 flows for this:

* **Authorization Code with a pre-registered client**. Best for interactive clients that handle browser-based login. Follow the steps below to create the client, or see [Authorization Code flow](/docs/manage/security/oauth#authorization-code-flow) for details.
* **Client Credentials**. Best for service-to-service or automated clients with no interactive user. See [Client Credentials flow](/docs/manage/security/oauth#client-credentials-flow) to set it up with a service account.

Both require the **Sumo Logic Administrator role** to create the OAuth client and its [OAuth credentials](/docs/manage/security/oauth) (a client ID and client secret).

#### Create an OAuth client

1. In Sumo Logic, go to **Administration** > **Security** > **OAuth Clients**.
1. Click **+ Add OAuth Client**.
   * Enter a **Name**.
   * For **Client Type**, select **Authorization Code**.
   * For **Redirect URI**, enter:
      ```
      http://localhost:8888/callback
      ```
   * Select your **Service Account** from the dropdown.
   * Optionally, add a **Description**.
   * Under **Scopes**, leave every checkbox unchecked to grant access to all scopes, or select specific scopes to restrict the client's access. See [Available MCP tools](#available-mcp-tools) for the scope each tool requires.
   * Click **Save**.
1. Copy the **Client ID** and **Client Secret**. You'll use these in the next step.

#### Register the Sumo Logic MCP server

1. Open a Terminal window (not inside the Claude Code CLI session) and copy one of the snippets below, replacing `<client-id>` with the Client ID from the [OAuth client you created above](#create-an-oauth-client), and replacing `<mcp-server-url>` with your [Sumo Logic deployment's MCP server URL](#prerequisites).
   * **User scope** (available in all directories, recommended).
     ```bash
     claude mcp add --transport http \
       --scope user \
       --client-id "<client-id>" --client-secret --callback-port 8888 \
       sumo-logic "<mcp-server-url>"
     ```
   * **Project scope** (available only in the current directory, writes to `.mcp.json`).
     ```bash
     claude mcp add --transport http \
       --scope project \
       --client-id "<client-id>" --client-secret --callback-port 8888 \
       sumo-logic "<mcp-server-url>"
     ```
1. Run one of the above commands. Claude Code then prompts you to enter the client secret securely.
1. Continue with the remaining steps in [Setup](#setup) above: launch Claude Code, run `/mcp`, and authenticate.

:::note
Recent VS Code releases do not work with explicit client credentials. Use the default CIMD setup above for VS Code.
:::

## Available MCP tools

Our MCP server provides access to Sumo Logic through these tool categories:
* **Utility tools**. Discover relevant tools based on context.
* **Alerts management**. Search and retrieve alerts.
* **Dashboard management**. Create, retrieve, and update dashboards.
* **Cloud SIEM**. Manage insights, detection rules, and status updates.
* **Log search**. Run log search queries and retrieve results.
* **Discovery**. List custom fields, field extraction rules, and partitions to help scope log searches.

All tools respect your Sumo Logic permission controls and access policies. See [Role capabilities](/docs/manage/users-roles/roles/role-capabilities) for details on each required scope.

### Utility tools

| Tool | Description | Required scope |
| :--- | :---------- | :-------------- |
| `x_amz_bedrock_agentcore_search` | Search/filter the available tools by context. | N/A |

### Alerts management

| Tool | Description | Required scope |
| :--- | :---------- | :-------------- |
| `alertsReadById` | Get an alert or folder by ID. | View Alerts (`viewAlerts`) |
| `alertsSearch`   | Search alerts by status, severity, monitor name, mute status, and more. | View Alerts (`viewAlerts`) |

#### Sample prompts

* `Show me all active alerts from the last 24 hours`
* `Find all alerts triggered by monitor <name> in the last 7 days`

### Dashboard management

| Tool | Description | Required scope |
| :--- | :---------- | :-------------- |
| `createDashboard` | Create a new dashboard. | Manage Library (`manageLibrary`) |
| `getDashboard`    | Get a dashboard by ID. | View Library (`viewLibrary`) |
| `listDashboards`  | List all dashboards. | View Library (`viewLibrary`) |
| `updateDashboard` | Update a dashboard by ID. | Manage Library (`manageLibrary`) |

#### Sample prompts

* `Create a new dashboard called "System Overview" that uses the previous query to power a dashboard panel called "Total Log Count Per Minute"`
* `Add a second panel called "Error Logs Count Per Minute" that is a similar query but only has logs in it that contain the keyword "error" in them`

### Cloud SIEM

#### Insights

| Tool | Description | Required scope |
| :--- | :---------- | :-------------- |
| `getAllInsights`        | Get all insights (paginated via token). | View Cloud SIEM Enterprise (`viewCse`) |
| `getInsight`            | Get a single insight by ID, including signals, artifacts, and entity details. | View Cloud SIEM Enterprise (`viewCse`) |
| `getInsights`           | Get insights with filtering by severity, status, assignee, entity, confidence, tags, and more. | View Cloud SIEM Enterprise (`viewCse`) |
| `updateInsightAssignee` | Update the assignee of an insight. | View Cloud SIEM Enterprise, Manage Insight Assignee (`viewCse`, `cseManageInsightAssignee`) |
| `updateInsightStatus`   | Update the status of an insight. | View Cloud SIEM Enterprise, Manage Insight Status (`viewCse`, `cseManageInsightStatus`) |

#### Detection rules

| Tool | Description | Required scope |
| :--- | :---------- | :-------------- |
| `createTemplatedMatchRule` | Create a new match rule. | View Cloud SIEM Enterprise, Manage Rules (`viewCse`, `cseManageRules`) |
| `createThresholdRule`      | Create a new threshold rule. | View Cloud SIEM Enterprise, Manage Rules (`viewCse`, `cseManageRules`) |
| `getRule`                  | Get a single rule by ID with optional tuning expressions. | View Cloud SIEM Enterprise, View Rules (`viewCse`, `cseViewRules`) |
| `getRules`                 | Get rules with filtering by category, enabled status, rule source, score, severity, stream, tags, and more. | View Cloud SIEM Enterprise, View Rules (`viewCse`, `cseViewRules`) |

#### Sample prompts

* `Show me insight <id>, including its signals and involved entities`
* `Find all critical insights that are still open`
* `Update INSIGHT-1234 status to In Progress`
* `Create a threshold rule that fires when more than 10 failed logins occur within 5 minutes`
* `Show me all rules in the authentication category`
* `Get details for rule ID <id>`
* `List all rules that have fired in the last 7 days`

### Log search

| Tool | Description | Required scope |
| :--- | :---------- | :-------------- |
| `runLogSearch` | Run a log search query over a time range and return aggregated records or raw messages. | Run Log Search (`runLogSearch`) |

:::note
Before running an unscoped query, the model first calls the Discovery tools below to identify a relevant `_sourceCategory`, then runs a small scoped sample query to confirm the source and discover `_collector` values. Queries over 30 minutes without a `_sourceCategory`, `_collector`, `_index`, or `_view` filter are rejected.
:::

#### Sample prompts

* `Run a log search for the last 5 minutes across all of my data that counts the data by 1-minute buckets and plots the result as a line graph`
* `Run a 2-day search on _sourcecategory=*proofpoint*, count by recipient and senderip`

### Discovery

| Tool | Description | Required scope |
| :--- | :---------- | :-------------- |
| `listCustomFields`    | List all custom fields configured in your account. | View Fields (`viewFields`) |
| `listExtractionRules` | List field extraction rules. | View Field Extraction Rules (`viewFieldExtractionRules`) |
| `listPartitions`      | List partitions in the organization, with filters for analytics tier and active status. | View Partitions (`viewPartitions`) |

#### Sample prompts

* `What partitions and field extraction rules exist for security logs?`
* `List all active partitions in the frequent tier`

## Improve investigations with the sumo-investigator skill

A skill gives an AI agent standing instructions and workflow context that persist across every conversation, so you do not need to repeat detailed prompting each time you ask a question. For Claude Code, a skill is a folder containing a `SKILL.md` file that documents how to approach a class of tasks, in this case, investigating Sumo Logic data through the MCP server's tools.

Claude Code can invoke a skill in two ways:
* **Automatically**. Claude matches your question against the `description` and `when_to_use` context defined in the skill's frontmatter and invokes the skill without you needing to reference it directly.
* **Explicitly**. Type a slash command that matches the skill's folder name, for example, `/sumo-investigator`.

The skill linked below is a starting point based on Sumo Logic's internal testing of MCP tool workflows. It defines the agent's tool-use workflow (discover → sample → target) for log searches, plus guidance for triaging alerts, insights, and detection rules. Treat it as a foundation you can customize for your environment, or use as a model for additional skills of your own.

:::note
As the Sumo Logic MCP server evolves, for example, as tools are added, removed, or renamed, you may need to update this skill to match.
:::

1. Download <a href={useBaseUrl('files/sumo-investigator.zip')} target="_blank">sumo-investigator.zip</a> and unzip it.
1. Move the unzipped `sumo-investigator` folder into your skills directory: `.claude/skills/` for a project-specific skill available only in the current directory, or `~/.claude/skills/` to make it available across all projects. The result should be a `SKILL.md` file at `.claude/skills/sumo-investigator/SKILL.md` (or the equivalent path under `~/.claude/skills/`).
1. If this is the first skill you've added, restart Claude Code so it picks up the new skills directory. Otherwise, run `/mcp` to confirm the Sumo Logic MCP server is still connected.
1. Invoke the skill automatically by asking an investigation question, or explicitly with `/sumo-investigator`.

For more information about configuring, managing, and distributing skills, see [Extend Claude with skills](https://code.claude.com/docs/en/skills) in the Claude Code documentation.

## Example workflows

These prompts demonstrate multi-step investigations that chain multiple tools together in a single session.

### Triage and investigation

* `Show me all critical insights from the last 7 days that are still open, then tell me which involved entities appear most frequently.`

* `Get insight <id>, show me its signals and involved entities, then run a log search for that IP address in the last 24 hours to find raw events.`

* `Find all insights assigned to <username> that are in-progress, and list any created more than 3 days ago.`

### Threat hunting

* `Search logs for any outbound connections to port 4444 in the last 48 hours, extract the source hostnames, then check if any of those hostnames appear as entities in open insights.`

* `Find all insights tagged 'ransomware' or 'lateral-movement' from the past 30 days, get the signals for each, and run a log search aggregating activity by user account involved.`

* `Look up all insights where entity type is 'username' and the value contains 'svc-' (service accounts), then search logs for those accounts' authentication events in the last week.`

### Incident response

* `Get insight <id>, pull its full signal list and all involved entities, then search raw logs for each entity in the last 6 hours.`

* `Find all insights that were closed as 'False Positive' in the last 30 days, group them by rule ID, and search logs to see if those same patterns are still occurring today.`

* `Get insight <id> and search logs for the 30-minute window around when it was first created.`

### Escalation and assignment

* `Find all unassigned high-severity insights and assign them to <username>.`

* `Find all insights that have been sitting in 'in progress' status for more than 7 days, list them with assignee names, and reassign any unowned ones to <team>.`

### Situational awareness

* `List all triggered critical alerts right now, then search logs for the top affected source IP to see what it's been doing.`

* `Summarize all insights created in the last 24 hours: how many per severity, which entities are involved, and who they're assigned to.`

* `Show me all triggered critical alerts from the last hour, and check if their source entities also appear in open insights.`

### Entity-centric investigation

* `Given IP address <x.x.x.x>, find all insights where it appears as an entity, then search logs for its full activity in the last 24 hours.`

* `Find the most active entity by insight count in the last 14 days, get all its insights with full signal details, then build a timeline dashboard of its activity.`

* `Look up insights for hostname <server-name>, then search logs for any privilege escalation events on that host in the same timeframe.`

### Alert and monitor deep dives

* `Find all alerts from monitor <name>, then search logs during the last trigger window to determine if it's noisy or legitimate.`

* `Find all muted monitors with active Critical alerts, then search logs to see if the underlying condition has actually resolved.`

### Cross-tool correlation

* `Find all alerts that fired in the last hour, check if any of them are related to existing open insights, and for those that aren't, search logs to determine if a new insight should be escalated manually.`

* `Compare insight volume week-over-week: pull insights from the last 7 days vs the 7 days before that, broken down by severity, and identify any rules that are newly firing this week.`

* `Get all Critical and High insights from today, and for any with no assignee, assign them to <team>.`

### Team operations and reporting

* `Find all open insights assigned to the security team and show the oldest unresolved one.`

* `Generate a weekly report: count insights by severity and status, show the top 5 most triggered monitors from alerts, and list the 3 most common entity types involved in new insights.`

### Dashboard and data

* `Search for the top 10 source IPs generating authentication errors in the last hour, then create a dashboard panel showing those results.`

* `Get the current SIEM overview dashboard, add a new panel for open Critical insights count, and save it.`

### Detection rule management

* `List all enabled threshold rules and show me which ones have the highest signal counts in the last 7 days.`

* `Find all rules in the 'lateral-movement' category and check if any are disabled.`

* `Create a new match rule that detects SSH brute force attempts by looking for more than 5 failed SSH authentication events from the same source IP within 10 minutes.`

* `Get all rules tagged 'ransomware' and flag any that haven't fired in 30 days.`

* `Find all custom rules (ruleSource = 'custom'), get their details including tuning expressions, and create a summary report of which ones are actively generating insights.`

## Usage guidance and cost controls

### When to use MCP

Use MCP for:
* Conversational investigations.
* Multi-step workflows.
* Agent-to-agent communication.

Do not use MCP for:
* Bulk data extraction (use the [Search Job API](/docs/api/search-job) instead).
* Model training.
* High-volume automated queries.

### Cost dynamics

MCP endpoints are cost-amplifying by design. A single conversational request can trigger multiple agent steps, tool calls, retries, and retrieval operations. Valid requests that appear reasonable can generate significantly higher costs than anticipated, particularly when:

* Queries trigger broad semantic searches with high retrieval limits.
* Requests induce multi-step reasoning or planning workflows.
* Tool calls fail and trigger automatic retries.
* Workflows continue executing after client disconnect.

MCP is designed for conversational, agent-level interaction where cost per request is understood and monitored. For raw data access or high-volume operations, standard APIs remain more efficient and cost-effective.

:::note
If you're on [Flex pricing](/docs/manage/partitions/flex), cost-amplifying patterns in log search tool calls — broad queries, multi-step investigations, retries — translate directly into scan costs. Monitor usage closely when connecting MCP clients to a Flex account.
:::

For detailed guidance on securing MCP against cost-based attacks, see our blog post: [Token Torching: How I'd burn your AI budget (so you can fix it)](https://www.sumologic.com/blog/token-torching-ai-attack).

## Rate limits

The Sumo Logic MCP server applies rate limits to keep the platform reliable and ensure fair access for all customers. Your use of the MCP server is subject to Sumo Logic's [standard API rate limits](/docs/api/about-apis/getting-started/#rate-limiting): 4 requests per second per user and 10 concurrent in-flight requests per access key. MCP requests count toward these account-wide limits, along with your other API usage.

| Limit | Scope | Value |
| :--- | :--- | :--- |
| Requests per second | Per user | 4 requests per second |
| Concurrent in-flight requests | Per access key | 10 requests |
| Log search timeout | Per search call (MCP only) | 2 minutes |

### How the limits work

Two controls do different things:
* **Requests per second (4 per second)**. How many new requests you can start each second. When you exceed it, new requests are rejected until the rate drops.
* **Concurrent in-flight requests (10)**. How many requests can be in progress at the same time. Even at a safe per-second rate, if requests stay open faster than they finish, you can reach this cap.

Log search runs as a single request: you send a query and get the results back. Like every tool, it counts toward your overall request limits. A search can run for up to 2 minutes, which is the gateway timeout for the synchronous call. Most searches finish well within this, but searches over wide time ranges or broad data scopes can reach it. If a search times out, the tool returns an error stating that the time limit was exceeded, with guidance to retry using a smaller time range or more specific source categories, so an agent can adjust its query and try again.

### Handle rate limits

When you exceed a limit, the server returns an `HTTP 429 (Too Many Requests)` response with a `Retry-After` header (for example, `Retry-After: 1`). You'll see these errors in your MCP client, measured as an average over a short window, when:
* An agent sends more than 4 requests per second through your MCP connection without pausing between calls.
* More than 10 of a user's requests are in progress at the same time.

A log search that runs longer than 2 minutes returns a separate timeout error, not a rate-limit error. Retry it with a narrower time range or tighter source scope.

To stay within the limits, your MCP client should:
* **Back off and retry**. Retry after a short delay, increasing the wait on repeated 429 responses (exponential backoff).
* **Pace requests**. Space out or batch calls instead of sending them in a tight loop.
* **Scope searches**. Narrow log searches by source category and time range to reduce both load and the chance of a timeout.

:::note
Rate limits may be increased for customers with higher needs. Contact your Sumo Logic account representative. Sumo Logic may adjust these rate limits over time.
:::

## Security and data governance

* **Permissioned access**. All integrations occur through secure, controlled interfaces.
* **Customer control**. You retain full control over how your data is accessed and used by connected AI tools.
* **No model training**. Customer data is never used to train AI models.
* **Audit trails**. All MCP interactions are logged for compliance and security review.
* **Multi-tenant isolation**. Tenant-level security controls are enforced at the gateway.

## FAQ

### Can MCP handle multiple operations in a single request?

Yes. MCP supports multi-tool calls within a single conversational interaction.

### How does this affect my Sumo Logic usage?

MCP-triggered actions can consume Sumo Logic resources in the same way equivalent UI or API actions do. For example, if an AI client uses MCP to run a log search, that search may consume search resources.

:::note
For bulk data retrieval or model training, the [Search Job API](/docs/api/search-job) remains the preferred option.
:::

### Where does my agent run?

Agents connected via MCP run in your own environment, not within Sumo Logic infrastructure.

## Additional resources

* [Dojo AI](https://www.sumologic.com/solutions/dojo-ai)
* [Skills vs. MCP: You’re probably reaching for the wrong one | Sumo Logic Blog](https://www.sumologic.com/blog/skills-vs-model-context-protocol-mcp)
* [Token Torching: How I’d burn your AI budget (so you can fix it) | Sumo Logic Blog](https://www.sumologic.com/blog/token-torching-ai-attack)
* [Closing the AI compliance and visibility gap: Integrate the Claude Compliance API with Sumo Logic | Sumo Logic Blog](https://www.sumologic.com/blog/sumo-logic-claude-compliance-api-integration)
