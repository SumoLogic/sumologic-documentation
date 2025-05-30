---
id: trellix-mvisio-epo-source
title: Trellix mVision ePO Source
sidebar_label: Trellix mVision ePO
tags:
  - cloud-to-cloud
  - trellix-mvisio-epo
description: Learn how to collect event logs using the Trellix mVision ePO.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/trellix-logo.png')} alt="trellix-logo" width="70" />

Trellix is a cybersecurity company that provides cloud-based security solutions for cybersecurity attacks. It provides hardware, software, and services to investigate cybersecurity attacks, protects against malicious software, and analyzes IT security risks.

mVision ePO is a key component of the Trellix security management platform, which provides unified management of endpoint, network, and data security. This can reduce incident response time, strengthen protection, simplify and automate risk and security management, and provide end-to-end network visibility and security.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Event Logs](https://developer.manage.trellix.com/mvision/apis/v2-events) |

## Setup

### Vendor configuration

The Trellix mVision ePO source requires you to provide a Client ID, Client Secret, and API key. To obtain these, follow the steps below.
1. Log in to the [Trellix Developer Portal](https://developer.manage.trellix.com/).
1. Go to the **Self service** menu and click [**API Access Management**](https://developer.manage.trellix.com/mvision/selfservice/access_manag) option.<br/><img src={useBaseUrl('img/send-data/self-service.png')} alt="self-service.png" style={{border: '1px solid gray'}} width="600" />
    1. Copy **API key** from the API Access Management section. <br/><img src={useBaseUrl('img/send-data/api-key.png')} alt="api-key" style={{border: '1px solid gray'}} width="600" />
    1. In the **Credential Configuration** section, select **Events** as the scope in **APIs** for a given **Client Type**.
    1. Click **Request** for IAM Client type approval.<br/><img src={useBaseUrl('img/send-data/credential-configuration.png')} alt="credential-configuration" style={{border: '1px solid gray'}} width="600" />
    1. Once your IAM Client type is approved, generate the **Client ID** and **Client Secret**. <br/><img src={useBaseUrl('img/send-data/generate.png')} alt="generate" style={{border: '1px solid gray'}} width="600" />

### Source configuration

When you create a Trellix mVision ePO Source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Trellix mVision ePO Source, follow the steps below:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Trellix mVision ePO**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. Enter the **Client ID** of your Trellix platform.
1. Enter the **Client Secret** of your Trellix platform.
1. Enter the **API Key** for authorization collected from the Trellix platform.
1. (Optional) The **Polling Interval** is set for 5 minutes by default. You can adjust it based on your needs. This sets how often the Source checks for new data.
1. When you are finished configuring the Source, click **Save**.

## Metadata field

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemParser` | `/Parsers/System/Trellix/Trellix MVision EPO` | Set when **Forward To SIEM** is checked. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for more details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Trellix mVision ePO"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| apiKey | String | Yes | `null` | API key used for Authorization.  |  |
| clientID | String | Yes | `null` | Client ID of your account. |  |
| clientSecret | String | Yes | `null` | Client Secret of your account. |  |
| pollingInterval | Integer | No | `5 minutes` | Choose how often the Source checks for new data (In minutes). |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/trellix-mvisio-epo/example.json
```

### Terraform example

```hcl reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/trellix-mvisio-epo/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
