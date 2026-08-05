---
id: openai-source
title: OpenAI Source
sidebar_label: OpenAI
tags:
  - cloud-to-cloud
  - openai-source
description: Learn how to collect organization usage costs and audit logs from the OpenAI Administration API.

---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/send-data/openAI-logo.png')} alt="OpenAI logo" width="40" />

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

The OpenAI Administration API provides organization-level management and monitoring capabilities, including user management, project management, API key administration, audit logs, and usage and billing data. The OpenAI source collects two types of data:

- **Organization Usage Costs** (`/v1/organization/costs`). Aggregated cost data for an organization, broken down by daily time buckets, with optional filtering by project or API key.
- **Audit Logs** (`/v1/organization/audit_logs`). A chronological record of user actions and configuration changes within the organization, including API key operations, project changes, user sessions, and role modifications.

## Data collected

| Polling Interval | Data |
|:--|:--|
| 24 hours | [Organization Costs](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/usage/methods/costs) |
| 5 minutes (configurable, 2–60 min) | [Audit Logs](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/audit_logs/methods/list) |

## Setup

### Vendor configuration

The OpenAI source requires you to provide the **Admin API Key** to set up the integration.

#### Prerequisites

- Requires an OpenAI API account with usage-based billing. New accounts receive a limited free credit grant.
- Admin API keys require an Organization Owner or Admin role. See [Rate limits](https://platform.openai.com/docs/guides/rate-limits) for tier details.

Follow the steps below to obtain the Admin API Key:
1. [Sign in](https://platform.openai.com) to the OpenAI Platform.
2. Navigate to **Settings > Organization > Admin API Keys**.
3. Click **Create admin API key** and note the key value (for example, `sk-admin-`).

### Source configuration

When you create an OpenAI source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an OpenAI source:
1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu, select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **OpenAI**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist or is disabled in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic but isn't present or enabled in the schema, it's ignored and marked as **Dropped**.
1. **Admin API Key**. The OpenAI [Admin API key](#vendor-configuration). For example, `sk-admin-`.
1. (Optional) **Project IDs**. Enter a list of project IDs to filter costs and audit logs. Leave empty for all projects.
1. **Collect Costs**. Enable or disable collection of organization cost data. Enabled by default.
1. (Optional) **API Key IDs**. Visible when **Collect Costs** is enabled. Enter a list of API key IDs to filter costs. Leave empty for all API keys.
1. **Collect Audit Logs**. Enable or disable collection of audit log events. Enabled by default.
1. (Optional) **Event Types**. Visible when **Collect Audit Logs** is enabled. Enter a list of event types to filter audit logs (for example, `api_key.created`, `project.archived`). Leave empty for all event types.
1. (Optional) **Actor Emails**. Visible when **Collect Audit Logs** is enabled. Enter a list of actor email addresses to filter audit logs. Leave empty for all actors.
1. (Optional) **Actor IDs**. Visible when **Collect Audit Logs** is enabled. Enter a list of actor IDs to filter audit logs. Leave empty for all actors.
1. (Optional) **Resource IDs**. Visible when **Collect Audit Logs** is enabled. Enter a list of resource IDs to filter audit logs. Leave empty for all resources.
1. (Optional) **Tenant Only**. Visible when **Collect Audit Logs** is enabled. Enable to return only tenant-scoped events (for example, role bindings). Disabled by default.
1. (Optional) **Audit Polling Interval (min)**. Visible when **Collect Audit Logs** is enabled. Set the polling interval for audit log collection (range: 2–60 minutes). Default is 5 minutes.
1. **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type": "OpenAI"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"` |
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | `{"_siemForward": true}` |
| adminApiKey | String | Yes | `null` | OpenAI Admin API Key required for organization-level endpoints. | `"sk-admin-"` |
| projectIds | Array of Strings | No | `null` | Filter costs and audit logs to specific project IDs. If empty, data for all projects is returned. | `["proj_abc123"]` |
| collectCost | Boolean | Yes | `true` | Enable or disable collection of organization cost data. | `true` |
| apiKeyIds | Array of Strings | No | `null` | Filter costs to specific API key IDs. Only applies when `collectCost` is `true`. If empty, costs for all API keys are returned. | `["key_abc123"]` |
| collectAuditLogs | Boolean | Yes | `true` | Enable or disable collection of audit log events. | `true` |
| eventTypes | Array of Strings | No | `null` | Filter audit logs to specific event types. Only applies when `collectAuditLogs` is `true`. | `["api_key.created"]` |
| actorEmails | Array of Strings | No | `null` | Filter audit logs to events performed by users with these email addresses. Only applies when `collectAuditLogs` is `true`. | `["user@example.com"]` |
| actorIds | Array of Strings | No | `null` | Filter audit logs to events performed by these actor IDs. Only applies when `collectAuditLogs` is `true`. | `["user-xxx"]` |
| resourceIds | Array of Strings | No | `null` | Filter audit logs to events performed on these target resources. Only applies when `collectAuditLogs` is `true`. | `["proj_abc123"]` |
| tenantOnly | Boolean | No | `false` | Return only tenant-scoped events. Only applies when `collectAuditLogs` is `true`. | `false` |
| auditPollingIntervalMin | String | No | `"5m"` | Polling interval for audit log collection (range: 2–60 minutes). Only applies when `collectAuditLogs` is `true`. | `"5m"` |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/openai/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/openai/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
