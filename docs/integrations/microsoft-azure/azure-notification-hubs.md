---
id: azure-notification-hubs
title: Azure Notification Hubs
description: Learn about the Sumo Logic collection process for the Azure Notification Hubs service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-notification-hubs.png')} alt="Thumbnail icon" width="50"/>

[Azure Notification Hubs](https://learn.microsoft.com/en-us/azure/notification-hubs/notification-hubs-push-notification-overview) provide an easy-to-use and scaled-out push engine that enables you to send notifications to any platform (iOS, Android, Windows, etc.) from any back-end (cloud or on-premises). This integration helps in monitoring the operations and actions that are conducted against your Azure Notification Hubs namespace.

## Log and metric types

For Azure Notification Hubs, you can collect the following logs:

* **Diagnostic Logs**. These logs are from operations and actions that are conducted against your namespace by using the API, or through management clients on the language SDK.

For more details on logs collected, refer to the [logs schema documentation](https://learn.microsoft.com/en-us/azure/notification-hubs/notification-hubs-diagnostic-logs#diagnostic-logs-schema).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).

You must explicitly enable diagnostic settings for each Azure Notification Hubs namespace you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/NotificationHubs/Logs`, `Azure/NotificationHubs/Metrics`.

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/notification-hubs/notification-hubs-diagnostic-logs#enable-operational-logs). Perform below steps for each Azure Notification Hubs namespace that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select `allLogs`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

