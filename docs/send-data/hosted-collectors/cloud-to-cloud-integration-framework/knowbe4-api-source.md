---
id: knowbe4-api-source
title: KnowBe4 API Source
sidebar_label: KnowBe4 API
tags:
  - cloud-to-cloud
  - knowbe4-api
description: Learn how to configure the KnowBe4 Cloud-to-Cloud source setup using the Sumo logic environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/knowbe4.png')} alt="icon" width="100"/>

The KnowBe4 API integration collects user events data into Sumo Logic for storage, analysis, and alerting. It ingests events data from the [Events API](https://developer.knowbe4.com/rest/userEvents#tag/Events/operation/listEvents), phishing security tests from the [Phishing Security Tests API](https://developer.knowbe4.com/rest/reporting#tag/Phishing/paths/~1v1~1phishing~1security_tests/get), and recipient results from the [Recipient Results API](https://developer.knowbe4.com/rest/reporting#tag/Phishing/paths/~1v1~1phishing~1security_tests~1%7Bpst_id%7D~1recipients/get).

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [User Event](https://developer.knowbe4.com/rest/userEvents#tag/Introduction) |
| 24 hours |  [Phishing Security Tests](https://developer.knowbe4.com/rest/reporting#tag/Phishing/paths/~1v1~1phishing~1security_tests/get) |

:::note
C2C will skip the record if `started_at` data is not in the format of `yyyy-MM-ddTHH:mm:ss.SSSZ`.
:::

## Setup

### Vendor configuration

:::note
KnowBe4 APIs are only limited to Platinum and Diamond customers.
:::

Before you begin setting up your **KnowBe4** Source, which is required to connect to the KnowBe4 API, you'll need to configure your integration with the **Region** and **KnowBe4 API Token**.

#### Region

The **Region** is the region where your **KnowBe4** account is located. To know your region, follow the steps below:
1. Sign in to the **KnowBe4** application.
1. At the top of the browser, you will see the **Region** inside the address bar.
1. Choose the **Region** from the dropdown based on the location of your **KnowBe4** account. The following are the supported regions:
   * US
   * EU
   * CA
   * UK
   * DE

#### API Token

The **API security token** is required to authenticate the KnowBe4 APIs. To get the **API token**, follow the steps mentioned in the [KnowBe4 Documentation](https://support.knowbe4.com/hc/en-us/articles/115016090908-Reporting-API-Overview#h_01HBDW9MRQ3XEWZCYK0S0T6MDC).

### Source configuration

When you create a KnowBe4 API Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure the KnowBe4 API Source:
1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
2. On the Collectors page, click **Add Source** next to a Hosted Collector.
3. Select **KnowBe4** icon.  
4. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional.
5. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
6. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="green check circle.png" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="orange exclamation point.png" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
7. In **Region**, choose the region where your KnowBe4 account is located. See [Region](#region) section to know your Region.
8. Select the **Collect Phishing Tests** checkbox to fetch a list of all recipients for each phishing security test on your KnowBe4 account. By default, **Collect Phishing Tests** checkbox will be selected.
9. In **API Key (Phishing Tests)**, authenticate your account by entering your API key. You can access your API key or generate a new one from **Reporting API Management Console**. See [API Token](#api-token) section.
10. The **Phishing Poll Interval** is set for 1 hour by default. You can adjust it based on your needs.
11. Select the **Collect External Events** checkbox to fetch a list of all external events. By default, **Collect External Events** checkbox will not be selected.
12. In **API Key (External Events)**, authenticate your account by entering your API key. You can access your API key or generate a new one from **User Event API Management Console**. See [API Token](#api-token) section.
13. When you are finished configuring the Source, click **Submit**.

## Metadata Field

If the Source is configured with the **SIEM forward** option, the metadata field `_siemparser` will be set to */Parsers/System/KnowBe4/KnowBe4 KMSAT*.

:::important
The `_siemparser` is currently available only for the External Events source.
:::

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"KnowBe4 KMSAT"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| region | String | Yes | `null` | Region of the KnowBe4 application. |  |
| collectPhishingTests | Boolean | No | `True` | Specify if we need to collect the phishing tests. |  |
| apiKeyPhishing | String | Yes | `null` | Secret api key to authenticate phishing tests endpoint. |  |
| phishingPollInterval | Integer | Yes | 1 hour| The Polling interval for phishing data requests. The minimum interval is 1 hour, and the maximum is 24 hours. |  |
| collectExternalEvents | Boolean | No | `False` | Specify if we need to collect the external events. |  |
| apiKeyEvent | String | Yes | `null` | Secret api key to authenticate events endpoint. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/knowbe4-api/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/knowbe4-api/example.tf
```

## Limitations

There are two limitations to access KnowBe4 APIs:
* Access to the KnowBe4 Event APIs is limited to 10 requests per licensed user account per day, with a maximum of 4 requests per second.
* Access to the KnowBe4 Phishing APIs is limited to 1,000 requests per day plus the number of licensed users on the account. The API allows a maximum of 4 requests per second, and has a burst limit of 50 requests per minute which starts around 5 minutes and the daily limit starts around 24 hours from the first API request.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
