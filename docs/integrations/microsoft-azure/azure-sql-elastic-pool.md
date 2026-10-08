---
id: azure-sql-elastic-pool
title: Azure SQL Elastic Pool
description: Learn about the Sumo Logic collection process for the Azure SQL Elastic Pool service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import MetricsSource from '../../reuse/metrics-source.md';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-sql-elastic-pool.png')} alt="Azure SQL Elastic Pool icon" width="50"/>

The [Azure SQL Elastic Pools](https://learn.microsoft.com/en-us/azure/azure-sql/database/elastic-pool-overview?view=azuresql) are a simple, cost-effective solution for managing and scaling multiple databases that have varying and unpredictable usage demands. This integration helps in monitoring the resource utilization of your elastic pools.

## Metric types

For Azure SQL Elastic pools, you can collect the following metrics:

* **Basic Metrics**. These metrics are available in [Microsoft.Sql/servers/elasticpools](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-sql-servers-elasticpools-metrics) namespace. For more information on supported metrics and dimensions, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-sql/database/metrics-diagnostic-telemetry-logging-streaming-export-configure?tabs=azure-portal&view=azuresql#elastic-pools-in-azure-sql-database).

## Setup

### Configure collector

Create a [hosted collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) if not already configured. Make sure you create the required sources in this collector.

### Configure metrics collection

When you configure the Azure Metrics Source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/SQLElasticPool/Metrics`.

<MetricsSource/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).
