---
id: druva-cyber-resilience-source
title: Druva Cyber Resilience Source
sidebar_label: Druva Cyber Resilience
description: Learn how to configure the Druva Cyber Resilience Cloud-to-Cloud source setup in your Sumo Logic environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/druva-logo.svg')} alt="thumbnail icon" width="85"/>

The Druva Data Resiliency Cloud provides unified, easy-to-manage data protection for all workloads. Druva’s cyber resilience solutions keep backup data safe, help to prepare for cyber attacks, and automate the process of recovering data.

The Druva Cyber Resilience source provides the ability to fetch realize events generated within the Druva Realize product using the [Druva Realize Events API](https://developer.druva.com/reference/listeventsbytracker) and sends it to Sumo Logic. Realize events API helps you to collect unusual data activity events, access events, and login events generated in Druva Cyber Resilience product.

## Data Sources

The Druva Cyber Resilience Source consumes all the realize events using the [Druva Realize Events API](https://developer.druva.com/reference/listeventsbytracker) and sends it to Sumo Logic.

## Set up and Configuration

In this configuration, you will collect the Base URL from the Druva platform to authorize and authenticate the realize events using Druva Realize Events API. Follow the below steps to get the Base URL for user configuration.

1. Sign in to the [Druva console](https://login.druva.com/login).
1. Go to the **Administration** menu and click **Druva Cloud Settings** option.<br/> <img src={useBaseUrl('img/send-data/druva-console.png')} style={{border: '1px solid black'}} alt="druva-console" width="800" />
1. Select the **API Credentials** option.
1. In the API Credentials page, copy and save the **API Endpoint URL**.<br/> <img src={useBaseUrl('img/send-data/druva-cloud-settings.png')} style={{border: '1px solid black'}} alt="druva-cloud-settings" width="800" />

## States

A Druva Cyber Resilience Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A Druva Cyber Resilience Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source is successfully authenticated with Druva Cyber Resilience.
1. **Collecting**. The Source is actively collecting data from Druva Cyber Resilience.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events.md) to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

## Create Druva Cyber Resilience Source

When you create a Druva Cyber Resilience Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Druva Cyber Resilience Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Druva Cyber Resilience** icon. <br/><img src={useBaseUrl('img/send-data/druva-icon.png')} style={{border: '1px solid black'}} alt="druva-icon.png" width="120" />
1. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional. <br/><img src={useBaseUrl('img/send-data/druva-cyber-config.png')} alt="druva-cyber-config.png" style={{border: '1px solid black'}} width="400" />
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **API Endpoint URL**. Enter the API Endpoint URL collected from the [Druva Cyber Resilience platform](#set-up-and-configuration).
1. **Client ID**. Enter your Client ID. To get Client ID, follow the instructions from [Create and Manage Druva API Credentials](https://docs.druva.com/Druva_Cloud_Platform/Integration_with_Druva_APIs/Create_and_Manage_API_Credentials#createnewcreds).
1. **Secret Key**. Enter your Secret Key. To get Secret Key, follow the instructions from [Create and Manage Druva API Credentials](https://docs.druva.com/Druva_Cloud_Platform/Integration_with_Druva_APIs/Create_and_Manage_API_Credentials#createnewcreds).
1. When you are finished configuring the Source, click **Save**.

## Error types

When Sumo Logic detects an issue, it is tracked by Health Events. The following table shows three possible error types. It tells the reason for the error, if the source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable                                                    | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs.                                     | Yes                                                   | The Source will retry indefinitely.                               | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs.                                     | Yes                                                   | The Source will retry indefinitely.                   | FirstPartyGenericError |

## JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [How to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. | n/a |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Druva Cyber Resilience"}` for Druva Cyber Resilience Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Druva Cyber Resilience Source. | not modifiable |

### Config Parameters

| Parameter | Type | Required | Description | Access |
|:---|:---|:---|:---|:---|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `baseURL` | String | Yes | The base URL from which the customer wants to retrieve event data. | modifiable |
| `clientID` | String | Yes | Client ID an API client. | modifiable |
| `secretKey` | String | Yes | Secret key of an API client. | modifiable |

### JSON Example

```json
{
    "api.version": "v1",
    "source": {
        "config":{
            "name": "Druva Cyber Resilience",
            "description": "Collect Realize Events from Druva Cyber Resilience Product",
            "category": "druva-cyber-resilience",
            "baseURL": "https://apis.druva.com",
            "clientID": "testclientid",
            "secretKey": "*********"
        },
        "schemaRef": {
            "type": "Druva Cyber Resilience"
        },
        "sourceType": "Universal"
    }
}
```

## Troubleshooting

This section provides information on how to troubleshoot failures while configuring our Druva Cyber Resilience source.

### 400 error

#### Error Message

```
{
    "error": "invalid_grant. (#10010003b)"
}
```

#### Solution

If the source is configured with either an invalid **Base URL** or **Client ID**, the API will return a 400 error code. To rectify this error, validate and enter the correct **Base URL** and **Client ID**.

