---
id: okta-source
title: Okta Source
sidebar_label: Okta
keywords:
    - okta
    - cloud-SIEM-enterprise
description: The Okta Source provides a secure endpoint to receive event data from the Okta System Log API.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saml/okta.png')} alt="Thumbnail icon" width="75"/>

The Okta Source provides a secure endpoint to receive event data from the Okta [System Log API](https://developer.okta.com/docs/reference/api/system-log/), [Users API](https://developer.okta.com/docs/reference/api/users/), and [User's Group API](https://developer.okta.com/docs/reference/api/users/#get-user-s-groups).
It securely stores the required authentication, scheduling, and state tracking information.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  System Log |
| 24 hours |  Users/Users Group |

## Setup

### Vendor configuration

The Okta source requires you to provide the API token to access the data. To create an Okta API token, following instructions in [Okta help](https://support.okta.com/help/s/article/How-do-I-create-an-API-token). 

### Source configuration

When you create an Okta Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Okta Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Okta**.
1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **Okta API Key**. Provide the Okta API key you want to use to authenticate collection requests.
1. **Okta Domain**. Provide your specific Okta domain, such as `mydomain.okta.com`.
1. **Okta Event Types to Request**. By default, the Source will ingest all Okta events. You can instead configure a subset of events to collect. Click **Select Events** to specify the events you want to collect.
1. **Inventory**. Select if you want to fetch user inventory data once every 24 hours. This uses the List Users API.
1. (Optional) The **Polling Interval** is set for 300 seconds by default, you can adjust it based on your needs. This sets how often the Source checks for new data.
1. (Optional) In **Processing Rules for Logs**, configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_parser` | `/Parsers/System/Okta/Okta` | Set when **Forward To SIEM** is checked. |
| `_siemDataType` | `Inventory` | Set when **Forward To SIEM** is checked. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Okta"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| apiKey | String | Yes | `null` | The Okta API key you want to use to authenticate collection requests.|
| domain | String | Yes | `null` | Provide your specific Okta domain, such as mydomain.okta.com.	| |
| users | Boolean | No | False | Set to true to collect user inventory data once every 24 hours.|  |
| collectAll | Boolean | No | True | By default, the Source will ingest all Okta events. If false, eventTypes is required. | |
eventTypes | String | No | `null` | Comma separated list of events to collect. Required if collectAll is false. | |
| pollingInterval | Integer | No | 300 | This sets how often the Source checks for new data. | |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/okta/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/okta/example.tf
```


## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::

## Limitation

During a polling interval, an Okta Source will make a request for every 1,000 logs available. The Okta API uses paging and only 1,000 logs are returned at a time.
