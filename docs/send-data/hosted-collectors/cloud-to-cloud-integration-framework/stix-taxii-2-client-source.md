---
id: stix-taxii-2-client-source
title: STIX/TAXII 2 Client Source
sidebar_label: STIX/TAXII 2 Client
tags:
  - cloud-to-cloud
  - stix
  - taxii
description: Learn how to set up a STIX/TAXII 2.x client to collect threat intelligence indicators into the Sumo Logic environment.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/taxii-2/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/taxii-2/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/taxii-2/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

[STIX/TAXII](https://oasis-open.github.io/cti-documentation/) are two standards used together to exchange threat intelligence information between systems. STIX defines the format and structure of the data. TAXII defines how the API endpoints are served and accessed by clients. This Sumo Logic source supports collecting indicators from STIX/TAXII 2.0 and 2.1 versions. The legacy STIX/TAXII 1.x versions are not supported with this source.

:::note
This source is available in the [Fed deployment](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## Data collected

This source collects [threat intelligence indicators](/docs/platform-services/threat-intelligence-indicators/) from a vendor's STIX/TAXII 2.x endpoints. This means the specific endpoints we collect data from are the endpoints defined in the [TAXII standard](https://oasis-open.github.io/cti-documentation/taxii/intro). Vendor APIs must follow the standard. The source will collect all indicators from the TAXII server when it runs for the first time and it will check for updates once an hour. This one-hour polling interval can be adjusted in the source configuration.

## Setup

### Vendor configuration

:::note
The threat intel vendor must follow the STIX/TAXII 2.0 or 2.1 standard.
:::

1. Identify a vendor who uses the STIX/TAXII 2.0 or 2.1 standard for sharing threat intelligence indicators.
1. Follow their documentation to obtain the following information:
   * The STIX/TAXII version they provide (either 2.0 or 2.1)
   * The TAXII Discovery URL
   * Your authentication credentials if required


### Source configuration

When you create an TAXII 2 Client Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a TAXII 2 Client Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **TAXII 2 Client**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. (Optional) **Sumo Logic Threat Intel Source ID**. Provide your own threat intelligence source ID for organizing multiple sources.
1. In **STIX/TAXII Configuration**:
    1. **Version**. Select the STIX/TAXII version the vendor is using (2.0 or 2.1).
    1. **TAXII Discovery URL**. Enter the TAXII Discovery URL provided by the vendor.
1. **Authentication**. If HTTP basic authentication is required, check **Use Basic Auth** and provide your vendor username and password.
1. In **Other Settings**:
    1. (Optional) **Set Indicators Limit Per Page**. Set the maximum number of indicators to return per page. The default is 99.
    1. (Optional) **Polling Interval**. Set how frequently to poll for new or updated indicators. It must be between 5 minutes and 48 hours. 
1. When you are finished configuring the Source, click **Save**.

## JSON Configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"TAXII 2 Client"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:---|:---|:---|:---|:---|:---|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| ti_user_source_id | String | Yes | `null` | Your Sumo Logic threat intel destination source name |  |
| ti_version | String | Yes | `2.1` | The STIX/TAXII server version used |  |
| ti_discovery_url | String | Yes | `null` | The STIX/TAXII discovery URL |  |
| http_user | String | No | `null` | HTTP basic authentication username |  |
| http_password | String | No | `null` | HTTP basic authentication password |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

[Download example](/files/c2c/taxii-2/example.json)

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

[Download example](/files/c2c/taxii-2/example.tf)

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
