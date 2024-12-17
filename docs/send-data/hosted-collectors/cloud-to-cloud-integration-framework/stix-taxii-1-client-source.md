---
id: stix-taxii-1-client-source
title: STIX/TAXII 1 Client Source
sidebar_label: STIX/TAXII 1 Client
keywords:
  - cloud-to-cloud
  - stix
  - taxii
description: Learn how to set up a STIX/TAXII 1.x client to collect threat intelligence indicators into the Sumo Logic environment.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/taxii-1/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/taxii-1/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/taxii-1/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

[STIX/TAXII](https://oasis-open.github.io/cti-documentation/) are two standards used together to exchange threat intelligence information between systems. STIX defines the format and structure of the data. TAXII defines how the API endpoints are served and accessed by clients. This Sumo Logic source supports collecting indicators from STIX/TAXII 1.x. 

:::sumo[Best Practice]
This source only supports STIX/TAXII 1.x. Sumo Logic recommends using our [STIX/TAXII 2.x source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/stix-taxii-2-client-source/) instead as it is the current version of STIX/TAXII.
:::

## Data collected

This source collects [threat intelligence indicators](/docs/security/threat-intelligence/threat-intelligence-indicators) from a vendor's STIX/TAXII 1.x endpoints. This means the specific endpoints we collect data from are the endpoints defined in the [TAXII standard](https://oasis-open.github.io/cti-documentation/taxii/intro). Vendor APIs must follow the standard. The source will collect all indicators from the TAXII server when it runs for the first time and it will check for updates once an hour. This one-hour polling interval can be adjusted in the source configuration.

## Setup

### Vendor configuration

:::note
The threat intel vendor must follow the STIX/TAXII 1.x standards.
:::

1. Identify a vendor who uses the STIX/TAXII 1.x standard for sharing threat intelligence indicators.
1. Follow their documentation to obtain the following information:
   * The TAXII Discovery URL
   * Your authentication credentials if required


### Source configuration

When you create an TAXII 1 Client Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a TAXII 1 Client Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.  
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **TAXII 1 Client**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Sumo Logic Threat Intel Source ID**. Provide your own threat intelligence source ID. This is useful for organizing multiple sources.
1. **STIX/TAXII Configuration**:
   * **Discovery URL**. Enter the TAXII Discovery URL provided by the vendor (optional).
1. **Collection Names**. Enter the collections to fetch, using the poll URL.
1. **Authentication**. This source only supports basic HTTP authentication. Check **Use Basic Auth** to enable it.
   * **HTTP Basic Auth User**. The threat intel API username
   * **HTTP Basic Auth Password**. The threat intel API password
1. **Other Settings**:
    1. (Optional) **Polling Interval**. Set how frequently to poll for new or updated indicators. It must be between 5 minutes and 48 hours.
1. When you are finished configuring the Source, click **Save**.

## JSON Configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter  | Type        | Value                                         | Required | Description                      |
|:-----------|:------------|:----------------------------------------------|:---------|:---------------------------------|
| schemaRef  | JSON Object | `{"type":"TAXII 1 Client"}`                   | Yes      | Define the specific schema type. |
| sourceType | String      | `"Universal"`                                 | Yes      | Type of source.                  |
| config     | JSON Object | [Configuration object](#configuration-object) | Yes      | Source type specific values.     |

### Configuration Object

| Parameter | Type   | Required | Default | Description                                                                                                                                                                                               | Example      |
|:----------|:-------|:---------|:--------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------|
| name      | String | Yes      | `null`  | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| userSourceID | String | Yes | `null` | Your Sumo Logic threat intel destination source name |  |
| discoveryURL | String | Yes | `null` | The STIX/TAXII discovery URL |  |
| useBasicAuth| Boolean | No | `false`|Enforces basic HTTP authentication|
| http_user | String | No | `null` | HTTP basic authentication username |  |
| http_password | String | No | `null` | HTTP basic authentication password |  |
| collectionNames | Array | No | `Empty` | Used to get collections using the poll URL. |  |
| pollingInterval | String | Yes |  | How frequently to poll for messages from the threat intel provider. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/taxii-1/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/taxii-1/example.tf" target="_blank">Download example</a>

### Recommended configurations

Below is a list of Sumo Logic recommended configuration examples for specific threat intel vendors using TAXII 1.

| Vendor | Notes |
| :-- | :-- |
| <a href="/files/c2c/taxii-1/alien-vault-config.json" target="_blank">AlienVault</a> | Use your API key as the HTTP username and leave the password blank. |
| <a href="/files/c2c/taxii-1/recorded-future-config.json" target="_blank">Recorded Future</a> | Use your API key as the HTTP password and use any non-empty string as username. The Recorded Future TAXII v1 service supports Recorded Future’s [default and large risk lists](https://support.recordedfuture.com/hc/en-us/articles/115008327148-Default-and-Large-Risk-Lists), as well as collections for each risk rule. More information can be found on the [Recorded Future Support portal](https://support.recordedfuture.com/hc/en-us/articles/115004303128-TAXII-V1-service). |

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
