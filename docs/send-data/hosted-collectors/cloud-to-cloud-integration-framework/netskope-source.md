---
id: netskope-source
title: Netskope Source
sidebar_label: Netskope
description: The Netskope Source provides a secure endpoint to receive event data from the Netskope API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/netskope.png')} alt="thumbnail icon" width="75"/>

The Netskope Source provides a secure endpoint to receive event data from the [Netskope API](https://docs.netskope.com/en/get-events-data.html). It securely stores the required authentication, scheduling, and state tracking information.

The following event types are available to collect:

* alert events from `/alerts` are always collected
* application
* audit
* infrastructure
* network
* page

:::note
This Source is available in the Fed deployment.
:::

## States

A Netskope Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A Netskope Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Netskope.
1. **Collecting**. The Source is actively collecting data from Netskope.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events.md) to investigate issues with collection.

![netscope error.png](/img/send-data/netscope-error.png)

Hover your mouse over the status icon to view a tooltip with details on the detected issue.

![health error generic.png](/img/send-data/health-error-generic.png)

## Getting a token from Netskope Portal

### Netskope REST API v2

(This API is used by Sumo Logic Netskope source v2.0.0 and later).
Netskope REST APIv2 provides an easy way to extend the Netskope platform to build to use-cases specific to your organization. Endpoints cover key areas such as Events, Alerts, Reports, Clients and more.

To obtain a Netskope REST API v2 auth token, do the following:

1. Log in to Netskope as the Tenant Admin.
1. Go to the API portion of the Netskope, **Settings** > **Tools** > **Rest API v2**.
1. Click "New Token", provide the token name and expiration duration, then add the following endpoints with READ privilege: `/api/v2/events/dataexport/events/alert`, `/api/v2/events/dataexport/events/page`, `/api/v2/events/dataexport/events/infrastructure`, `/api/v2/events/dataexport/events/application`, `/api/v2/events/dataexport/events/network`, `/api/v2/events/dataexport/events/audit`, and `/api/v2/events/data/alert`
1. Copy the token in the next dialog box and save it somewhere as it won't be visible after.

### Netskope REST API v1 (Deprecated)

:::caution Deprecated
This is used only for Sumo Logic Netskope source v1.3.1 or lower, please upgrade to v2.0.0.
:::

Netskope RESTv1 APIs use an auth token to make authorized calls to the
API. This section demonstrates how to obtain a token from the Netskope
user interface (UI).

To obtain a Netskope auth token, do the following:

1. Login to Netskope as the Tenant Admin.
1. Go to the API portion of the Netskope, **Settings** > **Tools** > **Rest API v1**.
1. Copy the existing token to your clipboard, or you can generate a new token and copy that token.

## Create a Netskope Source

When you create a Netskope Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Netskope Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Netskope**.<br/> ![Netscope icon.png](/img/send-data/Netscope-icon.png)
1. Enter a **Name** for the Source. The description is optional.<br/> ![Netskope June 2021 with event filters.png](/img/send-data/Netskope-event-filters.png)
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the **Forward to SIEM** option the following metadata fields are set:
   * `_siemVendor`: Netskope
   * `_siemProduct`: Security Cloud
   * `_siemFormat`: JSON
   * `_siemEventID`: `<eventType>` Where eventType is one of the above event types with one exception. If the eventType is audit and the description contains logon/login or logoff/logout the eventType field will be the eventType with the value -logon or -logoff added respectively, such as, audit-logon or audit-logoff.
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped. 
1. Enter your Netskope customer specific **Tenant ID**. Do not provide the entire URL, just the Tenant ID.
1. Enter the Netskope **API Token** you want to use to authenticate requests.
1. **Event Types** (Optional). By default, all event types are collected. You can specify certain event types to collect. Click in the text area to view and select from the following options, **All**, **Page**, **Application**, **Infrastructure**, **Audit**, and **Network**. Alerts are always collected. The **All** option indicates you want Page, Application, Infrastructure, and Audit event types collected. If this field is empty all event types are collected.
1. When you are finished configuring the Source, click **Submit**.

#### Error types

When Sumo Logic detects an issue it is tracked by Health Events. The
following table shows the three possible error types, the reason the
error would occur, if the Source attempts to retry, and the name of the
event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}


#### JSON configuration 

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config                    | JSON Object          | Yes                       | Contains the configuration parameters for the Source. |                        |
| schemaRef                 | JSON Object          | Yes                       | Use `{"type":"Netskope"}` for a Netskope Source.                                                | not modifiable         |
| sourceType                | String               | Yes                       | Use `Universal` for a Netskope Source.                                                          | not modifiable         |

The following table shows the **config** parameters for a Netskope Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `tenantID` | String | Yes |  | Netskope customer specific Tenant ID. Do not provide the entire URL, just the Tenant ID. | modifiable |
| `apiToken` | String | Yes |  | The Netskope API Token you want to use to authenticate requests. | modifiable |
| `eventTypes` | Array of Strings | No | all | Defines the types of events to collect. Accepted values are all, page, application, infrastructure, audit, and network. Alerts are always collected. | modifiable |

Netskope Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "config":{
      "name":"YL-Netskope",
      "eventTypes":["page","application","infrastructure","audit"],
      "fields":{
        "_siemForward":false
      },
      "apiToken":"********",
      "tenantID":"partners"
    },
    "schemaRef":{
      "type":"Netskope"
    },
    "state":{
      "state":"Collecting"
    },
    "sourceType":"Universal"
  }
}
```
