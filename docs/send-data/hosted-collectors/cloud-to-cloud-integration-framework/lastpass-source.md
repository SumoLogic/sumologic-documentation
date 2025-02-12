---
id: lastpass-source
title: LastPass Source
sidebar_label: LastPass
keywords:
  - lastpass
  - cloud-to-cloud
description: Learn how to collect audit reporting events from LastPass platform.
---
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/lastpass/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/lastpass/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/lastpass/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/lastpass.png')} alt="thumbnail icon" width="55"/>

LastPass is a password manager tool that allows you to store, secure, and autofill your passwords. LastPass' users get a password vault, which is the encrypted part of the LastPass password manager where passwords, secure notes, and sensitive information are safely stored. The LastPass source collects audit reporting events data and sends it to Sumo Logic.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Audit Reporting](https://support.lastpass.com/s/document-item?bundleId=lastpass&topicId=LastPass/api_event_reporting.html&_LANG=enus) |

## Setup

### Vendor configuration

To collect audit reporting data from LastPass, you must have an authorized LastPass account. Also, follow the [LastPass documentation](https://support.lastpass.com/s/document-item?bundleId=lastpass&topicId=LastPass/t_cid_and_hash_locate.html&_LANG=enus) to generate the CID (Account Number) and API secret ID.

### Source configuration

When you create a LastPass source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure the LastPass Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **LastPass** icon.
1. Enter a **Name** to display for the source in the Sumo Logic web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. In **CID (Account Number)**, enter your CID account number collected from the LastPass platfrorm.
1. In **API Secret**, enter your API Secret ID collected from the LastPass platfrorm.
1. In **TimeZone**, enter timezone of Admin LastPass account.
1. **Polling Interval**. You have the option to select how often to poll for base entry events. Default is 5 minutes.
1. When you are finished configuring the source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Lastpass"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| cid | Integer | Yes | `null` | The CID account number collected from the LastPass platform. |  |
| apiSecret | String | Yes | `null` | The API Secret ID collected from the LastPass platform. |  |
| timeZone | String | No | UTC | Timezone of Admin LastPass account. |
| pollingIntervalMinutes | Integer | No | 5 | How frequently the integration should poll to LastPass. <br /> **Options**: 5m, 10m, 15m, 30m, 1h, or 24h. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/lastpass/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/lastpass/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
