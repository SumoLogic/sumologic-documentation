---
id: external-mcp-server
title: Sumo Logic MCP Server (Closed Beta)
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

**Bring your own AI to the Dojo**. Connect your AI tools directly to Sumo Logic to create a unified ecosystem powered by your observability and security data.

The Sumo Logic MCP Server makes Dojo AI the central hub of your AI ecosystem using the Model Context Protocol. Instead of building custom integrations or treating Sumo Logic as a separate data silo, you can connect your own copilots, proprietary models, and third-party AI systems directly to Sumo Logic's capabilities.

Our MCP Server integrates seamlessly with our Mobot [Query Agent](/docs/search/mobot/#query-agent) and [Knowledge Agent](/docs/search/mobot/#knowledge-agent), enabling your external AI tools to collaborate with these agents.

## How it works

The MCP Server provides a standardized interface between Sumo Logic and your AI tools:

1. **Connect your AI tools** using the [MCP standard](https://modelcontextprotocol.io/).
1. **Query with natural language** to analyze data using Sumo Logic's capabilities.
1. **Execute prompts across environments**. IDEs, collaboration tools, or custom applications.
1. **Leverage Dojo AI agents** alongside your own models for unified analysis and response.

Your external AI systems can query logs, manage insights, analyze dashboards, and update records through a single, consistent protocol.

## Prerequisites

### Architecture

* **Sumo Logic provides** the MCP Server gateway (fully managed).
* **You deploy** orchestrator agents that connect to the gateway.
* **Powered by** Amazon Bedrock AgentCore.

For example, to enable MCP in Slack, you deploy an orchestrator agent on AWS AgentCore runtime. This agent communicates with Sumo Logic's MCP Server gateway via standard MCP protocol, which then securely accesses Sumo Logic APIs and Dojo AI agents.

### Authentication

Customers authenticate using OAuth2 client credentials flow:

1. Generate credentials via the Sumo Logic OAuth server.
1. Use credentials to generate an access token.
1. Configure your MCP client with the token.

This follows standard OAuth client credentials flow used by other MCP servers.

### Setup requirements

* MCP-compatible client application (VS Code, Slack bot, IDE assistant, or custom application).
* Orchestrator agent deployment platform (such as AWS AgentCore runtime).
* OAuth2 credentials from Sumo Logic.

Configuration steps vary by tool. Refer to your specific tool's documentation for MCP setup instructions. Initial beta support begins with VS Code.

## What you can do

* **Bring the best AI for your stack**. Integrate proprietary models or third-party copilots with Sumo Logic's observability and security data.
* **Accelerate workflows with AI assistance**. Use Sumo Logic's telemetry as input for your AI-driven workflows with analysts staying in control of critical decisions.
* **Work where you work**. Execute AI-powered queries from your IDE or collaboration tools without switching contexts.
* **Future-proof your strategy**. Add new AI technologies as they emerge while maintaining Sumo Logic's scale, security, and data governance.

## Example use cases

<Tabs
  className="unique-tabs"
  defaultValue="Slack"
  values={[
    {value: 'Slack', label: 'Slack investigation'},
    {value: 'IDE', label: 'IDE integration'},
    {value: 'Custom', label: 'Custom workflows'},
  ]}>

<TabItem value="Slack">

### Investigate security incidents without leaving Slack

When your team receives a Cloud SIEM alert in Slack, your AI assistant can retrieve triage details, search related entities, query raw logs, update insight status, and add investigation notes. All of this happens conversationally in your Slack channel, with multi-tool calls handled automatically.

**Example:**

```
User: @bot what are the triage details? update the status to in progress

Bot: I've retrieved the triage information and updated the status to In Progress.

Verdict: MALICIOUS - Confirmed threat
Severity: CRITICAL
...
```

</TabItem>

<TabItem value="IDE">

* **Query logs from your development environment**. Connect your IDE's AI assistant to Sumo Logic to troubleshoot production issues without leaving your code editor.
* **Debug with full context**. Pull relevant logs, traces, and metrics from Sumo Logic directly into your development workflow.

</TabItem>

<TabItem value="Custom">

* **Proprietary model integration**. Use your custom-trained models alongside Sumo Logic's agents, combining specialized domain knowledge with Sumo Logic's analytics.
* **Cross-platform orchestration**. Build workflows that span multiple AI tools and data sources, with Sumo Logic as the central hub.

</TabItem>
</Tabs>

## Available capabilities

The MCP Server provides access to Sumo Logic through these tool categories:

* **Alerts management**. Search, retrieve, and resolve alerts.
* **Dashboard management**. Create, retrieve, update, and delete dashboards.
* **SIEM & Insights**. Get insights, triage information, entities, and AI-generated summaries. Update status and add comments.
* **Log search**. Search Sumo Logic logs with query syntax.
* **User management**. List users in the organization.
* **Utility tools**. Parse time strings and search for relevant tools based on context.

All tools respect your Sumo Logic permission controls and access policies.

<details>
<summary>View complete tool list</summary>

### Alerts Management
* `target_alerts__alertsReadById` - Get an alert or folder from the alerts library
* `target_alerts__alertsSearch` - Search for alerts or folders in the alerts library
* `target_alerts__getHistory` - Retrieve alert history for a time range
* `target_alerts__getRelatedAlerts` - Retrieve alerts related to a given alert
* `target_alerts__resolve` - Resolve an alert by moving it to resolved state

### Dashboard Management
* `target_dashboard__createDashboard` - Create a new dashboard
* `target_dashboard__deleteDashboard` - Delete a dashboard by identifier
* `target_dashboard__getDashboard` - Get a dashboard by identifier
* `target_dashboard__listDashboards` - List all viewable dashboards
* `target_dashboard__updateDashboard` - Update an existing dashboard

### Insights/SIEM
* `target_siem__GetInsights` - Get insights with pagination up to 10,000 results
* `target_siem__GetAllInsights` - Get all insights without limit
* `target_siem__GetInsight` - Get a specific insight by ID
* `target_siem__GetInsightComments` - Get comments on an insight
* `target_siem__GetInsightHistory` - Get an insight's history
* `target_siem__GetInsightRelatedEntities` - Get entities involved in an insight
* `target_siem__GetInsightTriage` - Get triage information for an insight
* `target_siem__UpdateInsightAssignee` - Update who an insight is assigned to
* `target_siem__UpdateInsightStatus` - Update the status of an insight
* `target_insight_add_comment__AddInsightCommentTool` - Add a comment to an insight
* `target_insight_summary__GetInsightSummary` - Generate a summary of a security insight

### User Management
* `target_users__listUsers` - Get a list of all users in the organization

### Log Search
* `sumo_logic_log_search` - Search Sumo Logic logs using query syntax

### Utility Tools
* `target_time_tool__Time_Tool` - Parse time strings to epoch timestamps and get current timestamp
* `x_aws_bedrock_agentcore_search` - Get a filtered subset of tools based on context

</details>

## When to use MCP

**Use MCP for:**

* **Conversational investigations**. Interactive queries and analysis through chat interfaces.
* **Multi-step workflows**. Combining multiple operations in a single natural language request.
* **Agent-to-agent communication**. Connecting your AI assistants with Sumo Logic's Dojo AI agents.

**Do NOT use MCP for:**

* **Bulk data extraction**. Use the [Search Job API](/docs/api/search-job) instead.
* **Model training**. Use the [Search Job API](/docs/api/search-job) to pull data (note: 100,000 record limit per job).
* **High-volume automated queries**. MCP has significant token consumption costs.

MCP is designed for conversational, agent-level interaction. For raw data access, our standard APIs are more efficient and cost-effective.

## Security and data governance

* **Permissioned access**. All integrations occur through secure, controlled interfaces.
* **Data sovereignty**. Your data never leaves your control.
* **No model training**. Customer data is never used to train AI models.
* **Audit trails**. All MCP interactions are logged for compliance and security review.
* **Multi-tenant isolation**. The MCP Server acts as a gateway with tenant-level security controls.

## FAQ

<details>
<summary>Which AI tools can connect via MCP?</summary>

Any AI tool that implements the Model Context Protocol standard. Initial beta support includes VS Code. Examples of compatible tools include IDEs, collaboration platforms like Slack, and custom agents built on MCP-compatible frameworks like AWS AgentCore.

Configuration steps vary by tool. Refer to your tool's documentation for specific MCP setup instructions.

</details>

<details>
<summary>Does this work with existing Dojo AI agents?</summary>

Yes. The MCP Server works alongside Query Agent and Knowledge Agent. As new agents become available (such as SOC Analyst Agent), they will also integrate with the MCP Server.

</details>

<details>
<summary>Can MCP handle multiple operations in a single request?</summary>

Yes. The MCP Server supports multi-tool calls. For example, asking "what are the triage details and update the status to in progress" can retrieve information and update records in one interaction.

</details>

<details>
<summary>How does this affect my Sumo Logic usage?</summary>

The MCP Server is a separately licensed capability. Contact your account representative for pricing information.

:::note
MCP operations involve significant token consumption. For bulk data retrieval or model training, the [Search Job API](/docs/api/search-job) is more cost-effective.
:::

</details>

<details>
<summary>Where does my agent run?</summary>

Agents connected via MCP are hosted in your own environment, not within Sumo Logic's infrastructure. This gives you control over your AI models and processing.

</details>

## Additional information

* [Dojo AI overview](#)
