---
id: knowbe4-api-source
title: KnowBe4 API Source
sidebar_label: KnowBe4 API
description: Learn how to configure the KnowBe4 Cloud-to-Cloud source setup using the Sumo logic environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/knowbe4.png')} alt="icon" width="100"/>

The KnowBe4 API integration collects user events data into Sumo Logic for storage, analysis, and alerting. It ingests events data from the [Events API](https://developer.knowbe4.com/rest/userEvents#tag/Events/operation/listEvents), phishing security tests from the [Phishing Security Tests API](https://developer.knowbe4.com/rest/reporting#tag/Phishing/paths/~1v1~1phishing~1security_tests/get), and recipient results from the [Recipient Results API](https://developer.knowbe4.com/rest/reporting#tag/Phishing/paths/~1v1~1phishing~1security_tests~1%7Bpst_id%7D~1recipients/get).

## Prerequisites

Before you begin setting up your **KnowBe4** Source, which is required to connect to the KnowBe4 API, you'll need to configure your integration with the **Region** and **KnowBe4 API Token**.

:::important
KnowBe4 APIs are only limited to Platinum and Diamond customers.
:::

### Region

The **Region** is the region where your **KnowBe4** account is located. To know your region, follow the steps below:
1. Sign in to the **KnowBe4** application.
2. At the top of the browser, you will see the **Region** inside the address bar.
3. Choose the **Region** from the dropdown based on the location of your **KnowBe4** account. The following are the supported regions:
   * US
   * EU
   * CA
   * UK
   * DE

### API Token

The **API security token** is used to authenticate with KnowBe4 API. To get the **KnowBe4 API token**, follow the steps below:
1. Sign in to the **KnowBe4** application as an Admin user.
1. Navigate to the **Account Settings**.
1. Click **Account Integrations** from the left menu, and then click **API** option.
1. Under the API section, checkmark the **Enable Reporting API Access**. The **KnowBe4** Secure API token is displayed.
1. Save this API key to use while configuring the Source.
1. Click **Save Changes**.

## Metadata Field

If the Source is configured with the **SIEM forward** option, the metadata field `_siemparser` will be set to */Parsers/System/KnowBe4/KnowBe4 KMSAT*.

:::important
The `_siemparser` is currently available only for the External Events source.
:::

## Data Sources

The KnowBe4 integration fetches two types of data sources for the KnowBe4 account.
- **Phishing Tests**.  Our integration fetches a list of all recipients for each phishing security test on the KnowBe4 account.
:::note
C2C will skip the record if `started_at` data is not in the format of `yyyy-MM-ddTHH:mm:ss.SSSZ`.
:::
- **External Events**. Our integration retrieves all user events for the KnowBe4 account. This data type is disabled by default. KnowBe4’s Event API allows you to pull your external data from the KnowBe4 console. Please refer to [KnowBe4 documentation](https://developer.knowbe4.com/rest/userEvents#tag/Introduction) for more details.

## States

A KnowBe4 API integration Source is an integrated Security Awareness Training and Simulated Phishing platform that helps to train users to understand the dangers of spam, phishing, spear phishing, malware, ransomware, and social engineering through simulated phishing and security awareness training.

When a KnowBe4 API Source is created, it goes through the following states:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is completed in Sumo Logic.
1. **Authenticated**. The Source is successfully authenticated with KnowBe4.
1. **Collecting**. The Source is actively collecting data from KnowBe4.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the [Health](/docs/manage/health-events#collection-page) and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events) to investigate issues with collection.

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings.<br/> ![hover c2c error.png](/img/send-data/hover-c2c-error.png)

## Set up KnowBe4 Source

When you create a KnowBe4 API Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure the KnowBe4 API Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
2. On the Collectors page, click **Add Source** next to a Hosted Collector.
3. Select **KnowBe4** icon.  <br/>  <img src={useBaseUrl('img/send-data/knowbe4-icon.png')} alt="knowbe4-icon.png" width="120" />
4. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional. <br/>   <img src={useBaseUrl('img/send-data/knowbe4-config-main.png')} alt="knowbe4-config-main.png" width="480" />
5. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
6. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
7. In **Region**, choose the region where your KnowBe4 account is located. See [Region](#region) section to know your Region.
1. In **API Key**, authenticate your account by entering your secret API key. You can access your API key or generate a new one from **User Event API Management Console**. See [API Token](#api-token) section.
1. In **Data Types**, you can select the **Phishing Tests** data type to fetch a list of all recipients for each phishing security test on your KnowBe4 account.
1. In **Phishing Poll Interval**, enter the phishing poll interval frequency, which must be between 1 hour and 24 hours.
1. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue, it is tracked by Health Events. The following table shows three possible error types. It tells the reason for the error, if the source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable                                                    | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs.                                     | Yes                                                   | The Source will retry indefinitely.                    | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs.                                     | Yes                                                   | The Source will retry indefinitely.                    | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. | na |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"KnowBe4 KMSAT"}` for KnowBe4 Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for KnowBe4 Source. | not modifiable |

### Config Parameters

| Parameter | Type | Required | Description | Access |
|:---|:---|:---|:---|:---|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `region` | String | Yes | Region of the KnowBe4 application. | modifiable |
| `apiKey` | String | Yes | Secret api key to authenticate your account. | modifiable |
| `dataTypes` | Array | Yes | Data sources to fetch from KnowBe4. | modifiable |
| `phishingPollInterval` | Integer | Yes | The Polling interval for phishing data requests. The minimum interval is 1 hour, and the maximum is 24 hours. | modifiable |

### JSON Example

```json
{
    "api.version": "v1",
    "source": {
        "config": {
  		"name": "KnowBe4",
 	 	"description": "Test Source",
  		"category": "source_category",
  		"region": "US",
  		"apiKey": "************",
		"dataTypes": [
    		         "phishingTests"
  		],
		"phishingPollInterval": 1
          },
        "schemaRef": {
            "type": "KnowBe4 KMSAT"
        },
        "sourceType": "Universal"
    }
}
```

## Limitations

There are two limitations to access KnowBe4 APIs:
* Access to the KnowBe4 Event APIs is limited to 10 requests per licensed user account per day, with a maximum of 4 requests per second.
* Access to the KnowBe4 Phishing APIs is limited to 1,000 requests per day plus the number of licensed users on the account. The API allows a maximum of 4 requests per second, and has a burst limit of 50 requests per minute which starts around 5 minutes and the daily limit starts around 24 hours from the first API request.
* Access to the **External Events Data type** is disabled by default, and can be enabled on requests. Contact Sumo Logic support to enable this data type.
