---
id: azure-database-for-postgresql
title: Azure Database for PostgreSQL
description: Learn about the Sumo Logic collection process for the Azure Database for PostgreSQL service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-database-for-postgresql.png')} alt="Thumbnail icon" width="50"/>

[Azure Database for PostgreSQL](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/overview) is a fully managed relational database service in the Microsoft cloud based on the PostgreSQL community edition. This integration helps in monitoring resource utilization and identifying slow queries to optimize your workloads and configure your server for the best performance.

The instructions below apply to Azure Database for PostgreSQL with Flexible Server only.

## Log and metric types

For Azure Database for PostgreSQL, you can collect the following logs and metrics:

* **PostgreSQL Logs**. These logs can be used to identify, troubleshoot, and repair configuration errors and suboptimal performance. To learn more about the log format, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-logging#log-format).
* **Activity logs**. Provides insight into any subscription-level or management group-level events that have occurred in Azure. To learn more, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log-schema).
* **Metrics**. These metrics are available for a flexible server instance of Azure Database for PostgreSQL. For more information on supported metrics and instructions for enabling them, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-monitoring#metrics).


The above-mentioned metrics for **Azure Database for PostgreSQL** are available in [Microsoft.DBforPostgreSQL/flexibleServers](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-dbforpostgresql-flexibleservers-metrics), [Microsoft.DBforPostgreSQL/servers](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-dbforpostgresql-servers-metrics) namespaces.

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* **PostgreSQL Audit logs**. Azure Database for PostgreSQL flexible server provides users with the ability to configure audit logs. Audit logs can be used to track database-level activity including connection, admin, DDL, and DML events. These types of logs are commonly used for compliance purposes. To learn more about the different log types and schemas collected for Azure Database for PostgreSQL, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-audit).
* Logs collection from [Azure Monitor](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-monitoring#logs) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Azure Database for the PostgreSQL server you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/DatabaseForPostgreSQL/Logs`, `Azure/DatabaseForPostgreSQL/Metrics`.

### Configure metrics collection

import MetricsSourceBeta from '../../reuse/metrics-source-beta.md';

<MetricsSourceBeta/>

### Configure logs collection

#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to the [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the diagnostic settings in the Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform the steps below for each Azure Redis cache account that you want to monitor.
   1. Choose **Stream to an event hub** as the destination.
   1. Select `allLogs`.
   1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/azureflexible-postgresqlserver-logs.png')} alt="Azure flexible postgresql server logs" style={{border: '1px solid gray'}} width="800" />
3. Set server parameters as given below:
   - `wal_level`. Set to **logical**.
   - `log_statement_stats`. Set to **ON**.
   - `log_statement`. Select **ALL**.
   - `log_lock_waits`. Set to **ON**. Set `deadlock_timeout`
   - `log_recovery_conflict_waits`. Set to **ON**.


4. Tag the location field in the source with the right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Redis Cache Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Skip this step if you are already collecting activity logs for a subscription.

:::note
Since this source contains logs from multiple regions, ensure that you do not tag this source with the location tag.
:::

## Installing the Azure Flexible Database for PostgreSQL app

Now that you have set up data collection, install the Azure Database for PostgreSQL Sumo Logic app to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallIndexV2 from '../../reuse/apps/app-install-index-option.md';

<AppInstallIndexV2/>

As part of the app installation process, the following fields will be created by default:

- `tenant_name`. This field is tagged at the collector level. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
- `location`. The region the resource name belongs to.
- `subscription_id`. ID associated with a subscription where the resource is present.
- `resource_group`. The resource group name where the Azure resource is present.
- `provider_name`. Azure resource provider name (for example, Microsoft.Network).
- `resource_type`. Azure resource type (for example, storage accounts).
- `resource_name`. The name of the resource (for example, storage account name).
- `service_type`. Type of the service that can be accessed with an Azure resource.
- `service_name`. Services that can be accessed with an Azure resource (for example, in Azure Container Instances the service is Subscriptions).

## Viewing the Flexible Database for PostgreSQL dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Disk

The **Azure Database for PostgreSQL - Disk** dashboard provides insights on Number of Temporary Files Created, Blocks Hit Count, Number of I/O Operations, Number of Temp Files Created, Total Bytes Written to Temp Files (Bytes), Disk I/Os Consumed/min (%), Disk Bandwidth Consumed/min (%), Number of Outstanding I/O Operations, Blocks Read Count, Total Bytes Written to Temp Files, Disk Bandwidth Consumed/min (%), and Disk I/Os Consumed/min (%).

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForPostgresql/Azure-Database-for-PostgreSQL-Disk.png')} alt="Azure Database for PostgreSql - Disk" style={{border: '1px solid gray'}} width="800" />

### Administrative Operations

The **Azure Database for PostgreSQL - Administrative Operations** dashboard provides insights on the top 10 operations that caused the most errors, Distribution by Operation Type (Read, Write, and Delete), Distribution by Operations, Recent Write Operations, Recent Delete Operations, Users/Applications by Operation type, and Distribution by Status.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForPostgresql/Azure-Database-for-PostgreSQL-Administrative-Operations.png')} alt="Azure Database for PostgreSql - Administrative Operations" style={{border: '1px solid gray'}} width="800" />

### Autovacuum

The **Azure Database for PostgreSQL - Autovacuum** dashboard provides insights on Estimated Dead Rows User Tables, Estimated Live Rows User Tables, Estimated Modifications User Tables, Analyze Counter User Tables, Vacuum Counter User Tables, User Tables Vacuumed vs AutoVacuumed, and User Tables Analyzed vs User Tables Auto.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForPostgresql/Azure-Database-for-PostgreSQL-Autovacuum.png')} alt="Azure Database for PostgreSql - Autovacuum" style={{border: '1px solid gray'}} width="800" />

### Connections

The **Azure Database for PostgreSQL - Connections** dashboard provides insights on Active Connections, Failed Connections, Succeeded Connections, Max Connections, and Active vs Succeeded vs Failed Connections.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForPostgresql/Azure-Database-for-PostgreSQL-Connections.png')} alt="Azure Database for PostgreSql - Connections" style={{border: '1px solid gray'}} width="800" />

### Error Logs

The **Azure Database for PostgreSQL - Error Logs** dashboard provides insights on Log by Sql Errcode, Log by Severity, Database Shut Down Events, Log by Backend Type, Database System Up Events, Top Error Statements, and Top Fatal Errors.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForPostgresql/Azure-Database-for-PostgreSQL-Error-Logs.png')} alt="Azure Database for PostgreSql - Error Logs" style={{border: '1px solid gray'}} width="800" />

### Overview

The **Azure Database for PostgreSQL - Overview** dashboard provides insights on Requests by Location, Is DB Alive, Number of Backends Connected to Database, and Number of Deadlocks Detected in Database.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForPostgresql/Azure-Database-for-PostgreSQL-Overview.png')} alt="Azure Database for PostgreSql - Overview" style={{border: '1px solid gray'}} width="800" />

### Performance
The **Azure Database for PostgreSQL - Performance** dashboard provides insights on Max CPU (%), Max Memory (%), Cpu Credits Consumed, Cpu Credits Remaining, Read Throughput, Read Iops, Write Throughput, and Write Iops.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForPostgresql/Azure-Database-for-PostgreSQL-Performance.png')} alt="Azure Database for PostgreSql - Performance" style={{border: '1px solid gray'}} width="800" />

### Policy and Recommendations
The **Azure Database for PostgreSQL -  Policy and Recommendations** dashboard provides insights on Total Success Policy Events, Total Success Policy Events, Total Failed Policy Events, Failed Policy Events, Total Recommendation Events, and Recent Recommendation Events.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForPostgresql/Azure-Database-for-PostgreSQL-Policy-and-Recommendations.png')} alt="Azure Database for PostgreSql - Policy and Recommendations" style={{border: '1px solid gray'}} width="800" />

### Health
The **Azure Application Gateway - Health** dashboard provides insights on recent alerts, resource health incidents, recent resource health status by resource name, trend by event type, downtime by causes, and trend of unavailable, degraded, and available.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForPostgresql/Azure-Database-for-PostgreSQL-Health.png')} alt="Azure Database for PostgreSql - Health" style={{border: '1px solid gray'}} width="800" />

### Replication

The **Azure Database for PostgreSQL - Replication** dashboard provides insights on Average Replication Lag, Physical Replication Lag, and Logical Replication Lag.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForPostgresql/Azure-Database-for-PostgreSQL-Replication.png')} alt="Azure Database for PostgreSql - Error Logs" style={{border: '1px solid gray'}} width="800" />

### Schema Overview

The **Azure Database for PostgreSQL - Schema Overview** dashboard provides insights on Indexes Scanned By Schema, Rows Inserted By Schema, Rows Updated By Schema, Rows Deleted By Schema, Dead Rows By Schema, Live Rows By Schema, Sequential Scan By Schema, and Tables Vacuumed By Schema.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForPostgresql/Azure-Database-for-PostgreSQL-Schema-Overview.png')} alt="Azure Database for PostgreSql - Schema Overview" style={{border: '1px solid gray'}} width="800" />

### Sessions

The **Azure Database for PostgreSQL - Sessions** dashboard provides insights on Longest Transaction Time (Sec), Oldest Backend Time (Sec), Longest Query Time (Sec), Oldest Backend Xmin (Sec), Oldest Backend Xmin Age, Application Name with Most Sessions, and Session duration distribution.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForPostgresql/Azure-Database-for-PostgreSQL-Sessions.png')} alt="Azure Database for PostgreSql - Sessions" style={{border: '1px solid gray'}} width="800" />

### Storage Overview

The **Azure Database for PostgreSQL - Storage Overview** dashboard provides insights on Storage Used (Bytes), Storage Used (%), Storage Used by Transaction Logs(Bytes), Max Backup Storage Used (Bytes), Database Size (Bytes), Storage Free (Bytes), Egress (Bytes), and Ingress (Bytes).

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForPostgresql/Azure-Database-for-PostgreSQL-Storage-Overview.png')} alt="Azure Database for PostgreSql - Storage Overview" style={{border: '1px solid gray'}} width="800" />

### Transactions

The **Azure Database for PostgreSQL - Transactions** dashboard provides insights on Transactions Per Second, Total Transactions, Transactions Commit, Transactions Rollback, Maximum Used TransactionIDs, Delete Transactions, Insert Transactions, Fetched Transactions, Returned Transactions, Returned Transactions, and Update Transactions.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForPostgresql/Azure-Database-for-PostgreSQL-Transactions.png')} alt="Azure Database for PostgreSql - Transactions" style={{border: '1px solid gray'}} width="800" />

### Azure Database for PostgreSQL alerts
These alerts are metric based and will work for all Azure Database for PostgreSQL.

| Alert Name                                           | Alert Description and Conditions                                                                                                                         | Alert Condition  | Recover Condition |
|:-----------------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------|:------------------|
| `Azure Database for PostgreSQL - Active Connections` | This alert is triggered  when Average Active Connections Count is greater than 1000.                                                                     | Count >= 1000    | Count < 1000      |
| `Azure Database for PostgreSQL - CPU Percent`        | This alert is triggered  when CPU Percentage is greater than 90. Also a warning type alert will be triggered  when CPU Percentage is greater than 80.    | Percentage >= 90 | Percentage < 90   |
| `Azure Database for PostgreSQL - Failed Connections` | This alert is triggered when Failed Connections Count is greater than 10.                                                                                | Count >= 10      | Count < 10        |
| `Azure Database for PostgreSQL - Memory Percent`     | This alert is triggered when Memory Percentage is greater than 80. Also a warning type alert will be triggered when Memory Percentage greater than 70.   | percentage >= 80 | percentage < 80   |
| `Azure Database for PostgreSQL - Storage Percent`    | This alert is triggered when Storage Percent greater than 95. Also a warning type alert will be triggered when Storage Percent greater than 90.          | percentage >= 95 | percentage < 95   |

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).

## Upgrade/Downgrade the Azure Flexible Database for PostgreSQL app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Flexible Database for PostgreSQL app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
