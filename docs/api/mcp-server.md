---
id: mcp-server
title: Sumo Logic MCP Server
description: Connect your AI tools to Sumo Logic via MCP to query logs, manage insights, and investigate security incidents using Claude Code CLI or the Claude desktop app.
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

<!-- when MCP goes GA: mention it can work with Dojo AI agents, add endpoints to API doc-->

## How setup works

Setup has two stages that are done by different people:

1. **Admin setup (once)**. A Sumo Logic Administrator creates one OAuth client for the whole org and shares the **Client ID** and **Client Secret** with the team. No one else needs admin access.
2. **User setup (each team member)**. Each person runs a single terminal command with the shared credentials, then authenticates with their own Sumo Logic login via browser.

:::note Teams and Enterprise accounts
For Claude Teams and Enterprise accounts, your org admin must also enable MCP server access under **Admin settings > Capabilities** before team members can connect. If setup fails, check there first.
:::

## Prerequisites

### Admin prerequisites

* **Sumo Logic Administrator role**. Required only to create the OAuth client in step 1 below.

### User prerequisites

* **Client ID and Client Secret** shared by your admin (from the admin setup below).
* **MCP server URL for your deployment**. OAuth tokens are deployment-bound — use the URL that matches your Sumo Logic deployment:
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
* **A supported MCP client**:
   * [Claude Code CLI](https://code.claude.com/docs/en/quickstart) — requires a paid Claude subscription or Anthropic Console account.
   * [Claude desktop app (Cowork)](https://code.claude.com/docs/en/desktop) — requires a Claude Teams or Enterprise account.

## Known limitations

* **VS Code**. Recent VS Code releases do not work with the authorization code flow when an explicit client ID and secret are provided.
* **MCP config directories**. There is no shared org-level MCP directory that Claude reads automatically. Each team member registers the server on their own machine using the user setup steps below.

:::note
If you have questions about client compatibility, [contact Sumo Logic Support](https://support.sumologic.com/support/s).
:::

## Step 1: Admin creates the OAuth client (once)

A Sumo Logic Administrator completes this step once for the whole organization. The resulting **Client ID** and **Client Secret** are shared with team members — they are application credentials, not tied to any individual user.

1. In Sumo Logic, go to **Administration** > **Security** > **OAuth Clients**.
1. Click **+ Add Client**.
1. For **Type**, select **Authorization Code**.
1. Enter a **Name** (for example, `Sumo Logic MCP`) and optional **Description**.
1. For **Redirect URI**, enter:
   ```
   http://localhost:8888/callback
   ```
1. Click **Save**.
1. Copy the **Client ID** and **Client Secret** and share them with your team. The Client Secret is shown only once — store it securely (for example, in a password manager or secrets vault).

For more details about OAuth clients, see [OAuth Client Setup](/docs/manage/security/oauth#authorization-code-flow).

## Step 2: Each user registers the server

Each team member completes this step on their own machine using the Client ID and Client Secret from Step 1. No admin access is required. Each person authenticates with their own Sumo Logic credentials via browser, so access is controlled by their individual Sumo Logic permissions.

Choose your client:

### Claude Code CLI

1. Open a Terminal window (not inside a `claude` session) and run the following command. Replace `<client-id>` with the shared Client ID and `<MCP-server-URL>` with your deployment's URL from the [Prerequisites table](#user-prerequisites). When prompted, enter the shared **Client Secret** — it is stored securely in your system keychain and never written to disk in plaintext.
   ```bash
   claude mcp add --transport http \
     --scope user \
     --client-id "<client-id>" --client-secret --callback-port 8888 \
     sumo-logic "<MCP-server-URL>"
   ```
   Use `--scope user` to make the server available in all your projects. Use `--scope project` instead to limit it to the current directory (writes to `.mcp.json`).
1. Start Claude Code:
   ```bash
   claude
   ```
1. Run `/mcp`, select **sumo-logic**, then **Authenticate**. Your browser will open to Sumo Logic — log in with your own credentials to complete the OAuth flow.
1. Verify the connection with `/mcp`.<br/><img src={useBaseUrl('img/api/mcp/claude-mcp-connected.png')} alt="Claude Code CLI showing Sumo Logic MCP server connected" width="600"/>
1. Run `List my available MCP tools` to confirm access. See also [Available MCP tools](#available-mcp-tools).

### Claude Desktop App (Cowork)

The Cowork tab shares MCP configuration with Claude Code. The setup uses the same terminal command — no config file editing required.

:::note
`claude_desktop_config.json` is for the separate Claude Desktop chat app and is **not** read by the Claude Code desktop app or Cowork. Do not edit that file for this setup.
:::

1. Open a Terminal window and run:
   ```bash
   claude mcp add --transport http \
     --scope user \
     --client-id "<client-id>" --client-secret --callback-port 8888 \
     sumo-logic "<MCP-server-URL>"
   ```
   Replace `<client-id>` with the shared Client ID and `<MCP-server-URL>` with your deployment's URL. Enter the shared Client Secret when prompted — it is stored in your system keychain.
1. Open or restart the Claude desktop app. The server is now registered and available in both the Code and Cowork tabs.
1. Open a session, run `/mcp`, select **sumo-logic**, then **Authenticate**. Log in with your own Sumo Logic credentials in the browser to complete the OAuth flow.
1. Ask Claude to `List my available MCP tools` to verify the connection.

#### Alternative: Connectors UI (Code tab only)

If you have the **Code tab** in your Claude desktop app, you can add the server through **Settings > Connectors > Add custom connector** by entering the MCP server URL. Note that the Connectors UI does not support entering a pre-registered client ID and secret — if the server returns an authentication error, use the terminal method above instead.

#### Advanced: `~/.claude.json` direct edit

For scripted rollout, use `claude mcp add-json` to write the entry and store the secret in the keychain in one step:

```bash
claude mcp add-json sumo-logic \
  '{"type":"http","url":"<MCP-server-URL>","oauth":{"clientId":"<client-id>","callbackPort":8888}}' \
  --client-secret
```

## Available MCP tools

Our MCP server provides access to Sumo Logic through these tool categories:
* **Utility tools**. Discover relevant tools based on context.
* **Alerts management**. Search, retrieve, and resolve alerts.
* **Dashboard management**. Create, retrieve, update, and delete dashboards.
* **Cloud SIEM**. Manage insights, detection rules, triage information, entities, and status updates.
* **Log search**. Create and manage search jobs, retrieve paginated messages and records.
* **User management**. List users in the organization.

All tools respect your Sumo Logic permission controls and access policies.

:::note
Tool identifiers are subject to change during the preview period.
:::

### Utility tools

| Tool | Description |
| :--- | :---------- |
| `x_amz_bedrock_agentcore_search` | Search/filter the available tools by context. |

### Alerts management

| Tool | Description |
| :--- | :---------- |
| `alertsReadById`   | Get an alert or folder by ID. |
| `alertsSearch`     | Search alerts by status, severity, monitor name, mute status, and more. |
| `getHistory`       | Get alert history for a monitor over a time range. |
| `getRelatedAlerts` | Get alerts related to a given alert by time proximity or shared entity. |
| `resolve`          | Resolve an alert. |

#### Sample prompts

* `Show me all active alerts from the last 24 hours`
* `Get the history for alert ID <id>`
* `Find alerts related to <id>`
* `Resolve alert <id>`

### Dashboard management

| Tool | Description |
| :--- | :---------- |
| `createDashboard` | Create a new dashboard. |
| `deleteDashboard` | Delete a dashboard by ID. |
| `getDashboard`    | Get a dashboard by ID. |
| `listDashboards`  | List all dashboards. |
| `updateDashboard` | Update a dashboard by ID. |

#### Sample prompts

* `Create a new dashboard called "System Overview" that uses the previous query to power a dashboard panel called "Total Log Count Per Minute"`
* `Add a second panel called "Error Logs Count Per Minute" that is a similar query but only has logs in it that contain the keyword "error" in them`

### Cloud SIEM

#### Insights

| Tool | Description |
| :--- | :---------- |
| `GetAllInsights`            | Get all insights (paginated via token). |
| `GetInsight`                | Get a single insight by ID, including signals, artifacts, and entity details. |
| `GetInsightComments`        | Get comments on an insight. |
| `GetInsightHistory`         | Get history of an insight. |
| `GetInsightRelatedEntities` | Get involved entities for an insight. |
| `GetInsightTriage`          | Get triage info for an insight. |
| `GetInsights`               | Get insights with filtering by severity, status, assignee, entity, confidence, tags, and more. |
| `UpdateInsightAssignee`     | Update the assignee of an insight. |
| `UpdateInsightStatus`       | Update the status of an insight. |

#### Detection Rules

| Tool | Description |
| :--- | :---------- |
| `CreateTemplatedMatchRule` | Create a new match rule. |
| `CreateThresholdRule`      | Create a new threshold rule. |
| `GetRule`                  | Get a single rule by ID with optional tuning expressions. |
| `GetRules`                 | Get rules with filtering by category, enabled status, rule source, score, severity, stream, tags, and more. |
| `UpdateRuleEnabled`        | Enable or disable a detection rule. |

#### Sample prompts

* `Show triage details for INSIGHT-1234`
* `Retrieve the triage details`
* `What are all of the related entities?`
* `Add a comment to this insight: "This warrants deeper investigation"`
* `Show recommended next steps for INSIGHT-1234`
* `Update INSIGHT-1234 status to In Progress`
* `Create a threshold rule that fires when more than 10 failed logins occur within 5 minutes`
* `Show me all enabled rules in the authentication category`
* `Get details for rule ID <id>`
* `Disable rule <id>`
* `List all rules that have fired in the last 7 days`

### Log search

| Tool | Description |
| :--- | :---------- |
| `createSearchJob`               | Create a search job with a custom query and time range. |
| `deleteSearchJob`               | Delete a search job. |
| `getSearchJobPaginatedMessages` | Get paginated raw messages from a search job. |
| `getSearchJobPaginatedRecords`  | Get paginated aggregated records from a search job. |
| `getSearchJobStatus`            | Get the status of a search job. |

#### Sample prompts

* `Run a log search for the last 5 minutes across all of my data that counts the data by 1-minute buckets and plots the result as a line graph`
* `Run a 2-day search on _sourcecategory=*proofpoint*, count by recipient and senderip`

### User management

| Tool | Description |
| :--- | :---------- |
| `listUsers` | List all users in the organization. |

#### Sample prompts

* `List the users in my org and format as an ASCII table`
* `Show users who have never logged in`
* `List all users and their roles`

## Example workflows

These prompts demonstrate multi-step investigations that chain multiple tools together in a single session.

### Triage and investigation

* `Show me all critical insights from the last 7 days that are still open, then for each one get the related alerts and tell me which entities appear most frequently.`

* `Get insight <id>, show me its signals and involved entities, then run a log search for that IP address in the last 24 hours to find raw events.`

* `Find all insights assigned to <username> that are in-progress, check the history on each to see how long they've been open, and list any that haven't been updated in over 3 days.`

### Threat hunting

* `Search logs for any outbound connections to port 4444 in the last 48 hours, extract the source hostnames, then check if any of those hostnames appear as entities in open insights.`

* `Find all insights tagged 'ransomware' or 'lateral-movement' from the past 30 days, get the signals for each, and run a log search aggregating activity by user account involved.`

* `Look up all insights where entity type is 'username' and the value contains 'svc-' (service accounts), then search logs for those accounts' authentication events in the last week.`

### Incident response

* `Get insight <id>, pull its full signal list and all involved entities, search raw logs for each entity in the last 6 hours, then post a summary comment back to the insight.`

* `Find all insights that were closed as 'False Positive' in the last 30 days, group them by rule ID, and search logs to see if those same patterns are still occurring today.`

* `Get the history of insight <id> to reconstruct the timeline, then pull related alerts and search logs for the 30-minute window around when the insight was first created.`

### Escalation and assignment

* `Find all unassigned high-severity insights, look up the user <email> to get their ID, then assign all those insights to them.`

* `Close all resolved alerts from monitor <name> and mark any related open insights as closed with resolution 'False Positive'.`

* `Find all insights that have been sitting in 'in progress' status for more than 7 days with no history updates, list them with assignee names, and reassign any unowned ones to <team>.`

### Situational awareness

* `List all triggered critical alerts right now, find related alerts for each, then search logs for the top affected source IP to see what it's been doing.`

* `Summarize all insights created in the last 24 hours: how many per severity, which entities are involved, and who they're assigned to.`

* `Show me all triggered alerts that have related alerts fired within 30 minutes of them, then check if any of those correlated alert clusters have spawned an insight.`

### Entity-centric investigation

* `Given IP address <x.x.x.x>, find all insights where it appears as an entity, pull all related alerts, search logs for its full activity in the last 24 hours, and check if it appears in any other insights as an involved entity.`

* `Find the most active entity by insight count in the last 14 days, get all its insights with full signal details, then build a timeline dashboard of its activity.`

* `Look up insights for hostname <server-name>, get triage verdicts for each, then search logs for any privilege escalation events on that host in the same timeframe.`

### Alert and monitor deep dives

* `Find all alerts from monitor <name>, get the full history to see how often it fires, then search logs during the last trigger window to determine if it's noisy or legitimate.`

* `Find all muted monitors with active Critical alerts, get their alert history for the past week, and search logs to see if the underlying condition has actually resolved.`

### Cross-tool correlation

* `Find all alerts that fired in the last hour, check if any of them are related to existing open insights, and for those that aren't, search logs to determine if a new insight should be escalated manually.`

* `Compare insight volume week-over-week: pull insights from the last 7 days vs the 7 days before that, broken down by severity, and identify any rules that are newly firing this week.`

* `Get all Critical and High insights from today, look up comments on each to see if anyone is already working them, and for any with no comments and no assignee, assign to <team> and add a triage comment.`

### Team operations and reporting

* `List all users on the security team, then for each one show how many open insights are assigned to them and what their oldest unresolved insight is.`

* `Generate a weekly report: count insights by severity and status, show the top 5 most triggered monitors from alerts, and list the 3 most common entity types involved in new insights.`

### Dashboard and data

* `Search for the top 10 source IPs generating authentication errors in the last hour, then create a dashboard panel showing those results.`

* `Get the current SIEM overview dashboard, add a new panel for open Critical insights count, and save it.`

### Detection rule management

* `List all enabled threshold rules and show me which ones have the highest signal counts in the last 7 days.`

* `Find all rules in the 'lateral-movement' category, check if any are disabled, and enable them.`

* `Create a new match rule that detects SSH brute force attempts by looking for more than 5 failed SSH authentication events from the same source IP within 10 minutes.`

* `Get all rules tagged 'ransomware', check their signal counts, and if any haven't fired in 30 days, disable them and add a comment explaining why.`

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

### Do all team members need Sumo Logic admin access?

No. Only the person creating the OAuth client in Step 1 needs admin access. That person creates one OAuth client for the whole org and shares the Client ID and Client Secret with the team. Each team member then runs the `claude mcp add` command with those shared credentials and authenticates with their own Sumo Logic login via browser — no admin role required.

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

### Can I share my MCP configuration with my whole team at once?

Each team member registers the server on their own machine via `claude mcp add` — there is no shared config directory Claude reads automatically. For project-scoped sharing via CLI, commit `.mcp.json` to your repository; teammates will be prompted to approve it when they open the project.

For Teams and Enterprise accounts, your org admin must first enable MCP access under **Admin settings > Capabilities**.

### Why doesn't editing `claude_desktop_config.json` work?

That file is for the separate **Claude Desktop chat app** and is not read by the Claude Code desktop app or the Cowork tab. For Cowork and Claude Code desktop, use `claude mcp add` from your terminal or `claude mcp add-json` for scripted setup.
