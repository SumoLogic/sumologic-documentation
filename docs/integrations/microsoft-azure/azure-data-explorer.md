---
id: azure-data-explorer
title: Azure Data Explorer
description: Learn about the Sumo Logic collection process for the Azure Data Explorer service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-data-explorer.png')} alt="Azure Data Explorer icon" width="50"/>

[Azure Data Explorer](https://learn.microsoft.com/en-gb/azure/data-explorer/data-explorer-overview) is a fully managed, high-performance, and big data analytics platform that is easy to analyze high volumes of data in near real time. This integration helps in monitoring the usage, health, and performance of the Azure Data Explorer cluster resources.

## Log and metric types

For Azure Data Explorer, you can collect the following logs and metrics:

* **Ingestion Logs**. These logs have information about ingestion operations and detailed statistics of batches ready for ingestion (duration, batch size, blobs count, and batching types).
* **Commands and Queries**: These logs have information about admin commands and queries that have reached a final state.
* **Tables**: These logs have detailed information about the tables whose extents were scanned during query execution.
* **Journal**: These logs have detailed information about metadata operations.
* **Metrics**
  * Cluster metrics
  * Export metrics
  * Ingestion metrics
  * Streaming ingest metrics
  * Query metrics
  * Materialized view metrics

For more details on logs and metrics collected, refer to the [supported metrics documentation](https://learn.microsoft.com/en-gb/azure/data-explorer/using-metrics#supported-azure-data-explorer-metrics) and [logs schema documentation](https://learn.microsoft.com/en-gb/azure/data-explorer/using-diagnostic-logs?tabs=ingestion#diagnostic-logs-schema).

## Setup

### Configure collector

Create a [hosted collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) if not already configured. Make sure you create the required sources in this collector.

### Configure logs collection

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Event Hub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).

You must explicitly enable diagnostic settings for each Azure Data Explorer cluster you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/DataExplorer/Logs`.

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-explorer/using-diagnostic-logs?tabs=ingestion#enable-diagnostic-logs).
   * Choose `Stream to an event hub` as the destination.
   * Select all the `Categories` under `Logs`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure metrics collection

import MetricsSource from '../../reuse/metrics-source.md';

When you configure the Azure Metrics Source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/DataExplorer/Metrics`.

<MetricsSource/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).
