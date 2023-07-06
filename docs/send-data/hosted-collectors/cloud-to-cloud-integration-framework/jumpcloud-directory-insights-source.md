---
id: jumpcloud-directory-insights-source
title: JumpCloud Directory Insights Source
sidebar_label: JumpCloud Directory Insights
description: Learn how to collect events data from the JumpCloud Directory Insight.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/jumpcloud-directory-insights-logo.png')} alt="jumpcloud-directory-insights-icon" width="120" />

JumpCloud's open directory platform unifies your technology stack across identity, access, and device management in a cost-effective manner that doesn't sacrifice security or functionality. Directory Insights gives you a clear path to view, analyze, and save user and resource activity data, in a standard format that you can query in real time.

JumpCloud Directory Insights Source is used to collect Directory Insights Events from the JumpCloud platform using the REST API and send it to Sumo Logic.

## Data Source

The integration fetches events data using [REST API](https://docs.jumpcloud.com/api/insights/directory/1.0/index.html#section/Overview) provided by JumpCloud Directory Insight platform.

## Set up and Configuration

The JumpCloud Directory Insights source requires you to provide the **API Key** and **Organization ID** to access the source data.

- To generate the **API Key**, follow the instructions mentioned in the [Jumpcloud documentation](https://docs.jumpcloud.com/api/insights/directory/1.0/index.html#section/Authentication-and-Authorization/Authentication).
- To generate the **Organization ID**, follow the instructions mentioned in the [Jumpcloud documentation](https://docs.jumpcloud.com/api/insights/directory/1.0/index.html#section/Authentication-and-Authorization/Authentication).

## States

JumpCloud Directory Insights source is a security platform that provides cloud-based security in a cost-effective manner that doesn't sacrifice security or functionality.
When you create a JumpCloud Directory Insights source, it goes through the following stages:
1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with JumpCloud Directory Insights.
1. **Collecting**. The Source is actively collecting data from JumpCloud Directory Insights.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.
On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

## Create JumpCloud Directory Insights Source

When you create an JumpCloud Directory Insights source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Code42 Incydr Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **JumpCloud Directory Insights**.<br/> <img src={useBaseUrl('img/send-data/jumpcloud-directory-insights-icon.png')} style={{border: '1px solid black'}} alt="jumpcloud-directory-insights-icon" width="120" />
1. Enter a **Name** for the source. The description is optional. <br/><img src={useBaseUrl('img/send-data/jumpcloud-directory-insights-config.png')} alt="jumpcloud-directory-insights-config.png" style={{border: '1px solid black'}} width="400" />
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. In **API Key**, enter the API Key you generated from the JumpCloud Directory Insights platform.
1. In **Organization ID**, enter the Organization ID you generated from the JumpCloud Directory Insights platform.
1. In **Service**, select the type of logs to collect. This allows you to limit the response to just the data you want.
1. When you are finished configuring the Source, click **Save**.

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
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. | n/a |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"JumpCloud Directory Insights"}` for JumpCloud Directory Insights Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for JumpCloud Directory Insights. | not modifiable |

### Config parameters

| Parameter | Type | Required | Description | Access |
|:---|:---|:---|:---|:---|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `apiKey` | String | Yes | API Key generated from the JumpCloud Directory Insights platform. | modifiable |
| `orgID` | String | Yes | Organization ID generated from the JumpCloud Directory Insights platform. | modifiable |
| `service` | String | Yes | Type of logs from which you want to collect the data from. | modifiable |

### JSON Example

```json
{
    "api.version": "v1",
    "source": {
        "config": {
            "name": "JumpCloud Directory Insights",
            "description": "Collect Events from JumpCloud Directory Insights Product",
            "category": "jumpcloud-directory-insights",
            "apiKey": "ebf7b9d6e1****************",
            "orgID": "64949312***************",
            "service": "all"
        },
        "schemaRef": {
            "type": "JumpCloud Directory Insights"
        },
        "sourceType": "Universal"
    }
}
```
## Troubleshooting

After configuring your source, you should check the status of the source in the **Collectors** page > **Status** column. If the source is not functioning as expected, you may see an error next to the Source Category column as shown below: 

**Error Code**: `400` <br />
**Solution**: Make sure that the **orgID** entered is correct your domain.

**Error Code**: `401` <br />
**Solution**: Make sure that the **apiKey** entered is correct your domain.

**Error Code**: `402` <br />
**Solution**: Make sure that the Directory Insights is enabled for the Organization.