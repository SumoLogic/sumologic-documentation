---
id: 1password-source
title: 1Password Source
sidebar_label: 1Password
image: 'https://app_icons.s3.amazonaws.com/1Password.png'
tags:
  - cloud-to-cloud
  - 1password
description: The 1Password Source provides a secure endpoint to receive Sign-in Attempts and Item Usage from the 1Password Event API.
---
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/1password/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/1password/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/1password/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src="https://app_icons.s3.amazonaws.com/1Password.png" alt="Thumbnail icon" width="80"/>

The 1Password Source provides a secure endpoint to receive sign-in attempts, item usage, and audit events from the [1Password Event API](https://support.1password.com/events-api-reference/). It securely stores the required authentication, scheduling, and state tracking information.

:::note
This source is available in the [Fed deployment](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Sign-in attempts](https://developer.1password.com/docs/events-api/reference/#post-apiv1signinattempts) |
| 5 min |  [Item usage](https://developer.1password.com/docs/events-api/reference/#post-apiv1itemusages) |
| 5 min |  [Audit events](https://developer.1password.com/docs/events-api/reference/#post-apiv1auditevents) |

## Setup

### Vendor configuration

You'll need a <a id="APIToken"></a> 1Password API token and your customer-specific 1Password domain (for example, `events.1password.com`). To generate a 1Password API token, follow these steps:
1. [Sign in](https://start.1password.com/signin) to your 1Password account and click [Integrations](https://my.1password.com/integrations/active) in the sidebar.
1. Switch to the **Directory** tab (or use [this direct link to the Directory tab](https://sumologictestingapi.1password.com/integrations/directory)).
1. Go to the **Events Reporting** section and click the **Sumo Logic** integration.
1. In the **System Name** field, enter the name of your choice (default value `Sumo Logic` should be fine in most cases), then click **Add Integration**.
1. In the **Set up token** section:
   1. Enter a **Token Name**. This can be any string that will help you recognize tokens generated for different environments like production, staging, and dev.
   1. Under **Events to Report**, leave enabled event sources which you want to share using the token.
   1. When you're done, click **Issue Token**.
1. In the **Save token** section, click the copy icon (next to the token string) to copy it to your clipboard. You can also click **Save in 1Password** to store it for your future reference.
1. Lastly, click **View Integration Details** to see the summary, then click **Learn More** pointing to 1Password App installation manual.

### Source configuration

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **1Password**.
1. Enter a **Name** for the Source. The **description** is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse).
1. (Optional) **Fields**. Click the **+Add** link to add custom log metadata [Fields](/docs/manage/fields).
   * Define the fields you want to associate, each field needs a name (key) and value.
      * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
      * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
1. **Base URL**. Provide your 1Password customer-specific domain, for example `events.1password.com`.
1. **API Token**. Enter the [1Password API token](#APIToken).
1. **Supported APIs to collect**. Select one or more of the available APIs, **Item Usage** and **Sign-in Attempts**.
1. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `1Password` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `1Password` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemParser` | `/Parsers/System/1Password/1Password` | Set when **Forward To SIEM** is checked. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for more details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"1Password"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| base_url | String | Yes | `null` | Provide your 1Password customer-specific domain, such as, <code>events.1password.com</code> |  `"events.1password.com"` |
| api_token | String | Yes | `null` | Provide the [1Password API token](#APIToken) you want to use to authenticate collection requests. |  `"acsac25$"` |
| supported_apis | []String | Yes | `null` | Define one or more of the available APIs to collect |  `["sign-in","itemUsage"]` |


### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

[Download example](/files/c2c/1password/example.json)

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

[Download example](/files/c2c/1password/example.tf)

## Troubleshooting

After configuring your Source, you should check the status of the source in the **Collectors** page >  **Status** column. If the Source is not functioning as expected, you may see an error next to the Source Category column as shown below: 

![troubleshooting.jpg](/img/send-data/1password-troubleshooting.jpg)

To resolve these errors:
- Make sure the Base URL matches your domain.
- Make sure correct API Token is used to configure the source.
- If you're still seeing the `401 Unauthorized error` in the **Status** column, regenerate the API Token by following [these configuration steps](#vendor-configuration) and then updating the API Token for the source.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
