---
id: sailpoint-source
title: SailPoint Source
sidebar_label: SailPoint
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/sailpoint-logo.svg')} width="100"/>

The SailPoint Source provides a secure endpoint to receive Events and User Inventory data from the [IdentityNow V3 API](https://developer.sailpoint.com/apis/v3/). It securely stores the required authentication, scheduling, and state tracking information.

The SailPoint Source ingests:

 * Events from the [Search API Endpoint](https://developer.sailpoint.com/apis/v3/#operation/search).
 * Users Inventory data from the [Public Identities API Endpoint](https://developer.sailpoint.com/apis/v3/#operation/getPublicIdentities).

## Rules

 * Data ingestion starts when you create the Source. 
 * Events are polled every five minutes.
 * Inventory data is polled every 12 hours.

## Authentication

You need a SailPoint Admin account generated `Client ID` and `Client Secret Key` as well as the customer-specific organization name, such as, `{organization}.identitynow.com`.

To generate a [personal access token](https://developer.sailpoint.com/docs/authentication.html#personal-access-tokens) from the IdentityNow UI, perform the following steps after logging into your IdentityNow instance:

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

## States

A SailPoint Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A SailPoint Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with SailPoint.
1. **Collecting**. The Source is actively collecting data from SailPoint.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

![sailpoint-state.png](/img/send-data/sailpoint-state.png)

Hover your mouse over the status icon to view a tooltip with details on
the detected issue.

![health error generic.png](/img/send-data/health-error-generic.png)

## Create a SailPoint Source

When you create a SailPoint Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Create a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Duo Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **SailPoint**.

   ![sailpoint-icon.png](/img/send-data/sailpoint-icon.png)

1. Enter a **Name** for the Source. The **description** is optional.

   ![sailpoint-source-ui.png](/img/send-data/sailpoint-source-ui.png)

1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the **Forward to SIEM** option the following metadata fields are set:

   * `_siemVendor`: Events, Users	SailPoint
   * `_siemProduct`: Events, Users	SailPoint
   * `_siemFormat`: Events	JSON
   * `_siemEventID`: Events	`<technicalName>` Where `<technicalName>` is the value from the technicalName field of the event.
   * `_siemDataType`: Users	Inventory

1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.

1. **Tenant Name**. Provide your SailPoint customer-specific organization name, such as, `{organization}.identitynow.com`.

1. **Client ID** and **Client Secret**. Enter the ID and Secret you got from creating your SailPoint access token in the [Authentication section](#authentication) above.

1. **Supported APIs to collect**. Select one or more of the available APIs, **Events** and **Users**.

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
| config            | JSON Object  | Yes               | Contains the configuration parameters for the Source. |                |
| schemaRef         | JSON Object  | Yes               | Use `{"type":"SailPoint"}` for a SailPoint Source. | not modifiable |
| sourceType        | String       | Yes               | Use `Universal` for a SailPoint Source. | not modifiable |

The following table shows the **config** parameters for a
SailPoint Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `org_name` | String | Yes |  | Provide your SailPoint customer-specific organization name, such as, {organization}.identitynow.com.	modifiable |
| `client_id` | String | Yes |  | Provide the SailPoint client ID you want to use to authenticate collection requests.	modifiable |
| `client_secret` | String | Yes |  | Provide the SailPoint secret you want to use to authenticate collection requests.	modifiable |
| `supported_apis` | Array of strings | Yes |  | Define one or more of the available APIs to collect: Events, and Users.<br/>For example, for both you'd use: `["Events","Users"]` | modifiable |

See how to [create processing rules using JSON](/docs/send-data/use-json-configure-sources).

SailPoint Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"SailPoint"
    },
    "config":{
      "name": "Sail",
      "org_name": "TenantName",
      "supported_apis": ["Events", "Users"],
      "client_id": "********",
      "client_secret": "********",
      "fields": {
           "_siemForward": true
      }
    },
    "sourceType":"Universal"
  }
}
```
