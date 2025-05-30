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

import useBaseUrl from '@docusaurus/useBaseUrl';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';

<img src="https://app_icons.s3.amazonaws.com/1Password.png" alt="Thumbnail icon" width="80"/>

The 1Password Source provides a secure endpoint to receive sign-in attempts, item usage, and audit events from the [1Password Event API](https://support.1password.com/events-api-reference/). It securely stores the required authentication, scheduling, and state tracking information.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min | [Sign-in attempts](https://developer.1password.com/docs/events-api/reference/#post-apiv1signinattempts) |
| 5 min | [Item usage](https://developer.1password.com/docs/events-api/reference/#post-apiv1itemusages) |
| 5 min | [Audit events](https://developer.1password.com/docs/events-api/reference/#post-apiv1auditevents) |

## Setup

### Vendor configuration

You'll need a <a id="APIToken"></a> 1Password API token and your customer-specific 1Password domain (for example, `events.1password.com`). To generate a 1Password API token, follow these steps:

1. [Sign in](https://start.1password.com/signin) to your 1Password account and click [Integrations](https://my.1password.com/integrations/active) in the sidebar.
1. Switch to the **Directory** tab (or use [this direct link to the Directory tab](https://sumologictestingapi.1password.com/integrations/directory)).
1. Go to the **Events Reporting** section and click the **Sumo Logic** integration.
1. In the **System Name** field, enter the name of your choice, then click **Add Integration**.
1. In the **Set up token** section, create and issue the token.
1. Copy or save the token securely.
1. Click **View Integration Details** to confirm.

### Source configuration

1. Go to **Manage Data > Collection > Collection** or **Configuration > Data Collection**.
1. Click **Add Source** next to a Hosted Collector.
1. Search for and select **1Password**.
1. Enter a **Name**, and optionally a **Description** and **Source Category**.
1. Check **Forward to SIEM** to send data to [Cloud SIEM](/docs/cse).<br/><ForwardToSiem/>
1. (Optional) Add **Fields** as metadata.
1. Enter **Base URL** and **API Token**.
1. Select **Supported APIs to collect**.
1. Configure any **Processing Rules** if needed.
1. Click **Submit**.

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
| name | String | Yes | `null` | Name of the source. | `"mySource"` |
| description | String | No | `null` | Source description. | `"Testing source"` |
| category | String | No | `null` | Source category. | `"mySource/test"` |
| fields | JSON Object | No | `null` | Metadata fields. | `{"_siemForward": false}` |
| base_url | String | Yes | `null` | Customer-specific domain. | `"events.1password.com"` |
| api_token | String | Yes | `null` | Token for authentication. | `"abc123xyz"` |
| supported_apis | Array[String] | Yes | `null` | List of APIs to collect. | `["sign-in","itemUsage"]` |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/1password/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/1password/example.tf
```

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
