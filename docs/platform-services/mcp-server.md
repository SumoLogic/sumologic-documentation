---
id: mcp-server
title: Sumo Logic MCP Server
description: Connect your AI tools to Sumo Logic via MCP to query logs, manage insights, and investigate security incidents from VS Code, ChatGPT, and Claude Code CLI.
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

The Sumo Logic MCP server lets MCP clients (external AI models) securely query logs, investigate Cloud SIEM insights, manage alerts and dashboards, and work with Dojo AI agents using natural language from your IDE or chat platform.

## Prerequisites

* **Sumo Logic Administrator role**. Required to create OAuth clients. If you're unsure whether you are an administrator, you can find your role in your [Preferences](/docs/get-started/onboarding-checklists/).
* **Sumo Logic OAuth credentials**. You'll create these during the setup process for your chosen client below ([learn more](/docs/manage/security/oauth)).
* **An MCP-compatible client**. Currently, we support the following clients:
   * **[ChatGPT](https://chatgpt.com/)**.
   * **[Claude Code CLI](https://code.claude.com/docs/en/quickstart)**. You'll need a paid Claude subscription or Anthropic Console account.
   * **[VS Code](https://code.visualstudio.com/docs/copilot/chat/copilot-chat)**. You'll need a GitHub account with GitHub Copilot access. A free GitHub Copilot plan is available with limited monthly requests.

## Configure in ChatGPT

### Authentication

ChatGPT uses OAuth 2.0 Authorization Code flow for authentication. You'll create an OAuth client in Sumo Logic during the setup process.

### Setup

1. In ChatGPT, go to **Settings** > **Advanced Settings**.
1. Enable **Developer Mode**.
1. Go to **Settings** > **Advanced Settings** > **Create App**.
1. Copy the **Redirect URL** shown in the dialog. You'll use this when [creating your OAuth client in Sumo Logic](/docs/manage/security/oauth#authorization-code-flow).
1. In Sumo Logic, [create an OAuth client using the Authorization Code flow](/docs/manage/security/oauth#authorization-code-flow) with the redirect URL from ChatGPT.
1. Return to ChatGPT's Create App dialog and enter:
   * **MCP Server URL**. `https://mcp.sumologic.com/mcp`
   :::note Deployment endpoints
   `mcp.sumologic.com/mcp` defaults to the us1 deployment. OAuth tokens are deployment-bound, so if your org is on a different deployment, replace this with the deployment-specific form: `mcp.<deployment>.sumologic.com/mcp` (for example, `mcp.us2.sumologic.com/mcp`). See [Sumo Logic endpoints by deployment](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for the full list.
   :::
   * **OAuth Client ID**. Your Client ID from Sumo Logic.
   * **OAuth Client Secret**. Your Client Secret from Sumo Logic.
1. Check **I understand and want to Continue**.
1. Click **Create**.
1. ChatGPT will open a browser window to authenticate with Sumo Logic. Log in to complete the OAuth flow.
1. Once connected, you can start using Sumo Logic MCP tools in your ChatGPT conversations.

### Using MCP tools in ChatGPT

To use Sumo Logic MCP tools in ChatGPT:
1. Start a new chat.
1. Ask ChatGPT to use your Sumo Logic MCP server (for example, "List my available Sumo Logic MCP tools" or "Search my logs for errors in the last hour").
1. ChatGPT will automatically invoke the appropriate MCP tools to fulfill your request.

See [Available MCP Tools](#available-mcp-tools) for a full list of capabilities.

## Configure in Claude Code CLI

### Authentication

Claude Code CLI uses OAuth 2.0 Authorization Code flow for authentication. Browser-based login handles token refresh automatically.

### Setup

1. In Sumo Logic, [create an OAuth client using the Authorization Code flow](/docs/manage/security/oauth#authorization-code-flow) with redirect URI: `http://localhost:8888/callback`.
1. In a Terminal window (not in Claude Code), register the MCP server. Replace `<client-id>` and `<client-secret>` with your values from Sumo Logic. Choose a scope:
   * **User scope** (available in all directories, recommended).
     ```bash
     claude mcp add --transport http \
       --scope user \
       --client-id "<client-id>" \
       --callback-port 8888 \
       --client-secret \
       sumo-logic "https://mcp.sumologic.com/mcp"
     ```
   * **Project scope** (available only in the current directory, writes to `.mcp.json`).
     ```bash
     claude mcp add --transport http \
       --scope project \
       --client-id "<client-id>" \
       --callback-port 8888 \
       --client-secret \
       sumo-logic "https://mcp.sumologic.com/mcp"
     ```
   :::note Deployment endpoints
   `mcp.sumologic.com/mcp` defaults to the us1 deployment. OAuth tokens are deployment-bound, so if your org is on a different deployment, replace this with the deployment-specific form: `mcp.<deployment>.sumologic.com/mcp` (for example, `mcp.us2.sumologic.com/mcp`). See [Sumo Logic endpoints by deployment](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for the full list.
   :::
1. Launch Claude Code. With **user scope**, run `claude` from any directory. With **project scope**, run it from the directory where you registered the server.
   ```bash
   claude
   ```
1. In Claude Code, run `/mcp`.
1. Select **sumo-logic** and then **Authenticate**.
1. Claude Code will open a browser window to authenticate with Sumo Logic. Log in to complete the OAuth flow.
1. Verify the connection with `/mcp` to confirm the server is connected.<br/><img src={useBaseUrl('img/platform-services/mcp/claude-mcp-connected.png')} alt="Claude Code CLI showing Sumo Logic MCP server connected" width="600"/>
1. Prompt Claude Code to `List my available MCP tools` to see what you can do. You can also refer to [Available MCP Tools](#available-mcp-tools).

## Configure in VS Code

### Authentication

VS Code with GitHub Copilot Chat uses OAuth 2.0 Client Credentials flow for authentication.

Before you begin, [create an OAuth client using Client Credentials flow](/docs/manage/security/oauth#client-credentials-flow) and [generate an access token](/docs/manage/security/oauth#generate-an-access-token). You'll need your access token for the setup below.

### Setup

1. Open VS Code and install the GitHub Copilot Chat extension, if you don't have it.
1. Click in the VS Code command palette and run a search for **> MCP: Open User Configuration**.<br/><img src={useBaseUrl('img/platform-services/mcp/vscode-config-command.png')} alt="VS Code command palette search with MCP: Open User Configuration highlighted" width="600"/>
1. Add the following configuration to the **mcp.json** file.
   ```json title="mcp.json"
   {
     "servers": {
       "Sumo Logic MCP server": {
         "type": "http",
         "url": "https://mcp.sumologic.com/mcp",
         "headers": {
           "Authorization": "Bearer ${input:oauthToken}"
         },
         "gallery": "https://sanyaku.github.io/sumologic-mcp-gateway",
         "version": "Original"
       }
     },
     "inputs": [
       {
         "id": "oauthToken",
         "type": "promptString",
         "description": "Enter your OAuth access token for Sumo Logic MCP server",
         "password": true
       }
     ]
   }
   ```
   If you've previously configured other MCP servers here, this should be an additive process (that is, do not delete existing ones you still intend to use).
   :::note Deployment endpoints
   `mcp.sumologic.com/mcp` defaults to the us1 deployment. OAuth tokens are deployment-bound, so if your org is on a different deployment, replace the `"url"` value with the deployment-specific form: `mcp.<deployment>.sumologic.com/mcp` (for example, `mcp.us2.sumologic.com/mcp`). See [Sumo Logic endpoints by deployment](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for the full list.
   :::
1. In the **mcp.json** file, click the **Start** button just above `"Sumo Logic MCP server": {`.<br/><img src={useBaseUrl('img/platform-services/mcp/vscode-mcp-start.png')} alt="VS Code Start button in mcp.json configuration file" width="600"/>
1. You'll be prompted in the command palette for an OAuth access token. Enter your [access token from Sumo Logic](/docs/manage/security/oauth#generate-an-access-token) there.<br/><img src={useBaseUrl('img/platform-services/mcp/vscode-oauth-input.png')} alt="prompt in command palette for OAuth access token" width="600"/>
1. Confirm that the server shows as **Running**.<br/><img src={useBaseUrl('img/platform-services/mcp/vscode-running.png')} alt="prompt in command palette for OAuth access token" width="600"/>
1. Open GitHub Copilot Chat and ensure it's set to **Agent** mode.
1. You should now be connected to the Sumo Logic MCP server. Verify by asking `List my available MCP tools` to see what you can do. You can also refer to [Available MCP Tools](#available-mcp-tools).

### Reconnecting

Access tokens expire after 12 hours and may also expire after quitting and restarting VS Code. When this occurs:

:::note
If you see a `403` error with message `insufficient_scope - The request requires higher privileges than provided by the access token`, the cause may be a **deployment mismatch** rather than a missing permission. This happens when the OAuth token was generated for one deployment but the `"url"` in **mcp.json** points to a different one. Verify that both use the same deployment.
:::

1. You'll see a **Dynamic Client Registration not supported** popup asking for an OAuth client ID. Do NOT provide this. Click **Cancel**.<br/><img src={useBaseUrl('img/platform-services/mcp/vscode-dynamic-reg-popup.png')} alt="Dynamic Client Registration not supported popup asking for an OAuth client ID with Cancel button highlighted" width="500"/>
1. You'll be prompted again for an OAuth client ID in your command palette. Tap **Escape** on your keyboard.<br/><img src={useBaseUrl('img/platform-services/mcp/vscode-esc-clientid.png')} alt="VS Code command palette search with MCP: Open User Configuration highlighted" width="600"/>
1. [Generate a new access token in Sumo Logic](/docs/manage/security/oauth#generate-an-access-token).
1. Reopen your **mcp.json** file.
1. Hover your mouse over the redacted access token until the **Edit | Clear | Clear All** options appear, then click **Edit**.<br/><img src={useBaseUrl('img/platform-services/mcp/vscode-oauth-edit.png')} alt="edit VS Code OAuth access token" width="600"/>
1. Enter your new access token in the command palette and then restart the Sumo Logic MCP server.

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
* `Delete those users`
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

### Can MCP handle multiple operations in a single request?

Yes. MCP supports multi-tool calls within a single conversational interaction.

### How does this affect my Sumo Logic usage?

This capability in closed beta requires an AI Addendum. Contact your account representative for pricing information.

:::note
For bulk data retrieval or model training, the [Search Job API](/docs/api/search-job) remains the preferred option.
:::

### Where does my agent run?

Agents connected via MCP run in your own environment, not within Sumo Logic infrastructure.

## Additional resources

* [Sumo Logic MCP Server demo](https://www.sumologic.com/demo/mcp-server)
