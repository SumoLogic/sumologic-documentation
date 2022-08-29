---
id: cylance-source
title: Cylance Source (Beta)
---

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

The Cylance Source provides a secure endpoint to receive event data from the Cylance Threat API. It securely stores the required authentication, scheduling, and state tracking information. One threat event is reported for each affected device.

Collection from two APIs is supported:

* The Cylance Threat API. To collect from this API the Source queries two endpoints and merges the results into a single message. The first API endpoint queried is `/threats/v2` to enumerate a threat based on sha256 hash. Then any involved devices `/threats/v2/<sha256/devices` are merged into the relevant message. One threat event for each affected device is reported.
* The Cylance Inventory (device) API. Collection from this API is optional. The Source will query the `/devices/v2` endpoint and ingest all the devices managed by Cylance.

If you want to explicitly allow the static IP addresses used for this Source on your firewall see our [table of static IP addresses by deployment](docs/send-data/sources/hosted-collectors/cloud-to-cloud-integration-framework/index.md#Static-IP-addresses).

## Before You Begin

This feature is in Beta. To participate, contact your Sumo account executive.

## States

A Cylance Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing [Health Events](/docs/manage/health-events.md).

A Cylance Source goes through the following states when created:

1. **Pending**: Once the Source is submitted it is validated, stored, and placed in a **Pending** state.
2. **Started**: A collection task is created on the Hosted Collector.
3. **Initialized**: The task configuration is complete in Sumo Logic.
4. **Authenticated**: The Source successfully authenticated with Cylance.
5. **Collecting**: The Source is actively collecting data from Cylance.

If the Source has any issues during any one of these states it is placed in an **Error** state.

When you delete the Source it is placed in a **Stopping** state, when it has successfully stopped it is deleted from your Hosted Collector.

On the Collection page, the [Health](docs/manage/health-events.md#Collection-page) and Status for Sources is displayed. Use [Health Events](docs/manage/health-events.md) to investigate issues with collection.

Hover your mouse over the status icon to view a tooltip with details on the detected issue.

## Before You Begin

Create a new integration in the Cylance console. Under **Settings** in the **Integrations** tab, create a new Integration Application. You'll use the provided **Tenant ID**, **Application ID**, and **Application Secret Key** to configure the Cylance Source.


## Create a Cylance Source

When you create a Cylance Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Create a Hosted Collector](/docs/send-data/configure-hosted-collector.md).

To configure a Cylance Source:

1. In the Sumo Logic web app, select** Manage Data > Collection > Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted** **Collector.
1. Select **Cylance**.
1. Enter a **Name **for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata.md) is stored in a searchable field called `_sourceCategory`.
2. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM Enterprise](/docs/cse/index.md). When configured with the **Forward to SIEM** option the following metadata fields are set:

| Field Name   | Value   |
|:-------------|:---------|
| `_siemVendor`  | Cylance |
| `_siemProduct` | PROTECT |
| `_siemFormat`  | JSON    |
| `_siemEventID` | THREAT  |
| `_dataType` (when Collect Inventory (device) information is true and the data is Inventory this field is assigned) | Inventory  |

1. (Optional) **Fields**. Click the **+Add** link to add custom log metadata [Fields](/docs/manage/fields).
    * Define the fields you want to associate, each field needs a name (key) and value.
        * A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
        * An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.

**Cylance Domain**. The domain needed for the integration can be determined using the following table:

| Region                   | API domain                   |
|:-------------------------|:-----------------------------|
| Asia-Pacific - North     | `protectapi-apne1.cylance.com` |
| Asia-Pacific - Southeast | `protectapi-au.cylance.com`   |
| Europe-Central           | `protectapi-euc1.cylance.com`  |
| Government (US)          | `protectapi-us.cylance.com`    |
| North America            | `protectapi.cylance.com`       |
| South America            | `protectapi-sae1.cylance.com`  |

3. Enter the **Application ID**, **Tenant ID**, and** Secret Key** you got from the new Integration Application you created in the [prerequisite](#before-you-begin) step.
4. **Collect Inventory (device) information**. When set to **True** the Source will also collect from the Cylance Inventory (device) API. The Source will query `/devices/v2` periodically, around every 10 hours, and ingest all the devices managed by Cylance.
5. When you are finished configuring the Source click **Submit**.


## Error types

When Sumo Logic detects an issue it is tracked by [Health Events](/docs/manage/health-events.md). The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|---|---|---|---|---|
| ThirdPartyConfig | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which retries will be attempted every 60 minutes. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which retries will be attempted every 60 minutes. | FirstPartyGenericError |

## JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/Collector-Management-API). See [how to use JSON to configure Sources](/docs/send-data/sources/use-json-configure-sources/index.md) for details.


| Parameter | Type | Required? | Description | Access |
|---|---|---|---|---|
| config | JSON Object | Yes | Contains the [configuration parameters](#configParameters) for the Source. |   |
| schemaRef | JSON Object | Yes | Use `{"type":"Cylance"}` for a Cylance Source. | not modifiable |
| sourceType | String | Yes | Use `Universal` for a Cylance Source. | not modifiable |


The following table shows the **config** parameters for a Cylance Source.

| Parameter | Type | Required | Default | Description | Access |
|---|---|---|---|---|---|
| name | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata.md) field `_source`. | modifiable |
| description | String | No | null | Type a description of the source. | modifiable |
| category | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata.md) field `_sourceCategory`. See [best practices](/docs/send-data/design-deployment/best-practices-source-categories.md) for details. | modifiable |
| fields | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| domain | String | Yes |  | The base URL parameter depends on your global region. | modifiable |
| app_id | Boolean | Yes |  | The Cylance application ID you want to use to authenticate collection requests. | modifiable |
| tenant_id | String | Yes |   | The Cylance tenant ID you want to use to authenticate collection requests. | modifiable |
| secret_key | String | Yes |   | The Cylance secret key you want to use to authenticate collection requests. | modifiable |
| collect_inventory | Boolean | No |  | Set to `true` to collect Inventory (device) information. | modifiable |



```json title="Cylance Source JSON example"
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"Cylance"
    },
    "config":{
      "name":"Cylance",
      "description":"East field",
      "domain":"protectapi.cylance.com",
      "app_id":"********",
      "tenant_id":"********",
      "secret_key":"********",
      "collect_inventory":true,
      "fields":{
        "_siemForward":false
      },
      "category":"eastTeamF"
    },
    "sourceType":"Universal"
  }
}
```
