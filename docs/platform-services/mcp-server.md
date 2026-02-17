---
id: mcp-server
title: Sumo Logic MCP Server (Beta)
description: Connect your AI tools to Sumo Logic via MCP. Query logs, manage insights, and investigate security incidents from Slack, IDEs, and custom applications.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
 <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

:::info
This feature is in closed beta. For more information, contact your Sumo Logic account executive.
:::

[Bring your own AI to the Dojo](https://www.sumologic.com/solutions/dojo-ai). Connect your AI tools directly to Sumo Logic to create a unified ecosystem powered by your observability and security data.

The Sumo Logic MCP Server enables Dojo AI to act as a core capability provider within your broader AI ecosystem using the Model Context Protocol (MCP). Instead of building custom integrations or treating Sumo Logic as a separate data silo, you can connect your own copilots, proprietary models, and third-party AI systems directly to Sumo Logic's capabilities.

Our MCP Server integrates with [Query Agent](/docs/search/mobot/#query-agent) and [Knowledge Agent](/docs/search/mobot/#knowledge-agent), enabling your external AI tools to collaborate with Sumo Logic's native agents in a single conversational workflow.

## How it works

The MCP Server provides a standardized interface between Sumo Logic and your AI tools:

1. Connect your AI tools using the MCP standard.
1. Submit natural language queries to analyze data using Sumo Logic capabilities.
1. Execute prompts across environments such as IDEs, collaboration tools, and custom applications.
1. Leverage Dojo AI agents alongside your own models for unified analysis and response.

Your external AI systems can query logs, manage insights, analyze dashboards, and update records through a single, consistent protocol.

* **Bring the best AI for your stack**. Integrate proprietary models or third-party copilots with Sumo Logic observability and security data.
* **Accelerate workflows with AI assistance**. Use Sumo Logic telemetry as input for automated and analyst-driven workflows, with humans remaining in control of critical decisions.
* **Work in your preferred environment**. Execute AI-powered queries from your IDE or collaboration tools without switching contexts.
* **Future-proof your strategy**. Adopt new AI technologies as they emerge while maintaining Sumo Logic scale, security, and governance.

## Architecture

* Sumo Logic provides the MCP Server gateway (fully managed).
* You deploy orchestrator agents (your MCP-compatible AI runtimes) that connect to the gateway.
* The MCP Server integrates with Amazon Bedrock AgentCore for orchestrator agent deployment.

For example, to enable MCP in Slack, you deploy an orchestrator agent on the AWS AgentCore runtime. This agent communicates with Sumo Logic's MCP Server gateway via the standard MCP protocol, which then securely accesses Sumo Logic APIs and Dojo AI agents.

<img src={useBaseUrl('img/platform-services/mcp/mcp-architecture-diagram.svg')} alt="MCP architecture diagram" width="800"/>

## Prerequisites

* MCP-compatible client application (VS Code, Cursor, Slack, Microsoft Teams, or a custom application).
* Orchestrator agent deployment platform (such as AWS AgentCore runtime).
* OAuth2 credentials from Sumo Logic (see [Authentication](#authentication) below).

Configuration steps vary by tool. Refer to your specific tool's documentation for MCP setup instructions.

## Authentication

The MCP Server uses the OAuth2 client credentials flow. You'll need to complete a one-time setup in Sumo Logic before configuring your MCP client.

<img src={useBaseUrl('img/platform-services/mcp/oauth-flow-diagram.png')} alt="OAuth 2.0 client credentials flow diagram showing an application authenticating with the Authorization Server using a Client ID and Secret, receiving an Access Token, then using that token to request resources from the Resource Server." width="600"/>

### Step 1: Create a service account

Service accounts are required to create OAuth clients. You can create one through the UI or the API.

To create a service account through the UI, see [Service Accounts](/docs/manage/security/service-accounts/).

To create a service account through the API:

1. Click the profile icon and navigate to your **Personal Access Keys**.<br/><img src={useBaseUrl('img/platform-services/mcp/access-key-nav.png')} alt="Sumo Logic home page showing the user menu open with Personal Access Keys selected." width="450"/>
    :::note
    If you already have a service account, you can use the API to list existing service accounts and retrieve the ID.
    :::
1. Click **+ Add Access Key**, create a new Access Key. Note down both the Access ID and Access Key before closing the confirmation dialog, as they won't be shown again.<br/><img src={useBaseUrl('img/platform-services/mcp/access-key-create.png')} alt="Add New Access Key panel in Sumo Logic showing the Name field, optional CORS domains, and Scopes set to Default." width="800"/><br/><img src={useBaseUrl('img/platform-services/mcp/access-key-success.png')} alt="Success dialog showing the Access ID and Access Key values to copy before closing." width="800"/>
1. Use the Access ID and Access Key to call the API:
   1. List available roles to find the role ID you want to assign.
      ```bash
      curl -u "<accessId>:<accessKey>" \
        https://api.sumologic.com/api/v1/roles
      ```
   1. Create the service account. Replace `api.sumologic.com` with your [deployment endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security). Note the returned "id" for the next step.
      ```bash
      curl -u "<accessId>:<accessKey>" \
        https://api.sumologic.com/api/v1/serviceAccounts \
        -H 'Content-Type: application/json' \
        -d '{
              "name": "MCP Service Account",
              "email": "<email>@example.com",
              "roleIds": ["<roleId>"]
            }'
      ```

### Step 2: Create an OAuth client

:::note
UI support for this step is not yet available. You'll need to use the API with an [Access Key](/docs/manage/security/access-keys/).
:::

Create an OAuth client under your service account. Note the `clientId` and `clientSecret` from the response — these are your MCP credentials.

```bash
curl -u "<accessId>:<accessKey>" \
  https://api.sumologic.com/api/v1/oauth/clients \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "My MCP Client",
    "runAsId": "<serviceAccountId>",
    "grantTypes": ["client_credentials"],
    "scopes": ["<scope1>", "<scope2>"]
  }'
```

<details>
<summary>Click to see an example</summary>

```bash
curl -u "<accessId>:<accessKey>" \
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

To see the full list of available scopes:

```bash
curl -u "<accessId>:<accessKey>" \
  https://api.sumologic.com/api/v1/oauth/scopes
```

The `scopes` you request must fall within the permissions of the associated service account (effective scopes). Only scopes present in the `effectiveScopes` field of the client can be successfully used to request tokens.

### Step 3: Generate an access token

Use your `clientId` and `clientSecret` to request an access token from the OAuth token endpoint. Replace `service.sumologic.com` with your [deployment's service endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).

```bash
curl -X POST https://service.sumologic.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "<clientId>:<clientSecret>" \
  -d "grant_type=client_credentials" \
  -d "scope=<scope1> <scope2>"
```

<details>
<summary>Click to see an example</summary>

```bash
curl -X POST https://service.sumologic.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "clientId:clientSecret" \
  -d "grant_type=client_credentials" \
  -d "scope=viewUsersAndRoles"
```

This example shows getting an Access Token with only the `viewUsersAndRoles` scope. Additional scopes can be requested provided the client has more `effectiveScopes`. Additional scopes should be separated by a space in the `scope` parameter.

</details>

To discover the token endpoint programmatically, query the Authorization Server Metadata:

```bash
curl https://service.sumologic.com/.well-known/oauth-authorization-server
```

The response includes `token_endpoint` and other supported OAuth parameters.


### Step 4: Configure your MCP client

Use the access token as a Bearer token to authorize requests.

The access token can be used in two ways: to call Sumo Logic APIs directly, and to authorize requests from your MCP client to the MCP Server.

#### Call a Sumo Logic API directly

```bash
curl -H "Authorization: Bearer <access-token>" \
  https://service.sumologic.com/api/v1/users
```

#### Configure an MCP client

Set the access token in your MCP client configuration as an Authorization header:

```bash
Authorization: Bearer <access-token>
```

Refer to your specific MCP client documentation for where to configure this header.

:::note
Access tokens expire. Your MCP client or orchestrator agent is responsible for detecting token expiration and repeating Step 3 to obtain a new token.
:::

## Example use cases

The following examples illustrate common MCP workflows.

<Tabs
  className="unique-tabs"
  defaultValue="Slack"
  values={[
    {value: 'Slack', label: 'Slack investigation'},
    {value: 'IDE', label: 'IDE integration'},
    {value: 'Custom', label: 'Custom workflows'},
  ]}>

<TabItem value="Slack">

Investigate security incidents without leaving Slack:

* **Retrieve triage details** for Cloud SIEM alerts.
* **Search related entities** involved in the incident.
* **Query raw logs** for deeper investigation.
* **Update insight status** directly from Slack.
* **Add investigation notes** to maintain audit context.
* **Get AI-powered incident response guidance** with structured recommendations for investigation, containment, and escalation.
* **Execute multi-tool actions conversationally** within a single Slack thread.

```txt title="Slack Example 1"
User: @bot what are the triage details? update the status to in progress

Bot: I've retrieved the triage information and updated the status to In Progress.

Verdict: MALICIOUS - Confirmed threat
Severity: CRITICAL
...
```

```txt title="Slack Example 2"
User: @bot what is the recommended next step for INSIGHT-5678?

Bot: Based on my analysis of INSIGHT-5678, here's the recommended next step:

This is a CRITICAL SEVERITY incident involving confirmed malicious phishing attack...

Immediate Recommended Actions:
1. Incident Response - URGENT
   • Immediately disable/reset credentials for <username>
   • Revoke all active AWS sessions...

[continues with structured response]

Next Immediate Step:
ASSIGN TO SENIOR ANALYST AND BEGIN CREDENTIAL RESET NOW
```

</TabItem>

<TabItem value="IDE">

Troubleshoot production issues directly from your development environment:

* **Query logs from your IDE** using VS Code, Cursor, or your IDE's AI assistant.
* **Investigate issues without context switching** from your code editor.
* **Debug with full context** by pulling logs, traces, and metrics into your workflow.
* **Correlate application behavior** with observability data in real time.

```txt title="VSCode Example 1"
<!-- tk -->
```

```txt title="VSCode Example 2"
<!-- tk -->
```

</TabItem>

<TabItem value="Custom">

Build custom AI workflows powered by Sumo Logic:

* **Integrate proprietary models** alongside Sumo Logic agents.
* **Orchestrate cross-platform workflows** spanning multiple AI tools and data sources.
* **Combine domain knowledge with observability data** for richer analysis.
* **Use Sumo Logic as a central capability provider** in your AI ecosystem.

```txt title="? Example 1"
<!-- tk -->
```

```txt title="? Example 2"
<!-- tk -->
```

</TabItem>
</Tabs>

## Available capabilities

The MCP Server provides access to Sumo Logic through these tool categories:

* **Alerts management**. Search, retrieve, and resolve alerts.
* **Dashboard management**. Create, retrieve, update, and delete dashboards.
* **SIEM & Insights**. Get insights, triage information, entities, and AI-generated summaries. Update status and add comments.
* **Log search**. Search Sumo Logic logs using query syntax.
* **User management**. List users in the organization.
* **Utility tools**. Parse time strings and discover relevant tools based on context.

All tools respect your Sumo Logic permission controls and access policies.

:::note
Tool identifiers are subject to change during the beta period.
:::

### Alerts management

| Tool    | Description         |
| :---- | :------------- |
| `target_alerts___alertsReadById`   | Retrieve a specific alert or alert folder from the alerts library by ID.             |
| `target_alerts___alertsSearch`     | Search for alerts or alert folders in the alerts library using filters and keywords. |
| `target_alerts___getHistory`       | Retrieve alert execution and state history for a specified time range. |
| `target_alerts___getRelatedAlerts` | Retrieve alerts that are related to a given alert.  |
| `target_alerts___resolve`          | Resolve an alert by moving it to the resolved state.|

### Dashboard management

| Tool      | Description           |
| :------ | :------------------ |
| `target_dashboard___createDashboard` | Create a new dashboard in Sumo Logic.  |
| `target_dashboard___deleteDashboard` | Delete a dashboard by its identifier.  |
| `target_dashboard___getDashboard`    | Retrieve a dashboard by its identifier.|
| `target_dashboard___listDashboards`  | List all dashboards that the user has permission to view. |
| `target_dashboard___updateDashboard` | Update an existing dashboard configuration. |

### Insights / SIEM

| Tool        |  Description     |
| :---  | :---  |
| `target_siem___GetInsights`       | Retrieve insights with pagination support (up to 10,000 results). |
| `target_siem___GetAllInsights`    | Retrieve all insights without pagination limits.    |
| `target_siem___GetInsight`        | Retrieve a specific insight by ID.             |
| `target_siem___GetInsightComments`| Retrieve all comments associated with an insight.   |
| `target_siem___GetInsightHistory` | Retrieve the historical activity for an insight.    |
| `target_siem___GetInsightRelatedEntities`            | Retrieve entities involved in an insight.      |
| `target_siem___GetInsightTriage`  | Retrieve triage information for an insight.    |
| `target_siem___UpdateInsightAssignee`  |  Update the user assigned to an insight.        |
| `target_siem___UpdateInsightStatus`    |  Update the status of an insight. |
| `target_insight_add_comment___AddInsightCommentTool` | Add a comment to an insight.     |
| `target_insight_summary___GetInsightSummary`         | Generate an AI-powered summary of a security insight.             |

### User management

| Tool |  Description   |
| :----------------- | :--------- |
| `target_users___listUsers` | Retrieve a list of all users in the organization. |

### Log search

| Tool            | Description |
| :---  | :-------- |
| `sumo_logic_log_search` | Search Sumo Logic logs using Sumo query syntax. |

### Utility tools

| Tool    | Description   |
| :------ | :------------------- |
| `target_time_tool___Time_Tool`   | Parse time strings into epoch timestamps and retrieve the current timestamp. |
| `x_amz_bedrock_agentcore_search` | Retrieve a filtered subset of available tools based on execution context.    |

<!-- why do Tool name prefixes differ?
target_alerts___
sumo_logic_log_search
x_amz_bedrock_agentcore_search  -->

## Usage guidance and cost controls

### When to use MCP

Use MCP for:
* Conversational investigations.
* Multi-step workflows.
* Agent-to-agent communication.

Do not use MCP for:
* Bulk data extraction. Use the [Search Job API](/docs/api/search-job).
* Model training. Use the [Search Job API](/docs/api/search-job).
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

The MCP Server is a separately licensed capability. Contact your account representative for pricing information.

:::note
For bulk data retrieval or model training, the [Search Job API](/docs/api/search-job) remains the preferred option.
:::

</details>

<details>
<summary>Where does my agent run?</summary>

Agents connected via MCP run in your own environment, not within Sumo Logic infrastructure.

</details>

<!--## Troubleshooting
Common error responses from the MCP Server
How to handle authentication failures
Retry strategies-->
