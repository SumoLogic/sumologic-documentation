---
id: azure-database-for-postgresql
title: Azure Database for PostgreSQL
description: Learn about the Sumo Logic collection process for the Azure Database for PostgreSQL service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-database-for-postgresql.png')} alt="Thumbnail icon" width="50"/>

[Azure Database for PostgreSQL](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/overview) is a fully managed relational database service in the Microsoft cloud based on the PostgreSQL community edition. This integration helps in monitoring resource utilization and identifying slow queries to optimize your workloads and configure your server for the best performance.

The below instructions applies to Azure Database for PostgreSQL with Flexible Server only.

## Log and Metric types

For Azure Database for PostgreSQL, you can collect the following logs and metrics:

* **PostgreSQL Logs**. These logs can be used to identify, troubleshoot, and repair configuration errors and suboptimal performance. To know more about the log format, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-logging#log-format).
* **Audit Logs**. Audit logging of database activities is available through [pgAudit](https://www.pgaudit.org/) extension. By default, pgAudit log statements are emitted along with your regular log statements by using Postgres's standard logging facility. To know more about the audit log format, refer to the [pgAudit documentation](https://github.com/pgaudit/pgaudit/blob/master/README.md#format).
* **Metrics**. These metrics are available for a flexible server instance of Azure Database for PostgreSQL.For more information on supported metrics and instructions for enabling them, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-monitoring#metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/).
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Azure Database for PostgreSQL server you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/DatabaseForPostgreSQL/Logs`, `Azure/DatabaseForPostgreSQL/Metrics`.

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. Enable custom metrics such as [autovacuum](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-monitoring#how-to-enable-autovacuum-metrics), [PgBouncer metrics](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-monitoring#how-to-enable-pgbouncer-metrics), [enhanced metrics](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-monitoring#enhanced-metrics), if required.
2. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
3. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
4. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure Database for PostgreSQL server that you want to monitor.
   * Choose `Stream to an event hub` as destination.
   * Select `AllMetrics`.
   * Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To enable audit logs perform below steps:
   * [Install the pgAudit extension](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-audit#installing-pgaudit).
   * [Configure audit logging](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-audit#pgaudit-settings).
2. To set up the Azure Event Hubs cloud-to-cloud source in Sumo Logic portal, refer to our [Azure Event Hubs source documentation](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/).
3. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/howto-configure-and-access-logs#configure-diagnostic-settings). Perform below steps for each Azure Database for PostgreSQL server that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select `allLogs`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

## Troubleshooting

### Azure Event Hubs Source

Common error types are described [here](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/#error-types).

You can try [restarting](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/#restarting-your-source) the source for `ThirdPartyConfig` errors.

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
