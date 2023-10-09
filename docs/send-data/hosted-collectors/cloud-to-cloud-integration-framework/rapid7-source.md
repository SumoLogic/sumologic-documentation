---
id: rapid7-source
title: Rapid7 Source
sidebar_label: Rapid7
description: Learn how to collect assets and vulnerabilities from Rapid7 InsightVM.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/rapid7-logo.png')} alt="rapid7-logo" width="80" />

The Rapid7 source collects asset and vulnerabilities from [Rapid7 InsightVM](https://help.rapid7.com/insightvm/en-us/api/integrations.html) API and sends it to Sumo Logic. InsightVM provides a fully available, scalable, and efficient way to collect vulnerability data and minimize risk. InsightVM automatically evaluates changes in user's networks, allowing security professionals to better understand and quickly manage the risk posed to their organization.

## Data Source

Rapid7 source ingests inventory, assessment, and summary details for assets from [Assets API](https://help.rapid7.com/insightvm/en-us/api/integrations.html#operation/searchIntegrationAssets) and vulnerabilities from [Vulnerabilities API](https://help.rapid7.com/insightvm/en-us/api/integrations.html#operation/searchIntegrationVulnerabilities).

## Metadata Fields

Metadata fields will be set, if the integration is configured with the SIEM forward option. See **Metadata Fields** table below:

| Field Name | Value |
| :--- | :--- |
| _siemDataType | Inventory |
| _siemProduct | InsightVM |
| _siemVendor | Rapid7 |

## Setup and Configuration

The Rapid7 InsightVM source requires you to provide a region and organizational API key to access the data. Follow the instructions from Rapid7 documentation, to determine the [Region](https://docs.rapid7.com/insight/api-overview#endpoint) and [Organizational API key](https://docs.rapid7.com/insight/managing-platform-api-keys#generate-an-organization-key).

## States

Rapid7 integration Source is a device security platform that discover devices, tracks behavior, detects threats, and takes action to protect your business.
When you create an Rapid7 Source, it goes through the following stages:
1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Rapid7.
1. **Collecting**. The Source is actively collecting data from Rapid7.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.
On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

## Create Rapid7 Source

When you create an Rapid7 Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Rapid7 Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Rapid7**.<br/> <img src={useBaseUrl('img/send-data/rapid7-logo.png')} alt="rapid7-logo" width="140" />
1. Enter a **Name** for the Source. The description is optional. <br/><img src={useBaseUrl('img/send-data/rapid7_config_main.png')} alt="rapid7-config-main.png" width="400" />
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. Enter the **Region** of Rapid7 InsightVM platform.
1. Enter the **API Key** for authorization.

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
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Rapid7"}` for Rapid7 Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Rapid7 Source. | not modifiable |

### Config Parameters

| Parameter | Type | Required | Description | Access |
|:---|:---|:---|:---|:---|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `region` | String | Yes | Region of the Insight platform. Know more about [Supported regions](https://docs.rapid7.com/insight/product-apis/#supported-regions).  | modifiable |
| `apikey` | String | Yes | API Key for the account authorization. | modifiable |

### JSON Example

```json
{
  "api.version": "v1",
  "source": {
    "config": {
      "name": "Rapid7",
      "description": "Test Source",
      "category": "source_category",
      "env": "dev",
      "region": "us",
      "apiKey": "215c96c6-19a6-48e9-955f-253593xxxxxx"
    },
    "schemaRef": {
      "type": "Rapid7"
    },
    "sourceType": "Universal"
  },
}
```

