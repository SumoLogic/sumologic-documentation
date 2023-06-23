---
id: dropbox-source
title: Dropbox Source
sidebar_label: Dropbox
description: The Dropbox Source provides a secure endpoint to receive team events from the Get Events API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/dropbox-icon.svg')} alt="dropbox-icon.png" width="50"/>

The Dropbox Source provides a secure endpoint to receive team events from the [Get Events API](https://www.dropbox.com/developers/documentation/http/teams#team_log-get_events). It securely stores the required authentication, scheduling, and state tracking information.

## Rules

* JSON is the only supported log format
* Data is collected in five minute intervals.

## Authentication

You'll need a Dropbox App Key, App Secret, and Access Code to provide to Sumo Logic.

To generate these credentials:

1. Sign in to your [Dropbox Business Account](https://www.dropbox.com/login).

1. Create a new app in the [App Console](https://www.dropbox.com/developers/apps).

1. Open the new app and click **Permissions** and enable **events.read** in **Team Scopes **of the app and then click **Submit**.

1. Copy the provided **App Key** and **App Secret** values, you'll provide these to the Sumo Logic Dropbox Source and are needed in the next step.

1. Replace **APP_KEY** with your App Key in the following URL.

    ```
    https://www.dropbox.com/oauth2/authorize?client_id=APP_KEY&token_access_type=offline&response_type=code
    ```

1. Load the modified URL and you'll see the sign in page of Dropbox. Sign in with your Dropbox Business account credentials to obtain the access code. Then click the **Allow** button. Copy the Access Code to provide to the Sumo Logic Dropbox Source.

## States

A Dropbox Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A Dropbox Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Dropbox.
1. **Collecting**. The Source is actively collecting data from Dropbox.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

![health error generic.png](/img/send-data/1password-state.png)

Hover your mouse over the status icon to view a tooltip with details on the detected issue.

![health error generic.png](/img/send-data/health-error-generic.png)

## Create a Dropbox Source

When you create a Dropbox Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Create a Hosted Collector](/docs/send-data/hosted-collectors/).

To configure a **Dropbox Source

1. In Sumo Logic, navigate to** Manage Data > Collection** and open the **Collection** tab. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Dropbox**.<br/><img src={useBaseUrl('img/send-data/dropbox-icon.png')} alt="dropbox-icon" width="100"/>
1. Enter a **Name** for the Source. The **description** is optional.<br/><img src={useBaseUrl('img/send-data/dropbox-input.png')} alt="dropbox-input" width="400"/>
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the **Forward to SIEM** option the following metadata fields are set:
    * `_siemVendor`: Dropbox
    * `_siemProduct`: Dropbox
    * `_siemFormat`: JSON
    * `_siemEventID`: `{event_type..tag}`
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **App Key**, **App Secret**, and **Access Code**. Provide your Dropbox [authentication](#authentication) credentials.
1. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config | JSON Object  | Yes | Contains the [configuration parameters](duo-source.md) for the Source. |   |
| schemaRef | JSON Object  | Yes | Use `{"type":"Dropbox"}` for a Dropbox Source. | not modifiable |
| sourceType | String | Yes | Use `Universal` for a Dropbox Source. | not modifiable |

The following table shows the **config** parameters for a
Dropbox Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `app_secret` | String	Yes |  | The Dropbox App Secret value. | modifiable |
| `app_key` | String | Yes |  | The Dropbox App Key value. | modifiable |
| `access_code` | String | Yes |  | The Dropbox Access Code value. | modifiable |

Dropbox Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "config":{
      "access_code":"********",
      "name":"dropbox",
      "app_secret":"********",
      "app_key":"abcdefg1234567",
      "fields":{
        "_siemForward":false
      }
    },
    "schemaRef":{
      "type":"Dropbox"
    },
    "sourceType":"Universal"
  }
}
```
