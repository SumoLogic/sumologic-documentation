---
id: external-mcp-server
title: Sumo Logic MCP Server (Beta)
description: Connect your AI tools to Sumo Logic via MCP. Query logs, manage insights, and investigate security incidents from Slack, IDEs, and custom applications.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

:::info
This feature is in closed beta. For more information, contact your Sumo Logic account executive.
:::

**Bring your own AI to the Dojo**. Connect your AI tools directly to Sumo Logic to create a unified ecosystem powered by your observability and security data.

The Sumo Logic MCP Server enables Dojo AI to act as a core capability provider within your broader AI ecosystem using the Model Context Protocol (MCP). Instead of maintaining custom integrations or treating Sumo Logic as a separate data silo, you can connect your own copilots, proprietary models, and third-party AI systems directly to Sumo Logic's capabilities.

Our MCP Server integrates with [Query Agent](/docs/search/mobot/#query-agent) and [Knowledge Agent](/docs/search/mobot/#knowledge-agent), enabling your external AI tools to collaborate with Sumo Logic's native agents in a single conversational workflow.

## How it works

The MCP Server provides a standardized interface between Sumo Logic and your AI tools:

1. Connect your AI tools using the MCP standard.
1. Query with natural language to analyze data using Sumo Logic capabilities.
1. Execute prompts across environments, including IDEs, collaboration tools, and custom applications.
1. Leverage Dojo AI agents alongside your own models for unified analysis and response.

Your external AI systems can query logs, manage insights, analyze dashboards, and update records through a single, consistent protocol.

## What you can do

* **Bring the best AI for your stack**. Integrate proprietary models or third-party copilots with Sumo Logic observability and security data.
* **Accelerate workflows with AI assistance**. Use Sumo Logic telemetry as input for automated and analyst-driven workflows, with humans remaining in control of critical decisions.
* **Work where you work**. Execute AI-powered queries from your IDE or collaboration tools without switching contexts.
* **Future-proof your strategy**. Adopt new AI technologies as they emerge while maintaining Sumo Logic scale, security, and governance.

## Prerequisites

### Setup requirements

* MCP-compatible client application (VS Code, Cursor, Slack, Microsoft Teams, or a custom application).
* Orchestrator agent deployment platform (such as AWS AgentCore runtime).
* OAuth2 credentials from Sumo Logic.

Configuration steps vary by tool. Refer to your specific tool's documentation for MCP setup instructions.

### Authentication

Authenticate using the OAuth2 client credentials flow:

1. Generate credentials via the Sumo Logic OAuth server.
1. Use the credentials to generate an access token.
1. Configure your MCP client with the token.

This follows the standard OAuth2 client credentials flow used by other MCP servers and enterprise APIs.

### Architecture

* Sumo Logic provides the MCP Server gateway (fully managed).
* You deploy orchestrator agents (your MCP-compatible AI runtimes) that connect to the gateway.
* Powered by Amazon Bedrock AgentCore.

For example, to enable MCP in Slack, you deploy an orchestrator agent on the AWS AgentCore runtime. This agent communicates with Sumo Logic's MCP Server gateway via the standard MCP protocol, which then securely accesses Sumo Logic APIs and Dojo AI agents.

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

Investigate security incidents without leaving Slack:

* **Retrieve triage details** for Cloud SIEM alerts.
* **Search related entities** involved in the incident.
* **Query raw logs** for deeper investigation.
* **Update insight status** directly from Slack.
* **Add investigation notes** to maintain audit context.
* **Execute multi-tool actions conversationally** within a single Slack thread.

For example:

```
User: @bot what are the triage details? update the status to in progress

Bot: I've retrieved the triage information and updated the status to In Progress.

Verdict: MALICIOUS - Confirmed threat
Severity: CRITICAL
...
```

</TabItem>

<TabItem value="IDE">

Troubleshoot production issues directly from your development environment:

* **Query logs from your IDE** using VS Code, Cursor, or your IDE's AI assistant.
* **Investigate issues without context switching** from your code editor.
* **Debug with full context** by pulling logs, traces, and metrics into your workflow.
* **Correlate application behavior** with observability data in real time.

</TabItem>

<TabItem value="Custom">

Build custom AI workflows powered by Sumo Logic:

* **Integrate proprietary models** alongside Sumo Logic agents.
* **Orchestrate cross-platform workflows** spanning multiple AI tools and data sources.
* **Combine domain knowledge with observability data** for richer analysis.
* **Use Sumo Logic as a central capability provider** in your AI ecosystem.

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

## When to use MCP

Use MCP for:
* Conversational investigations.
* Multi-step workflows.
* Agent-to-agent communication.

Do NOT use MCP for:
* Bulk data extraction. Use the [Search Job API](/docs/api/search-job).
* Model training. Use the [Search Job API](/docs/api/search-job).
* High-volume automated queries.

MCP interactions incur token-based LLM processing costs, which can be significant for high-volume workloads. MCP is designed for conversational, agent-level interaction. For raw data access, standard APIs remain more efficient and cost-effective.

## Security and data governance

* **Permissioned access**. All integrations occur through secure, controlled interfaces.
* **Customer control**. You retain full control over how your data is accessed and used by connected AI tools.
* **No model training**. Customer data is never used to train AI models.
* **Audit trails**. All MCP interactions are logged for compliance and security review.
* **Multi-tenant isolation**. Tenant-level security controls are enforced at the gateway.

## FAQ

<details>
<summary>Which AI tools can connect via MCP?</summary>

Any AI tool that implements the Model Context Protocol standard. Beta support includes VS Code, Cursor, Slack, and Microsoft Teams. Additional compatible tools include custom agents built on MCP-compatible frameworks such as AWS AgentCore.

</details>

<details>
<summary>Does this work with existing Dojo AI agents?</summary>

Yes. The MCP Server works alongside Query Agent and Knowledge Agent. Future Dojo AI agents will also integrate with the MCP Server.

</details>

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

## Additional information

* [Dojo AI overview](#)
* [Cloud SIEM](/docs/cse)
* [Search Job API](/docs/api/search-job)
* [Model Context Protocol specification](https://modelcontextprotocol.io/)
