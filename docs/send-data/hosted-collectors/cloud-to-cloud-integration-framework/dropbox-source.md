---
id: dropbox-source
title: Dropbox Source
sidebar_label: Dropbox
tags:
  - cloud-to-cloud
  - dropbox
description: The Dropbox Source provides a secure endpoint to receive team events from the Get Events API.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/dropbox-icon.svg')} alt="dropbox-icon.png" width="50"/>

The Dropbox Source provides a secure endpoint to receive team events from the [Get Events API](https://www.dropbox.com/developers/documentation/http/teams#team_log-get_events). It securely stores the required authentication, scheduling, and state tracking information.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Team events](https://www.dropbox.com/developers/documentation/http/teams#team_log-get_events) |

## Setup

### Vendor configuration

You'll need a Dropbox App Key, App Secret, and Access Code to provide to Sumo Logic. To generate these credentials follow the below steps:

1. Sign in to your [Dropbox Business Account](https://www.dropbox.com/login).
1. Create a new app in the [App Console](https://www.dropbox.com/developers/apps).
1. Open the new app and click **Permissions** and enable **events.read** in **Team Scopes** of the app and then click **Submit**.
1. Copy the provided **App Key** and **App Secret** values, you'll provide these to the Sumo Logic Dropbox Source and are needed in the next step.
1. Replace **APP_KEY** with your App Key in the following URL.
    ```
    https://www.dropbox.com/oauth2/authorize?client_id=APP_KEY&token_access_type=offline&response_type=code
    ```
1. Load the modified URL and you'll see the sign in page of Dropbox. Sign in with your Dropbox Business account credentials to obtain the access code. Then click the **Allow** button. Copy the Access Code to provide to the Sumo Logic Dropbox Source.

### Source configuration

When you create a Dropbox source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Create a Hosted Collector](/docs/send-data/hosted-collectors/).

To configure a Dropbox source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Dropbox**.
1. Enter a **Name** for the Source. The **description** is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **App Key**, **App Secret**, and **Access Code**. Provide your Dropbox [authentication](#vendor-configuration) credentials.
1. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Dropbox` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Dropbox` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `event_type..tag}` | Set when **Forward To SIEM** is checked. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Dropbox"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| app_secret | String | Yes | `null`  | The Dropbox App Secret value. |  |
| app_key | String | Yes | `null` | The Dropbox App Key value. |  |
| access_code | String | Yes | `null` | The Dropbox Access Code value. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/dropbox/example.json
```

### Terraform example

```hcl reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/dropbox/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
