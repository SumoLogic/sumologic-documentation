---
id: azure-sql-elastic-pool
title: Azure SQL Elastic Pool
description: Learn about the Sumo Logic collection process for the Azure SQL Elastic Pool service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-sql-elastic-pool.png')} alt="Azure SQL Elastic Pool icon" width="50"/>

The [Azure SQL Elastic Pools](https://learn.microsoft.com/en-us/azure/azure-sql/database/elastic-pool-overview?view=azuresql) are a simple, cost-effective solution for managing and scaling multiple databases that have varying and unpredictable usage demands. This integration helps in monitoring the resource utilization of your elastic pools.

## Log and metric types

For Azure SQL Elastic pools, you can collect the following metrics:

* **Basic Metrics**. These metrics are available in [Microsoft.Sql/servers/elasticpools](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-sql-servers-elasticpools-metrics) namespace. For more information on supported metrics and dimensions, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-sql/database/metrics-diagnostic-telemetry-logging-streaming-export-configure?tabs=azure-portal&view=azuresql#elastic-pools-in-azure-sql-database).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Azure SQL Elastic pool you want to monitor. You can forward metrics to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example:  `Azure/SQLElasticPool/Metrics`.

### Configure metrics collection

import MetricsSource from '../../reuse/metrics-source.md';

<MetricsSource/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).
