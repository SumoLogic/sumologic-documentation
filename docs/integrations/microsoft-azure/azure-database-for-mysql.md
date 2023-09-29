---
id: azure-database-for-mysql
title: Azure Database for MySQL
description: Learn about the Sumo Logic collection process for the Azure Database for MySQL service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-database-for-mysql.png')} alt="Thumbnail icon" width="50"/>

[Azure Database for MySQL](https://learn.microsoft.com/en-us/azure/mysql/single-server/overview) is a relational database service in the Microsoft cloud based on the MySQL Community Edition database engine. This integration helps in identifying slow queries, tracking database-level activity, including connection, administration, data definition language (DDL), and data manipulation language (DML) events.

The below instructions applies to Azure Database for MySQL with Flexible Server only.

## Log and Metric types

For Azure Database for MySQL, you can collect the following logs and metrics:

* **MySQL Audit logs**. To know more about the different log types and schemas collected for Azure Database for MySQL, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/mysql/flexible-server/concepts-audit-logs#access-audit-logs).
* **MySQL Slow Query Logs**. To know more about the different log types and schemas collected for Azure Database for MySQL, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/mysql/flexible-server/concepts-slow-query-logs#access-slow-query-logs).
* **Platform Metrics for Azure Database for MySQL**. These metrics are available in [Microsoft.DBforMySQL/flexibleServers](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-dbformysql-flexibleservers-metrics) namespace. For more information on supported metrics and dimesnsions, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/mysql/flexible-server/concepts-monitoring#list-of-metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/).
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Azure Database for MySQL server you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/DatabaseForMySQL/Logs`, `Azure/DatabaseForMySQL/Metrics`.

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
2. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
3. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure Database for MySQL server that you want to monitor.
   * Choose `Stream to an event hub` as destination.
   * Select `AllMetrics`.
   * Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To enable slow query logs, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/mysql/flexible-server/concepts-slow-query-logs#configure-slow-query-logging).
2. To enable audit logs, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/mysql/flexible-server/tutorial-configure-audit#configure-auditing-by-using-the-azure-portal).
3. To set up the Azure Event Hubs cloud-to-cloud source in Sumo Logic portal, refer to our [Azure Event Hubs source documentation](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/).
4. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/mysql/flexible-server/tutorial-query-performance-insights#set-up-diagnostics). Perform below steps for each Azure Database for MySQL server that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select `MySqlSlowLogs` and `MySqlAuditLogs`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

## Troubleshooting

### Azure Event Hubs Source

Common error types are described [here](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/#error-types).

You can try [restarting](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/#restarting-your-source) the source for `ThirdPartyConfig` errors.

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
