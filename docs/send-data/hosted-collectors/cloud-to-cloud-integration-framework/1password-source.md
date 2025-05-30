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
1. In the **System Name** field, enter the name of your choice (default value `Sumo Logic` should be fine in most cases), then click **Add Integration**.
1. In the **Set up token** section:
   1. Enter a **Token Name**. This can be any string that will help you recognize tokens generated for different environments like production, staging, and dev.
   1. Under **Events to Report**, leave enabled event sources which you want to share using the token.
   1. When you're done, click **Issue Token**.
1. In the **Save token** section, click the copy icon (next to the token string) to copy it to your clipboard. You can also click **Save in 1Password** to store it for your future reference.
1. Lastly, click **View Integration Details** to see the summary, then click **Learn More** pointing to 1Password App installation manual.

### Source configuration

1. Go to **Manage Data > Collection > Collection** or **Configuration > Data Collection**.
1. Click **Add Source** next to a Hosted Collector.
1. Search for and select **1Password**.
1. Enter a **Name** for the Source. The **description** is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse).  <br/><ForwardToSiem/>
1. (Optional) **Fields**. Click the **+Add** link to add custom log metadata [Fields](/docs/manage/fields).
   * Define the fields you want to associate, each field needs a name (key) and value.
      * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
      * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
1. **Base URL**. Provide your 1Password customer-specific domain, for example `events.1password.com`.
1. **API Token**. Enter the [1Password API token](#vendor-configuration).
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

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"1Password"}` | Yes | Defines the source schema type. |
| sourceType | String | `"Universal"` | Yes | Always set to `Universal`. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Holds all source-specific config. |

### Configuration object

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

```hcl reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/1password/example.tf
```

## Troubleshooting

Check the **Status** column on the **Collectors** page. If errors occur:

- Verify the Base URL and token.
- Regenerate the token and reconfigure the source.
- Refer to the screenshot below for troubleshooting UI.

![troubleshooting.jpg](/img/send-data/1password-troubleshooting.jpg)

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
