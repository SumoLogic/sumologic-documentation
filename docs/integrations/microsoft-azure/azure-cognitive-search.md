---
id: azure-cognitive-search
title: Azure Cognitive Search
description: Learn about the Sumo Logic collection process for the Azure Cognitive Search service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-cognitive-search.png')} alt="Azure Cognitive Search icon" width="50"/>

[Azure Cognitive Search](https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search) is a cloud search service that gives developers infrastructure, APIs, and tools for building a rich search experience over private, heterogeneous content in web, mobile, and enterprise applications. This integration helps in analyzing the performance and availability of your search service.

## Log and metric types

For Azure Cognitive Search, you can collect the following logs and metrics:

* **Resource logs**. These logs contains information about query and indexing operations. To learn more about the different resource log category types and schemas collected for Azure Cognitive Search, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/search/monitor-azure-cognitive-search-data-reference#schemas).
* **Platform Metrics for Azure Cognitive Search**. These metrics are available in [Microsoft.Search/searchServices](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-search-searchservices-metrics) namespace.
For more information on supported metrics and dimensions, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/search/monitor-azure-cognitive-search-data-reference#metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each search service you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/CognitiveSearch/Logs`, `Azure/CognitiveSearch/Metrics`.

### Configure metrics collection

import MetricsSource from '../../reuse/metrics-source.md';

<MetricsSource/>

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/search/monitor-azure-cognitive-search#enable-resource-logging). Perform the steps below for each search service that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select `allLogs`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).
