---
id: dropbox-source
title: Dropbox Source
image: 'https://app_icons.s3.amazonaws.com/dropbox.svg'
sidebar_label: Dropbox
slug: /c2c/dropbox
tags:
  - cloud-to-cloud
  - dropbox
description: The Dropbox Source provides a secure endpoint to receive team events from the Get Events API.
---
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/img/c2c/dropbox/example.json';
import MyComponentSource from '!!raw-loader!/img/c2c/dropbox/example.json';
import TerraformExample from '!!raw-loader!/img/c2c/dropbox/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';
export const icon = 'https://app_icons.s3.amazonaws.com/dropbox.svg';

<img src={icon} alt="icon.png" width="50"/>

The Dropbox Source provides a secure endpoint to receive team events from the [Get Events API](https://www.dropbox.com/developers/documentation/http/teams#team_log-get_events). It securely stores the required authentication, scheduling, and state tracking information.

:::note
This source is **not** yet available in the [Fed deployment](https://help.sumologic.com/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## Data Collected
| Polling Interval | Data |
| --- | --- |
| 5 min |  [Team Events](https://www.dropbox.com/developers/documentation/http/teams#team_log-get_events)

## Setup

### Vendor Configuration
1. Sign in to your [Dropbox Business Account](https://www.dropbox.com/login).
1. Create a new app in the [App Console](https://www.dropbox.com/developers/apps).
1. Open the new app and click **Permissions** and enable **events.read** in **Team Scopes **of the app and then click **Submit**.
1. Copy the provided <a id="AppKey"></a>**App Key** and <a id="AppSecret"></a>**App Key** values, you'll provide these to the Sumo Logic Dropbox Source and are needed in the next step.
1. Replace **APP_KEY** with your App Key in the following URL.

    ```
    https://www.dropbox.com/oauth2/authorize?client_id=APP_KEY&token_access_type=offline&response_type=code
    ```
1. Load the modified URL and you'll see the sign in page of Dropbox. Sign in with your Dropbox Business account credentials to obtain the <a id="AccessCode"></a>access code. Then click the **Allow** button. Copy the Access Code to provide to the Sumo Logic Dropbox Source.

### Source Configuration
1. In Sumo Logic, navigate to **Manage Data > Collection** and open the **Collection** tab. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Dropbox**.<br/><img src={icon} alt="dropbox-icon" width="100"/>
1. Enter a **Name** for the Source. The **description** is optional
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise.
1. (Optional) **Fields.** Click the **+Add** link to define the fields you want to associate, each field needs a name (key) and value.
1. **App Key**. Enter Dropbox [App Key](#AppKey).
1. **App Secret**. Enter Dropbox [App Secret](#AppSecret).
1. **Access Code**. Enter Dropbox [Access Code](#AccessCode).
1. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Submit**.

## Metadata Fields
| Field | Value | Description |
| --- | --- | --- |
| _siemForward | <code>(true \| false)</code> | Set to `true` when Forward To SIEM is checked |
| _siemVendor | `Dropbox` | Set when Forward To SIEM is checked |
| _siemProduct | `Dropbox` | Set when Forward To SIEM is checked |
| _siemFormat | `JSON` | Set when Forward To SIEM is checked |
| _siemEventID | `log value of {event_type.tag}` | Set when Forward To SIEM is checked |

## JSON Schema
Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for more details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Dropbox"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration parameters](#config-object) | Yes | Source type specific values. |

### Config Object
| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| `app_secret` | String |	Yes | `null` | [Vendor app secret](#AppSecret). | `"1391AC0_!!nja"` |
| `app_key` | String | Yes | `null` | [Vendor app key](#AppKey). | `"AAcC140"` |
| `access_code` | String | Yes | `null` | [Vendor access code](#AccessCode). | `"2891790ue1daw9WA12**7c"` |

### Example
<CodeBlock language="json">{MyComponentSource}</CodeBlock>

[Download example](/img/c2c/dropbox/example.json)
### Terraform Example
<CodeBlock language="json">{TerraformExample}</CodeBlock>

[Download example](/img/c2c/dropbox/example.tf)

## Troubleshooting

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud to Cloud sources 
:::