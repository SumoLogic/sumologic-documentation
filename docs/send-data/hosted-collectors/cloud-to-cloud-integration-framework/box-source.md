---
id: box-source
title: Box Source
sidebar_label: Box
tags:
  - cloud-to-cloud
  - box
description: The Box API integration ingests events from the Get Events API.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/box-logo.svg')} alt="box-logo.svg" width="60" />

The Box API integration ingests events from the [Get Events API](https://developer.box.com/reference/get-events/). It securely stores the required authentication, scheduling, and state tracking information.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Events](https://developer.box.com/reference/get-events/) |

## Setup

### Vendor configuration

1. Login into the [Box Account](https://app.box.com/login).
2. Create and register a new app from the [App Console](https://app.box.com/developers/console). To register the App with Box follow [these](https://developer.box.com/guides/authentication/jwt/jwt-setup/#app-creation-steps) steps. Select **Server Authentication (with JWT)** as the authentication method. Note that use of a key pair requires  2-step verification to be enabled on Box.
3. Generate `public private key pair` as described in the following steps [Key Pair](https://developer.box.com/guides/authentication/jwt/jwt-setup/#public-and-private-key-pair) and download the JSON file.
4. Go to the **Configuration** and change **App Access Level** to **App + Enterprise Access** and enable **Manage Enterprise properties** in **Application Scopes** and save changes as shown below.<br/><img src={useBaseUrl('img/send-data/box-source4.png')} alt="Box" style={{border: '1px solid gray'}} /><br/><img src={useBaseUrl('img/send-data/box-source5.png')} alt="Box" style={{border: '1px solid gray'}} /><br/><img src={useBaseUrl('img/send-data/box-source6.png')} alt="Box" style={{border: '1px solid gray'}} />
5. Authorize your app by following the steps in [App Authorization](https://developer.box.com/guides/authentication/jwt/jwt-setup/#app-authorization).

### Source configuration

When you create a Box Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Create a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Box Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Box**.
1. Enter a **Name** for the Source. The **description** is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields**. Click the **+Add** link to add custom log metadata [Fields](/docs/manage/fields).
   * Define the fields you want to associate, each field needs a name (key) and value.
      * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
      * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
1. Upload the JSON file.
1. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Box` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Enterprise Events` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `event_type` | Set when **Forward To SIEM** is checked. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Box"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| credentialsJson | String | Yes | `null` | JAuthentication credentials to access Box platform.| |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/box/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/box/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
