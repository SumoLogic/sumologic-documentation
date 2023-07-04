---
id: code42-incydr-source
title: Code42 Incydr Source
sidebar_label: Code42 Incydr
description: Learn how to collect alerts, file events, and audit logs from the Code42 Incydr.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/code42-incydr-logo.png')} alt="code42-incydr-icon" width="90" />

The Code42 Incydr is an Insider risk management solution that allows you to detect and respond to data exposure and exfiltration from corporate computer, cloud, and email systems. It provides the visibility, context, and controls needed to protect data without overwhelming security teams or inhibiting employee productivity.

Code42 Incydr source is used to analyze and fetch file events, alerts and audit logs from the Code42 Incydr API and send it to Sumo Logic.

## Data Source

The integration fetches Alerts, File Events, and Audit Logs (Audit Events) using the [Incydr API](https://developer.code42.com/api).

## Set up and Configuration

The Code42 Incydr source requires you to provide the **Base URL**, **Client ID**, and **Secret Key** to access the source data.

- The **Base URL** is used to retrieve the source data from the Incydr API. The domain used for making API requests can be determined using the domain you use to sign in to the Code42 console.
    - api.us.code42.com
    - api.us2.code42.com
    - api.ie.code42.com
    - api.gov.code42.com
    :::info
    Make sure that all API requests are made using HTTPs.
    :::
- To generate the **Client ID** and **Secret Key**, follow the instructions mentioned in the [Incydr API documentation](https://support.code42.com/hc/en-us/sections/14804104624663-Code42-console-reference).

## States

Code42 Incydr source is a security platform that provides cloud-based security for data loss protection, backup, and recovery solutions.
When you create an Code42 Incydr Source, it goes through the following stages:
1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Code42 Incydr.
1. **Collecting**. The Source is actively collecting data from Code42 Incydr.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.
On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

## Create Code42 Incydr Source

When you create an Code42 Incydr source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Code42 Incydr Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Code42 Incydr**.<br/> <img src={useBaseUrl('img/send-data/code42-incydr-icon.png')} style={{border: '1px solid black'}} alt="code42-incydr-icon" width="120" />
1. Enter a **Name** for the source. The description is optional. <br/><img src={useBaseUrl('img/send-data/code42-incydr-config.png')} alt="code42-incydr-config.png" style={{border: '1px solid black'}} width="400" />
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. In **Base URL**, select the domain from which you want to retrieve the source data from the Incydr API.
1. In **Client ID**, enter the Client ID you generated from the Code42 Incydr platform.
1. In **Secret Key**, enter the Secret Key you generated from the Code42 Incydr platform.
1. In **Data Collection**, select the type of source from which you want to collect the data from. This allows you to limit the response to just the data you want.

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
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Code42Incydr"}` for Code42 Incydr Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Code42 Incydr. | not modifiable |

### Config parameters

| Parameter | Type | Required | Description | Access |
|:---|:---|:---|:---|:---|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `baseURL` | String | Yes | API Key to used for Authorization.  | modifiable |
| `clientID` | Boolean | No | Client ID generated from the Code42 Incydr platform. | modifiable |
| `secretKey` | String | No | Secret Key generated secured from the Code42 Incydr platform. | modifiable |
| `dataCollection` | String | No | Type of source from which you want to collect the data from. | modifiable |

### JSON Example

```json
{
    "api.version": "v1",
    "source": {
        "config": {
  "name": "Code42",
  "description": "Code42",
  "category": "code42",
  "baseURL": "https://api.us.code42.com",
  "clientID": "key-xxxx0316-xxxx-492d-xxxx-308184abxxx3",
  "secretKey": "XXXXV%DsznXXX!hxr479cXsxxnbkX@vxxrxkbfxc",
  "dataCollection": [
    "auditLogs",
    "alerts",
    "fileEvents"
  ]
},
        "schemaRef": {
            "type": "Code42Incydr"
        },
        "sourceType": "Universal"
    }
}
```
## Troubleshooting

After configuring your source, you should check the status of the source in the **Collectors** page > **Status** column. If the source is not functioning as expected, you may see an error next to the Source Category column as shown below: 

**Error Code**: `401` <br />
**Error Details**:
```
{
    "error": "invalid_client"
}
```

To resolve these errors:
- Make sure the **Base URL** matches your domain.
- Make sure correct **Client ID or Secret Key** is used to configure the source.

