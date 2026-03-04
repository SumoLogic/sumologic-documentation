---
id: mcp-server
title: Sumo Logic MCP Server (Closed Preview)
description: Connect your AI tools to Sumo Logic via MCP to query logs, manage insights, and investigate security incidents from VS Code or Claude Code CLU.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
 <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Closed Preview</span></a></p>

:::info
This feature is in closed preview. For more information, contact your Sumo Logic account executive.
:::

The Sumo Logic MCP server lets external copilots and proprietary models securely query logs, investigate Cloud SIEM insights, manage alerts and dashboards, work with existing Dojo AI agents, and perform user management — all using natural language from your IDE or chat platform.

During closed preview, the following MCP clients are supported:
* [VS Code + GitHub Copilot Chat](https://code.visualstudio.com/docs/copilot/chat/copilot-chat)
* [Claude Code CLI](https://code.claude.com/docs/en/quickstart)


## Prerequisites

* **Sumo Logic Administrator role**. Required to create service accounts and OAuth clients. If you're unsure whether you are an administrator, you can find your role in your [Preferences](/docs/get-started/onboarding-checklists/).
* **Sumo Logic personal access key**. Used to authenticate API calls during setup. See [Access Keys](/docs/manage/security/access-keys/) to learn more. We recommend setting your access key scopes to **Default** (all permissions) so that API requests required for setup are not blocked.
* **An MCP-compatible client**. Currently, [VS Code + GitHub Copilot Chat](https://code.visualstudio.com/docs/copilot/chat/copilot-chat) and [Claude Code Terminal CLI](https://code.claude.com/docs/en/quickstart) are the only supported clients.
   * **For VS Code**. You'll need GitHub account with GitHub Copilot access. A free GitHub Copilot plan is available with limited monthly requests.
   * **For Claude**. You'll need a paid Claude subscription or Anthropic Console account.


<!--
## Architecture
Sumo Logic provides a Remote MCP server at a specified URL.
-->

## Authentication

The Sumo Logic MCP server uses the OAuth2 client credentials flow. You'll complete a one-time setup to create a service account, register an OAuth client, and generate short-lived access tokens for your MCP client.

You use your Access ID and Access Key only during setup. MCP clients authenticate using OAuth access tokens, not access keys.

<img src={useBaseUrl('img/platform-services/mcp/oauth-flow-diagram.png')} alt="Sumo Logic MCP server OAuth 2.0 client credentials flow diagram showing an application authenticating with the Authorization Server using a Client ID and Secret, receiving an access token, then using that token to request resources from the Resource Server." height="375" width="600"/>

MCP operations run as the configured service account. Any content created through MCP (such as dashboards) is owned by that service account.

Service accounts cannot log in to the UI. To view MCP-created content, open the content **Library**, select **Content Administrator** from the **View as** dropdown, and navigate to the service account's **Personal** folder.

### Step 1: Create a service account

In this step, you'll create a Sumo Logic service account, which is required to create an OAuth client. Alternatively, you can use an existing service account.

1. Log in to Sumo Logic and [follow the steps here to create a service account](/docs/manage/security/service-accounts/#create-a-service-account). For the purpose of MCP setup, it may be easiest to select an admin role so that API requests are not blocked.
1. [Get a list of all service accounts in your org](https://api.sumologic.com/docs/#operation/listServiceAccounts) and find the `"id"` of the service account you just created. You'll use it in the next step.
   <Tabs
     className="unique-tabs"
     defaultValue="request"
     values={[
       {label: 'Example request', value: 'request'},
       {label: 'Example response', value: 'response'},
     ]}>
   <TabItem value="request">
   ```bash
   curl -u "<accessId>:<accessKey>" \
     https://api.sumologic.com/api/v1/serviceAccounts
   ```
   </TabItem>
   <TabItem value="response">
   ```json title="Example response highlighting service account ID" {12}
   {
     "name": "My Service Account",
     "email": "hello@example.com",
     "roleIds": [
       "00000000000001DF",
       "00000000000002D2"
     ],
     "createdAt": "2025-10-16T09:10:00.000Z",
     "createdBy": "0000000006743FDD",
     "modifiedAt": "2025-10-16T09:10:00.000Z",
     "modifiedBy": "0000000006743FE8",
     "id": "0000000000C4661B", // service account ID
     "isActive": true
   }
   ```
   </TabItem>
   </Tabs>

### Step 2: Create an OAuth client

In this step, you'll create an OAuth client under your service account.

:::note
UI support for this step is not yet available. You'll need to use the Sumo Logic API.
:::

1. [Get a list of available OAuth `scopes`](https://api.sumologic.com/docs/#operation/listOAuthScopes) and decide which ones you'd like to assign to your OAuth client. The `scopes` you request here must already be included in your service account's `effectiveScopes` field.
   <details>
   <summary>How are scopes enforced?</summary>

   The permissions granted to an OAuth client are limited to the intersection of:
   * The roles (RBAC capabilities) assigned to the service account.
   * The scopes assigned to the OAuth client.

   This prevents privilege escalation. If the service account's roles are restricted in the future, the OAuth client's effective permissions are automatically reduced as well. If a requested scope is not included in the service account's roles, it will be silently excluded from the OAuth client's effective permissions.

   </details>
1. [Create a new OAuth client](https://api.sumologic.com/docs/#operation/createOAuthClient) using the `"scopes"` from the previous step. `"runAsId"` will be the `"id"` of the [service account you just created](#step-1-create-a-service-account). In the response, note the `"clientId"` and `"clientSecret"`. These are your OAuth client credentials, which you'll use to generate an access token in the next step.
   <Tabs
     className="unique-tabs"
     defaultValue="request"
     values={[
       {label: 'Example request', value: 'request'},
       {label: 'Example response', value: 'response'},
     ]}>

   <TabItem value="request">

   This example grants the MCP agent the ability to query logs and metrics, understand schema/fields, read saved content, export results.

   ```bash title="Example request"
   curl -u "<access-id>:<access-key>" \
     https://api.sumologic.com/api/v1/oauth/clients \
     -H 'Content-Type: application/json' \
     -d '{
       "name": "My OAuth Client",
       "description": "OAuth Client for MCP",
       "runAsId": "0000000000C4661B",
       "grantTypes": ["client_credentials"],
       "scopes": ["runLogSearch", "runMetricsQuery", "viewLibrary", "manageCollectors", "manageFieldExtractionRules", "manageScheduledViews", "managePartitions", "viewMonitorsV2", "manageSlos"]
     }'
   ```

   </TabItem>
   <TabItem value="response">

   ```json title="Example response highlighting client ID and client secret" {2,13}
   {
     "clientId": "zVplCFHcpTDwtktBIQmFI2K6s9HEo4HAtcQD1f1M5eQ",
     "createdAt": "2025-10-16T09:10:00.000Z",
     "createdBy": "0000000006743FDD",
     "modifiedAt": "2025-10-16T09:10:00.000Z",
     "modifiedBy": "0000000006743FDD",
     "name": "My OAuth Client",
     "description": "OAuth Client for MCP with basic permissions",
     "runAsId": "0000000000C4661B",
     "grantTypes": ["client_credentials"],
     "scopes": ["runLogSearch", "runMetricsQuery", "viewLibrary", "manageCollectors", "manageFieldExtractionRules", "manageScheduledViews", "managePartitions", "viewMonitorsV2", "manageSlos"]
     "effectiveScopes": ["runLogSearch", "runMetricsQuery", "viewLibrary", "manageCollectors", "manageFieldExtractionRules", "manageScheduledViews", "managePartitions", "viewMonitorsV2", "manageSlos"]
     "clientSecret": "EqyuIvsnae0LnMC2mbJArysXcmp0LuBsRgmyeLtSkFPEzSxdvpYQMDajn_8buaDj"
   }
   ```

   </TabItem>
   </Tabs>

### Step 3: Generate an access token

In this step, you'll request an OAuth access token from the token endpoint using your client credentials (`"clientId'` and `"clientSecret"`) from the previous step. If applicable, replace `service.sumologic.com` with your [deployment endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).

#### Option A: All permissions

Omit the `"scope"` parameter to assign all of the OAuth Client's `"effectiveScopes"` to the access token.

```bash
curl -X POST https://service.sumologic.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "<clientId>:<clientSecret>" \
  -d "grant_type=client_credentials"
```

#### Option B: Restricted permissions

Use the `scope` parameter to assign specific scopes in your request, separated by spaces, not commas (for example, `"scope=viewUsersAndRoles manageCollectors runLogSearch"`).

```bash
curl -X POST https://service.sumologic.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "<your-client-id>:<your-client-secret>" \
  -d "grant_type=client_credentials" \
  -d "scope=<scope-1> <scope-2> <scope-n>"
```

#### Token expiration and reconnection

Access tokens expire after 30 minutes. Your MCP client must refresh the token automatically or prompt you to generate a new one. See the client-specific sections below to configure your client and set the token as a Bearer token to authorize requests.

:::tip
The token endpoint URL varies by [deployment](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security). To discover it programmatically (for example, in an automation script), query the Authorization Server Metadata for your deployment using `curl https://service.sumologic.com/.well-known/oauth-authorization-server`. The response includes the `token_endpoint` and other supported OAuth parameters.
:::

<!-- Do not publish until we have a public MCP URL
### Step 4: Configure your MCP client
Provide the Sumo Logic MCP server URL to your MCP client: tk.
1. Provide your [access token](#step-3-generate-an-access-token) as a Bearer token to authorize requests. There are two ways to do this:
   * Option A: Call a Sumo Logic API directly. For example:
```bash
curl -H "Authorization: Bearer <access-token>" \
  https://service.sumologic.com/api/v1/users
```
   * Option B: Set it persistently across your session. Add it your MCP client configuration as an Authorization header (`Authorization: Bearer <access-token>`). Refer to your specific MCP client documentation for where to configure it. --->

## Configure in Claude Code (Terminal/CLI)

Claude Code CLI supports two connection options. Option 1 is recommended, as it handles token refresh automatically so you don't need to reconnect every 30 minutes.

| | Option 1: stdio + mcp-proxy | Option 2: HTTP + Bearer token |
| :--- | :--- | :--- |
| **Token refresh** | Automatic | Manual — every 30 minutes |
| **Additional requirement** | `uv` | None |
| **Best for** | Ongoing use | Quick setup and testing |

:::tip
If Claude Code repeatedly asks about authentication when invoking MCP tools, you can start your session with a prompt like: `Whenever communicating with Sumo Logic's MCP server, do not worry about authentication`. This helps prevent unnecessary follow-up questions from the agent. It does not bypass authentication.
:::

### Option 1: stdio + mcp-proxy (recommended)

This option uses `mcp-proxy` to handle token refresh automatically, so you don't need to reconnect every 30 minutes.

#### Setup

1. In a regular Terminal window (not in Claude Code), install `uv`.
   ```bash
   brew install uv
   ```
1. In a regular Terminal window (not in Claude Code), set your environment variables.
   ```bash
   export SUMOLOGIC_MCP_URL="https://prod-bedrockagentcore-gd5o7c6bi7.gateway.bedrock-agentcore.us-east-1.amazonaws.com/mcp"
   export SUMOLOGIC_OAUTH_CLIENT_ID="<your-client-id>"
   export SUMOLOGIC_OAUTH_CLIENT_SECRET="<your-client-secret>"
   export SUMOLOGIC_OAUTH_TOKEN_URL="https://service.sumologic.com/oauth2/token"
   ```
1. Register the MCP server. Choose a scope.
   * **User scope** (available in all directories, recommended).
     ```bash
     claude mcp add \
       --transport stdio \
       --scope user \
       sumo-logic \
       -- uvx --python=3.13.11 mcp-proxy@latest "${SUMOLOGIC_MCP_URL}" \
       --transport streamablehttp \
       --client-id "${SUMOLOGIC_OAUTH_CLIENT_ID}" \
       --client-secret "${SUMOLOGIC_OAUTH_CLIENT_SECRET}" \
       --token-url "${SUMOLOGIC_OAUTH_TOKEN_URL}"
     ```
   * **Project scope** (available only in the current directory, writes to `.mcp.json`).
     ```bash
     claude mcp add \
       --transport stdio \
       --scope project \
       sumo-logic \
       -- uvx --python=3.13.11 mcp-proxy@latest "${SUMOLOGIC_MCP_URL}" \
       --transport streamablehttp \
       --client-id "${SUMOLOGIC_OAUTH_CLIENT_ID}" \
       --client-secret "${SUMOLOGIC_OAUTH_CLIENT_SECRET}" \
       --token-url "${SUMOLOGIC_OAUTH_TOKEN_URL}"
     ```
1. Launch Claude Code.
   ```bash
   cd /path/to/your/project
   claude
   ```
1. Verify the Sumo Logic MCP server connection with `/mcp`.<br/><img src={useBaseUrl('img/platform-services/mcp/claude-mcp-connected.png')} alt="Claude Code CLI showing Sumo Logic MCP server connected" width="600"/>
1. Prompt Claude Code to `List my available MCP tools` to see what you can do. You can also refer to [Available MCP Tools](#available-mcp-tools).

### Option 2: HTTP + Bearer token

#### Setup

1. In a regular Terminal window (not in Claude Code), run the below snippet to set your environment variables, register the MCP server, and define a helper function to fetch an access token.
   ```bash
   get_sumologic_oauth_token() {
     curl -s -X POST "${SUMOLOGIC_OAUTH_TOKEN_URL}" \
       -H "Content-Type: application/x-www-form-urlencoded" \
       -d "grant_type=client_credentials&client_id=${SUMOLOGIC_OAUTH_CLIENT_ID}&client_secret=${SUMOLOGIC_OAUTH_CLIENT_SECRET}" \
       | jq -rc '.access_token'
   }

   export SUMOLOGIC_MCP_URL="https://prod-bedrockagentcore-gd5o7c6bi7.gateway.bedrock-agentcore.us-east-1.amazonaws.com/mcp"
   export SUMOLOGIC_OAUTH_CLIENT_ID="<your-client-id>"
   export SUMOLOGIC_OAUTH_CLIENT_SECRET="<your-client-secret>"
   export SUMOLOGIC_OAUTH_TOKEN_URL="https://service.sumologic.com/oauth2/token"
   export SUMOLOGIC_OAUTH_ACCESS_TOKEN="$(get_sumologic_oauth_token)"
   ```
1. Register the MCP server. Choose a scope.
   * **User scope** (available in all directories, recommended).
       ```bash
       claude mcp add \
         --transport http \
         --scope user \
         sumo-logic \
         "${SUMOLOGIC_MCP_URL}" \
         --header "Authorization: Bearer ${SUMOLOGIC_OAUTH_ACCESS_TOKEN}"
       ```
   * **Project scope** (available only in the current directory, writes to `.mcp.json`).
     ```bash
     claude mcp add \
       --transport http \
       --scope project \
       sumo-logic \
       "${SUMOLOGIC_MCP_URL}" \
       --header "Authorization: Bearer ${SUMOLOGIC_OAUTH_ACCESS_TOKEN}"
     ```
1. Launch Claude Code via Terminal.
   ```bash
   cd /path/to/your/project
   claude
   ```
1. In Claude Code, verify the Sumo Logic MCP server connection with `/mcp`.<br/><img src={useBaseUrl('img/platform-services/mcp/claude-mcp-connected.png')} alt="Claude Code CLI showing Sumo Logic MCP server connected" width="600"/>
1. Prompt Claude Code to `List my available MCP tools` to see what you can do. You can also refer to [Available MCP Tools](#available-mcp-tools).

#### Token expiration and reconnection

OAuth access tokens expire after 30 minutes. When the token expires, Claude Code will lose connection to the MCP server. You may see an error: `Incompatible auth server: does not support dynamic client registration`.

To reconnect, run the following in your terminal each time you start a new session to ensure a fresh token:
```bash
get_sumologic_oauth_token() {
  curl -s -X POST "${SUMOLOGIC_OAUTH_TOKEN_URL}" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "grant_type=client_credentials&client_id=${SUMOLOGIC_OAUTH_CLIENT_ID}&client_secret=${SUMOLOGIC_OAUTH_CLIENT_SECRET}" \
    | jq -rc '.access_token'
}

export SUMOLOGIC_MCP_URL="https://prod-bedrockagentcore-gd5o7c6bi7.gateway.bedrock-agentcore.us-east-1.amazonaws.com/mcp"
export SUMOLOGIC_OAUTH_CLIENT_ID="<your-client-id>"
export SUMOLOGIC_OAUTH_CLIENT_SECRET="<your-client-secret>"
export SUMOLOGIC_OAUTH_TOKEN_URL="https://service.sumologic.com/oauth2/token"
export SUMOLOGIC_OAUTH_ACCESS_TOKEN="$(get_sumologic_oauth_token)"
claude
```

If you need to re-register the server with a new token:
1. Remove the existing MCP server configuration.
   ```bash
   claude mcp remove sumo-logic --scope user
   ```
1. Re-register the MCP server with the new token.
   ```bash
   claude mcp add \
     --transport http \
     --scope user \
     sumo-logic \
     "${SUMOLOGIC_MCP_URL}" \
     --header "Authorization: Bearer ${SUMOLOGIC_OAUTH_ACCESS_TOKEN}"
   ```
1. Re-launch Claude Code.
   ```bash
   cd /path/to/your/project
   claude
   ```
1. Verify the Sumo Logic MCP server connection with `/mcp`.<br/><img src={useBaseUrl('img/platform-services/mcp/claude-mcp-connected.png')} alt="Claude Code CLI showing Sumo Logic MCP server connected" width="600"/>

<!--To reconnect:
1. [Generate a new access token](#step-3-generate-an-access-token).
1. Remove the existing MCP server configuration:
   ```bash
   claude mcp remove sumo-logic
   ```
1. Re-register the MCP server with the new token:
   ```bash
   claude mcp add --transport http sumo-logic https://prod-bedrockagentcore-gd5o7c6bi7.gateway.bedrock-agentcore.us-east-1.amazonaws.com/mcp \
     --header "Authorization: Bearer <your-access-token>"
   ```-->

## Configure in VS Code via GitHub Copilot Chat

### Setup

1. Open VS Code and install the GitHub Copilot Chat extension, if you don't have it.
1. Click in the VS Code command palette and run a search for **> MCP: Open User Configuration**.<br/><img src={useBaseUrl('img/platform-services/mcp/vscode-config-command.png')} alt="VS Code command palette search with MCP: Open User Configuration highlighted" width="600"/>
1. Add the following configuration to the **mcp.json** file.
   ```json title="mcp.json"
   {
     "servers": {
       "Sumo Logic MCP server": {
         "type": "http",
         "url": "https://prod-bedrockagentcore-gd5o7c6bi7.gateway.bedrock-agentcore.us-east-1.amazonaws.com/mcp",
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
1. In the **mcp.json** file, click the **Start** button just above `"Sumo Logic MCP server": {`.<br/><img src={useBaseUrl('img/platform-services/mcp/vscode-mcp-start.png')} alt="VS Code Start button in mcp.json configuration file" width="600"/>
1. You'll be prompted in the command palette for an OAuth access token. Enter your [access token](#step-3-generate-an-access-token) there.<br/><img src={useBaseUrl('img/platform-services/mcp/vscode-oauth-input.png')} alt="prompt in command palette for OAuth access token" width="600"/>
1. Confirm that the server shows as **Running**.<br/><img src={useBaseUrl('img/platform-services/mcp/vscode-running.png')} alt="prompt in command palette for OAuth access token" width="600"/>
1. Open GitHub Copilot Chat and ensure it's set to **Agent** mode.
1. You should now be connected to the Sumo Logic MCP server. Verify by asking `List my available MCP tools` to see what you can do. You can also refer to [Available MCP Tools](#available-mcp-tools).

### Reconnecting

Access tokens expire in 30 minutes and may also expire after quitting and restarting VS Code. When this occurs:
1. You'll see a **Dynamic Client Registration not supported** popup asking for an OAuth client ID. Do NOT provide this. Click **Cancel**.<br/><img src={useBaseUrl('img/platform-services/mcp/vscode-dynamic-reg-popup.png')} alt="Dynamic Client Registration not supported popup asking for an OAuth client ID with Cancel button highlighted" width="500"/>
1. You'll be prompted again for an OAuth client ID in your command palette. Tap **Escape** on your keyboard.<br/><img src={useBaseUrl('img/platform-services/mcp/vscode-esc-clientid.png')} alt="VS Code command palette search with MCP: Open User Configuration highlighted" width="600"/>
1. [Generate a new access token](#step-3-generate-an-access-token).
1. Reopen your **mcp.json** file.
1. Hover your mouse over the redacted access token until the **Edit | Clear | Clear All** options appear, then click **Edit**.<br/><img src={useBaseUrl('img/platform-services/mcp/vscode-oauth-edit.png')} alt="edit VS Code OAuth access token" width="600"/>
1. Enter your new access token in the command palette and then restart the Sumo Logic MCP server.

## Available MCP tools

Our MCP server provides access to Sumo Logic through these tool categories:
* **Utility tools**. Discover relevant tools based on context.
* **Alerts management**. Search, retrieve, and resolve alerts.
* **Dashboard management**. Create, retrieve, update, and delete dashboards.
* **Cloud SIEM Insights**. Get insights, triage information, entities, and status updates.
* **Log search**. Create and manage search jobs, retrieve paginated messages and records.
* **User management**. List users in the organization.

All tools respect your Sumo Logic permission controls and access policies.

:::note
Tool identifiers are subject to change during the beta period.
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

### Cloud SIEM Insights

| Tool | Description |
| :--- | :---------- |
| `GetAllInsights`            | Get all Insights (paginated via token). |
| `GetInsight`                | Get a single Insight by ID, including signals, artifacts, and entity details. |
| `GetInsightComments`        | Get comments on an Insight. |
| `GetInsightHistory`         | Get history of an Insight. |
| `GetInsightRelatedEntities` | Get involved entities for an Insight. |
| `GetInsightTriage`          | Get triage info for an Insight. |
| `GetInsights`               | Get Insights with filtering by severity, status, assignee, entity, confidence, tags, and more. |
| `UpdateInsightAssignee`     | Update the assignee of an Insight. |
| `UpdateInsightStatus`       | Update the status of an Insight. |

#### Sample prompts

* `Show triage details for INSIGHT-1234`
* `Retrieve the triage details`
* `What are all of the related entities?`
* `Add a comment to this insight: "This warrants deeper investigation"`
* `Show recommended next steps for INSIGHT-1234`
* `Update INSIGHT-1234 status to In Progress`

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

* `Show me all Critical Insights from the last 7 days that are still open, then for each one get the related alerts and tell me which entities appear most frequently.`

* `Get Insight <id>, show me its signals and involved entities, then run a log search for that IP address in the last 24 hours to find raw events.`

* `Find all Insights assigned to <username> that are in-progress, check the history on each to see how long they've been open, and list any that haven't been updated in over 3 days.`

### Threat hunting

* `Search logs for any outbound connections to port 4444 in the last 48 hours, extract the source hostnames, then check if any of those hostnames appear as entities in open Insights.`

* `Find all Insights tagged 'ransomware' or 'lateral-movement' from the past 30 days, get the signals for each, and run a log search aggregating activity by user account involved.`

* `Look up all Insights where entity type is 'username' and the value contains 'svc-' (service accounts), then search logs for those accounts' authentication events in the last week.`

### Incident response

* `Get Insight <id>, pull its full signal list and all involved entities, search raw logs for each entity in the last 6 hours, then post a summary comment back to the Insight.`

* `Find all Insights that were closed as 'False Positive' in the last 30 days, group them by rule ID, and search logs to see if those same patterns are still occurring today.`

* `Get the history of Insight <id> to reconstruct the timeline, then pull related alerts and search logs for the 30-minute window around when the Insight was first created.`

### Escalation and assignment

* `Find all unassigned high-severity Insights, look up the user <email> to get their ID, then assign all those Insights to them.`

* `Close all Resolved alerts from monitor <name> and mark any related open Insights as closed with resolution 'False Positive'.`

* `Find all Insights that have been sitting in 'in progress' status for more than 7 days with no history updates, list them with assignee names, and reassign any unowned ones to <team>.`

### Situational awareness

* `List all Triggered Critical alerts right now, find related alerts for each, then search logs for the top affected source IP to see what it's been doing.`

* `Summarize all Insights created in the last 24 hours: how many per severity, which entities are involved, and who they're assigned to.`

* `Show me all Triggered alerts that have related alerts fired within 30 minutes of them, then check if any of those correlated alert clusters have spawned an Insight.`

### Entity-centric investigation

* `Given IP address <x.x.x.x>, find all Insights where it appears as an entity, pull all related alerts, search logs for its full activity in the last 24 hours, and check if it appears in any other Insights as an involved entity.`

* `Find the most active entity by Insight count in the last 14 days, get all its Insights with full signal details, then build a timeline dashboard of its activity.`

* `Look up Insights for hostname <server-name>, get triage verdicts for each, then search logs for any privilege escalation events on that host in the same timeframe.`

### Alert and monitor deep dives

* `Find all alerts from monitor <name>, get the full history to see how often it fires, then search logs during the last trigger window to determine if it's noisy or legitimate.`

* `Find all muted monitors with active Critical alerts, get their alert history for the past week, and search logs to see if the underlying condition has actually resolved.`

### Cross-tool correlation

* `Find all alerts that fired in the last hour, check if any of them are related to existing open Insights, and for those that aren't — search logs to determine if a new Insight should be escalated manually.`

* `Compare Insight volume week-over-week: pull Insights from the last 7 days vs the 7 days before that, broken down by severity, and identify any rules that are newly firing this week.`

* `Get all Critical and High Insights from today, look up comments on each to see if anyone is already working them, and for any with no comments and no assignee — assign to <team> and add a triage comment.`

### Team operations and reporting

* `List all users on the security team, then for each one show how many open Insights are assigned to them and what their oldest unresolved Insight is.`

* `Generate a weekly report: count Insights by severity and status, show the top 5 most triggered monitors from alerts, and list the 3 most common entity types involved in new Insights.`

### Dashboard and data

* `Search for the top 10 source IPs generating authentication errors in the last hour, then create a dashboard panel showing those results.`

* `Get the current SIEM overview dashboard, add a new panel for open Critical Insights count, and save it.`

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

<details>
<summary>Can MCP handle multiple operations in a single request?</summary>

Yes. MCP supports multi-tool calls within a single conversational interaction.

</details>

<details>
<summary>How does this affect my Sumo Logic usage?</summary>

This capability in closed beta requires an AI Addendum. Contact your account representative for pricing information.

:::note
For bulk data retrieval or model training, the [Search Job API](/docs/api/search-job) remains the preferred option.
:::

</details>

<details>
<summary>Where does my agent run?</summary>

Agents connected via MCP run in your own environment, not within Sumo Logic infrastructure.

</details>
