---
id: asana-source
title: Asana Source
sidebar_label: Asana
tags:
  - cloud-to-cloud
  - asana
description: Learn how to retrieve Asana audit logs into the Sumo Logic environment.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/asana/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/asana/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/asana/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/asana-icon.png')} alt="asana-icon" width="40" />

The Asana Audit Logs API Integration ingests events from [Asana Audit Logs API](https://developers.asana.com/reference/audit-log-api). Asana can help you to break down large work into manageable tasks. It's a comprehensive work management tool that allows you to track project and task progress, share files, comments, and notes, and keep track of deadlines.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [GetAuditLogs](https://developers.asana.com/reference/getauditlogevents)|

## Setup

### Vendor configuration

:::note

- Only [Asana service accounts](https://asana.com/guide/help/premium/service-accounts) in certain pricing tiers can access audit log events.
- Asana's [audit log events documentation](https://developers.asana.com/docs/audit-log-events) has the latest information on the required pricing tiers.
:::

Follow the below steps to get the required fields for user configuration:

1. Log in to your [Asana admin console](https://app.asana.com/admin).<br/> <img src={useBaseUrl('img/send-data/asana_login.png')} style={{border:'1px solid gray'}} alt="asana-login" width="400" />
1. After logging in, click the **Apps** tab from with your admin console.
1. Click **Service accounts**.
1. Click the **Add service account** button.
1. Refer to the below image for the same:<br/> <img src={useBaseUrl('img/send-data/add_service_account.png')} style={{border:'1px solid gray'}} alt="add_service_account" width="800" />
1. Give the service account a name.
1. Under **Permissions scopes**, choose **Scoped permissions**, and tick the **Audit logs** box.<br/><img src={useBaseUrl('img/send-data/asana-service-account-create.png')} style={{border:'1px solid gray'}} alt="service account" width="400" />
1. Click **Save changes** and copy the service account token from here for later use.<br/><img src={useBaseUrl('img/send-data/asana-token-copy.png')} style={{border:'1px solid gray'}} alt="service account" width="400" />
1. Inspect the URL in your browser and parse the ID of your Asana workspace.<br/><img src={useBaseUrl('img/send-data/workspace_id.png')} style={{border:'1px solid gray'}} alt="workspace_id" width="700" />

### Source configuration

When you create an Asana Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Asana Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Asana**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. Enter the Personal Access Token (PAT) from the Asana platform.
1. Enter the unique workspace ID for the users service account.
1. When you are finished configuring the Source, click **Save**.

## JSON Configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Asana"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:---|:---|:---|:---|:---|:---|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| personalAccessToken | String | Yes | `null` | Personal Access Token from the Asana platform. |  |
| workspaceID | String | Yes | `null` | This will be the unique workspace id for the users service account. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/asana/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/asana/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
