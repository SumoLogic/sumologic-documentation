---
id: azure-synapse-analytics
title: Azure Synapse Analytics
description: Learn about the Sumo Logic collection process for the Azure Synapse Analytics service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-synapse-analytics.png')} alt="Thumbnail icon" width="50"/>

[Azure Synapse Analytics](https://learn.microsoft.com/en-gb/azure/synapse-analytics/overview-what-is) is an enterprise analytics service that accelerates time to insight across data warehouses and big data systems. It gives you the freedom to query data on your terms, using either serverless or dedicated resources—at scale. This integration helps in monitoring integrations in your Synapse workspaces, tracking resource utilization (memory, CPU, connections etc) and query load across Spark pools and dedicated SQL pools.

## Log types

For Azure Synapse Analytics, you can collect the following logs:

* **[Workspace-level logs](https://learn.microsoft.com/en-gb/azure/synapse-analytics/monitoring/how-to-monitor-using-azure-monitor#workspace-level-logs)**. Logs emitted by Azure Synapse Analytics workspaces.
* **[Dedicated SQL pool logs](https://learn.microsoft.com/en-gb/azure/synapse-analytics/monitoring/how-to-monitor-using-azure-monitor#dedicated-sql-pool-logs)**. Logs emitted by dedicated SQL pools.
* **[Apache Spark pool logs](https://learn.microsoft.com/en-gb/azure/synapse-analytics/monitoring/how-to-monitor-using-azure-monitor#apache-spark-pool-log)**. Logs emitted by Apache Spark pools.

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).

You must explicitly enable diagnostic settings for each Synapse workspace, dedicated SQL pool, or Apache Spark pool  you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/SynapseAnalytics/Logs`, `Azure/SynapseAnalytics/Metrics`.

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/synapse-analytics/monitoring/how-to-monitor-using-azure-monitor#configure-diagnostic-settings).
   * Choose `Stream to an event hub` as the destination.
   * Select `allLogs`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

You must explicitly enable diagnostic settings for Synapse workspace, dedicated SQL pool, or Apache Spark pool you want to monitor.

