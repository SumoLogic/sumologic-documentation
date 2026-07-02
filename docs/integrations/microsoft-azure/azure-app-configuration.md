---
id: azure-app-configuration
title: Azure App Configuration
description: Learn about the Sumo Logic collection process for the Azure App Configuration service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-configuration.png')} alt="Azure App Configuration icon" width="50"/>

[Azure App Configuration](https://learn.microsoft.com/en-us/azure/azure-app-configuration/overview) provides a service to centrally manage application settings and feature flags. This integration helps in monitoring resource usage, such as the total number of requests, number of throttled requests, and request duration per configuration store.

## Log and metric types

For Azure App Configuration, you can collect the following logs and metrics:

* **Resource logs**. To learn more about the different resource log category types and schemas collected for Azure App Configuration, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-app-configuration/monitor-app-configuration-reference#resourcelogs).
* **Platform Metrics for Azure App Configuration**. These metrics are available in [Microsoft.AppConfiguration/configurationStores](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-appconfiguration-configurationstores-metrics) namespace. For more information on supported metrics and dimensions, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-app-configuration/monitor-app-configuration-reference#metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Azure App Configuration store you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/AppConfiguration/Logs`, `Azure/AppConfiguration/Metrics`.

### Configure metrics collection

import MetricsSource from '../../reuse/metrics-source.md';

<MetricsSource/>

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-app-configuration/monitor-app-configuration?tabs=portal#collectionandrouting). Perform the steps below for each Azure App Configuration store that you want to monitor.
   1. Choose `Stream to an event hub` as the destination.
   1. Select `allLogs`.
   1. Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).
