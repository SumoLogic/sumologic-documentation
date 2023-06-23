---
id: tenable-source
title: Tenable Source
sidebar_label: Tenable
description: The Tenable Source provides a secure endpoint to ingest audit-log events, vulnerability, and asset data from the Tenable.io APIs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/tenable-logo.png')} alt="icon" width="150"/>

The Tenable Source provides a secure endpoint to ingest audit-log events, vulnerability, and asset data from the [Tenable.io APIs](https://developer.tenable.com). It securely stores the required authentication, scheduling, and state tracking information.
   * The Vulnerability [Export API](https://developer.tenable.com/reference/exports-vulns-request-export) first exports vulnerabilities that are used to initiate export jobs. Next, it gets the export [status](https://developer.tenable.com/reference/exports-vulns-export-status) and then [downloads exported vulnerabilities](https://developer.tenable.com/reference/exports-vulns-download-chunk) in a chunk.
   * The Audit Log API is used to collect [audit logs](https://developer.tenable.com/reference/audit-log-events). It does not provide a pagination function. Logs are polled every 24 hours with a limit of 5,000.
   * The Asset Export API first [exports assets](https://developer.tenable.com/reference/exports-assets-request-export) that are used to initiate export jobs. Next, it gets the export [status](https://developer.tenable.com/reference/exports-assets-request-export) and then [downloads exported assets](https://developer.tenable.com/reference/exports-assets-download-chunk) in a chunk.

:::note
This Source is available in the [Fed deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## States

A Tenable Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing [Health Events](/docs/manage/health-events#collection-page).

A Tenable Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Tenable.
1. **Collecting**. The Source is actively collecting data from Tenable.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the [Health](/docs/manage/health-events#collection-page) and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events#collection-page) to investigate issues with collection.

![Tenable error.png](/img/send-data/Tenable-error.png)

Hover your mouse over the status icon to view a tooltip with details on the detected issue.

![health error generic.png](/img/send-data/health-error-generic.png)

## Prerequisite

The Tenable Source is configured with a Tenable IO Access and Secret Key. Your account must have `ADMINISTRATOR [64]` user permissions.

## Create a Tenable Source

When you create a Tenable Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure A Tenable Source:

1. In Sumo Logic, navigate to** Manage Data > Collection** and open the **Collection** tab.

1. On the Collectors page, click **Add Source** next to a Hosted Collector.

1. Select **Tenable**.

   ![Tenable icon.png](/img/send-data/Tenable-icon.png)

1. Enter a **Name **for the Source. The description is optional.

   ![tenable_source.png](/img/send-data/tenable_source.png)

1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.

1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM Enterprise](/docs/cse). When configured with the **Forward to SIEM** option the following metadata fields are set:

   * `_siemVendor`: Tenable
   * `_siemProduct`: Cloud API
   * `_siemFormat`: JSON
   * `_siemEventID`: Set to the type of data ingested.

     * Vulnerabilities: vulnerability
     * Audits: {action}
     * Assets (Inventory): assets

   * `_siemDataType` (Only with Assets (Inventory) data): Inventory

1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.

1. Provide the **Access Key** and **Secret Key** to authenticate requests.

1. (Optional) **Include unlicensed objects**. Select the checkbox if you want to collect unlicensed objects.

1. **Supported APIs to collect**. Select one or more of the available APIs: **Vulnerability Data**, **Audit Logs**, and **Asset Data**.

1. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).

1. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue it is tracked by [Health Events](/docs/manage/health-events#collection-page). The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | Yes     | The Source will retry for up to 90 minutes, after which retries will be attempted every 60 minutes. | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs.                                     | Yes     | The Source will retry for up to 90 minutes, after which retries will be attempted every 60 minutes. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs.                                     | Yes     | The Source will retry for up to 90 minutes, after which retries will be attempted every 60 minutes. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

### Base URL

Internally, the source will use the following base URL depending on the respective environment:

| BASE URL | Value |
|:--|:--|
| Non-Fed Env. | https://cloud.tenable.com |
| Fed Env. | https://fedcloud.tenable.com |

#### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/cse). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config | JSON Object | Yes | Contains the [configuration parameters](#config-parameters) for the Source. |   |
| schemaRef | JSON Object | Yes | Use `{"type":"Tenable"}` for a Tenable Source. | not modifiable         |
| sourceType | String | Yes | Use `Universal` for a Tenable Source. | not modifiable |

#### Config Parameters

The following table shows the **config** parameters for a Tenable Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `access_key` | String | Yes |  | The Tenable access key you want to use to authenticate collection requests. | modifiable |
| `secret_key` | String | Yes |  | The Tenable secret key you want to use to authenticate collection requests. | modifiable |
| `fed_cloud` | Boolean | No | False | Set to true if tenable.io uses FedRAMP environment. | modifiable |
| `include_unlicensed_assets` | Boolean | No | False | Set to true if you want to collect unlicensed objects. | modifiable |
| `supported_apis` | Array of strings | No | Vulnerability Data | Define one or more of the available APIs to collect:<br/>Vulnerability Data, Audit Logs, and Asset Data.<br/>For example, for both you'd use:["Vulnerability Data","Audit Logs","Asset Data"] | modifiable |

See how to [create processing rules using JSON](/docs/send-data/use-json-configure-sources).

Tenable Source JSON example:

```json
{
    "api.version": "v1",
    "source": {
        "schemaRef": {
            "type": "Tenable"
        },
        "config": {
            "name": "Tenable",
            "description": "East field",
            "access_key": "********",
            "secret_key": "********",
            "supported_apis": ["Vulnerability Data","Audit Logs","Asset Data"],
            "fields": {
                "_siemForward": false
            },
            "category": "eastTeamF"
        },
        "sourceType": "Universal"
    }
}
```
