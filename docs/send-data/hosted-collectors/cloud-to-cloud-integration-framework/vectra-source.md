---
id: vectra-source
title: Vectra Source
sidebar_label: Vectra
tags:
  - cloud-to-cloud
  - vectra
description: Learn how to collect the list of threats detected in the Vectra platform.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/platform-services/automation-service/app-central/logos/vectra.png')} alt="Vectra-icon" width="70" />

Vectra is a leading cybersecurity company specialising in AI-driven threat detection and response solutions. Vectra is committed to helping organisations protect their digital assets from evolving cyber threats. It provides comprehensive visibility across the entire network, enabling organisations to identify malicious activities, including insider threats and advanced persistent threats (APTs).

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Threat Detections](https://vectranetworks.my.salesforce.com/sfc/p/#i0000000HOyr/a/Rg00000528gW/UZpXGNk2iGlooWdyT5HpB3eOX39csgrXRdjzKaKpJVY) |

## Setup

### Vendor configuration

The Vectra source requires you to provide the Client ID and Client Secret. Refer to the [API Clients section in the Vectra Documentation](https://vectranetworks.my.salesforce.com/sfc/p/#i0000000HOyr/a/Rg00000528gW/UZpXGNk2iGlooWdyT5HpB3eOX39csgrXRdjzKaKpJVY).

### Source configuration

When you create a Vectra Source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Vectra Source, follow the steps below:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Vectra**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Account URL**. Enter the account URL value `https://{vectra_portal_url}/api/v3.3/detections`. Replace `vectra_portal_url` with your subdomain value. For example, `https://308714519558.cc1.portal.vectra.ai`.
1. **Client ID**. Enter the client ID value collected from the [Vectra platform](#vendor-configuration).
1. **Client Secret**. Enter the client secret value collected from the [Vectra platform](#vendor-configuration).
1. The **Polling Interval** is set for 5 minutes by default. You can adjust it based on your needs. This sets how often the Source checks for new data.
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for more details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Vectra"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| accountURL | String | Yes | `null` | Vectra account URL of your portal. For example,`https://308714519558.cc1.portal.vectra.ai`.  |  |
| clientId | String | Yes | `null` | Client ID of the account. |  |
| clientSecret | String | Yes | `null` | Client Secret of the account. |  |
| pollingInterval | Integer | No | `5 minutes` | Choose how often the Source checks for new data (In minutes).<br/>Default: 5 minutes <br/>Minimum: 5 minutes <br/>Maximum: 60 minutes |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/vectra/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/vectra/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
