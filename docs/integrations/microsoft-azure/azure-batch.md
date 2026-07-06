---
id: azure-batch
title: Azure Batch
description: Learn about the Sumo Logic collection process for the Azure Batch service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-batch.png')} alt="Azure Batch icon" width="50"/>

[Azure Batch](https://learn.microsoft.com/en-us/azure/batch/) runs large-scale parallel and high-performance computing (HPC) batch jobs efficiently in Azure. This integration helps in monitoring health of the nodes; creation, update, and deletion events of individual Batch resources, such as a pool or task; and tracking the state (start/fail/complete) of jobs and tasks.

## Log and metric types

For Azure Batch, you can collect the following logs and metrics:

* **[Service Logs](https://learn.microsoft.com/en-us/azure/batch/batch-diagnostics#service-log-events)**. Events emitted by the Batch service during the lifetime of an individual resource such as a pool or task.
* **[Batch account metrics](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-batch-batchaccounts-metrics)**. Metrics at the Batch account level.

## Setup

### Configure collector

Create a [hosted collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) if not already configured. Make sure you create the required sources in this collector.

### Configure logs collection

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Event Hub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).

You must explicitly enable diagnostic settings for each Batch account you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/Batch/Logs`.

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/batch/batch-diagnostics#enable-collection-of-batch-diagnostic-logs).
   * Choose `Stream to an event hub` as the destination.
   * Select `allLogs` and `audit`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure metrics collection

import MetricsSource from '../../reuse/metrics-source.md';

When you configure the Azure Metrics Source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/Batch/Metrics`.

<MetricsSource/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).
