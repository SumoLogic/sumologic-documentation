---
id: zero-networks-segment-source
title: Zero Networks Segment Source
sidebar_label: Zero Networks Segment
description: Learn how to collect audit logs and network activity data from Zero Networks Segment.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/zero-networks-icon.png')} alt="zero-networks-icon" width="40" />

Zero Networks is a cybersecurity company that provides cloud-based security solutions for your networks and endpoints. Segment is a solution that aims to provide comprehensive network security by implementing zero-trust principles. With Segment, Zero Networks provides a cloud-based platform that allows you to create micro-segments across the network. These micro-segments are small, isolated portions of the network that are tightly controlled and can only be accessed by authorized users and devices.

This source ingests audit logs and network activities via Zero Networks Segment API.

## Data Source

- **Audit Logs**. A set of audit events for everything that happens in the product.
- **Network Activities**. A network connection that occurs in the customer environment which includes properties from both source and destination.

## Setup and Configuration

The Zero Networks Segment source requires you to provide the API key and Network Activity Filters (optional) to access the data.

- Sign in to the Zero Networks platform and create an API Key.
- (Optional) Follow the below steps to create Network Activity Filters:
  1. Go to **Activities** page.
  2. Under **Network** tab, apply the required filters.
  3. Copy the filters from the URL.<br/><img src={useBaseUrl('img/send-data/filters.png')} alt="zero-networks-filters" width="700" />


## States

Zero Networks Segment source is a security platform that provides cloud-based security solutions for your networks and endpoints, by protecting you from cyber threats and data breaches.
When you create an Zero Networks Segment Source, it goes through the following stages:
1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Zero Networks Segment.
1. **Collecting**. The Source is actively collecting data from Zero Networks Segment.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.
On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

## Create Zero Networks Segment Source

When you create an Zero Networks Segment Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Zero Networks Segment Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Zero Networks Segment**.<br/> <img src={useBaseUrl('img/send-data/zero-networks-icon.png')} alt="zero-networks-icon" width="60" />
1. Enter a **Name** for the Source. The description is optional. <br/><img src={useBaseUrl('img/send-data/zero-network-config.png')} alt="zero-network-config.png" width="400" />
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

### Error Types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason for the error, if the source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs. | Yes | The Source will retry indefinitely. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry indefinitely. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

### JSON Configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. | na |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"ZeroNetworksSegment"}` for Zero Networks Segment Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Zero Networks Segment. | not modifiable |

### Config Parameters

| Parameter | Type | Required | Description | Access |
|:---|:---|:---|:---|:---|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `apiKey` | String | Yes | API Key to used for Authorization.  | modifiable |
| `collectNetworkActivities` | Boolean | No | Check if you want to collect network activity data. | modifiable |
| `networkActivityFilters` | String | No | Optional filters that can be applied for network activity data. | modifiable |

### JSON Example

```json
{
  "api.version": "v1",
  "source": {
    "config": {
      "name": "zero-networks-segment",
      "apiKey": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyzxxxxxxxxxxxx",
      "collectNetworkActivities": true,
      "networkActivityFilter": "[{\"id\":\"state\",\"includeValues\":[\"4\"]}]"
    },
    "schemaRef": {
      "type": "Zero Networks Segment"
    },
    "sourceType": "Universal"
  }
}

```
## Limitations

- This C2C can process 400 records with the same timestamp, and the remaining will be skipped.