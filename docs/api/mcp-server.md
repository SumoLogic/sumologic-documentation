---
id: mcp-server
title: Sumo Logic MCP Server
description: Connect your AI tools to Sumo Logic via MCP to query logs, manage insights, and investigate security incidents using Claude Code CLI.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
 <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-extended">Extended Preview</span></a></p>

:::info
This feature is in Extended Preview. For more information, contact your Sumo Logic account representative.
:::

The Sumo Logic MCP server lets MCP clients (external AI models) connect to Sumo Logic to query logs, investigate security insights, manage alerts and dashboards, and more. Use natural language to bring Sumo Logic search, evidence, and platform context into the AI tools you already use, such as developer IDEs, security workflows, and enterprise AI platforms.

## Prerequisites

* **Deployment-specific MCP server URL**. Because OAuth tokens are deployment-bound, you'll need to use the exact URL assigned to your Sumo Logic deployment:
   | Deployment | MCP Server URL |
   | :--- | :--- |
   | Asia Pacific (Seoul) | `https://mcp.kr.sumologic.com/mcp` |
   | Asia Pacific (Sydney) | `https://mcp.au.sumologic.com/mcp` |
   | Asia Pacific (Tokyo) | `https://mcp.jp.sumologic.com/mcp` |
   | Canada (Central) | `https://mcp.ca.sumologic.com/mcp` |
   | Europe (Frankfurt) | `https://mcp.de.sumologic.com/mcp` |
   | Europe (Ireland) | `https://mcp.eu.sumologic.com/mcp` |
   | Europe (Zurich) | `https://mcp.ch.sumologic.com/mcp` |
   | US East (N. Virginia) | `https://mcp.sumologic.com/mcp` |
   | US East (N. Virginia) - FedRAMP | `https://mcp.fed.sumologic.com/mcp` |
   | US West (Oregon) | `https://mcp.us2.sumologic.com/mcp` |
* **An MCP-compatible client that supports remote HTTP/SSE transport and OAuth 2.0**. The default setup uses Client ID Metadata Documents (CIMD). We've documented setup below for [Claude Code CLI](https://code.claude.com/docs/en/quickstart) (requires a paid Claude subscription or an Anthropic Console account).
   :::note
   [CIMD](https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/) is the recommended authentication mechanism for MCP clients. You can learn more about how CIMD works at [client.dev](https://client.dev/). If you have any questions about client compatibility, contact [Sumo Logic Support](https://support.sumologic.com/support/s).
   :::

## Configure in Claude Code CLI

### Authentication

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

### Switching organizations

To connect to a different Sumo Logic org:
1. In Claude Code, run `/mcp`.
1. Select **sumo-logic** > **Clear authentication**.
1. Select **Authenticate** and log in to the new org.

:::note
If you previously granted consent for an org, you will not be prompted again. To revoke consent, go to your Sumo Logic user settings and remove the app under **Personal Authorized Apps** (next to Personal Access Tokens).
:::

### Manual OAuth setup

CIMD is the recommended setup for most MCP server users. If your MCP client does not support CIMD, you can connect with manually created OAuth credentials instead. This requires the **Sumo Logic Administrator role** to create an OAuth client, and you'll set up [OAuth credentials](/docs/manage/security/oauth) (a client ID and client secret) to authenticate.

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

All tools respect your Sumo Logic permission controls and access policies.

:::note
Tool identifiers are subject to change during the preview period.
:::

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
| `GetAllInsights`        | Get all insights (paginated via token). | View Cloud SIEM Enterprise (`viewCse`) |
| `GetInsight`            | Get a single insight by ID, including signals, artifacts, and entity details. | View Cloud SIEM Enterprise (`viewCse`) |
| `GetInsights`           | Get insights with filtering by severity, status, assignee, entity, confidence, tags, and more. | View Cloud SIEM Enterprise (`viewCse`) |
| `UpdateInsightAssignee` | Update the assignee of an insight. | View Cloud SIEM Enterprise, Manage Insight Assignee (`viewCse`, `cseManageInsightAssignee`) |
| `UpdateInsightStatus`   | Update the status of an insight. | View Cloud SIEM Enterprise, Manage Insight Status (`viewCse`, `cseManageInsightStatus`) |

#### Detection Rules

| Tool | Description | Required scope |
| :--- | :---------- | :-------------- |
| `CreateTemplatedMatchRule` | Create a new match rule. | View Cloud SIEM Enterprise, Manage Rules (`viewCse`, `cseManageRules`) |
| `CreateThresholdRule`      | Create a new threshold rule. | View Cloud SIEM Enterprise, Manage Rules (`viewCse`, `cseManageRules`) |
| `GetRule`                  | Get a single rule by ID with optional tuning expressions. | View Cloud SIEM Enterprise, View Rules (`viewCse`, `cseViewRules`) |
| `GetRules`                 | Get rules with filtering by category, enabled status, rule source, score, severity, stream, tags, and more. | View Cloud SIEM Enterprise, View Rules (`viewCse`, `cseViewRules`) |

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
Before running an unscoped query, the model first calls the Discovery tools below to resolve a `_sourceCategory` (and `_collector`) to scope the search. Queries over 30 minutes without a `_sourceCategory`, `_collector`, `_index`, or `_view` filter are rejected.
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

* `What source categories and partitions are available for security logs?`
* `List all active partitions in the frequent tier`

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

For detailed guidance on securing MCP against cost-based attacks, see our blog post: [Token Torching: How I'd burn your AI budget (so you can fix it)](https://www.sumologic.com/blog/token-torching-ai-attack).

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

While in preview, this capability requires an AI Addendum. Contact your account representative for pricing information.

MCP-triggered actions can consume Sumo Logic resources in the same way equivalent UI or API actions do. For example, if an AI client uses MCP to run a log search, that search may consume search resources.

:::note
For bulk data retrieval or model training, the [Search Job API](/docs/api/search-job) remains the preferred option.
:::

### Where does my agent run?

Agents connected via MCP run in your own environment, not within Sumo Logic infrastructure.
