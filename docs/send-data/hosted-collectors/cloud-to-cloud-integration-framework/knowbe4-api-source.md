---
id: knowbe4-api-source
title: KnowBe4 API Source
sidebar_label: KnowBe4 API
tags:
  - cloud-to-cloud
  - knowbe4-api
description: Learn how to configure the KnowBe4 Cloud-to-Cloud source setup using the Sumo logic environment.
---

import React, { useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/knowbe4-api/example.json';
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

The **API security token** is used to authenticate with KnowBe4 API. To get the **KnowBe4 API token**, follow the steps below:
1. Sign in to the **KnowBe4** application as an Admin user.
1. Navigate to the **Account Settings**.
1. Click **Account Integrations** from the left menu, and then click **API** option.
1. Under the API section, checkmark the **Enable Reporting API Access**. The **KnowBe4** Secure API token is displayed.
1. Save this API key to use while configuring the Source.
1. Click **Save Changes**.

### Source configuration

When you create a KnowBe4 API Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure the KnowBe4 API Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
2. On the Collectors page, click **Add Source** next to a Hosted Collector.
3. Select **KnowBe4** icon.  
4. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional.
5. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
6. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
7. In **Region**, choose the region where your KnowBe4 account is located. See [Region](#region) section to know your Region.
1. In **API Key**, authenticate your account by entering your secret API key. You can access your API key or generate a new one from **User Event API Management Console**. See [API Token](#api-token) section.
1. In **Data Types**, you can select the **Phishing Tests** data type to fetch a list of all recipients for each phishing security test on your KnowBe4 account.
1. In **Phishing Poll Interval**, enter the phishing poll interval frequency, which must be between 1 hour and 24 hours.
1. When you are finished configuring the Source, click **Submit**.

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
| apiKey | String | Yes | `null` | Secret api key to authenticate your account. |  |
| dataTypes | Array | Yes | `null` | Data sources to fetch from KnowBe4. |  |
| phishingPollInterval | Integer | Yes | 1 hour| The Polling interval for phishing data requests. The minimum interval is 1 hour, and the maximum is 24 hours. |  |

## Examples

<>
  {(() => {
    const [json, setJson] = React.useState('');
    const [tf, setTf] = React.useState('');

    React.useEffect(() => {
      fetch(useBaseUrl('/files/c2c/knowbe4-api/example.json'))
        .then(res => res.text())
        .then(setJson);
      fetch(useBaseUrl('/files/c2c/knowbe4-api/example.tf'))
        .then(res => res.text())
        .then(setTf);
    }, []);

    return (
      <>
        <h3>JSON example</h3>
        <CodeBlock language="json">{json}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/knowbe4-api/example.json')} target="_blank" rel="noopener noreferrer">Download example</a>

        <h3>Terraform example</h3>
        <CodeBlock language="hcl">{tf}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/knowbe4-api/example.tf')} target="_blank" rel="noopener noreferrer">Download example</a>
      </>
    );
  })()}
</>


## Limitations

There are two limitations to access KnowBe4 APIs:
* Access to the KnowBe4 Event APIs is limited to 10 requests per licensed user account per day, with a maximum of 4 requests per second.
* Access to the KnowBe4 Phishing APIs is limited to 1,000 requests per day plus the number of licensed users on the account. The API allows a maximum of 4 requests per second, and has a burst limit of 50 requests per minute which starts around 5 minutes and the daily limit starts around 24 hours from the first API request.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
