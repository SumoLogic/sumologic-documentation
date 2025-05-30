---
id: azure-event-hubs-source
title: Azure Event Hubs Source
tags:
  - cloud-to-cloud
  - azure-event-hubs
sidebar_label: Azure Event Hubs
---

import React, { useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/azure-event-hubs/example.json';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

:::important
From April 30, 2025, Sumo Logic will no longer support adding a source using this Azure Event Hubs source. Existing Azure Event Hubs source configurations will still work for some time, but we recommend you [migrate](/docs/send-data/collect-from-other-data-sources/azure-monitoring/azure-event-hubs-source-migration/) to the [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
:::

:::note
Collecting data from Azure Event Hubs using this Cloud-to-Cloud collection method supports a throughput limit of 1MB/s (86GB/day) per named Event Hub egress rate. If you require higher throughput, we recommend using [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source).
:::

<img src={useBaseUrl('img/send-data/azure-event-hub.svg')} alt="icon" width="40"/>

This cloud-to-cloud Azure Event Hubs Source provides a secure endpoint to receive data from Azure Event Hubs. It securely stores the required authentication, scheduling, and state tracking information.

:::tip Migrating to C2C
See [Migrating from ARM based Azure Monitor Logs Collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/azure-event-hubs-source-migration).
:::

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min | [Resource Logs](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/resource-logs-schema) |
| 5 min | [Activity Logs](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/activity-log-schema) |

Third party apps or services can be configured to send event data to Event Hubs as well, including [Auth0](https://auth0.com/docs/logs/streams/azure-event-grid).

## Setup

### Vendor configuration

The Event Hub doesn't have to be in the same subscription as the resource sending logs if the user who configures the setting has appropriate Azure role-based access control access to both subscriptions. By using Azure Lighthouse, it's also possible to have diagnostic settings sent to a event hub in another Azure Active Directory tenant. The event hub namespace needs to be in the same region as the resource being monitored if the resource is regional so you may have to configure multiple Azure Event Hubs Sources. More details about destination limitations and permissions are described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

1. [Create an Event Hub using the Azure portal](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-create) by navigating to Event Hubs in the Azure Portal.<br/> ![AzureEventHubstep1.png](/img/send-data/AzureEventHubstep1.png)
1. Create an Event Hubs namespace. In this example, Namespace is set to **cnctest**:<br/>![AzureEventHubstep2.png](/img/send-data/AzureEventHubstep2.png)<br/> ![AzureEventHubstep3.png](/img/send-data/AzureEventHubstep3.png)
1. Create an Event Hub Instance.<br/> ![AzureEventHubstep4.png](/img/send-data/AzureEventHubstep4.png)
    * Shared Access Policies can be set up for the entire namespace. These policies can be used to access/manage all hubs in the namespace. A policy for the namespace is created by default: **RootManageSharedAccessKey** <br/>![AzureEventHubstep5.png](/img/send-data/AzureEventHubstep5.png)
    <br/>In this example, Event Hub Instance is set to <strong>my-hub</strong>.
1. Create a [Shared Access Policy](https://docs.microsoft.com/en-us/azure/governance/policy/overview) with the **Listen** claim to the newly created Event Hub Instance:<br/>  ![AzureEventHubstep6.png](/img/send-data/AzureEventHubstep6.png)<br/>
    ![AzureEventHubstep7.png](/img/send-data/AzureEventHubstep7.png)<br/>
    ![AzureEventHubstep8.png](/img/send-data/AzureEventHubstep8.png)<br/>
    In this example, Event Hub Instance is set to **SumoCollectionPolicy**.
1. Copy the Shared Access Policy Key.<br/>  ![AzureEventHubstep9.png](/img/send-data/AzureEventHubstep9.png)
    Copy the Primary/Secondary key associated with this policy.
1. When [configuring the Azure Event Hubs Source](#vendor-configuration) in Sumo Logic, our input fields might be:

   | Field | Value  |
   |:----------------------------|:----------------------|
   | Azure Event Hubs Namespace | cnctest |
   | Event Hubs Instance Name   | my-hub               |
   | Shared Access Policy Name  | SumoCollectionPolicy |
   | Shared Access Policy Key<br/>(use primary key)  | mOsLf3RE…            |

### Source configuration

When you create an Azure Event Hubs Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Azure Event Hubs Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a **HostedCollector**.
:::
    Make sure the hosted collector is tagged with tenant_name field for the out of the box Azure apps to work. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
:::
1. Search for and select **Azure Event Hubs**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.  
1. **Azure Event Hubs Namespace**. Enter your Azure Event Hubs Namespace name. 
1. **Event Hubs Instance Name**. Enter the Azure Event Hubs Instance Name.
1. **Shared Access Policy**. Enter your Shared Access Policy Name and Key. The Shared Access Policy requires the **Listen** claim.
1. **Consumer Group Name**. If needed, specify a custom consumer group name. When using a custom **Consumer Group** make sure that it exists for the Event Hub instance.
1. **Receive data with latest offset or from timestamp**. Choose one of the following options:
    * **Latest offset** (default) - this will start the receiver with the latest offset and collect any new logs received to the Event Hub moving forward.
    * **Timestamp** - use this option to start receiving logs from a specific point in time in the event stream. **Timestamp** can be used to ingest historical data. Once all historical data has been ingested it is recommended to switch to **Latest offset.** This will ensure the Collector continues from the latest recorded checkpoint when restarted and not use the **Timestamp** specified as a starting point, which could result in logs being received and processed more than once.        
1. **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in Create a Processing Rule.
1. **Advanced Options for Logs**.
   * **Timestamp Parsing**. This option is selected by default. If it's deselected, no timestamp information is parsed at all.
   * **Time Zone**. There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs cannot be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
   * **Timestamp Format**. By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference) for more information.        
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemDataType` | `Inventory` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Azure` | Set when **Forward To SIEM** is checked. |
| `_siemVendor` | `Microsoft` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `<metadata.eventType>` | Where `metadata.eventType` is populated from the field in the event JSON, such as Administrative or Resource Health. See more information about the available event types for the Azure platform in Activity Log Categories and Resource Log Categories. Logs that do not contain a category field are assigned category UNKNOWN. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Azure Event Hubs"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| namespace | String | Yes | `null` | Your Azure Event Hubs Namespace name. |  |
| hub_name | String | Yes	 | `null` | The Azure Event Hubs Instance Name. |  |
| access_policy_name | String | Yes | `null` | Your Shared Access Policy Name. The Shared Access Policy requires the Listen claim. |  |
| access_policy_key | String | Yes |`null`  | Your Shared Access Policy Key. The Shared Access Policy requires the Listen claim. |  |
| consumer_group | String | Yes | $Default | If needed, specify a custom consumer group name. When using a custom Consumer Group make sure that it exists for the Event Hub instance. |  |
| receive_with_latest_offset | Boolean | Yes | True | Receive data with the latest offset or from the timestamp. |  |
| receive_from_timestamp | Boolean | No  | `null` | Set to true when receive_with_latest_offset is false. |  |
| timeZone | String | No | null | Type the time zone you'd like the source to use in TZ database format. | `"America/Los_Angeles"`. See [time zone format](/docs/send-data/use-json-configure-sources) for details. |
| forceTimeZone | Boolean | No | false | Type `true` to force the Source to use a specific time zone, otherwise type `false` to use the time zone found in the logs. The default setting is false. |  |
| automaticDateParsing | Boolean | No | true | Determines if timestamp information is parsed or not. Type `true` to enable automatic parsing of dates (the default setting); type `false` to disable. If disabled, no timestamp information is parsed at all. |  |
| autoParseTimeFormat | Boolean | No | true | Sets if the timestamp format is automatically detected by Sumo Logic. If `autoParseTimeFormat` is set to false, then `defaultDateFormats` must be specified. |  |
| defaultDateFormats | array | No | `null` | Define formats for the dates present in your log messages. You can specify a locator regex to identify where timestamps appear in log lines.<br/>The `defaultDateFormats` object has two elements:<br/>`format` (required)—Specify the date format.<br/>`locator` (optional)—A regular expression that specifies the location of the timestamp in your log lines. | For example, `INFO(.*)`<br/> For an example, see [Timestamp example](/docs/send-data/use-json-configure-sources/#timestamp-example).<br/>For more information about timestamp options, see [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference). |

## Examples

<>
  {(() => {
    const [json, setJson] = React.useState('');
    const [tf, setTf] = React.useState('');

    React.useEffect(() => {
      fetch(useBaseUrl('/files/c2c/azure-event-hubs/example.json'))
        .then(res => res.text())
        .then(setJson);
      fetch(useBaseUrl('/files/c2c/azure-event-hubs/example.tf'))
        .then(res => res.text())
        .then(setTf);
    }, []);

    return (
      <>
        <h3>JSON example</h3>
        <CodeBlock language="json">{json}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/azure-event-hubs/example.json')} target="_blank" rel="noopener noreferrer">Download example</a>

        <h3>Terraform example</h3>
        <CodeBlock language="hcl">{tf}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/azure-event-hubs/example.tf')} target="_blank" rel="noopener noreferrer">Download example</a>
      </>
    );
  })()}
</>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
