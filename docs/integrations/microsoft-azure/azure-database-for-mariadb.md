---
id: azure-database-for-mariadb
title: Azure Database for MariaDB
description: Learn about the Sumo Logic collection process for the Azure Database for MariaDB service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import MetricsSource from '../../reuse/metrics-source.md';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-database-for-mariadb.png')} alt="Azure Database for MariaDB icon" width="50"/>

[Azure Database for MariaDB](https://learn.microsoft.com/en-us/azure/mariadb/overview) is a relational database service in the Microsoft cloud based on the MariaDB community edition. This integration helps in identifying slow queries, tracking database-level activity, including connection, administration, data definition language (DDL), and data manipulation language (DML) events.

## Log and metric types

For Azure Database for MariaDB, you can collect the following logs and metrics:

* **Audit logs**. To learn more about the different fields collected for Azure Database for MariaDB, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/mariadb/concepts-server-logs#diagnostic-logs).
* **Slow Query logs**. To learn more about the different log types and schemas collected for Azure Database for MySQL, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/mysql/flexible-server/concepts-slow-query-logs#access-slow-query-logs).
* **Platform Metrics for Azure Database for MariaDB**. These metrics are available in [Microsoft.DBforMariaDB/servers](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-dbformariadb-servers-metrics) namespace. For more information on supported metrics and dimensions, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/mariadb/concepts-monitoring#metrics).

## Setup

### Configure collector

Create a [hosted collector](/docs/send-data/hosted-collectors/configure-hosted-collector/) if not already configured. Make sure you create the required sources in this collector.

### Configure logs collection

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports collecting logs from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).

You must explicitly enable diagnostic settings for each Azure Database for MariaDB server you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/DatabaseForMariaDB/Logs`.

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To enable slow query logs, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/mariadb/concepts-server-logs#configure-slow-query-logging).
2. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
3. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/mariadb/howto-configure-server-logs-portal#set-up-diagnostic-logs). Perform the steps below for each Azure Database for MariaDB server that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select `MySqlSlowLogs` and `MySqlAuditLogs`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure metrics collection

When you configure the Azure Metrics Source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/DatabaseForMariaDB/Metrics`.

<MetricsSource/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).
