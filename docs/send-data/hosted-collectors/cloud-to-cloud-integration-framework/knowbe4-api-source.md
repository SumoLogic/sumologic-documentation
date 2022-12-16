---
id: knowbe4-api-source
title: Knowbe4 API Source (Beta)
description: This document explains how to configure the KnowBe4 Cloud-to-Cloud source setup using the Sumo logic environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

The KnowBe4 API integration collects user data into Sumo Logic to store, analyze and alert. It ingests events data from the [Events API](https://developer.knowbe4.com/rest/userEvents#tag/Events/operation/listEvents).

## Data Sources

The KnowBe4 integration fetches all types of user events for the KnowBe4 account.


## States

A KnowBe4 API integration Source is an integrated Security Awareness Training and Simulated Phishing platform that helps to train users to understand the dangers of spam, phishing, spear phishing, malware, ransomware, and social engineering through simulated phishing and security awareness training.

When a KnowBe4 API Source is created, it goes through the following states:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with KnowBe4.
1. **Collecting**. The Source is actively collecting data from KnowBe4.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection.

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings.

You can click on the status icon to open a Health Events panel with details on each detected issue.

## Set up and Configuration

When you create a KnowBe4 API Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a KnowBe4 API Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
2. On the Collectors page, click **Add Source** next to a Hosted Collector.
3. Select **KnowBe4.**. <br/>  <img src={useBaseUrl('img/send-data/knowbe4-icon.png')} alt="knowbe4-icon.png" width="150" />
4. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional.<br/> <img src={useBaseUrl('img/send-data/knowbe4-config-main.png')} alt="knowbe4-config-main.png" width="450" />
5. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
6. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
7. In **Base URL**, choose the URL where your Knowbe4 account is located from the drop-down list. The following table contains the base URLs based on the location of the your Knowbe4 account:

| Server Location | Server Located at | Base URLs |
|:--|:--|:--|
| US Server |	training.knowbe4.com |	https://api.events.knowbe4.com |
| EU Server | eu.knowbe4.com |	https://api-eu.events.knowbe4.com |
| CA Server	ca.knowbe4.com |	https://api-ca.events.knowbe4.com |

8. In **API Key**, authenticate your account by entering your secret API key. You can access your API key or generate a new one from **User Event API Management Console**.
9. When you are finished configuring the Source, click **Save**.

### Error types

When Sumo Logic detects an issue, it is tracked by Health Events. The following table shows three possible error types. It tells the reason for the error, if the source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable                                                    | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs.                                     | Yes                                                   | The Source will retry indefinitely.                               | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs.                                     | Yes                                                   | The Source will retry indefinitely.                               | FirstPartyGenericError |

## API Limitations

The number of licenced users on your account can make a maximum of ten requests per day using the KnowBe4 API. You may access the APIs only four times per second.

:::note
Due to the limitations of the `timestamp` filter in the KnowBe4 Event API query, the KnowBe4 API integration can only collect data up to the previous day.
:::
