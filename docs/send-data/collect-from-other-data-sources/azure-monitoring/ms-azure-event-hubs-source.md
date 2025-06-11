---
id: ms-azure-event-hubs-source
title: Azure Event Hubs Source for Logs
description: The Azure Event Hubs Source for Logs provides a secure endpoint to receive data from Azure Event Hubs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';


The Azure Event Hubs Source provides a secure endpoint to receive data from Azure Event Hubs. It securely stores the required authentication, scheduling, and state tracking information.

## Data collected

The Azure platform can be configured to export logs to one or more Event Hub destinations. Platform logs include:

* [Resource Logs](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/resource-logs-schema)
* [Activity Logs](https://docs.microsoft.com/en-us/azure/azure-monitor/platform/activity-log-schema)

Third party apps or services can be configured to send event data to Event Hubs as well, including [Auth0](https://auth0.com/docs/logs/streams/azure-event-grid).

## Scaling Event Hubs

There are two factors that influence scaling with Event Hubs:
* **Throughput units** (standard tier) or **Processing units** (premium tier). Configured while creating Event hubs namespace.
* **Partitions**. Configured while creating Event hubs instance in an Event Hubs namespace.

| Expected EPS | Throughput Unit (TU) [Max 40] | Partitions [Max 32] |
|:---|:---|:---|
| 1mb/sec | 1 TU  | 1+ |
| 2mb/sec | 2 TU  | 2+ |
| 10mb/sec | 10 TU  | 10+ |
| 32mb/sec | 32 TU  | 32 |

Throughput units (TUs) and Processing units (PUs) are shared across an Event Hub namespace. If you have multiple Event hubs in a name space, consider increasing the TU/PU units. If your volume exceeds 32 mb/sec, consider splitting the data in multiple Event Hubs namespaces.

## Setup

### Vendor configuration

The Event Hub doesn't have to be in the same subscription as the resource sending logs if the user who configures the setting has appropriate Azure role-based access control access to both subscriptions. By using Azure Lighthouse, it's also possible to have diagnostic settings sent to an event hub in another Azure Active Directory tenant. The event hub namespace needs to be in the same region as the resource being monitored if the resource is regional so you may have to configure multiple Azure Event Hubs Sources. More details about destination limitations and permissions are described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

1. [Create an Event Hub using the Azure portal](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-create) by navigating to Event Hubs in the Azure Portal.<br/><img src={useBaseUrl('img/send-data/AzureEventHubstep1.png')} alt="Azure portal showing search results for 'Event Hubs' with the 'Event Hubs' option highlighted in the Services section." />
2. Create an Event Hubs namespace. In this example, Namespace is set to `cnctest`:<br/><img src={useBaseUrl('img/send-data/AzureEventHubstep2.png')} alt="Azure Event Hubs page with the 'Add' button highlighted." width="300"/> <br/><img src={useBaseUrl('img/send-data/AzureEventHubstep3.png')} alt="Create Namespace page in Azure Event Hubs with fields for Subscription, Resource Group, Namespace Name, and other options. The 'Review + create' button is highlighted." />
3. Create an Event Hub Instance.<br/><img src={useBaseUrl('img/send-data/AzureEventHubstep4.png')} alt="Event Hubs Namespace page showing the 'Event Hub' button highlighted and the 'Shared access policies' option highlighted under Settings." />
    * Shared Access Policies can be set up for the entire namespace. These policies can be used to access/manage all hubs in the namespace. A policy for the namespace is created by default: `RootManageSharedAccessKey`. In this example, Event Hub Instance is set to `my-hub`.<br/><img src={useBaseUrl('img/send-data/AzureEventHubstep5.png')} alt="Create Event Hub page with the 'Name' field set to 'my-hub' and the 'Create' button highlighted." />
4. Create a [Shared Access Policy](https://docs.microsoft.com/en-us/azure/governance/policy/overview) with the Listen claim to the newly created Event Hub Instance. In this example, Event Hub Instance is set to `SumoCollectionPolicy`.<br/><img src={useBaseUrl('img/send-data/AzureEventHubstep6.png')} alt="Event Hubs Namespace overview page showing the 'Event Hubs' section under Entities with the newly created 'my-hub' Event Hub listed." /><br/><img src={useBaseUrl('img/send-data/AzureEventHubstep7.png')} alt="Shared access policies page for the 'my-hub' Event Hub with the 'Add' button highlighted." /><br/><img src={useBaseUrl('img/send-data/AzureEventHubstep8.png')} alt="Add SAS Policy page for the 'my-hub' Event Hub with the policy name set to 'SumoCollectionPolicy' and the 'Listen' permission checked. The 'Create' button is highlighted." />
5. Copy the **Shared access policies** Key. Copy the **Primary key** associated with this policy.<br/><img src={useBaseUrl('img/send-data/AzureEventHubstep9.png')} alt="SAS Policy page for the 'my-hub' Event Hub showing the 'SumoCollectionPolicy' details, including primary and secondary keys, with the 'copy' icon highlighted." />
6. When [configuring the Azure Event Hubs Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/#vendor-configuration) in Sumo Logic, our input fields might be:

  | Field | Value |
  |:---|:---|
  | Azure Event Hubs Namespace | `cnctest` |
  | Event Hubs Instance Name | `my-hub` |
  | Shared Access Policy Name | `SumoCollectionPolicy` |
  | Shared Access Policy Key (use primary key) | `mOsLf3RE...` |


### Source configuration

When you create an Azure Event Hubs Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector/).

To configure an Azure Event Hubs Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
2. On the Collectors page, click **Add Source** next to a HostedCollector.
    :::note
        Make sure the hosted collector is tagged with tenant_name field for the out of the box Azure apps to work. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
    :::
3. Select the **Azure Event Hubs for Logs** app.
4. Enter a Name for the Source. The description is optional.<br/><img src={useBaseUrl('img/send-data/azure-event-hub-name.png')} alt="azure event hub" width="100"/>
5. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
6. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
7. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * A green circle with a check mark is shown when the field exists in the Fields table schema.
   * An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
8. **Azure Event Hubs Namespace**. Enter your Azure Event Hubs Namespace name.
9. **Event Hubs Instance Name**. Enter the Azure Event Hubs Instance Name.
10. **Shared Access Policy**. Enter your Shared Access Policy Name and Key. The Shared Access Policy requires the Listen claim.
11. **Consumer Group Name**. If needed, specify a custom consumer group name. When using a custom Consumer Group make sure that it exists for the Event Hub instance.
12. **Start collecting data field to state the start of data ingestion**. Choose one of the following options:
    * Now
    * 24h ago
    * 72h ago
    * 7 days ago
13. **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
14. **Advanced Options for Logs**.
    * **Timestamp Parsing**. This option is selected by default. If it's deselected, no timestamp information is parsed at all.
    * **Time Zone**. There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs cannot be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
    * **Timestamp Format**. By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference/) for more information.  
15. When you're finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Microsoft` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Azure` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `<metadata.eventType>` | Where `metadata.eventType` is populated from the field in the event JSON, such as Administrative or Resource Health. See more information about the available event types for the Azure platform in Activity Log Categories and Resource Log Categories. Logs that do not contain a category field are assigned category UNKNOWN. |

## Exporting Platform Logs to Event Hub using Diagnostic settings

To create the diagnostic settings in Azure portal, refer to the [documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#create-diagnostic-settings) and choose Stream to an event hub as the destination. Use the event hub namespace and event hub name configured in the Prerequisites section in the destination details section. You can use the default policy RootManageSharedAccessKey as the policy name.

* [Tutorial to Stream Azure Active Directory logs to an Azure event hub](https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/tutorial-azure-monitor-stream-logs-to-event-hub)

## Troubleshooting

For common error messages, refer [Event Hub export error messages](/docs/send-data/collect-from-other-data-sources/azure-monitoring/arm-integration-faq#event-hub-export-error-messages) section.
