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

The Sumo Logic MCP server lets external copilots and proprietary models securely query logs, investigate SIEM insights, manage alerts and dashboards, work with existing Dojo AI agents, and perform user management — all using natural language from your IDE or chat platform.

During public preview, the following MCP clients are supported:
* [VS Code + GitHub Copilot Chat](https://code.visualstudio.com/docs/copilot/chat/copilot-chat)
* [Claude Code Terminal CLI](https://code.claude.com/docs/en/quickstart)


## Prerequisites

* **Sumo Logic Administrator role**. Required to create service accounts and OAuth clients. If you're unsure whether you are an administrator, you can [view your role in your Preferences](/docs/get-started/onboarding-checklists/).
* **Sumo Logic personal access ID and access key**. Used to authenticate API calls during setup. See [Access Keys](/docs/manage/security/access-keys/) to learn more. We recommend setting the **Access Key Scopes** to **Default** so the API requests required for setup are not blocked.<br/><img src={useBaseUrl('img/security/create-access-key.png')} alt="Add New Access Key panel in Sumo Logic showing the Name field, optional CORS domains, and Scopes set to Default." style={{border: '1px solid gray'}} width="600"/>
* **Terminal with `curl` installed**. Pre-installed on Mac and Windows. On Linux, availability depends on the distribution.
* **An MCP-compatible client**. Currently, [VS Code + GitHub Copilot Chat](https://code.visualstudio.com/docs/copilot/chat/copilot-chat) and [Claude Code Terminal CLI](https://code.claude.com/docs/en/quickstart) are the only supported clients.


<!--
* Sumo Logic MCP server URL:

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

In this step, you'll create a Sumo Logic service account, which is required to create an OAuth client. You can do this in the UI or our API.

:::tip Use an existing service account
Rather than creating a new service account, you can [check for existing ones](https://api.sumologic.com/docs/#operation/listServiceAccounts). In the API response, find the service account you want to use and note its `"id"` for the next step, [Create an OAuth client](#step-2-create-an-oauth-client).
:::

#### Create a service account via UI

1. Follow the steps under [Service Accounts](/docs/manage/security/service-accounts/#create-a-service-account), select the roles you'd like to assign, and click **Save** to create the service account.
1. [Get a list of all service accounts in your org](https://api.sumologic.com/docs/#operation/listServiceAccounts) and find the `"id"` of the service account you just created. This is your service account ID, which you'll use in the [next step](#step-2-create-an-oauth-client).
      <details>
      <summary>Example response</summary>
      ```json title="Example response" {12}
      {
        "name": "My Service Account",
        "email": "johndoe@acme.com",
        "roleIds": [
          "00000000000001DF",
          "00000000000002D2"
        ],
        "createdAt": "2025-10-16T09:10:00.000Z",
        "createdBy": "0000000006743FDD",
        "modifiedAt": "2025-10-16T09:10:00.000Z",
        "modifiedBy": "0000000006743FE8",
        "id": "000000000FE20FE2",
        "isActive": true
      }
      ```
      </details>

#### Create a service account via API

1. [Get a list of available roles](https://api.sumologic.com/docs/#operation/listRoles) and decide which ones you want to assign to your service account. For each role, note the `"id"` parameter, which you'll use in the next step.
1. [Create your service account](https://api.sumologic.com/docs/#operation/createServiceAccount). For `"roleIds"`, enter a comma-separated list of `"id"` parameters from the previous step.
   <details>
   <summary>Example request</summary>
   ```bash title="Example request"
   curl -u "<access-id>:<access-key>" \
     https://api.sumologic.com/api/v1/serviceAccounts \
     -H 'Content-Type: application/json' \
     -d '{
           "name": "My Service Account",
           "email": "johndoe@acme.com",
           "roleIds": ["00000000000001DF", "00000000000002D2"]
         }'
   ```
   </details>
1. Note the returned `"id"` in the response. This is your service account ID, which you'll use in the [next step](#step-2-create-an-oauth-client).
   <details>
   <summary>Example response</summary>
   ```json title="Example response" {12}
   {
     "name": "My Service Account",
     "email": "johndoe@acme.com",
     "roleIds": [
       "00000000000001DF",
       "00000000000002D2"
     ],
     "createdAt": "2025-10-16T09:10:00.000Z",
     "createdBy": "0000000006743FDD",
     "modifiedAt": "2025-10-16T09:10:00.000Z",
     "modifiedBy": "0000000006743FE8",
     "id": "000000000FE20FE2",
     "isActive": true
   }
   ```
   </details>

### Step 2: Create an OAuth client

In this step, you'll create an OAuth client under your service account.

:::note
UI support for this step is not yet available. You'll need to use the Sumo Logic API.
:::

1. [Get a list of available OAuth `scopes`](https://api.sumologic.com/docs/#operation/listOAuthScopes) and decide which ones you'd like to assign to your OAuth client. The `scopes` you request here must already be included in your service account's `effectiveScopes` field.
   :::note How scopes are enforced
   The permissions granted to an OAuth client are limited to the intersection of:
   * The roles (RBAC capabilities) assigned to the service account.
   * The scopes assigned to the OAuth client.

   This prevents privilege escalation. If the service account's roles are restricted in the future, the OAuth client's effective permissions are automatically reduced as well. If a requested scope is not included in the service account's roles, it will be silently excluded from the OAuth client's effective permissions.
   :::
1. [Create a new OAuth client](https://api.sumologic.com/docs/#operation/createOAuthClient), swapping out the variables with your own. For `"runAsId"`, enter the `"id"` of the [service account you just created](#step-1-create-a-service-account).
   <details>
   <summary>Example request</summary>

   This example creates an OAuth client with `scopes` set to `viewUsersAndRoles` and `manageUsersAndRoles`.
   ```bash title="Example request"
   curl -u "<access-id>:<access-key>" \
     https://api.sumologic.com/api/v1/oauth/clients \
     -H 'Content-Type: application/json' \
     -d '{
       "name": "My OAuth Client",
       "description": "OAuth Client for Data Ingestion",
       "runAsId": "0000000000C4661B",
       "grantTypes": ["client_credentials"],
       "scopes": ["viewUsersAndRoles", "manageUsersAndRoles"]
     }'
   ```
   </details>   
1. Note the `clientId` and `clientSecret` from the response. These are your OAuth client credentials, which you'll use to generate an access token in the next step.
   <details>
   <summary>Example response</summary>
   ```json title="Example response" {2,24}
   {
     "clientId": "zVplCFHcpTDwtktBIQmFI2K6s9HEo4HAtcQD1f1M5eQ",
     "createdAt": "2018-10-16T09:10:00.000Z",
     "createdBy": "0000000006743FDD",
     "modifiedAt": "2018-10-16T09:10:00.000Z",
     "modifiedBy": "0000000006743FDD",
     "name": "My OAuth Client",
     "description": "OAuth client for data ingestion",
     "runAsId": "0000000006743FDA",
     "grantTypes": [
       "client_credentials"
     ],
     "redirectUris": [
       "https://www.example.com/oauth/callback"
     ],
     "scopes": [
       "manageUsersAndRoles",
       "viewCollectors"
     ],
     "effectiveScopes": [
       "manageUsersAndRoles",
       "viewCollectors"
     ],
     "clientSecret": "EqyuIvsnae0LnMC2mbJArysXcmp0LuBsRgmyeLtSkFPEzSxdvpYQMDajn_8buaDj"
   }
   ```
   </details>

### Step 3: Generate an access token

In this step, you'll request an OAuth access token from the token endpoint using your client credentials (`clientId` and `clientSecret`) from the previous step. If you're based outside the U.S., replace `service.sumologic.com` with your [regional deployment's endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).

#### Option A: Generate a token with all permissions

Assign all of the OAuth Client's `"effectiveScopes"` to the access token by omitting the `"scope"` parameter.

```bash
curl -X POST https://service.sumologic.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "<clientId>:<clientSecret>" \
  -d "grant_type=client_credentials"
```

#### Option B: Generate a token with restricted permissions

Use the `scope` parameter to assign specific scopes in your request. Note that the `scope` list is separated by spaces, not commas.

```bash
curl -X POST https://service.sumologic.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "<your-client-id>:<your-client-secret>" \
  -d "grant_type=client_credentials" \
  -d "scope=<scope-1> <scope-2> <scope-n>"
```

### Token expiration and reconnection

Access tokens expire after 30 minutes. Your MCP client must refresh the token automatically or prompt you to generate a new one. See the client-specific sections below for refresh steps.

:::tip
The token endpoint URL varies by deployment. If you need to discover it programmatically
(for example, in an automation script), query the Authorization Server Metadata for your deployment:
```bash
curl https://service.sumologic.com/.well-known/oauth-authorization-server
```
The response includes the `token_endpoint` and other supported OAuth parameters.
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
   * Option B: Set it persistently across your session. Add it your MCP client configuration as an Authorization header (`Authorization: Bearer <access-token>`). Refer to your specific MCP client documentation for where to configure it.
--->

## Configure in Claude Code via Terminal

1. In a regular Terminal window (not in Claude Code), register the server and set your access token as a Bearer token to authorize requests.
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

### Token expiration and reconnection

OAuth access tokens expire after 30 minutes, and Claude Code will lose connection to the MCP server. You may see an error: `Incompatible auth server: does not support dynamic client registration`. Claude requires re-registering the MCP server when authentication headers change.

To reconnect:
1. [Generate a new access token](#step-3-generate-an-access-token).
1. Remove the existing MCP server configuration:
   ```bash
   claude mcp remove sumo-logic
   ```
1. Re-register the MCP server with the new token:
   ```bash
   claude mcp add --transport http sumo-logic https://prod-bedrockagentcore-gd5o7c6bi7.gateway.bedrock-agentcore.us-east-1.amazonaws.com/mcp \
     --header "Authorization: Bearer <your-access-token>"
   ```
1. Relaunch Claude Code and verify the connection with `/mcp`.

:::tip
If Claude Code repeatedly asks about authentication when invoking MCP tools, you can start your session with a prompt like: `Whenever communicating with Sumo Logic's MCP server, do not worry about authentication`. This helps prevent unnecessary follow-up questions from the agent. It does not bypass authentication.
:::

## Configure in VS Code via GitHub Copilot Chat

### Setup

1. Open VS Code and install the GitHub Copilot Chat extension, if you don't have it.
1. Click in the VS Code command palette and run a search for **> MCP: Open User Configuration**.
1. Add the following configuration to the **mcp.json** file. If you've previously configured other MCP servers here, this should be an additive process (i.e., do not delete existing MCP servers that you still intend to use).
```json
{
	"servers":  {
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
1. In the **mcp.json** file, click the **Start** button just above `"Sumo Logic MCP server": {`. You'll be prompted in the command palette for an OAuth access token. Enter your [access token](#step-3-generate-an-access-token) there.
1. Confirm that the server shows as **Running**.
1. Open GitHub Copilot Chat and ensure it's set to **Agent** mode.
1. You should now be connected to the Sumo Logic MCP server. Verify by asking `List my available MCP tools` to see what you can do. You can also refer to [Available MCP Tools](#available-mcp-tools).

### Access token expiration and reconnection

Access tokens expire in 30 minutes and may also expire after quitting and restarting VS Code.

When this occurs, here's what to do:
1. You'll see a **Dynamic Client Registration not supported** popup asking for an OAuth client ID. Do NOT provide this. Click **Cancel**.
1. You'll be prompted again for an OAuth client ID in your command palette. Do NOT provide this. Tap **Escape** on your keyboard.
1. [Generate a new access token](#step-3-generate-an-access-token).
1. Reopen your **mcp.json** file.
1. Hover your mouse over the redacted access token until the **Edit | Clear | Clear All** options appear, then click **Edit**.
1. Enter your new access token in the command palette and then restart the Sumo Logic MCP server from your **mcp.json** file.

## Example prompts

### Org user directory

`List the users in my org and format as an ASCII table.`

### Log Search and visualization

`Run a log search for the last 5 minutes across all of my data that counts the data by 1-minute buckets and plots the result as a line graph.`

### Dashboard creation

`Create a new dashboard called "System Overview" that uses the previous query to power a dashboard panel called "Total Log Count Per Minute". `

`Add a second panel called "Error Logs Count Per Minute" that is a similar query but only has logs in it that contain the keyword "error" in them.`


## Available MCP tools

Our MCP server provides access to Sumo Logic through these tool categories:
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
