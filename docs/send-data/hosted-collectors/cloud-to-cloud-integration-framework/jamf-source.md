---
id: jamf-source
title: Jamf Source
sidebar_label: Jamf
tags:
  - cloud-to-cloud
  - jamf
description: Learn how to collect data from the Jamf platform.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/jamf.png')} alt="thumbnail icon" width="85"/>

Jamf is a software company that specializes in mobile device management (MDM) and endpoint management solutions for Apple devices such as Macs, iPhones, iPads, and Apple TVs. This Jamf integration helps you to ingest inventory data using the [Jamf Pro API](https://developer.jamf.com/jamf-pro/v11.4.0/docs/jamf-pro-api-overview) and [Jamf Classic API](https://developer.jamf.com/jamf-pro/v11.4.0/docs/getting-started-2).

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 24 hours |  [Inventory ID](https://developer.jamf.com/jamf-pro/reference/get_v1-computers-inventory) <ul><li>[Computer History](https://developer.jamf.com/jamf-pro/reference/findcomputerhistorybyid)</li><li>[Computer Management](https://developer.jamf.com/jamf-pro/reference/findcomputermanagementbyid)</li></ul> |


## Setup

### Vendor configuration

The Jamf source requires you to provide the Base URL, Client ID, and Client Secret to access the source data.

- The Base URL is used to retrieve the source data from Jamf. The **Base URL** for Jamf is `https://yourServer.jamfcloud.com`. Replace `yourServer` with your organization server.
- To generate the **Client ID** and **Client Secret**, follow the instructions mentioned in the [Jamf documentation](https://learn.jamf.com/en-US/bundle/jamf-pro-documentation-current/page/API_Roles_and_Clients.html).

### Source configuration

When you create a Jamf Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure the Jamf Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select the **Jamf** icon.
1. Enter a **Name** to display for the Source in Sumo Logic. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. In **Base URL**, enter your Jamf instance domain, `https://yourServer.jamfcloud.com`.
1. In **Client ID**, enter the Client ID you generated from the Jamf platform.
1. In **Client Secret**, enter the Client Secret you generated from the Jamf platform.
1. (Optional) In **Look Back Time**, enter the first collection start time. Default is 1 day.
1. (Optional) The **Polling Interval** is set for 24 hours by default. You can adjust it based on your needs.
1. (Optional) **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Jamf"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| baseURL | String | Yes | `null` | Your Jamf instance domain.  | `https://yourServer.jamfcloud.com` |
| clientID | Boolean | No | `null` | Client ID generated from the JAMF platform. |  |
| clientSecret | String | No | `null` | Client Secret generated from the Jamf platform. |  |
| progressWindowInitialLookback | Integer | No | 1 day | First collection start time. |  |
| pollingInterval | String | No | 24 hours | This sets how often the Source checks for data. | `24 Hours` |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/jamf/example.json
```

### Terraform example

```hcl reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/jamf/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
