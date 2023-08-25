---
id: airtable-source
slug: /c2c/airtable
title: Airtable Source
image: https://app_icons.s3.amazonaws.com/airtable.png
sidebar_label: Airtable
tags:
  - cloud-to-cloud
  - airtable  #example: Druva
description: Learn how to retrieve Airtable audit logs into the Sumo Logic environment.
---
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/img/c2c/airtable/example.json';
import MyComponentSource from '!!raw-loader!/img/c2c/airtable/example.json';
import TerraformExample from '!!raw-loader!/img/c2c/airtable/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src="https://app_icons.s3.amazonaws.com/airtable.png" alt="airtable-icon.png" width="50" />

The Airtable API integration ingests audit logs periodically from the Airtable app platform into the Sumo Logic environment for storing and analyzing data.

:::note
This source is available in the [Fed deployment](https://help.sumologic.com/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 24 hours |  [Audit Log](https://airtable.com/developers/web/api/model/audit-log)

## Setup

### Vendor configuration

#### Prerequisites
To collect audit logs from the Airtable application into Sumo Logic, you must meet the following criteria:
* You need to have an Airtable admin account.
* Choose **enterprise.auditLogs:read** permission to access the token.
* You must have an Enterprise billing plan.

Airtable's API uses token-based authentication, it allows you to authenticate API requests by inputting your access tokens into the HTTP authorization bearer token header. You need to create a `Personal Access token` that will be used to authenticate API requests.

Complete the following steps to create service account credentials:
1. Go to the [Airtable application](https://airtable.com/) and navigate to <a id="Token"></a> **Create Token**.
2. Click the **Create new token** button to create a new personal access token.
3. Give your token a unique name. This name will be visible in the record revision history.
4. Choose the scope **enterprise.auditLogs:read** to grant your token. This controls what API endpoints the token will be able to use.
5. Click **add a base** to grant the token access to a base or workspace.
6. You can grant access to any number and combination of **bases** and **workspaces** associated with your account. Ensure that the token can only read and write data within the bases and workspaces that have been assigned to it.


### Source configuration
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. On the Collection page, click **Add Source** next to a **Hosted Collector**.
1. Search for and select **Airtable**.<br/><img src="https://app_icons.s3.amazonaws.com/airtable.png" alt="airtable-icon.png" width="150" />
1. Enter a **Name** for the Source. The **description** is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM Enterprise](/docs/cse)
1. (Optional) **Fields**. Click the **+Add** link to add custom log metadata [Fields](/docs/manage/fields).
   * Define the fields you want to associate, each field needs a name (key) and value.
      * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
      * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.  
1. **Account ID**. Enter an account ID that will be a unique identifier for your enterprise account.
1. **Personal Access Token**. Enter the [Airtable personal access token](#Token).
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

<!--
Insert meta deta fields in the Sumo Logic UI. Update the below table accordingly.
-->

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemForward` | <code>(true \| false)</code> | Set to `true` when Forward To SIEM is checked |
| `_siemFormat` | `JSON` | Set when Forward To SIEM is checked |
| `_parser` | `"/Parsers/System/Airtable/Airtable Audit C2C"` | Set when Forward To SIEM is checked |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for more details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Airtable"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

<!--
Add information about the configuration parameters. Update the below table accordingly.
-->

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| `accountId` | String | Yes | `null` | Account ID is a unique identifier for your Enterprise Account. | `"12345"` |
| `personalAccessToken` | String | Yes | `null` | Used to authenticate API requests. | `"a211gsc!"` |


### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

[Download example](/img/c2c/airtable/example.json)

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

[Download example](/img/c2c/airtable/example.tf)

## Troubleshooting
#### Audit log is getting truncated
There is a hard size limit of 64 KB per log. Check that the audit log size is less than 64 KB.

#### Data is duplicated
There's a potential for data duplication. Data URLs will expire after 7 days. If URLs are not processed within 7 days, the integration will create a new request which may cause data duplication.

## FAQ
#### Is Personal Access Token in beta?
Yes. We are using `Personal Access Token` authentication in the integration, which is currently in public beta version. For more information, refer to the [Airtable Notification](https://airtable.com/developers/web/api/authentication#types-of-token).


:::info
Click [here](/docs/c2c/info) for more information about Cloud to Cloud sources.
:::
