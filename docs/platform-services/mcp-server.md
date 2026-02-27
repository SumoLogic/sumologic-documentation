---
id: mcp-server
title: Sumo Logic MCP Server (Public Preview)
description: Connect your AI tools to Sumo Logic via MCP to query logs, manage insights, and investigate security incidents from VS Code or Terminal with Claude Code.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
 <meta name="robots" content="noindex" />
</head>

:::info
This feature is in public preview. For more information, contact your Sumo Logic account executive.
:::

The Sumo Logic MCP Server lets you use Sumo Logic tools for alerts, insights, dashboards, log searches and users in natural language in VS Code and Terminal.

It enables external copilots and proprietary models to securely query logs, investigate SIEM insights, manage alerts and dashboards, and work with existing Dojo AI agents using natural language from IDEs and chat platforms.

## Prerequisites

* Sumo Logic access ID and access key.
* MCP-compatible client application (VS Code or Terminal with Claude Code). These are the only supported clients in closed beta.
* Sumo Logic MCP Server URL (provided by your Sumo Logic account team).
* OAuth2 credentials from Sumo Logic (see [Authentication](#authentication) below).

Configuration steps vary by tool. Refer to your specific tool's documentation for MCP setup instructions.

## Architecture

Sumo Logic provides a Remote MCP Server at a specified URL.

## Authentication

The MCP Server uses the OAuth2 client credentials flow. You'll need to complete a one-time setup in Sumo Logic before configuring your MCP client.

<img src={useBaseUrl('img/platform-services/mcp/oauth-flow-diagram.png')} alt="OAuth 2.0 client credentials flow diagram showing an application authenticating with the Authorization Server using a Client ID and Secret, receiving an access token, then using that token to request resources from the Resource Server." width="600"/>

### Step 1: Create a service account

Service accounts are required to create OAuth clients.

#### Prerequisites

Obtain your access ID and access key, or [follow these steps to create a new pair](/docs/manage/security/access-keys/#create-an-access-key).

#### Check for existing service accounts

If you already have a service account, you can retrieve its ID:
```bash
curl -u "<your-access-id>:<your-access-key>" \
  https://api.sumologic.com/api/v1/serviceAccounts
```

If you see an existing service account you want to use, note its `id` and skip to [Step 2](#step-2-create-an-oauth-client).

#### Create a new service account (UI)

Follow the steps under [Service Accounts](/docs/manage/security/service-accounts/).

#### Create a new service account (API)

1. Get a list of available roles to find the role ID(s) you want to assign.
    ```bash
    curl -u "<your-access-id>:<your-access-key>" \
      https://api.sumologic.com/api/v1/roles
    ```
1. Create the service account. Replace `api.sumologic.com` with your [regional deployment endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
    ```bash
    curl -u "<your-access-id>:<your-access-key>" \
      https://api.sumologic.com/api/v1/serviceAccounts \
      -H 'Content-Type: application/json' \
      -d '{
            "name": "MCP Service Account",
            "email": "<email>@example.com",
            "roleIds": ["<roleId>"]
          }'
    ```
1. Note the returned `"id"` in the response for the next step.


### Step 2: Create an OAuth client

In this step, you'll create an OAuth client under your service account.

:::note
UI support for this step is not yet available. You'll need to use our API.
:::

1. Decide which `scopes` (Sumo Logic role capabilities) you'd like to apply to your OAuth client. The `scopes` you request must already be included in your service account’s `effectiveScopes` field. To get a list of available scopes:
   ```bash
   curl -u "<your-access-id>:<your-access-key>" \
     https://api.sumologic.com/api/v1/oauth/scopes
   ```
1. Run the following, where `"scopes"` are the Sumo Logic role capabilities you'd like to apply to your OAuth client. The `scopes` you request must already be included in your service account’s `effectiveScopes` field.
```bash
curl -u "<your-access-id>:<your-access-key>" \
  https://api.sumologic.com/api/v1/oauth/clients \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "My MCP Client",
    "runAsId": "<serviceAccountId>",
    "grantTypes": ["client_credentials"],
    "scopes": ["<scope1>", "<scope2>"]
  }'
```
1. Note the `clientId` and `clientSecret` from the response. These are your OAuth client credentials, which you will use to generate an access token in the next step.

<details>
<summary>Click to see an example</summary>

```bash
curl -u "<your-access-id>:<your-access-key>" \
  https://api.sumologic.com/api/v1/oauth/clients \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "My OAuth Client",
    "runAsId": "0000000000000234",
    "grantTypes": ["client_credentials"],
    "scopes": ["viewUsersAndRoles", "manageUsersAndRoles"]
  }'
```

</details>

### Step 3: Generate an access token

Use your `clientId` and `clientSecret` to request an access token from the OAuth token endpoint. Replace `service.sumologic.com` with your [deployment's service endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).

```bash
curl -X POST https://service.sumologic.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "<your-client-id>:<your-client-secret>" \
  -d "grant_type=client_credentials"
```

:::note
Access tokens expire in 30 minutes. Your MCP client or orchestrator agent is responsible for detecting token expiration and [generating a new one](#step-3-generate-an-access-token).
:::

To discover the token endpoint programmatically, query the Authorization Server Metadata:

```bash
curl https://service.sumologic.com/.well-known/oauth-authorization-server
```

The response includes `token_endpoint` and other supported OAuth parameters.

<!-- Do not publish until we have a public MCP URL
### Step 4: Configure your MCP client

Provide the Sumo Logic MCP Server URL to your MCP client: tk.

1. Provide your [access token](#step-3-generate-an-access-token) as a Bearer token to authorize requests. There are two ways to do this:
   * Option A: Call a Sumo Logic API directly. For example:
```bash
curl -H "Authorization: Bearer <access-token>" \
  https://service.sumologic.com/api/v1/users
```
   * Option B: Set it persistently across your session. Add it your MCP client configuration as an Authorization header (`Authorization: Bearer <access-token>`). Refer to your specific MCP client documentation for where to configure it.
--->

## Configure in Claude Code via Terminal

1. In a regular Terminal window (not in Claude Code), set your access token as a Bearer token to authorize requests.
   ```bash
   claude mcp add --transport http sumo-logic https://prod-bedrockagentcore-gd5o7c6bi7.gateway.bedrock-agentcore.us-east-1.amazonaws.com/mcp \
     --header "Authorization: Bearer <your-access-token>"
   ```  
1. Launch Claude Code via Terminal.
   ```bash
   cd /path/to/your/project
   claude
   ```
1. Verify the Sumo Logic MCP server connection with `/mcp`.
1. Prompt Claude Code to `List my available MCP tools` to see what you can do. You can also refer to [Available MCP Tools](#available-mcp-tools).

:::warning access token expiration
If the connection drops, [generate a new token](#step-3-generate-an-access-token) and re-run the `claude mcp add` command in Step 1 with the updated token.
:::

## Configure in VS Code via GitHub Copilot chat

1. Open VS Code and install the GitHub Copilot chat extension, if you don't have it.
1. Click in the VS Code command palette and run a search for **> MCP: Open User Configuration**.
1. Add the following configuration to the **mcp.json** file. If you've previously configured other MCP servers here, this should be an additive process (i.e., do not delete existing MCP servers that you still intend to use).
```json
{
	"servers":  {
		"Sumo Logic MCP Server": {
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
			"description": "Enter your Oauth token for Sumo Logic MCP Server",
			"password": true
		}
	]
}
```
1. In the **mcp.json** file, click the **Start** button just above `"Sumo Logic MCP Server": {`. You'll be prompted in the command palette for an OAuth token. Enter your [access token](#step-3-generate-an-access-token) there.
1. Confirm that the server shows as **Running**.
1. Open GitHub Copilot chat and ensure it's set to **Agent** mode.
1. You should now be connected to the Sumo Logic MCP Server. Verify by asking `List my available MCP tools` to see what you can do. You can also refer to [Available MCP Tools](#available-mcp-tools).

:::warning access token expiration
When your access token expires, you'll see a **Dynamic Client Registration not supported** popup asking for an OAuth client ID. Do not provide this. Instead:

1. On the **Dynamic Client Registration not supported** popup, click **Cancel**.
1. In your command palette, you'll be asked again for an OAuth client ID. Do not provide this. Tap **Escape** on your keyboard.
1. [Generate a new access token](#step-3-generate-an-access-token).
1. Reopen your **mcp.json** file.
1. Hover your mouse over the redacted access token until the **Edit | Clear | Clear All** options appear, then click **Edit**.
1. Enter your new access token in the command palette and then restart the Sumo Logic MCP Server from your **mcp.json** file.
:::

## Example prompts

### Org user directory

`List the users in my org and format as an ASCII table.`

### Log Search and visualization

`Run a log search for the last 5 minutes across all of my data that counts the data by 1-minute buckets and plots the result as a line graph.`

### Dashboard creation

`Create a new dashboard called "System Overview" that uses the previous query to power a dashboard panel called "Total Log Count Per Minute". `

`Add a second panel called "Error Logs Count Per Minute" that is a similar query but only has logs in it that contain the keyword "error" in them.`


## Available MCP tools

The MCP Server provides access to Sumo Logic through these tool categories:
* **Alerts management**. Search, retrieve, and resolve alerts.
* **Dashboard management**. Create, retrieve, update, and delete dashboards.
* **Cloud SIEM Insights**. Get insights, triage information, entities, and status updates.
* **Log search**. Create and manage search jobs, retrieve paginated messages and records.
* **User management**. List users in the organization.
* **Utility tools**. Discover relevant tools based on context.

All tools respect your Sumo Logic permission controls and access policies.

:::note
Tool identifiers are subject to change during the beta period.
:::

### Alerts management

| Tool    | Description         |
| :---- | :------------- |
| `alertsReadById`   | Get an alert or folder by ID. |
| `alertsSearch`     | Search alerts/folders. |
| `getHistory`       | Get alert history for a time range. |
| `getRelatedAlerts` | Get alerts related to a given alert. |
| `resolve`          | Resolve an alert. |

### Dashboard management

| Tool      | Description           |
| :------ | :------------------ |
| `createDashboard` | Create a new dashboard. |
| `deleteDashboard` | Delete a dashboard by ID. |
| `getDashboard`    | Get a dashboard by ID. |
| `listDashboards`  | List all dashboards. |
| `updateDashboard` | Update a dashboard by ID. |

### Cloud SIEM Insights

| Tool        |  Description     |
| :---  | :---  |
| `GetInsights`               | Get Insights with filtering/pagination. |
| `GetAllInsights`            | Get all Insights (paginated via token). |
| `GetInsight`                | Get a single Insight by ID. |
| `GetInsightComments`        | Get comments on an Insight. |
| `GetInsightHistory`         | Get history of an Insight. |
| `GetInsightRelatedEntities` | Get involved entities for an Insight. |
| `GetInsightTriage`          | Get triage info for an Insight. |
| `UpdateInsightAssignee`     | Update the assignee of an Insight. |
| `UpdateInsightStatus`       | Update the status of an Insight. |

### User management

| Tool |  Description   |
| :----------------- | :--------- |
| `listUsers` | List all users in the organization. |

### Log search

| Tool            | Description |
| :---  | :-------- |
| `createSearchJob`               | Create a new search job. |
| `getSearchJobStatus`            | Get the status of a search job. |
| `getSearchJobPaginatedMessages` | Get paginated messages from a search job. |
| `getSearchJobPaginatedRecords`  | Get paginated aggregated records from a search job. |
| `deleteSearchJob`               | Delete a search job. |

### Utility tools

| Tool    | Description   |
| :------ | :------------------- |
| `x_amz_bedrock_agentcore_search` | Search/filter the available tools by context. |

## Usage guidance and cost controls

### When to use MCP

Use MCP for:
* Conversational investigations.
* Multi-step workflows.
* Agent-to-agent communication.

Do not use MCP for:
* Bulk data extraction. Use the [Search Job API](/docs/api/search-job).
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

### What to monitor

Track these metrics per request, per identity, and per tool:

* Cost per request (not just request volume).
* Tool calls per request.
* Agent step count.
* Retry frequency.
* Retrieval scope (top-k values, cross-namespace queries).
* Endpoints ranked by cost, not just traffic.

### Recommended controls

* **Hard budgets**. Set per-request, per-identity, per-tool, and per-tenant spending limits.
* **Validation gates**. Implement authentication, input validation, size limits, and retrieval caps before LLM processing begins.
* **Progressive trust**. Start with restricted capabilities for new or untrusted identities. Expand access based on usage patterns.
* **Per-tool quotas**. Limit or disable expensive tools for untrusted traffic.
* **Kill switches**. Maintain the ability to disable high-cost tools or operations within seconds.
* **Disconnect handling**. Ensure workflows terminate when clients disconnect to prevent billing for abandoned requests.

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
