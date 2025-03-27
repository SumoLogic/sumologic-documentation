---
id: azure-sql-elastic-pool
title: Azure SQL Elastic Pool
description: Learn about the Sumo Logic collection process for the Azure SQL Elastic Pool service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-sql-elastic-pool.png')} alt="Thumbnail icon" width="50"/>

The [Azure SQL Elastic Pools](https://learn.microsoft.com/en-us/azure/azure-sql/database/elastic-pool-overview?view=azuresql) are a simple, cost-effective solution for managing and scaling multiple databases that have varying and unpredictable usage demands. This integration helps in monitoring resource utilization of your elastic pools.

## Log and metric types

For Azure SQL Elastic pools, you can collect the following metrics:

* **Basic Metrics**. These metrics are available in [Microsoft.Sql/servers/elasticpools](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-sql-servers-elasticpools-metrics) namespace. For more information on supported metrics and dimensions, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-sql/database/metrics-diagnostic-telemetry-logging-streaming-export-configure?tabs=azure-portal&view=azuresql#elastic-pools-in-azure-sql-database).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Azure SQL Elastic pool you want to monitor. You can forward metrics to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example:  `Azure/SQLElasticPool/Metrics`.

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. Create hosted collector and tag tenant_name field. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />
1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
1. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
1. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure SQL Elastic Pool that you want to monitor.
   * Choose `Stream to an event hub` as destination.
   * Select `Basic`.
   * Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
