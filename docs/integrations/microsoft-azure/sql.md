---
id: sql
title: Azure SQL
sidebar_label: Azure SQL
description: The Sumo Logic app for Azure SQL Database helps you monitor activity in Azure SQL.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-sql.png')} alt="thumbnail icon" width="75"/>

Azure SQL Database is a managed relational cloud database service. The Sumo Logic app for Azure SQL helps you monitor activity in Azure SQL. The preconfigured dashboards provide insight into resource utilization, blocking queries, database wait events, errors, runtime execution stats, and other database analytics.

## Log and metric types

The Sumo Logic app for Azure SQL app uses the following log types:

* Basic Metric
* QueryStoreRuntimeStatisticsEvent
* QueryStoreWaitStatisticsEvent
* DatabaseWaitStatisticsEvent
* BlockEvent
* ErrorEvent
* Insight
* TimeoutEvent
* Automated Tuning
* SQL Security Audit
* Activity Logs

For details on Azure SQL logs and metrics, see [Metrics and logs available](https://learn.microsoft.com/en-us/azure/azure-sql/database/metrics-diagnostic-telemetry-logging-streaming-export-configure?view=azuresql&tabs=azure-portal#metrics-and-logs-available) in Azure help.


### Sample log messages

```json title="Error Event"
{
  "LogicalServerName":"npande-test-db-server",
  "SubscriptionId":"c088dc46-d123-12ad-a8b7-9a123d45ad6a",
  "ResourceGroup":"npandeTestDBResGrp",
  "time":"2018-07-09T05:08:32.679Z",
  "resourceId":"/SUBSCRIPTIONS/c088dc46-d123-12ad-a8b7-9a123d45ad6a/RESOURCEGROUPS/NPANDETESTDBRESGRP/PROVIDERS/MICROSOFT.SQL/SERVERS/NPANDE-TEST-DB-SERVER/DATABASES/NPANDETESTDB2",
  "category":"Errors",
  "operationName":"ErrorEvent",
  "properties":{
    "ElasticPoolName":"",
    "DatabaseName":"npandeTestDB2",
    "query_hash":"0",
    "query_plan_hash":"0",
    "message":"Invalid object name 'inventory123'.",
    "error_number":208,
    "severity":16,
    "user_defined":false,
    "state":1
  }
}
```

```json title="Database Wait Statistics Event"
{
	"LogicalServerName":"npande-test-db-server",
	"SubscriptionId":"c088dc46-d123-12ad-a8b7-9a123d45ad6a"",""ResourceGroup"":""npandeTestDBResGrp"",""time"":""2018-07-09T05":"13":34.520Z",""resourceId"":"/SUBSCRIPTIONS/c088dc46-d123-12ad-a8b7-9a123d45ad6a"/RESOURCEGROUPS/NPANDETESTDBRESGRP/PROVIDERS/MICROSOFT.SQL/SERVERS/NPANDE-TEST-DB-SERVER/DATABASES/NPANDETESTDB",
	"category":"DatabaseWaitStatistics",
	"operationName":"DatabaseWaitStatistcsEvent",
	"properties":{
		"ElasticPoolName":"",
		"DatabaseName":"npandeTestDB",
		"start_utc_date":"2018-07-09T05:13:34.520Z",
		"end_utc_date":"2018-07-09T05:18:36.050Z",
		"wait_type":"WRITELOG",
		"delta_max_wait_time_ms":0,
		"delta_signal_wait_time_ms":0,
		"delta_wait_time_ms":12,
		"delta_waiting_tasks_count":2
	}
}
```

### Sample queries

```sql title="Top 10 Errors"
_sourceCategory=Azure/DB/SQL/Logs ErrorEvent
| json "LogicalServerName", "SubscriptionId", "ResourceGroup", "resourceId", "category", "operationName", "properties" nodrop
| json field=properties "severity", "error_number", "DatabaseName", "message", "user_defined", "state"
| where operationName="ErrorEvent"
| count as eventCount by message
| top 10 message by eventCount, message asc
```

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Activity Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/). It is recommended to create a separate source for activity logs. If you are already collecting these logs, you can skip this step.
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Azure SQL database that you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/SQL/Logs`, `Azure/SQL/ActivityLogs`, and `Azure/SQL/Metrics`.

### Configure field in field schema
1. <!--Kanso [**Classic UI**](/docs/get-started/sumo-logic-ui/). Kanso--> In the main Sumo Logic menu, select **Manage Data > Logs > Fields**. <!--Kanso <br/>[**New UI**](/docs/get-started/sumo-logic-ui-new/). In the top menu select **Configuration**, and then under **Logs** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**. Kanso-->
2. Search for following fields:
   - `tenant_name`. This field is tagged at the collector level and you can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
   - `location`. The region to which the resource name belongs to.
   - `subscription_id`. Id associated with a subscription where resource is present.
   - `resource_group`. The resource group name where the Azure resource is present.
   - `provider_name`. Azure resource provider name (for example, Microsoft.SQL).
   - `resource_type`. Azure resource type (for example, SERVERS).
   - `resource_name`. The name of the resource (for example, Azure SQL Server name).
   - `service_type`. Type of the service that can be accessed from with a azure resource (for example, DATABASES).
   - `service_name`. Services that can be accessed from within an Azure resource (for example, Azure SQL database name in Azure SQL Server).

3. Create the fields if it is not present. Refer to [create and manage fields](/docs/manage/fields/#manage-fields).

### Configure Field Extraction Rules

Create a Field Extraction Rule (FER) by following the instructions [here](/docs/manage/field-extractions/create-field-extraction-rule/). If the FER already exists with same name, then skip this step.

* **Azure Location Extraction FER**

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

* **Resource ID Extraction FER**

   ```sql
   Rule Name: AzureResourceIdExtractionFER
   Applied at: Ingest Time
   Scope (Specific Data): tenant_name=*
   ```

   ```sql title="Parse Expression"
   json "resourceId"
   | toUpperCase(resourceId) as resourceId
   | parse regex field=resourceId "/SUBSCRIPTIONS/(?<subscription_id>[^/]+)" nodrop
   | parse field=resourceId "/RESOURCEGROUPS/*/" as resource_group nodrop
   | parse regex field=resourceId "/PROVIDERS/(?<provider_name>[^/]+)" nodrop
   | parse regex field=resourceId "/PROVIDERS/[^/]+(?:/LOCATIONS/[^/]+)?/(?<resource_type>[^/]+)/(?<resource_name>.+)" nodrop
   | parse regex field=resource_name "(?<parent_resource_name>[^/]+)(?:/PROVIDERS/[^/]+)?/(?<service_type>[^/]+)/?(?<service_name>.+)" nodrop
   | if (isBlank(parent_resource_name), resource_name, parent_resource_name) as resource_name
   | fields subscription_id, location, provider_name, resource_group, resource_type, resource_name, service_type,service_name
   ```
### Configure metric rules

  * **Azure Observability Metadata Extraction Service Level**

      If this rule already exists, there's no need to create it again.

      ```sql
      Rule Name: AzureObservabilityMetadataExtractionServiceLevel
      ```

      ```sql title="Metric match expression"
      resourceId=/SUBSCRIPTIONS/*/RESOURCEGROUPS/*/PROVIDERS/*/*/*/*/* tenant_name=*
      ```
      | Fields extracted | Metric rule    |
      |:------------------|:----------------|
      | subscription_id  | $resourceId._1 |
      | resource_group   | $resourceId._2 |
      | provider_name    | $resourceId._3 |
      | resource_type    | $resourceId._4 |
      | resource_name    | $resourceId._5 |
      | service_type     | $resourceId._6 |
      | service_name     | $resourceId._7 |


### Configure metrics collection

In this section, you will configure a pipeline to send metrics from Azure Monitor to an Event Hub, then to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. Create hosted collector and tag `tenant_name` field.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Storage Tag Tenant Name" style={{border: '1px solid gray'}} width="800" />
1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
1. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
1. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure SQL database that you want to monitor.
   * Choose `Stream to an event hub` as destination.
   * Select all the metric types under `Metrics` section.
   * Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.

   ![diagnosticsetting.png](/img/send-data/azuresqldatabasediagnosticsetting.png)

### Configure logs collection


#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to the [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
1. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform below steps for each Azure SQL database that you want to monitor.
   * Choose `Stream to an event hub` as the destination.
   * Select all the log types except `SQL Security Audit Event`.
   * Use the Event hub namespace and Event hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.

   <img src={useBaseUrl('img/integrations/microsoft-azure/Azure-SQL-Configure-Diagnostic-Logs.png')} alt="Azure Storage Tag Location" style={{border: '1px solid gray'}} width="800" />

1. Tag the location field in the source with right location value.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Storage Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Enable SQL Security Audit logs
In this section, you will configure a pipeline for shipping diagnostic logs from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) to an Event Hub.

1. To enable the Audit logs in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-sql/database/auditing-setup?view=azuresql#configure-auditing-for-your-server). Perform below steps for each Azure SQL database that you want to monitor.
   * Choose `Event Hub` as the destination. Refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-sql/database/auditing-setup?view=azuresql#audit-to-event-hubs-destination).
   * Use the same Event hub namespace and Event hub name as configured in `Diagnostic logs` in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-SQL-Configure-Auditing.png')} alt="Configure Auditing" style={{border: '1px solid gray'}} width="800" />
1. By default, auditing is enabled only for the below action groups. Refer to [Azure help](https://learn.microsoft.com/en-us/sql/relational-databases/security/auditing/sql-server-audit-action-groups-and-actions) for more details on supported action groups and actions.
   * "SUCCESSFUL_DATABASE_AUTHENTICATION_GROUP"
   * "FAILED_DATABASE_AUTHENTICATION_GROUP"
   * "BATCH_COMPLETED_GROUP"

Follow the below command to update the audit policy with new actions using Azure CLI. If you want to use any other mechanism, refer to the [Microsoft documentation](https://learn.microsoft.com/en-us/sql/relational-databases/security/auditing/create-a-server-audit-and-database-audit-specification?view=sql-server-ver16).
).

  ```sql title="Command to enable audit logs"
  az sql db audit-policy update --ids "/subscriptions/<subscription_id>/resourceGroups/<resource_group>/providers/Microsoft.Sql/servers/<server name>/databases/<database name>" --actions DATABASE_PERMISSION_CHANGE_GROUP DATABASE_OWNERSHIP_CHANGE_GROUP DATABASE_ROLE_MEMBER_CHANGE_GROUP USER_CHANGE_PASSWORD_GROUP SCHEMA_OBJECT_PERMISSION_CHANGE_GROUP SCHEMA_OBJECT_OWNERSHIP_CHANGE_GROUP SCHEMA_OBJECT_CHANGE_GROUP DATABASE_CHANGE_GROUP DATABASE_OBJECT_CHANGE_GROUP  'SELECT, INSERT, UPDATE, DELETE on database::<database name> by public'  --ehari /subscriptions/<subscription_id>/resourcegroups/<resource group where event hub is present>/providers/microsoft.eventhub/namespaces/<event hub namespace>/authorizationrules/rootmanagesharedaccesskey --ehts Enabled  --state Enabled
  ```

#### Enable Automatic Tuning logs

By default, all the tuning options are not enabled, you can enable them at the server or database level by following the instructions in the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-sql/database/automatic-tuning-enable?view=azuresql#azure-portal-1).

<img src={useBaseUrl('img/integrations/microsoft-azure/Azure-SQL-Automated-Tuning.png')} alt="Configure Automated Tuning" style={{border: '1px solid gray'}} width="800" />

#### Activity Logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). If you are already collecting activity logs for a subscription, do not perform this step.

:::note
Since this source contains logs from multiple regions, make sure that you do not tag this source with the location tag.
:::

:::note
For Security events, make sure you enable [Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/azure-sql/database/azure-defender-for-sql?view=azuresql#enable-microsoft-defender-for-sql). If you have an existing settings, click **Edit Settings**.
:::

<img src={useBaseUrl('img/integrations/microsoft-azure/Microsoft-Cloud-Defender-Edit-Settings.png')} alt="Edit Settings" style={{border: '1px solid gray'}} width="800" />

<img src={useBaseUrl('img/integrations/microsoft-azure/Microsoft-Cloud-Defender-Plans.png')} alt="Cloud Defender Plans" style={{border: '1px solid gray'}} width="800" />

## Installing the Azure SQL app

This section provides instructions on how to install the Azure SQL app, and shows examples of each of the preconfigured dashboards you can use to analyze your data.

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Upgrading the Azure SQL app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure SQL app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Viewing the Azure SQL dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

See the count of logical servers, databases, errors; and the “top 10” active servers, resource groups, subscriptions, resources, databases, operations, and categories.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-SQL/Azure-SQL-Overview.png')} alt="Overview" />

**Logical Servers**. The count of logical servers over the last 24 hours.

**Databases**. The count of databases over the last 24 hours.

**Errors**. The count of errors over the last 24 hours.

**Error Severity**. A donut chart that shows the breakdown of errors by severity over the last 24 hours.

**Lock Duration**. The total number of seconds that the database experienced locks in the last 24 hours.

**Active SQLInsights**. The count of performance issues detected by SQL Insights whose current status is “Active”.

**Top 10 Active Logical Server Names**. The names of the 10 logical servers that have experienced the most events over the last 24 hours, and the event count for each.

**Top 10 Active Server, Databases**. Lists the 10 logical server-database combinations that have experienced the most events over the last 24 hours, and the event count for each.

**Top 10 Active Resource Groups**. Lists the 10 active resource groups that have experienced the most events over the last 24 hours, and the event count for each.

**Top 10 Active SubscriptionId**. Lists the 10 active SubscriptionIds that have experienced the most events over the last 24 hours, and the event count for each.

**Top 10 Active ResourceId**. Lists the 10 active ResourceIds that have experienced the most events over the last 24 hours , and the event count for each.

**Top 10 Active Server, Databases and Elastic Pool**. Lists the 10 logical server-database-elastic pool combinations that have experienced the most events over the last 24 hours, and the event count for each.

**Top 10 Operations**. Lists the 10 operations with the most events over the last 24 hours.

**Top 10 Active Server, Databases and WaitType**.  Lists the 10 logical server-database-wait type  combinations that have experienced the most events over the last 24 hours, and the event count for each.

**Top 10 Categories**.The top 10 log categories for Azure diagnostic logs emitted over the last 24 hours.

**Operations Trend**. A stacked bar chart that shows the count of different operations over the last 24 hours.

### Blocking Stats

See information about blocking queries in Azure SQL, including lock mode usage, lock duration, and details about block events.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-SQL/Azure-SQL-Blocking-Stats.png')} alt="Blocking Stats" />

**Lock Mode Used by Query**. A donut chart that shows the breakdown of lock modes for blocked queries over the last 7 days.

**Owner Type Used by Query**. A donut chart the shows the breakdown of resource owner types for blocked queries over the last 7 days.

**Lock Duration**. The total number of seconds that database updates were blocked over the last 7 days.

**Block Event Details**. A table that lists details for blocking events over the last 7 days.

**Blocks by Database**. A table that lists the count of blocking events and the total lock duration by logical server and database over the last 7 days.

**Blocks by Database Trend**. A bar chart that shows the total lock duration by logical server and database on a timeline for the last 7 days.

**Azure SQL - DatabaseWait Stats**. Wait Events by Database. A donut chart that shows the count of wait events by logical server-database combination over the last 24 hours.

**Wait Events Breakdown by Database**. A stacked bar chart that shows the breakdown of wait events by wait type on a timeline over the last 24 hours.

**Wait Type Trend.** A stacked column chart that shows wait event over time, broken down by wait type.

**Average Wait Time Per Task.** A table that lists task-level information about wait events by logical server-database-wait type combination over the last 24 hours, including the count of waiting tasks, total wait time for those tasks, and the average wait time per task.

**Detailed Stats.** A table that lists information about wait events in the last 24 hours.

### Errors

See information about errors in Azure SQL, including total error count, top 10 error numbers and error messages, errors by severity and database, error trend and comparison analyzes, and error details.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-SQL/Azure-SQL-Errors.png')} alt="Errors" />

**Errors**. Count of errors over the last 24 hours.

**Top 10 Errors**. A table that lists the top 10 error numbers over the last 24 hours and the count of each error number.

**Errors by Severity**. A table that lists the severity of errors over the last 24 hours and the count of errors with each severity.

**Errors by Database**. A table that lists the error count for each database over the last 24 hours.

**Error Trend**. A stacked bar chart that shows the count of each error number over time.

**Errors - One Day Time Comparison**. A line chart that shows the count of errors per timeslice over the last 24 hours, compared with the count of errors one day previous.

**Distinct Error Messages - One Day Time Comparison**. A line chart that shows the count of distinct errors (unique messages) per timeslice  over the last 24 hours, compared with the same count one day previous.

**Top 10 Error Messages**. A table that lists the top 10 error messages, and the count of each over the last 24 hours.

**Error Details**. A table that lists the details of errors that occurred during the previous 24 hours.

### Metrics

See metrics for connections attempts; Database Transaction Unit (DTUs), CPU and storage utilization; and for deadlocks, sessions, and workers.

For information about the metrics presented in the Metrics dashboards, see [All metrics](https://docs.microsoft.com/en-us/azure/sql-database/sql-database-metrics-diag-logging#all-metrics) and **Microsoft.Sql/servers/databases** in Azure help.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-SQL/Azure-SQL-Metrics.png')} alt="Metrics" />

**Blocked by Firewall**. A line chart showing the count of connections blocked by a firewall over the last 24 hours.

**Connection Failed**. A line chart showing the count of failed connections over the last 24 hours.

**Successful Connection**. A line chart showing the count of successful connections over the last 24 hours.

**Blocked by Firewall Per Database**. A line chart showing the count of connections to each database blocked by a firewall over the last 24 hours.

**Connection Failed Per Database**. A line chart showing the count of failed connections to each database over the last 24 hours.

**Successful Connection Per Database**. A line chart showing the count of successful connections to each database over the last 24 hours.

**DTU Limit Per Database**. A line chart showing the Database Throughput Unit (DTU) limit for each database over the last 24 hours.

**DTU Used Per Database**. A line chart showing the DTU used for each database over the last 24 hours.

**DTU Consumption Percent Per Database**. A line chart showing the percentage of the DTU limit was consumed by each database over the last 24 hours.

**Avg CPU Utilization Percent Per Database**. A line charge showing the average percentage of CPU used by each database over the last 24 hours.

**Max CPU Utilization Percent Per Database**. A line charge showing the maximum percentage of CPU used by each database over the last 24 hours.

**Storage Per Database**. The total size in bytes of each database over the last 24 hours.

**Storage Percent Per Database**. The percentage of the maximum allowed database size used by each database over the last 24 hours.

**XPT Storage Percent Per Database**. The percentage of in-memory OLTP storage used by each database over the last 24 hours.

**Deadlocks**. Count of deadlocks over the last 24 hours.

**Sessions Percent Per Database**. The percentage of allowed sessions used by each database over the last 24 hours.

**Physical Data Read Percent**. Displays average data I/O percentage over the last 24 hours.

**Deadlocks Per Database**. Count of deadlocks by database over the last 24 hours.

**Workers Percent Per Database**. The percentage of the allowed workers  used by each database over the last 24 hours.

**Log Write Percent**. Displays average log I/O percentage over the last 24 hours.


### QueryStoreRuntime Stats

See query runtime execution statistics such as CPU usage and query duration.

For more information about the statistics presented on the QueryStoreRuntime Stats dashboard, see [Query Store runtime statistics](https://docs.microsoft.com/en-us/azure/sql-database/sql-database-metrics-diag-logging#query-store-runtime-statistics) in Azure help.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-SQL/Azure-SQL-QueryStoreRuntime-Stats.png')} alt="QueryStoreRuntime Stats" />

**Unique QueryId's**. The count of unique queryIDs over the last 24 hours.

**Unique PlanId's**.The count of unique PlanIDs over the last 24 hours.

**Top Queries by High Execution Time**. A table that lists the 15 queries with the longest execution time over the last 24 hours, and information about those queries.

**Execution Count by DatabaseName**. A line chart that shows the count of queries per timeslice for each database over the last 24 hours.

**Execution Duration by DatabaseName**. A line chart that shows the total duration (in milliseconds) of queries per timeslice for each database over the last 24 hours.

**Memory Used by DatabaseName**. A line chart that shows the maximum memory used per timeslice by each database over the last 24 hours.

**CPU Time by DatabaseName**. A line chart that shows the CPU time consumed (in microseconds) by queries per timeslice by each database over the last 24 hours.

**Execution Count of Query**. A stacked column chart that shows the count of each query per timeslice over the last 24 hours.

**Execution Duration of Query**. A stacked column chart that shows the total execution time in milliseconds for each query per timeslice over the last 24 hours.

**Rows Returned by Query**. A stacked column chart that shows the rows returned by each query per timeslice over the last 24 hours.

**CPU Time by Query**. A stacked column chart that shows the CPU time used by each query per timeslice over the last 24 hours.

**Memory Used by Query**. A stacked column chart that shows the memory used by each query per timeslice over the last 24 hours.

**Max Degree of Parallelism by Query**. A stacked column chart that shows the maximum degree of parallelism for each query per timeslice over the last 24 hours.

**Physical IO Reads by Query**. A stacked column chart that shows the count of reads from disk for  each query per timeslice over the last 24 hours.

**Logical IO Reads by Query**. A stacked column chart that shows the count of reads from memory for each query per timeslice over the last 24 hours.

**Log Bytes Used by Query**. A stacked column chart that shows the count bytes written to the transaction log for each query per timeslice over the last 24 hours.

**Execution Type of Query**. A stacked column chart that shows the count of queries by execution type: Regular, Aborted, or Exception over the last 24 hours.

### QueryStoreWait Stats

See information about how much time a database spent waiting on different wait types.

For more information about the statistics presented on the QueryStoreWaitStats dashboard, see [Query Store wait statistics](https://docs.microsoft.com/en-us/azure/sql-database/sql-database-metrics-diag-logging#query-store-wait-statistics) in Azure help.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-SQL/Azure-SQL-QueryStoreWait-Stats.png')} alt="QueryStoreWait Stats" />

**Wait Category**. A donut chart that shows the breakdown of wait events by database over the last 24 hours.

**Wait Category Breakup**. A horizontal bar chart that shows the breakdown of wait event by category for each database over the last 24 hours.

**Max Query Wait Time by DatabaseName**. A line chart that shows that maximum query wait type per timeslice for each database over the last 24 hours.

**Wait Category Trend.** A stacked column chart that shows the count of wait events by category per timeslice over the last 24 hours.

**Total Wait Time for Query by Wait Category**. A stacked column chart that shows, for each query, the length of time a query spent waiting in each Wait Category over the last 24 hours.  

**Wait Details**. The table displays wait statistics as encountered by queries on a given database, residing on a given logical server in the last 24 hours.


### SQLInsights

See database performance analytics obtained from Azure SQL Database Intelligent Insights, including information about issues like excessive wait times, critical exceptions, and so on.

For more information about the data presented on the SQLInsights dashboard, see [Use the Intelligent Insights Azure SQL Database performance diagnostics log](https://docs.microsoft.com/en-us/azure/sql-database/sql-database-intelligent-insights-use-diagnostics-log) in Azure help.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-SQL/Azure-SQL-SQLInsights.png')} alt="SQLInsights" />

**Active SQLInsights**.  Count of active SQL Insights issues as of the current time.

**Unique Issues**. Count of issues identified, whether resolved or not.

**Latest Issue Status**. Displays count of issues with latest state and root cause.

**Insight Metric**. Displays the performance metric for which an issue is identified, by IssueID.

**Issues by Database**. A table that shows the count of unique issues by database over the last 7 days.

**Issue State**. A table that shows the current state of unique issues, along with additional information about the issues over the last 7 days.

**Issue Details**. Displays information about the progress of issues throughout the resolution process.

### Timeouts

See information about timeouts in Azure SQL.

For more information about the data presented on the Timeouts dashboard, see [Time-outs dataset](https://docs.microsoft.com/en-us/azure/sql-database/sql-database-metrics-diag-logging#time-outs-dataset) in Azure help.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-SQL/Azure-SQL-Timeouts.png')} alt="Timeouts" />

**Timeouts**. The count of timeouts over the last 7 days.  

**Top 10 Error States**. A table that lists the top 10 errors states that have occurred over the last 7 days and the count of errors in each state.

**Timeouts by Database**. A table that lists the count of timeouts by database over the last 7 days.

**Timeouts Details**. A table that lists information about timeouts that have occurred over the last 7 days.

### Health

The **Azure SQL - Health** dashboard provides information of any service health incidents or resource health events associated with SQL database service or resource in your azure account.

Use this dashboard to:
    * View recent resource and service health incidents.
    * View distribution of service and resource health by incident type.


<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-SQL/Azure-SQL-Health.png')} alt="Azure SQL health dashboard" style={{border: '1px solid gray'}} width="800" />

### Policy and Recommendations

The **Azure SQL - Policy and Recommendations** dashboard provides information of all effect action operations performed by Azure Policy and recommendations events from Azure Advisor.

Use this dashboard to:
    * Monitor policy events with warnings and errors.
    * View recent failed policy events.
    * View total recommendation events.
    * Identify High Impact recommendations.
    * View recent recommendation events and navigate to the affected resource.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-SQL/Azure-SQL-Policy-and-Recommendations.png')} alt="Azure SQL - Policy and Recommendations dashboard" style={{border: '1px solid gray'}} width="800" />


### Administrative Operations

The **Azure SQL - Administrative Operations** dashboard provides details on read/write/delete specific changes, different operations used, top 10 operations that caused most errors, and users performing admin operations.

Use this dashboard to:
    * Identify top users performing administrative operations.
    * View Top 10 operations that caused the most errors.
    * View recent read, write, and delete operations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-SQL/Azure-SQL-Administrative-Operations.png')} alt="Azure SQL Administrative Operations dashboard" style={{border: '1px solid gray'}} width="800" />

### SQL Security Audit

The **Azure SQL - SQL Security Audit** dashboard provides audit information on server level events and database level events including DML and DDL statements executed.

Use this dashboard to:
    * Identify failed login and their geo locations.
    * View recent DDL, DML, DQL, and TCL statements.
    * Track who (host name, service principal, ip address) and what (object, database, server) information associated with any database operation.


<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-SQL/Azure-SQL-SQL-Security-Audit.png')} alt="Azure SQL Security Audit dashboard" style={{border: '1px solid gray'}} width="800" />

### Automatic Tuning

The **Azure SQL - Automatic Tuning** dashboard provides information about automatic tuning recommendations for a database.

Use this dashboard to:
    * View recent changes in tuning configuration.
    * View create index recommendations.
    * View drop index recommendations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-SQL/Azure-SQL-Automatic-Tuning.png')} alt="Azure SQL Automated Tuning dashboard" style={{border: '1px solid gray'}} width="800" />
