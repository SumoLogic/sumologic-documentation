---
id: duo-source
title: Duo Source
sidebar_label: Duo
tags:
  - cloud-to-cloud
  - duo
description: The Duo Source provides a secure endpoint to receive authentication logs from the Duo Authentication Logs API.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/duo.png')} alt="thumbnail icon" width="55"/>

The Duo Source provides a secure endpoint to receive authentication logs from the Duo [Authentication Logs API](https://duo.com/docs/adminapi#logs). It securely stores the required authentication, scheduling, and state tracking information.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Authentication Logs](https://duo.com/docs/adminapi#logs) |

## Setup

### Vendor configuration

You need to [create an **Admin API** app](https://duo.com/docs/adminapi#first-steps) and copy the **integration key**, **secret key**, and **domain** to provide to Sumo Logic when creating your Duo Source. Grant the **Admin API** permission to **read** **information**, **log**, and **resource**.

### Source configuration

When you create a Duo Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/).

To configure a Duo Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.  
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Duo**.
1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
   :::note
   If you are using the Duo Federal edition service when connecting APIs, it's recommended to use `duofederal.com` instead of the default `duosecurity.com` domain. Our Duo C2C lets you allow to configure the API domain as it contains the specific customer ID information. For example, you can use `api-xxxx-duosecurity.com` or `api-xxxx-duofederal.com` if the Duo Federal edition service has been opted in. For more information, refer to the [Duo Federal Edition Guide](https://duo.com/docs/duo-federal-guide#duo-service-connectivity).
   :::
1. **Duo Domain**. Provide your **API hostname**, such as `api-********.duosecurity.com`.
1. **Integration Key**. Provide the Duo Integration Key you want to use to authenticate collection requests.
1. **Secret Key**. Provide the Duo Secret Key you want to use to authenticate collection requests. 
1. (Optional) The **Polling Interval** is set for 300 seconds by default, you can adjust it based on your needs. This sets how often the Source checks for new data.
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Duo` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `MFA` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `<eventType>` | Where `<eventType>` is the value of the field from the JSON event, such as authentication or enrollment. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Duo"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| domain | String | Yes | `null`  | Provide your API hostname, such as api-********.duosecurity.com.| |
| integration_key | String | Yes | `null` | Provide the Duo Integration Key you want to use to authenticate collection requests. |  |
| secret_key | String | Yes | `null` | Provide the Duo Secret Key you want to use to authenticate collection requests. |  |
| polling_interval | Integer | No | 300 | This sets how often the Source checks for new data. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/duo/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/duo/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
