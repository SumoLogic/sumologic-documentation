---
id: sentinelone-mgmt-api-source
title: SentinelOne Mgmt API Source
sidebar_label: SentinelOne Mgmt API
tags:
    - sentinelone-mgmt-api
    - cloud-SIEM-enterprise
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/sentinelone-mgmt-api/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/sentinelone-mgmt-api/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/sentinelone-mgmt-api/example.tf';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/sentinelone-icon.png')} alt="sentinelone-icon.png" width="50" />

The SentinelOne Mgmt API Source collects data from the SentinelOne Management Console. It securely stores the required authentication, scheduling, and state tracking information.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Activities](https://usea1-partners.sentinelone.net/api-doc/overview) |
| 5 min |  [Agents](https://usea1-partners.sentinelone.net/api-doc/overview) |
| 5 min |  [Threats](https://usea1-partners.sentinelone.net/api-doc/overview) |

## Setup

### Vendor configuration

The SentinelOne Mgmt API Source requires authentication with a token associated with ApiToken. See [how to generate an API Token from SentinelOne documentation](https://usea1-partners.sentinelone.net/docs/en/generating-api-tokens.html). The following steps are provided as a guide.

To generate an API token:

1. Sign in to the SentinelOne Management Console with Admin user credentials.
1. In the Management Console, click **Settings**.
1. In the **Settings** view, click **Users**.
1. Click **Service Users**.
1. Click **Actions** dropdown and select **Create New Service User**.
1. Enter the information for the new service user.
1. In **Role**, select **Admin**.
1. Click **Save**.
1. Log in to the SentinelOne Management Console with the credentials of the new user.
1. Navigate to **Settings > Users**.
1. Select the newly added service user.
1. Click **Options**.
1. Click **Generate API token**.
1. Copy or download this API Token.

### Source configuration

When you create a SentinelOne Mgmt API Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a SentinelOne Mgmt API Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.  
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **SentinelOne Mgmt API**.
1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped. 
1. **Base URL**. Provide your SentinelOne Management URL. It's in this format: `https://<your_management_url>`.
1. **API Token**. Provide the API Token you got from the SentinelOne Management Console. See Authentication above for details.
1. **Supported APIs to collect**. Select one or more of the available APIs: **activities**, **agents**, and **threats**.
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `SentinelOne` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `MGMT API` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `activities - {id}`, `threats - {id}`, or `agents` | Set when **Forward To SIEM** is checked and specific to the API collected. |
| `_siemDataType` | `Inventory` | Set when **Forward To SIEM** is checked. |

:::note
If you entered `agents` in Supported APIs to collect above, the `_siemDataType` field will be set to `Inventory`.
:::

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"SentinelOne Mgmt API"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| base_url | String | Yes |  `null`| Provide your SentinelOne Management URL. It's in this format: `https://<your_management_url>`. |  |
| api_secret | String | Yes |  `null`| Provide your API Token from SentinelOne that you want to use to authenticate collection requests. |  |
| supported_apis | Array of strings | Yes | `null` | Define one or more of the available APIs to collect: activities, agents, and threats.<br/>For example, for all three you'd use: `["activities","agents","threats"]` |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/sentinelone-mgmt-api/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/sentinelone-mgmt-api/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
