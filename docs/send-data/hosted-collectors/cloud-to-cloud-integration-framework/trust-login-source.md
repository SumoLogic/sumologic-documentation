---
id: trust-login-source
title: Trust Login Source
sidebar_label: Trust Login
description: This integration aims to collect the report logs from the Trust Login platform.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/trust-login/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/trust-login/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/trust-login/example.tf';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/trust-login-icon.png')} alt="trust-login-icon" width="50" />

Trust Login is an advanced authentication platform that provides a secure and seamless login solution for both users and organizations. It improves the authentication process by focusing on trust, ease of use, and robust security. This approach ensures reliable access control while maintaining a positive user experience.

This source helps you to collect the report logs from the Trust Login platform, and ingest them into Sumo Logic for streamlined analysis.

:::important
The Trust Login documentation is not public and can only be accessed by partners or customers.
:::

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min | Report logs |

## Setup

### Vendor configuration

The Trust Login source requires authentication with a **Bearer Token** associated with an API Token.

### Source configuration

When you create a Trust Login source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Trust Login Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.  
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Trust Login**.
1. Enter a Name for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped. 
1. **Bearer Token**. Provide the bearer token collected from the Trust Login platform.
1. The **Polling Interval** is set for five minutes by default, you can adjust it based on your needs.
1. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Trust Login"}` | Yes | Specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of Source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing Source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the collector or source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| bearerToken | String | Yes | `null` | The bearer API token created for the account in the Trust Login portal. | |
| pollingIntervalMin | Integer | Yes | 5 mins | This sets how often the source checks for new data. | |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/trust-login/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/trust-login/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
