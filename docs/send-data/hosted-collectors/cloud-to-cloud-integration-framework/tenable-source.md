---
id: tenable-source
title: Tenable Source
sidebar_label: Tenable
tags:
  - cloud-to-cloud
  - tenable
description: The Tenable Source provides a secure endpoint to ingest audit-log events, vulnerability, and asset data from the Tenable.io APIs.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/tenable/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/tenable/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/tenable/example.tf';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/tenable-logo.png')} alt="icon" width="150"/>

The Tenable Source provides a secure endpoint to ingest audit-log events, vulnerability, and asset data from the [Tenable.io APIs](https://developer.tenable.com). It securely stores the required authentication, scheduling, and state tracking information.
   * The Vulnerability [Export API](https://developer.tenable.com/reference/exports-vulns-request-export) first exports vulnerabilities that are used to initiate export jobs. Next, it gets the export [status](https://developer.tenable.com/reference/exports-vulns-export-status) and then [downloads exported vulnerabilities](https://developer.tenable.com/reference/exports-vulns-download-chunk) in a chunk.
   * The Audit Log API is used to collect [audit logs](https://developer.tenable.com/reference/audit-log-events). It does not provide a pagination function. Logs are polled every 24 hours with a limit of 5,000.
   * The Asset Export API first [exports assets](https://developer.tenable.com/reference/exports-assets-request-export) that are used to initiate export jobs. Next, it gets the export [status](https://developer.tenable.com/reference/exports-assets-request-export) and then [downloads exported assets](https://developer.tenable.com/reference/exports-assets-download-chunk) in a chunk.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Export API](https://developer.tenable.com/reference/exports-vulns-request-export) |
| 5 min |  [Audit logs](https://developer.tenable.com/reference/audit-log-events) |
| 5 min |  [Exports assets](https://developer.tenable.com/reference/exports-assets-request-export) |

## Setup

:::note
The Tenable source is configured with a Tenable IO Access and Secret Key. Your account must have `ADMINISTRATOR [64]` user permissions.
:::

### Vendor configuration

You need to have a Tenable account to generate Access Key and Secret Key. Follow the instruction in the [Tenable documentation](https://developer.tenable.com/docs/authorization) to generate Access Key and Secret Key.

### Source configuration

When you create a Tenable source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Tenable source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select for and select **Tenable**.
1. Enter a **Name** for the source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. Provide the **Access Key** and **Secret Key** to authenticate requests.
1. (Optional) **Include unlicensed objects**. Select the checkbox if you want to collect unlicensed objects.
1. **Supported APIs to collect**. Select one or more of the available APIs: **Vulnerability Data**, **Audit Logs**, and **Asset Data**.
1. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Tenable` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Cloud API` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `Vulnerabilities: vulnerability`, `Audits: {action}`, or `Assets (Inventory): assets` | Set when **Forward To SIEM** is checked and specific to the API collected. |
| `_siemDataType` | `Inventory` | Only with Assets (Inventory) data. |

## Base URL

Internally, the source will use the following base URL depending on the respective environment:

| BASE URL | Value |
|:--|:--|
| Non-Fed Env. | https://cloud.tenable.com |
| Fed Env. | https://fedcloud.tenable.com |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/cse). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Tenable"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| access_key | String | Yes | `null` | The Tenable access key you want to use to authenticate collection requests. |  |
| secret_key | String | Yes | `null` | The Tenable secret key you want to use to authenticate collection requests. |  |
| fed_cloud | Boolean | No | False | Set to true if tenable.io uses FedRAMP environment. |  |
| include_unlicensed_assets | Boolean | No | False | Set to true if you want to collect unlicensed objects. |  |
| supported_apis | Array of strings | No | Vulnerability Data | Define one or more of the available APIs to collect:<br/>Vulnerability Data, Audit Logs, and Asset Data.<br/>For example, for both you'd use:["Vulnerability Data","Audit Logs","Asset Data"] |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/tenable/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/tenable/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::