---
id: sophos-central-source
title: Sophos Central Source
sidebar_label: Sophos Central
tags:
  - cloud-to-cloud
  - sophos-central
description: The Sophos Central Source provides a secure endpoint to receive authentication logs from the Sophos Central APIs.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/sophos.jpeg')} alt="icon" width="60"/>

The Sophos Central Source provides a secure endpoint to receive authentication logs from the [Sophos Central APIs](https://developer.sophos.com/). It securely stores the required authentication, scheduling, and state tracking information.

:::note
To link the endpoint data to the alert, you can map the `alert.ManagedAgent.ID` field from the alert response with the `endpointID` field from the endpoint response.
:::

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Alerts](https://developer.sophos.com/docs/common-v1/1/routes/alerts/get), Endpoint data is consumed for alerts with a product value of type `endpoint` from the Sophos [Endpoint API](https://developer.sophos.com/docs/endpoint-v1/1/routes/endpoints/get).|
| 5 min |  [Events](https://developer.sophos.com/docs/siem-v1/1/routes/events/get) |

## Setup

### Vendor configuration

You need to have a Sophos account to generated Client ID and Client Secret. Follow the below steps:

1. From the [Sophos Homepage](https://www.sophos.com/en-us/solutions/oem-solutions.aspx) navigate to **My Account** and log in.
1. On the [Sophos Central Partner Dashboard](https://cloud.sophos.com/manage/partner/dashboard) (depending on your account you may instead have an **Organization** dashboard).
1. In the left-hand toolbar, navigate to **Settings & Policies > API Credentials > Add Credential**.
1. Give the credential a name, and save the generated **Client ID** and **Client Secret**, these are used to configure the integration in Sumo Logic.

### Source configuration

When you create a Sophos Central Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Sophos Central Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Sophos Central**.
1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **Client ID**. Provide the Sophos Central Client ID you want to use to authenticate collection requests.
1. **Client Secret**. Provide the Sophos Central Client Secret you want to use to authenticate collection requests.
1. **Supported APIs to collect**. Select one or more of the available APIs, **Alerts** and **Events**.
1. (Optional) The **Polling Interval** is set for 300 seconds by default, you can adjust it based on your needs. This sets how often the Source checks for new data.
1. **Processing Rules for Logs (Optional)**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in Create a Processing Rule.
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Sophos` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Sophos Central` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `<eventId>` | Populated by the alert category. This will be one of the following values: azure, adSync, applicationControl, appReputation, blockListed, connectivity, cwg, denc, downloadReputation, endpointFirewall, fenc, forensicSnapshot, general, iaas, iaasAzure, isolation, malware, mtr, mobiles, policy, protection, pua, runtimeDetections, security, smc, systemHealth, uav, uncategorized, updating, utm, virt, wireless, or xgEmail. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Sophos Central"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| clientId | String | Yes | `null` | Provide the Sophos Client ID you want to use to authenticate collection requests. |  |
| clientSecret` | String | Yes | `null` | Provide the Sophos Secrete you want to use to authenticate collection requests. |  |
| supported_apis | Array of strings | Yes | `null`  | Define one or more of the available APIs to collect: Events, and Alerts.| `["Events","Alerts"]` |
| pollingInterval | Integer | No | 300 | This sets how often the Source checks for new data. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/sophos-central/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/sophos-central/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
