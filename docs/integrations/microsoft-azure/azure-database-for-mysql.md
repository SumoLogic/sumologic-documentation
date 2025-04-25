---
id: azure-database-for-mysql
title: Azure Database for MySQL
description: Learn about the Sumo Logic collection process for the Azure Database for MySQL service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-database-for-mysql.png')} alt="Thumbnail icon" width="50"/>

[Azure Database for MySQL](https://learn.microsoft.com/en-us/azure/mysql/single-server/overview) is a relational database service in the Microsoft cloud based on the MySQL Community Edition database engine. This integration helps in identifying slow queries, and tracking database-level activity, including connection, administration, data definition language (DDL), and data manipulation language (DML) events.

The instructions below apply to Azure Database for MySQL with Flexible Server only.

## Log and metric types

For Azure Database for MySQL, you can collect the following logs and metrics:

* **MySQL Audit logs**. Azure Database for MySQL flexible server provides users with the ability to configure audit logs. Audit logs can be used to track database-level activity including connection, admin, DDL, and DML events. These types of logs are commonly used for compliance purposes. To learn more about the different log types and schemas collected for Azure Database for MySQL, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/mysql/flexible-server/concepts-audit-logs#access-audit-logs).
* **MySQL Slow Query Logs**. In the Azure Database for MySQL flexible server, the slow query log is available to users to configure and access. Slow query logs are disabled by default and can be enabled to assist with identifying performance bottlenecks during troubleshooting. To learn more about the different log types and schemas collected for Azure Database for MySQL, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/mysql/flexible-server/concepts-slow-query-logs#access-slow-query-logs).
* **MySQL Error Logs**. In the Azure Database for MySQL flexible server, the error log is available to users to configure and access. Error logs in MySQL gather diagnostic messages during server startup and shutdown and while the server is running, to provide information that can help proactive troubleshooting. For more information about the MySQL error log, see the [Error Log Documentation](https://learn.microsoft.com/en-us/azure/mysql/flexible-server/concepts-error-logs).
   :::note
   MySQL Error Logs are currently in a preview phase and are only available under Server Logs. These logs cannot be emitted to Azure diagnostic logs directly. To access the error logs, navigate to **Server Logs > Error Logs**, download them, and then [upload the logs](/docs/send-data/hosted-collectors/http-source/logs-metrics/upload-logs) to a Sumo Logic HTTP source endpoint.
   :::
* **Platform Metrics for Azure Database for MySQL**. These metrics are available in the [Microsoft.DBforMySQL/flexibleServers](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-dbformysql-flexibleservers-metrics) namespace. For more information on supported metrics and dimensions, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/mysql/flexible-server/concepts-monitoring#list-of-metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Activity Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/). It is recommended to create a separate source for activity logs. If you are already collecting these logs, you can skip this step.
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Azure Database for MySQL server you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/DatabaseForMySQL/Logs`, `Azure/DatabaseForMySQL/Metrics`.

### Configure field in field schema

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Fields**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**. 
2. Search for the following fields:
   - `tenant_name`. This field is tagged at the collector level. You can get the tenant name using the instructions in the [Microsoft Documentation](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
   - `location`. The region to which the resource name belongs to.
   - `subscription_id`. ID associated with a subscription where the resource is present.
   - `resource_group`. The resource group name where the Azure resource is present.
   - `provider_name`. Azure resource provider name (for example, Microsoft.Network).
   - `resource_type`. Azure resource type (for example, storage accounts).
   - `resource_name`. The name of the resource (for example, storage account name).
   - `service_type`. Type of the service that can be accessed with a Azure resource.
   - `service_name`. Services that can be accessed with an Azure resource (for example, Azure SQL databases in Azure SQL Server).
3. Create the fields if they are not present. Refer to [Manage fields](/docs/manage/fields/#manage-fields).

### Configure Field Extraction Rules

Create the following Field Extraction Rules (FER) for Azure Storage by following the instructions in the [Create a Field Extraction Rule](/docs/manage/field-extractions/create-field-extraction-rule/).

#### Azure location extraction FER

   ```sql
   Rule Name: AzureLocationExtractionFER
   Applied at: Ingest Time
   Scope (Specific Data): tenant_name=*
   ```

   ```sql title="Parse Expression"
   json "location", "properties.resourceLocation", "properties.region" as location, resourceLocation, service_region nodrop
   | replace(toLowerCase(resourceLocation), " ", "") as resourceLocation
   | if (!isBlank(resourceLocation), resourceLocation, location) as location
   | if (!isBlank(service_region), service_region, location) as location 
   | if (isBlank(location), "global", location) as location
   | fields location
   ```

#### Resource ID extraction FER

   ```sql
   Rule Name: AzureResourceIdExtractionFER
   Applied at: Ingest Time
   Scope (Specific Data): tenant_name=*
   ```

   ```sql title="Parse Expression"
   json "resourceId", "ResourceId" as resourceId1, resourceId2 nodrop
   | if (isBlank(resourceId1), resourceId2, resourceId1) as resourceId
   | toUpperCase(resourceId) as resourceId
   | parse regex field=resourceId "/SUBSCRIPTIONS/(?<subscription_id>[^/]+)" nodrop
   | parse field=resourceId "/RESOURCEGROUPS/*/" as resource_group nodrop
   | parse regex field=resourceId "/PROVIDERS/(?<provider_name>[^/]+)" nodrop
   | parse regex field=resourceId "/PROVIDERS/[^/]+(?:/LOCATIONS/[^/]+)?/(?<resource_type>[^/]+)/(?<resource_name>.+)" nodrop
   | parse regex field=resource_name "(?<parent_resource_name>[^/]+)(?:/PROVIDERS/[^/]+)?/(?<service_type>[^/]+)/?(?<service_name>.+)" nodrop
   | if (isBlank(parent_resource_name), resource_name, parent_resource_name) as resource_name
   | fields subscription_id, location, provider_name, resource_group, resource_type, resource_name, service_type, service_name
   ```

### Configure metric rules

Create the following metrics rules by following the instructions in [Create a metrics rule](/docs/metrics/metric-rules-editor/#create-a-metrics-rule).

#### Azure observability metadata extraction flexible mysql server level

```sql
Rule Name: AzureObservabilityMetadataExtractionFlexibleMySQLServerLevel
```

```sql title="Metric match expression"
resourceId=/SUBSCRIPTIONS/*/RESOURCEGROUPS/*/PROVIDERS/*/FLEXIBLESERVERS/* tenant_name=*
```

| Fields extracted  | Metric rule          |
|:------------------|:---------------------|
| subscription_id   | $resourceId._1       |
| resource_group    | $resourceId._2       |
| provider_name     | MICROSOFT.DBFORMYSQL |
| resource_type     | FLEXIBLESERVERS      |
| resource_name     | $resourceId._3       |


### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, onto an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. Create a hosted collector and tag the `tenant_name` field. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />
2. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
1. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
1. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform the steps below for each Flexible Mysql Server resource that you want to monitor.
   1. Choose `Stream to an event hub` as the destination.
   1. Select `AllMetrics`.
   1. Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by the ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name. <br/><img src={useBaseUrl('img/send-data/azureflexible-mysqlserver-metrics.png')} alt="Azure flexible mysql server metrics" style={{border: '1px solid gray'}} width="800" />
4. Tag the location field in the source with the right location value.
   <img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Database for MySql Tag Location" style={{border: '1px solid gray'}} width="500" />

### Configure logs collection

#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to the [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the diagnostic settings in the Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform the steps below for each Azure Redis cache account that you want to monitor.
   1. Choose **Stream to an event hub** as the destination.
   1. Select `allLogs`.
   1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.
   <img src={useBaseUrl('img/send-data/azureflexible-mysqlserver-logs.png')} alt="Azure flexible mysql server logs" style={{border: '1px solid gray'}} width="800" />
3. Set Audit log related parameters as given below:
   - audit_log_enabled: set to *ON*
   - audit_log_events: Select the event types to be logged from the dropdown list.

   Set error logs related server parameters as given below:
   - error_server_log_file: set to *ON*
   - log_output: set to *FILE*
   
   Set Slow Query logs related parameters as given below:
   - slow_query_log: set to *ON*
   - long_query_time: Set the number of seconds a query can run before it's considered "slow". The default is 10 seconds.
   - log_slow_admin_statements: set to *ON*
4. Enable slow query and error logs.<br/><img src={useBaseUrl('img/send-data/azure-database-for-mysql-error-logs.png')} alt="Azure flexible mysql error logs" style={{border: '1px solid gray'}} width="800" />
5. Tag the location field in the source with the right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Database for MySql Tag Location" style={{border: '1px solid gray'}} width="500" /> 

#### Activity Logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Skip this step if you are already collecting activity logs for a subscription.

:::note
Since this source contains logs from multiple regions, ensure that you do not tag this source with the location tag.
:::

## Installing the Azure Flexible Database for Mysql app

Now that you have set up data collection, install the Azure Load Balancer Sumo Logic app to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Viewing the  Flexible Database for Mysql dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Error Logs

The **Azure Database for Mysql - Error Logs** dashboard provides details about Errors Count, Server Start and Shutdown Events Over Time, Stopped Servers, Error Log Type Over Time, Crash Recovery Attempts Over Time, Top Errors, Top Warnings, and Log Reduce.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForMysql/Azure-Database-for-MySQL-Error-Logs.png')} alt="Azure Database for Mysql - Error Logs" style={{border: '1px solid gray'}} width="800" />


### Administrative Operations

The **Azure Database for Mysql - Administrative Operations** dashboard provides details like distribution by operation type, by operation, recent delete operations, top 10 operations that caused most errors and users / applications by operation type.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForMysql/Azure-Database-for-MySQL-Administrative-Operations.png')} alt="Azure Database for Mysql - Administrative Operations" style={{border: '1px solid gray'}} width="800" />

### Connections

The **Azure Database for Mysql - Connections** dashboard provides details about Connections by Location, Total Connections, Active Connections, Aborted Connections, Total Queries, Connections, Queries, and Recent Disconnect Logs.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForMysql/Azure-Database-for-MySQL-Connections.png')} alt="Azure Database for Mysql - Connections" style={{border: '1px solid gray'}} width="800" />

### Overview

The **Azure Database for Mysql - Overview** dashboard provides details about Connections by Location, Requests by DB Instance, Top 10 IPs, Requests by Event Type, Requests by Error Code, Top Users with Executed Queries, Disconnection Events, Performance Overview, Error Details, and Queries Executed.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForMysql/Azure-Database-for-MySQL-Overview.png')} alt="Azure Database for Mysql - Overview" style={{border: '1px solid gray'}} width="800" />

### Performance

The **Azure Database for Mysql - Performance** dashboard provides details about Max CPU (%), Max Memory (%), Max IO Consumption (%), Slow Queries Count, Max CPU (%), Max Memory (%), Max IO Consumption (%), and Slow Queries.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForMysql/Azure-Database-for-MySQL-Performance.png')} alt="Azure Database for Mysql - Performance" style={{border: '1px solid gray'}} width="800" />

### Policy and Recommendations

The **Azure Database for Mysql - Policy and Recommendations** dashboard provides details about Total Success Policy Events, Total Success Policy Events, Total Failed Policy Events, Failed Policy Events, Total Recommendation Events, and Recent Recommendation Events.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForMysql/Azure-Database-for-MySQL-Policy-and-Recommendations.png')} alt="Azure Database for Mysql - Policy and Recommendations" style={{border: '1px solid gray'}} width="800" />

### Queries

The **Azure Database for Mysql - Queries** dashboard provides details about Queries by IP, Drop Table Count by Instance, Create Table Count by Instance, Create Database Count by Instance, Drop Database Count by Instance, Executed SQL Statements, Queries executed vs Slow Queries, Drop Statements, Create Statements, Drop Database Statements, and Drop Table Statements.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForMysql/Azure-Database-for-MySQL-Queries.png')} alt="Azure Database for Mysql - Queries" style={{border: '1px solid gray'}} width="800" />


### Replication

The **Azure Database for Mysql - Replication** dashboard provides details about Average Replication Lag (Seconds), Average Replication Lag (Seconds), Average HA Replication Lag (Seconds), and Average HA Replication Lag (Seconds).

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForMysql/Azure-Database-for-MySQL-Replication.png')} alt="Azure Database for Mysql - Replication" style={{border: '1px solid gray'}} width="800" />

### Slow Queries

The **Azure Database for Mysql - Slow Queries** dashboard provides details about Top 10 IPs Firing Slow Queries, Top 10 Users Firing, Top 10 Hosts Firing Slow Queries, Excessive Slow Queries by Host, Top 10 Slow Queries by Average Execution Time, Top 10 Excessive Slow Queries by Frequency, Slow Queries Over Time, and Excessive Slow Queries Over Time.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForMysql/Azure-Database-for-MySQL-Slow-Queries.png')} alt="Azure Database for Mysql - Slow Queries" style={{border: '1px solid gray'}} width="800" />

### Storage Overview

The **Azure Database for Mysql - Storage Overview** dashboard provides details about Max Storage utilization (MB), Max Data File Size (MB), Max System Tablespace Size (MB), Max System Tablespace Size (MB), Max Binlog Storage (MB), Max Other Storage (MB), Max Storage Limit (MB), Max Backup Storage Used (MB), and Max Storage (%).

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureDatabaseForMysql/Azure-Database-for-MySQL-Storage-Overview.png')} alt="Azure Database for Mysql - Storage Overview" style={{border: '1px solid gray'}} width="800" />


## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in *Collect Metrics from Azure Monitor* for [Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
