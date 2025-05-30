---
id: zero-networks-segment-source
title: Zero Networks Segment Source
sidebar_label: Zero Networks Segment
tags:
  - cloud-to-cloud
  - zero-networks-segment
description: Learn how to collect audit logs and network activity data from Zero Networks Segment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/zero-networks-icon.png')} alt="zero-networks-icon" width="40" />

Zero Networks is a cybersecurity company that provides cloud-based security solutions for your networks and endpoints. Segment is a solution that aims to provide comprehensive network security by implementing zero-trust principles. With Segment, Zero Networks provides a cloud-based platform that allows you to create micro-segments across the network. These micro-segments are small, isolated portions of the network that are tightly controlled and can only be accessed by authorized users and devices.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  Audit Logs |
| 5 min |  Network Activities|

## Setup

### Vendor configuration

The Zero Networks Segment source requires you to provide the API key and Network Activity Filters (optional) to access the data.

- Sign in to the Zero Networks platform and create an API Key.
- (Optional) Follow the below steps to create Network Activity Filters:
  1. Go to **Activities** page.
  1. Under **Network** tab, apply the required filters.
  1. Copy the filters from the URL.<br/><img src={useBaseUrl('img/send-data/filters.png')} alt="zero-networks-filters" width="700" />

### Source configuration

When you create an Zero Networks Segment Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Zero Networks Segment Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.  
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Zero Networks Segment**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. Enter the **API Key** for authorization collected from the Zero Networks platform.
1. Select **Collect Network Activity Data**, to collect network activity data.
1. (Optional) For **Network Activity Filters**, enter the filters you want to apply for network activity data collected from the Zero Networks platform.
:::note
You can only use 256 characters for the network activity filters field.
:::

## Metadata field

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemParser` | `/Parsers/System/Zero Networks/Zero Networks Segment` | Set when **Forward To SIEM** is checked. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"ZeroNetworksSegment"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:---|:---|:---|:---|:---|:---|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| `apiKey` | String | Yes | `null` | API Key to used for Authorization.  |  |
| `collectNetworkActivities` | Boolean | No | |Check if you want to collect network activity data. |  |
| `networkActivityFilters` | String | No | `null` | Optional filters that can be applied for network activity data. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/zero-networks-segment/example.json
```

### Terraform example

```hcl reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/zero-networks-segment/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::

## Limitations

- This C2C can process 400 records with the same timestamp, and the remaining will be skipped.
