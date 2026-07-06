---
id: azure-data-factory
title: Azure Data Factory
description: Learn about the Sumo Logic collection process for the Azure Data Factory service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-data-factory.png')} alt="Azure Data Factory icon" width="50"/>

[Azure Data Factory](https://learn.microsoft.com/en-gb/azure/data-factory/introduction) is the cloud-based ETL and data integration service that allows you to create data-driven workflows for orchestrating data movement and transforming data at scale. This integration helps in monitoring the scheduled activities and pipelines for success and failure rates.

## Log and metric types

For Azure Data Factory, you can collect the following logs and metrics:

* **Data Factory Diagnostic Logs**. Events emitted by the Pipelines, Activities, Integration Runtimes, and Integration Services.
* **Data Factory Metrics**. Metrics for Data Factory activity, pipeline, trigger runs, for SSIS IR operations, and SSIS package executions.

For more details on logs and metrics collected, refer to the [supported metrics documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-metrics-alerts#data-factory-metrics) and [logs schema documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-schema-logs-events#monitor-schema).

## Setup

### Configure collector

Create a [hosted collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) if not already configured. Make sure you create the required sources in this collector.

### Configure logs collection

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Event Hub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).

You must explicitly enable diagnostic settings for each Data Factory you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/DataFactory/Logs`.

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics).
   * Choose `Stream to an event hub` as the destination.
   * Select `allLogs`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure metrics collection

import MetricsSource from '../../reuse/metrics-source.md';

When you configure the Azure Metrics Source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/DataFactory/Metrics`.

<MetricsSource/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).
