---
id: digital-guardian-source
title: Digital Guardian Source
sidebar_label: Digital Guardian
tags:
  - cloud-to-cloud
  - digital-guardian
description: Learn how to collect export data from the Digital Guardian and send it to Sumo Logic.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/digital-guardian-logo.svg')} alt="icon" width="50"/>

Digital Guardian is a data protection platform that discovers, classifies, and controls data movement across endpoints, networks, and the cloud. Digital Guardian Analytics and Reporting Cloud (DG ARC) is an advanced analytics, workflow, and reporting cloud service that delivers no-compromise data protection.

The Digital Guardian integration ingests the export data using the Export API and uses Acknowledge API to advance the bookmark value to obtain the next chunk of data from export endpoint.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  Export data |

## Setup

### Vendor configuration

The Digital Guardian source requires you to provide the Digital Guardian Base URL (API Gateway URL), Authentication Server URL, Client ID, Client Secret, and Profile to export to configure the source. Follow the below steps to generate the required values:

1. From the ARC Tenant Settings, copy and save the **Tenant ID (API Client ID)** and **Authentication Token (API Secret)**.
1. From the Digital Guardian Management Console (DGMC), copy the **Access Gateway Base URL (API Gateway URL)** and **Authorization server URL**.
1. To copy ARC **Export Profile ID**:
    1. Navigate to **Admin** > **reports** > **export profiles**.
    1. Copy only the GUID part from the export profile.

### Source configuration

When you create a Digital Guardian Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure Digital Guardian Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select the **Digital Guardian** icon.
1. Enter a **Name** to display for the Source in Sumo Logic. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. In **API Gateway URL**, enter the API Gateway URL of your account.
1. In **Authorization Server URL**, enter the Authorization Server URL of your account.
1. In **API Client ID**, enter the API Client ID you generated from the Digital Guardian platform.
1. In **API Secret**, enter the API Secret you generated from the Digital Guardian platform.
1. In **Export Profile**, enter the name of the profile that needs to be exported.
1. The **Polling Interval** is set for 5 minutes hours by default. You can adjust it based on your needs.
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Digital Guardian"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| APIGatewayURL | String | Yes | `null` | API Gateway URL of your account. |  |
| authServerURL | String | Yes | `null` | Authorization Server URL of your account. |  |
| clientID | String | Yes | `null` | API Access ID of your account. |  |
| clientSecret | String | Yes | `null` | API Secret of your account. |  |
| exportProfile | String | Yes | `null` | Profile to be exported. |  |
| pollingIntervalMin | Integer | Yes | 5 mins | Set to true to duplicate logs for each element in the users array. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/digital-guardian/example.json
```

### Terraform example

```hcl reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/digital-guardian/example.tf
```


## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
