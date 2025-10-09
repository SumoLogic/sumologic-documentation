---
id: databricks-audit-source
title: Databricks Audit Source
sidebar_label: Databricks Audit
tags:
  - cloud-to-cloud
  - databricks-audit-logs
description: Learn how to collect Databricks Audit logs and send them to Sumo Logic for monitoring, auditing, and compliance.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/digital-guardian-logo.svg')} alt="icon" width="50"/>

Databricks is a unified data platform that supports data engineering, machine learning, and analytics in a collaborative environment. It offers enterprise-grade security, compliance, and governance for data workflows.

The Audit Logs API enables you to capture structured records of user and system activities within the Databricks workspace, including SQL queries, job executions, cluster events, and workspace changes. These logs facilitate auditing, security monitoring, and regulatory compliance.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 minutes |  [Audit Logs](https://docs.databricks.com/api/workspace/statementexecution/executestatement) |

## Setup

### Vendor configuration

The Databricks Audit source requires you to provide the Databricks Audit Base URL (API Gateway URL), Warehouse ID, Client ID, and Client Secret to export to configure the source. Follow the below steps to generate the required values:

#### Base URL

Follow the below steps to get the Base URL for user configuration: 
1. [Log in]() to your **Databricks** workspace.
2. The Base URL is visible in your browser’s address bar after login. For example, `https://YOUR-INSTANCE.databricks.com`.

#### Warehouse ID

The Warehouse ID is required to query Databricks SQL and fetch audit logs. Follow the below steps to get the Warehouse ID for user configuration:
1. Log in to your **Databricks** workspace.
2. Navigate to **SQL Warehouses** in the sidebar.
3. Click the warehouse name you want to use.
4. On the warehouse **details page**, select the **Properties** tab.
5. Locate and copy the **Warehouse ID**.

#### Client ID and Client Secret

To generate the Client ID and Client Secret, refer to the [Create an OAuth Secret](https://docs.databricks.com/aws/en/dev-tools/auth/oauth-m2m?language=Environment#-step-1-create-an-oauth-secret) section.

### Source configuration

When you create a Databricks Audit Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure Databricks Audit Source:
1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select the **Databricks Audit** icon.
1. Enter a **Name** to display for the Source in Sumo Logic. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="green check circle.png" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="orange exclamation point.png" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. Enter the [Base URL](#base-url) of your account.
1. Enter the [Warehouse ID](#warehouse-id) to fetch audit logs.
1. Enter the [Client ID and Client Secret](#client-id-and-client-secret) to authorize access to your Databricks resources.
1. The **Polling Interval** is set for 5 minutes hours by default. You can adjust it based on your needs.
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Databricks Audit Logs"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| baseURL | String | Yes | `null` | Base URL of the Databricks workspace. For example, `https://<workspace-name>.databricks.com`. |  |
| warehouseID | String | Yes | `null` | Unique identifier of the SQL Warehouse within the Databricks workspace, used to query and fetch audit logs. For example, `bd4dc8ef7e54782c`. |  |
| clientID | String | Yes | `null` | Client ID of the account. |  |
| clientSecret | String | Yes | `null` | Client Secret of the account |  |
| pollingIntervalMin | Integer | No | 5 minutes | Time interval after which the source will check for new data. <br/>Minimum: 5 minutes <br/>Maximum: 24 hours |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/databricks-audit/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/databricks-audit/example.tf
```


## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::