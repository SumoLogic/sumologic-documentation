---
id: citrix-cloud-source
title: Citrix Cloud Source
sidebar_label: Citrix Cloud
description: Learn how to collect System Log from the Citrix Cloud and send it to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/citrix-cloud-icon.png')} alt="citrix-cloud-icon" width="80"/>

The Citrix Cloud source collects the system, operation, and session logs using the Citrix Cloud API and Citrix DaaS REST API to Sumo Logic. Citrix Cloud is a workspace management platform for IT administrators to design, deliver, and manage virtual desktops and applications, and other services, such as file sharing, on any device.

## Prerequisites

- The System logs are obtained using the [Citrix Cloud API](https://developer.cloud.com/citrix-cloud/citrix-cloud-api-overview/docs/get-started-with-citrix-cloud-apis). 
   - To collect System logs from the Citrix Cloud platform, you must have an authorized Citrix Cloud account. 
   - Citrix Cloud APIs use an OAuth 2.0 authorization token to make authorized API calls. 

- The Operation and Session logs are obtained using the [Citrix DaaS REST API](https://developer.cloud.com/citrixworkspace/citrix-daas/citrix-daas-rest-apis/docs/overview). 
   - To collect these logs, one needs to have a Citrix Cloud account with the DaaS Service enabled. Make sure this by signing in to the Citrix Cloud platform and checking the home page. Look for the presence of the DaaS service in the **My Services** section. If it is not listed, then you need to purchase this service to collect the Operation and Session Logs. <br/> <img src={useBaseUrl('img/send-data/daas-service-enabled.png')} alt="daas-service-enabled" width="800" />

## Data sources

- **[System Log API](https://developer.cloud.com/citrix-cloud/citrix-cloud---systemlog/apis/Records/GetRecords)**. This API provides logs related to the administrator and secures client operations. It allows you to monitor activities in the Citrix Cloud, providing insights into what changes are made and who initiated those changes.
- **Operation Log API**. This API provides logs related to configuration changes within a customer site. Two types of logs are available:
   - **[Config Operation Log API](https://developer.cloud.com/citrixworkspace/citrix-daas/citrix-daas-rest-apis/apis/ConfigLog-APIs/ConfigLog_GetOperations)**. This API provides logs that give a high-level summary of configuration operations within a customer site.
   - **[Low-Level Operation Log API](https://developer.cloud.com/citrixworkspace/citrix-daas/citrix-daas-rest-apis/apis/ConfigLog-APIs/ConfigLog_GetLowLevelOperations)**. This API provides detailed logs about specific configuration operations and offers in-depth insights into the low-level details of a particular operation.
- **[Session Log API](https://developer.cloud.com/citrixworkspace/citrix-daas/accessing-monitor-service-data-in-citrix-cloud/docs/overview)**. TThis API provides details about all the sessions in the Citrix Cloud, captured through the Citrix Monitor Service.

## Metadata Field

Metadata field will be set, if the integration is configured with the SIEM forward option. See **Metadata Field** table below:

| Field Name | Value |
| :--- | :--- |
| _siemparser | /Parsers/System/Citrix/Citrix Cloud C2C |

## Configuration

In this configuration, you will set up the Citrix Cloud source account and configure it to be authorized and authenticated to use system logs and alerts from Citrix Cloud API.
To obtain the Citrix Cloud auth token, you will need the following parameters:

### Base URL

The **Base URL** is the URL where your **Citrix Cloud** account is located. To get the base URL, follow the steps below:
1. Log in to the **Citrix Cloud** application.
2. At the top of the browser, you will see the **Base URL** inside the address bar. <br/> <img src={useBaseUrl('img/send-data/citrix-cloud-base-url.png')} alt="<citrix-cloud-base-url.png>" width="600" />
3. Choose the Base URL from the table below. The following table contains the base URLs based on the location of your **Citrix Cloud** account:

  | Server location | Server located at  | Base URLs |
  | :---|:---|:---|
  | US  Server | United States | `https://api-us.cloud.com` |
  | APAC Server |Asia Pacific South|  `https://api-ap-s.cloud.com` |
  | EU Server | European Union | `https://api-eu.cloud.com` |
  | JP Server |  Japan | `https://api.citrixcloud.jp` |

### API client

The **API security token** is used to authenticate with Citrix Cloud API. After successfully creating the API client, you will get the **Client Id**, **Client Secret**, and **Customer Id**.
To get the **Citrix Cloud API token**, follow the steps below:
1. From the Citrix Cloud Console, navigate to the <img src={useBaseUrl('img/send-data/navigation-button.png')} alt="<navigation-button.png>" width="30" /> menu icon.
1. Select the **Identity and Access Management** option from the menu.<br/><img src={useBaseUrl('img/send-data/access-management.png')} alt="<access-management.png>" width="650" />

  :::note
  If this option does not appear, you may not have adequate permissions to create an API client. Contact your administrator to get the required permissions.
  :::

1. Select the **API Access** tab.<br/><img src={useBaseUrl('img/send-data/api-access.png')} alt="<api-access.png>" width="650" />
1. Give a name to your Secure Client, and click **Create Client**.<br/><img src={useBaseUrl('img/send-data/create-client.png')} alt="<create-client.png>" width="650" />
1. A dialogue box will appear notifying you that your **Client ID** and **Secret key** have been successfully created. You can download or copy and paste the Client Id and Secret key to a folder location because you will need them when creating the [Citrix Cloud-to-Cloud Source](#set-up-citrix-cloud-source). <br/><img src={useBaseUrl('img/send-data/successful-credentials.png')} alt="<successful-credentials.png>" width="450" />
1. After closing the previous dialogue box, copy and paste the **Customer Id**, which is written straight above the **Create Client** button, into a folder. Look at the red highlighted box.<br/><img src={useBaseUrl('img/send-data/customer-id.png')} alt="<customer-id.png>" width="650" />

## States

A Citrix Cloud Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A Citrix Cloud Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Citrix Cloud.
1. **Collecting**. The Source is actively collecting data from Citrix Cloud.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events.md) to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

## Set up Citrix Cloud Source

When you create a Citrix Cloud Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure the Citrix Cloud API:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Citrix Cloud** icon.  <br/>  <img src={useBaseUrl('img/send-data/citrix-cloud-icon.png')} alt="citrix-cloud-icon.svg" width="120" />
1. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional. <br/>   <img src={useBaseUrl('img/send-data/citrix-cloud-config-main.png')} alt="citrix-cloud-config-main.png" width="400" />
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Base URL**. Choose the URL where your Citrix Cloud account is located. See [Base URL](#base-url) section to know your base URL.
1. **Customer ID**. Enter the Customer ID you generated and secured from the [API Client](#api-client) section in step 6.
1. **Client ID**. Enter the Client ID you generated and secured from the [API Client](#api-client) section in step 5.
1. **Client Secret**. Authenticate your account by entering your Secret API key. Enter the **Secret** key you have generated and secured from [API Client](#api-client) section in step 5.
1. (Optional) **Supported APIs to Collect**. Select any or all of the data sources such as System Logs, Operation Logs, Monitor Data Session Logs.
1. When you are finished configuring the Source, click **Save**.

### Error types

When Sumo Logic detects an issue, it is tracked by Health Events. The following table shows three possible error types. It tells the reason for the error, if the source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable                                                    | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs.                                     | Yes                                                   | The Source will retry indefinitely.                               | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs.                                     | Yes                                                   | The Source will retry indefinitely.                   | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. | na |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Citrix Cloud"}` for Citrix Cloud Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Citrix Cloud Source. | not modifiable |

### Config Parameters

| Parameter | Type | Required | Description | Access |
|:---|:---|:---|:---|:---|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `baseURL` | String | Yes | Region URL of the Citrix Cloud application. | modifiable |
| `customerID` | String | Yes | Customer ID of the environment. | modifiable |
| `clientID` | String | Yes | Client ID for the API client. | modifiable |
| `clientSecret` | String | Yes | Client Secret for the API client. | modifiable |
| `supportedAPI` | Array | Yes | Select any of the given data sources or all the data sources, such as System Logs, Operation Logs, Monitor Data Session Logs. | modifiable |

### JSON example

```json
{
   "api.version":"v1",
   "source":{
      "config":{
         "name":"Citrix Cloud Source",
         "description":"Description",
         "category":"Source Category",
         "baseUrl":"https://api-us.cloud.com",
         "customerId":"customer_id",
         "clientId":"client_id",
         "clientSecret":"client_secret",
         "supportedAPIs": [
    	"systemLogs",
    	"operationLogs",
    	"sessionLogs",
    	"all"
          ],
                "fields":{
            "_siemForward":false
         }
      },
      "schemaRef":{
         "type":"Citrix Cloud"
      },
      "sourceType":"Universal"
   }
}
```

## Troubleshooting

This section provides information on how to troubleshoot failures while configuring our Citrix Cloud Source.

### Authentication API error

#### Error message

```
{
   "error": "invalid_client",
   "error_description": "Invalid client id or client secret."
}
```

#### Solution

Make sure that you have used the correct `baseURL`, `clientId`, and `clientSecret` while configure the source.

### System Logs API errors

#### Error message

```
{
   "statusCode": 500,
   "message": "Internal server error",
   "activityId": "XXXXXX"
}
```

#### Solution

Make sure that you have used the correct `baseURL` is used to configure the source.

#### Error message

```
{
   "type": "https://errors-api.cloud.com/common/authentication",
   "detail":"Missing or invalid authentication details",
   "parameters": [
      {
         "name":"reason","value": "invalid"
      }
   ]
}
```

#### Solution

Make sure that you have used the correct `customerId` is used to configure the source.

### SiteID, Operation Logs, and Low-Level Operation Logs API error

#### Error message

```
{
   "statusCode": 500,
   "message": "Internal server error",
   "activityId": "XXXXXX"
}
```

#### Solution

- Make sure that you have used the correct `customerId` and `baseURL` are used to configure the source.
- Make sure that the provided `customerId` has the DaaS Service enabled. Refer [Prerequisites](#prerequisites) section.

### Session Logs API error

#### Error message

`Access denied to query Monitor objects : Invalid Customer.`

#### Solution

- Make sure that the correct `customerId` and `baseURL` are used to configure the source.
- Make sure that the provided customerId has the DaaS Service enabled. Refer [Prerequisites](#prerequisites) section.