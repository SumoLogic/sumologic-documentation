---
id: mandiant-threat-intel-source
title: Mandiant Threat Intel Source
sidebar_label: Mandiant Threat Intel
tags:
  - cloud-to-cloud
  - mandiant-threat-intel
description: Learn how to collect indicators list from Mandiant Threat Intel platform.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/mandiant-threat-intel-logo.png')} alt="icon" width="60" />

The Mandiant Threat Intel source ingests threat intelligence indicators using the Mandiant API and sends them to Sumo Logic as normalized threat indicators. For more information, see [About Sumo Logic Threat Intelligence](/docs/security/threat-intelligence/about-threat-intelligence/).

Mandiant is a recognized leader in dynamic cyber defense, threat intelligence, and incident response services. By scaling decades of frontline experience, Mandiant helps organizations to be confident in their readiness to defend against and respond to cyber threats. Mandiant is part of Google Cloud.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 1h default (customizable in number of hours) |  Indicators |

## Setup

### Vendor configuration

:::note
The Mandiant API documentation is not public and can only be accessed by partners or customers.
:::

The Mandiant Threat Intel source requires you to provide API Key ID and API Secret.

### Source configuration

When you create a Mandiant Threat Intel source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Mandiant Threat Intel source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Mandiant Threat Intel**.
1. Enter a **Name** for the source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **API Key ID**. Enter the API key ID collected from the Mandiant Threat Intel platform.
1. **API Secret**. Enter the API secret collected from the from the Mandiant Threat Intel platform.
1. **Sumo Logic Threat Intel Source ID**. Enter the name you want to use for the Mandiant source that will be created in the [Threat Intelligence](/docs/security/threat-intelligence/about-threat-intelligence/) tab in Sumo Logic. The Mandiant threat intelligence indicators will be stored in this source. Do not use spaces in the name.
1. **Polling Interval**. The polling interval is set for 5 minutes by default. You can adjust it based on your needs. This sets how often the source checks for new data.
1. **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Mandiant Threat Intel"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| apiKeyId | String | Yes | `null` | API Key ID of the user. |  |
| apiSecret | String | Yes | `null` | API Secret of the account. |  |
| userSourceId | String | Yes | `null` | The Sumo Logic namespace in which the indicators will be stored. |  |
| pollingInterval | integer | Yes | `5 minutes` | Time interval (in minutes) after which the source will check for new data. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/mandiant-threat-intel/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/mandiant-threat-intel/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
