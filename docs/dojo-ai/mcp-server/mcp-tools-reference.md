---
id: mcp-tools-reference
title: MCP Tools Reference
sidebar_label: MCP Tools Reference ✨
description: Reference for the tools the Sumo Logic MCP server provides, with required scopes and example prompts.
keywords:
  - mcp tools
  - mcp server
  - scopes
  - log search
---


## What MCP tools are available?

Our MCP server provides access to Sumo Logic through these tool categories:
* **Utility tools**. Discover relevant tools based on context.
* **Alerts management**. Search and retrieve alerts.
* **Dashboard management**. Create, retrieve, and update dashboards.
* **Cloud SIEM**. Manage insights, detection rules, and status updates.
* **Log search**. Run log search queries and retrieve results.
* **Discovery**. List custom fields, field extraction rules, and partitions to help scope log searches.

All tools respect your Sumo Logic permission controls and access policies. See [Role capabilities](/docs/manage/users-roles/roles/role-capabilities) for details on each required scope.

The tools your MCP client reports as available are filtered by the scopes in your OAuth access token, which map to your role's Sumo Logic capabilities. For example, if your role doesn't include View Cloud SIEM Enterprise (`viewCse`), Cloud SIEM tools don't appear in your client's tool list; if it doesn't include View Partitions (`viewPartitions`), the partition discovery tool doesn't appear. If a tool you expect to see is missing, confirm your role includes the required scope listed in the tables below.

A few scopes are granted regardless of user role, so tools that require only those scopes appear for everyone. See [How permissions work](/docs/manage/security/oauth#how-permissions-work) for the list and how to restrict them.

:::note
Tool filtering is based on role permissions, not org licensing. If a capability isn't licensed for your org (for example, Cloud SIEM), its tools may still appear in your client's tool list even though calling them fails.
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

#### Example prompts

* `Show me all active alerts from the last 24 hours`
* `Find all alerts triggered by monitor <name> in the last 7 days`

### Dashboard management

| Tool | Description | Required scope |
| :--- | :---------- | :-------------- |
| `createDashboard` | Create a new dashboard. | Manage Library (`manageLibrary`) |
| `getDashboard`    | Get a dashboard by ID. | View Library (`viewLibrary`) |
| `listDashboards`  | List all dashboards. | View Library (`viewLibrary`) |
| `updateDashboard` | Update a dashboard by ID. | Manage Library (`manageLibrary`) |

#### Example prompts

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

#### Example prompts

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

#### Example prompts

* `Run a log search for the last 5 minutes across all of my data that counts the data by 1-minute buckets and plots the result as a line graph`
* `Run a 2-day search on _sourcecategory=*proofpoint*, count by recipient and senderip`

### Discovery

| Tool | Description | Required scope |
| :--- | :---------- | :-------------- |
| `listCustomFields`    | List all custom fields configured in your account. | View Fields (`viewFields`) |
| `listExtractionRules` | List field extraction rules. | View Field Extraction Rules (`viewFieldExtractionRules`) |
| `listPartitions`      | List partitions in the organization, with filters for analytics tier and active status. | View Partitions (`viewPartitions`) |

#### Example prompts

* `What partitions and field extraction rules exist for security logs?`
* `List all active partitions in the frequent tier`
