---
id: taxii
title: TAXII Source
sidebar_label: TAXII
tags:
  - cloud-to-cloud
  - taxii
  - stix
description: The TAXII source provides a secure endpoint to collect indicators from threat intel services using the STIX/TAXII 1.1 specification.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/img/c2c/taxii/example.json';
import MyComponentSource from '!!raw-loader!/img/c2c/taxii/example.json';
import TerraformExample from '!!raw-loader!/img/c2c/taxii/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/taxii_logo.png')} alt="icon" width="50"/>

The Sumo Logic TAXII source provides a secure endpoint to collect indicators from threat intel services using the STIX/TAXII 1.1 specification and sends them to Sumo Logic Threat Intelligence.

:::note
This source is not available in the [Fed deployment](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 1 hour |  Indicators |

## Setup

### Vendor configuration



### Source configuration

When you create a TAXII source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Symantec Web Security Service Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **TAXII 1 Client**.
1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **Sumo Logic Threat Intel Source ID**. Enter the Sumo Logic namespace ID in which the indicators will be stored.
1. **TAXII Discovery URL**. Enter the discovery URL provided by your TAXII threat intel provider.
1. **Authentication**. Check the **Use Basic Auth** checkbox and enter the basic HTTP authentication username and password if the threat intel provider requires it.
1. **Polling Interval**. The Polling Interval is set for one hour by default, you can adjust it based on your needs. This sets how often the Source checks for new data.
1. **Processing Rules for Logs (Optional)**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](https://help.sumologic.com/docs/send-data/collection/processing-rules/).
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"TAXII"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| userSourceID | String | Yes | `null` | The Sumo Logic namespace in which the indicators will be stored. |  |
| discoveryURL | String | Yes | `null` | The discovery URL is used to get the collection URL which will be used to get a list of data collections. |  |
| useBasicAuth | Boolean | No | `null` | Choose if you want use basic authentication while communicating with the threat intel provider’s API or not. |  |
| httpBasicUsername | String | No | `null` | An optional basic authentication username (AlienVault uses API-Key as value for this field). |  |
| httpBasicPassword | String | No | `null` | An optional basic authentication password (AlienVault uses an empty value for this field). |  |
| pollingInterval | String | Yes | `null` | How frequently the messages are polled from the threat intel provider. The default is 1 hour, but can be set anywhere between 5 min and 48 hour. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

[Download example](/img/c2c/taxii/example.json)

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

[Download example](/img/c2c/taxii/example.tf)

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
