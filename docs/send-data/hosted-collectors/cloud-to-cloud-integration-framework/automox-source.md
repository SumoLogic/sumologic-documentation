---
id: automox-source
title: Automox Source
sidebar_label: Automox
tags:
  - cloud-to-cloud
  - automox
description: The Automox Source provides a secure endpoint to receive all events objects, audit trail events, and device inventory details from the Automox platform.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/automox-logo.png')} alt="automox-logo" width="50" />

Automox is a cloud-based platform for automated IT operations, offering patching, software deployment, and configuration management across Windows, macOS, and Linux devices. It enhances security by automating vulnerability remediation and ensuring systems stay up-to-date.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Events Details](https://developer.automox.com/openapi/axconsole/operation/getEvents/#tag/Events/operation/getEvents) |
| 12 hours |  [List Devices](https://developer.automox.com/openapi/axconsole/operation/getDevices/#tag/Devices/operation/getDevices) |
| 5 min |  [Audit Details](https://developer.automox.com/openapi/audit-trail/operation/getAuditEvents/#tag/Audit-Trail/operation/getAuditEvents) |

## Setup

### Vendor configuration

The Automox source requires you to provide the Bearer Token and Organization ID. Follow the below steps to generate the required values:

- To generate the **Bearer Token**, follow the instructions mentioned in the [Automox documentation](https://developer.automox.com/developer-portal/newbie-api-guide/#step-2-find-your-api-key-in-the-console).
- To generate the **Organization ID**, follow the instructions mentioned in the [Automox documentation](https://developer.automox.com/developer-portal/newbie-api-guide/#step-3-create-your-first-api-call).

### Source configuration

When you create a Automox Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Create a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Automox Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Automox**.
1. Enter a **Name** for the Source. The **description** is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** link to add custom log metadata [Fields](/docs/manage/fields).
   * Define the fields you want to associate, each field needs a name (key) and value.
      * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
      * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
1. In **Bearer Token**, enter the bearer token collected from the Automox platform.
1. In **Organization ID**, enter the Organization ID collected from the Automox platform.
1. Select the **Collect Audit Trail Logs** checkbox to collect the audit details.
1. The **Audit Trail Logs Interval** is set for 5 minutes by default. You can adjust it based on your needs.
1. Select the **Collect Events Logs** checkbox to collect the event details. Enter the supported events that you want to collect. Leaving this empty will collect all events.
1. The **Event Logs Interval** is set for 5 minutes by default. You can adjust it based on your needs.
1. Select the **Collect Devices** checkbox to collect the devices list details.
1. The **Devices Logs Interval** is set for 12 hours by default. You can adjust it based on your needs.
1. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [Use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Automox"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| bearerToken | String | Yes | `null` | The bearer API token created for the account in the Automox console.| |
| orgId | Integer | Yes | `null` | Specify the organization's ID from which the data needs to be pulled.| |
| collectAuditTrailLogs | Boolean | No | `True` | Specifies if we need to collect the audit trail logs.| |
| collectEventLogs | Boolean | No | `False` | Specifies if we need to collect the event logs.| |
| collectDevices | Boolean | No | `False` | Specifies if we need to collect the data of the device.| |
| eventNames | Boolean | NO | `All` | Specify the event names for which the data should be pulled.| |
| pollingIntervalAuditMin | Integer | Yes | 5 minutes | Time interval (in minutes) after which the source will check for new data for API: Audit events. | |
| pollingIntervalEventMin | Integer | Yes | 5 minutes | Time interval (in minutes) after which the source will check for new data for API: Event API. | |
| pollingIntervalDeviceHour | Integer | Yes | 12 hours | Time interval (in hours) after which the source will check for new data for API: List All Devices.| |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/automox/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/automox/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
