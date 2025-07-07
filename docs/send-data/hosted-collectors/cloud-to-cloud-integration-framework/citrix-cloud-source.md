---
id: citrix-cloud-source
title: Citrix Cloud Source
sidebar_label: Citrix Cloud
tags:
  - cloud-to-cloud
  - citrix-cloud
description: Learn how to collect System Log from the Citrix Cloud and send it to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/citrix-cloud-icon.png')} alt="citrix-cloud-icon" width="80"/>

The Citrix Cloud source collects the system, operation, and session logs using the Citrix Cloud API and Citrix DaaS REST API to Sumo Logic. Citrix Cloud is a workspace management platform for IT administrators to design, deliver, and manage virtual desktops and applications, and other services, such as file sharing, on any device.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [System Log](https://developer.cloud.com/citrix-cloud/citrix-cloud---systemlog/apis/Records/GetRecords) |
| 5 min |  [Item usage](https://developer.1password.com/docs/events-api/reference/#post-apiv1itemusages) |
| 5 min |  [Config Operation Log](https://developer.cloud.com/citrixworkspace/citrix-daas/citrix-daas-rest-apis/apis/ConfigLog-APIs/ConfigLog_GetOperations) |
| 5 min | [Low-Level Operation Log](https://developer.cloud.com/citrixworkspace/citrix-daas/citrix-daas-rest-apis/apis/ConfigLog-APIs/ConfigLog_GetLowLevelOperations) |
| 5 min |  [Session Log](https://developer.cloud.com/citrixworkspace/citrix-daas/accessing-monitor-service-data-in-citrix-cloud/docs/overview) |

## Setup

### Vendor configuration

#### Prerequisites

- The System logs are obtained using the [Citrix Cloud API](https://developer.cloud.com/citrix-cloud/citrix-cloud-api-overview/docs/get-started-with-citrix-cloud-apis).
   - To collect System logs from the Citrix Cloud platform, you must have an authorized Citrix Cloud account.
   - Citrix Cloud APIs use an OAuth 2.0 authorization token to make authorized API calls.
- The Operation and Session logs are obtained using the [Citrix DaaS REST API](https://developer.cloud.com/citrixworkspace/citrix-daas/citrix-daas-rest-apis/docs/overview).
   - To collect these logs, one needs to have a Citrix Cloud account with the DaaS Service enabled. Make sure this by signing in to the Citrix Cloud platform and checking the home page. Look for the presence of the DaaS service in the **My Services** section. If it is not listed, then you need to purchase this service to collect the Operation and Session Logs. <br/> <img src={useBaseUrl('img/send-data/daas-service-enabled.png')} alt="daas-service-enabled" width="800" style={{border: '1px solid gray'}} />

In this configuration, you will set up the Citrix Cloud source account and configure it to be authorized and authenticated to use system logs and alerts from Citrix Cloud API.
To obtain the Citrix Cloud auth token, you will need the following parameters:

#### Base URL

The **Base URL** is the URL where your **Citrix Cloud** account is located. To get the base URL, follow the steps below:
1. Log in to the **Citrix Cloud** application.
2. At the top of the browser, you will see the **Base URL** inside the address bar. <br/> <img src={useBaseUrl('img/send-data/citrix-cloud-base-url.png')} alt="<citrix-cloud-base-url.png>" width="600" />
3. Choose the Base URL from the table below. The following table contains the base URLs based on the location of your **Citrix Cloud** account:<br/>

  | Server location | Server located at  | Base URLs |
  | :---|:---|:---|
  | US  Server | United States | `https://api-us.cloud.com` |
  | APAC Server |Asia Pacific South|  `https://api-ap-s.cloud.com` |
  | EU Server | European Union | `https://api-eu.cloud.com` |
  | JP Server |  Japan | `https://api.citrixcloud.jp` |

#### API client

The **API security token** is used to authenticate with Citrix Cloud API. After successfully creating the API client, you will get the **Client Id**, **Client Secret**, and **Customer Id**.
To get the **Citrix Cloud API token**, follow the steps below:
1. From the Citrix Cloud Console, navigate to the <img src={useBaseUrl('img/send-data/navigation-button.png')} alt="<navigation-button.png>" width="30" /> menu icon.
1. Select the **Identity and Access Management** option from the menu.<br/><img src={useBaseUrl('img/send-data/access-management.png')} alt="<access-management.png>" width="650" />
    :::note
    If this option does not appear, you may not have adequate permissions to create an API client. Contact your administrator to get the required permissions.
    :::
1. Select the **API Access** tab.<br/><img src={useBaseUrl('img/send-data/api-access.png')} alt="<api-access.png>" width="650" />
1. Give a name to your Secure Client, and click **Create Client**.<br/><img src={useBaseUrl('img/send-data/create-client.png')} alt="<create-client.png>" width="650" />
1. A dialogue box will appear notifying you that your **Client ID** and **Secret key** have been successfully created. You can download or copy and paste the Client Id and Secret key to a folder location because you will need them when creating the [Citrix Cloud-to-Cloud Source](#source-configuration). <br/><img src={useBaseUrl('img/send-data/successful-credentials.png')} alt="<successful-credentials.png>" width="450" />
1. After closing the previous dialogue box, copy and paste the **Customer Id**, which is written straight above the **Create Client** button, into a folder. Look at the red highlighted box.<br/><img src={useBaseUrl('img/send-data/customer-id.png')} alt="<customer-id.png>" width="650" />

### Source configuration

When you create a Citrix Cloud Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure the Citrix Cloud API:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Citrix Cloud**.
1. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Base URL**. Choose the URL where your Citrix Cloud account is located. See [Base URL](#base-url) section to know your base URL.
1. **Customer ID**. Enter the Customer ID you generated and secured from the [API Client](#api-client) section in step 6.
1. **Client ID**. Enter the Client ID you generated and secured from the [API Client](#api-client) section in step 5.
1. **Client Secret**. Authenticate your account by entering your Secret API key. Enter the **Secret** key you have generated and secured from [API Client](#api-client) section in step 5.
1. **Supported APIs to Collect**. Select any or all of the data sources such as System Logs, Operation Logs, Monitor Data Session Logs. By default, the **System Logs** data source will be selected.
1. When you are finished configuring the Source, click **Save**.

## Metadata fields

If the integration is configured with the SIEM forward option, set the Metadata field `_siemparser` to `/Parsers/System/Citrix/Citrix Cloud C2C`.

:::note
Session logs are not supported with the SIEM forward option.
:::

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Citrix Cloud"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| baseURL | String | Yes | `null`| Region URL of the Citrix Cloud application. |  |
| customerID | String | Yes | `null`| Customer ID of the environment. |  |
| clientID | String | Yes | `null`| Client ID for the API client. |  |
| clientSecret | String | Yes | `null`| Client Secret for the API client. |  |
| supportedAPI | Array | Yes | | Select any of the given data sources or all the data sources, such as System Logs, Operation Logs, Monitor Data Session Logs. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/citrix-cloud/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/citrix-cloud/example.tf
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
- Make sure that the provided `customerId` has the DaaS Service enabled. Refer to the [Prerequisites](#prerequisites) section.

### Session Logs API error

#### Error message

`Access denied to query Monitor objects : Invalid Customer.`

#### Solution

- Make sure that the correct `customerId` and `baseURL` are used to configure the source.
- Make sure that the provided customerId has the DaaS Service enabled. Refer to the [Prerequisites](#prerequisites) section.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
