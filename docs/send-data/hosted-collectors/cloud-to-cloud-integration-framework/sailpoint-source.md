---
id: sailpoint-source
title: SailPoint Source
sidebar_label: SailPoint
tags:
    - sailpoint
    - cloud-SIEM-enterprise
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/sailpoint/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/sailpoint/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/sailpoint/example.tf';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/sailpoint-logo.svg')} width="100"/>

The SailPoint Source provides a secure endpoint to receive Events and User Inventory data from the [IdentityNow V3 API](https://developer.sailpoint.com/idn/api/v3). It securely stores the required authentication, scheduling, and state tracking information.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Events](https://developer.sailpoint.com/idn/api/v3/search) |
| 12 hours |  [Users Inventory](https://developer.sailpoint.com/idn/api/v3/get-public-identities) |

## Setup

### Vendor configuration

You need a SailPoint Admin account generated `Client ID` and `Client Secret Key` as well as the customer-specific organization name, such as `{organization}.identitynow.com`.

To generate a [personal access token](https://developer.sailpoint.com/idn/api/v3/create-personal-access-token/#create-personal-access-token) from the IdentityNow UI, perform the following steps after logging into your IdentityNow instance:

1. Select **Preferences** from the dropdown menu under your username, then **Personal Access Tokens** on the left. You can also go straight to the page using this URL, replacing `{tenant}` with your IdentityNow tenant: `https://{tenant}.identitynow.com/ui/d/user-preferences/personal-access-tokens`
1. Click **New Token** and enter a meaningful description to help differentiate the token from others.
   :::note
   The New Token button will be disabled when you’ve reached the limit of 10 personal access tokens per user. To avoid reaching this limit, we recommend you delete any tokens that are no longer needed.
   :::
1. Click **Create Token** to generate and view the two components that comprise the token: the `Secret` and the `Client ID`.
   :::important
   After you create the token, the value of the `Client ID` will be visible in the Personal Access Tokens list, but the corresponding `Secret` will not be visible after you close the window. You will need to store the `Secret` somewhere secure.
   :::
1. Copy both values somewhere that will be secure and accessible to you when you need to use the token.

### Source configuration

When you create a SailPoint Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Create a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Duo Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.  
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **SailPoint**.
1. Enter a **Name** for the Source. The **description** is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **Tenant Name**. Provide your SailPoint customer-specific organization name, such as `{organization}.identitynow.com`.
1. **Client ID** and **Client Secret**. Enter the ID and Secret you got from creating your SailPoint access token in the [Vendor configuration section](#vendor-configuration) above.
1. **Supported APIs to collect**. Select one or more of the available APIs, **Events** and **Users**.
1. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Events, Users	SailPoint` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Events, Users	SailPoint` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | Events	`<technicalName>` | Set when **Forward To SIEM** is checked and specific to the API collected. |
| `_siemDataType` | `Users	Inventory` | Set when **Forward To SIEM** is checked.  |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"SailPoint"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| org_name | String | Yes | `null` | Provide your SailPoint customer-specific organization name, such as `{organization}.identitynow.com`.	| |
| client_id | String | Yes | `null` | Provide the SailPoint client ID you want to use to authenticate collection requests.	| |
| client_secret | String | Yes | `null` | Provide the SailPoint secret you want to use to authenticate collection requests.|	 |
| supported_apis | Array of strings | Yes | `null` | Define one or more of the available APIs to collect: Events, and Users.<br/>For example, for both you'd use: `["Events","Users"]` |  |

See [Create processing rules using JSON](/docs/send-data/use-json-configure-sources/#creating-processing-rules-using-json).

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/sailpoint/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/sailpoint/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
