---
id: azure-sql-managed-instance
title: Azure SQL Managed Instance
keywords:
  - azure sql managed instance
  - sql managed instance
  - azure sql
  - managed instance monitoring
  - azure database monitoring
description: Learn about the Sumo Logic app for Azure SQL Managed Instance. Monitor resource utilization, database errors, query performance, wait statistics, and security audit events across your managed instances.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-sql-managed-instance.png')} alt="Azure SQL Managed Instance icon" width="50"/>

[Azure SQL Managed Instance](https://learn.microsoft.com/en-us/azure/azure-sql/managed-instance/sql-managed-instance-paas-overview) is a scalable cloud database service that's always running on the latest stable version of the Microsoft SQL Server database engine and a patched OS with 99.99% built-in high availability, offering close to 100% feature compatibility with SQL Server. This integration helps monitor resource usage and track database events for your managed instances.

## Log and metric types

For Azure SQL Managed Instance, you can collect the following logs and metrics:

* **Errors**. Contains error event data for managed instance databases, including error number, severity, state, and affected database context.
* **DatabaseWaitStatistics**. Contains wait statistics events recording wait type, wait time, signal wait time, and task count per database.
* **QueryStoreRuntimeStatistics**. Contains query runtime statistics events including CPU time, duration, logical I/O reads and writes, and execution counts per query hash.
* **SQLSecurityAuditEvents**. Contains SQL security audit events recording authentication, DML, DDL, and permission events with principal, client application, and host information.
* **DevOpsOperationsAudit**. Contains DevOps operations audit events that record control-plane operations, such as session changes, server-level configuration changes, and policy events.
* **Timeouts**. Contains timeout event data for queries that exceeded execution time limits.
* **ResourceUsageStats**. Contains resource usage statistics events for CPU, storage, and I/O utilization at the instance level.

Azure SQL Managed Instance metrics are available in the [Microsoft.Sql/managedInstances](https://learn.microsoft.com/en-us/azure/azure-sql/managed-instance/monitoring-sql-managed-instance-azure-monitor-reference?view=azuresql#supported-metrics-for-microsoftsqlmanagedinstances) namespace. For more details on Azure SQL Managed Instance logs and metrics, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-sql/managed-instance/monitoring-sql-managed-instance-azure-monitor-reference?view=azuresql).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to an Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Eventhubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Activity logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Eventhubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/). We recommend you create a separate source for activity logs. If you are already collecting these logs, you can skip this step.
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Azure SQL Managed Instance that you want to monitor. You can forward logs to the same Event Hub, provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the Event Hubs source or the Azure Metrics source, plan your source category to simplify querying. A hierarchical approach allows you to make use of wildcards. For example: `Azure/SQLManagedInstance/Logs`, `Azure/SQLManagedInstance/ActivityLogs`, and `Azure/SQLManagedInstance/Metrics`.

### Configure collector

Create a hosted collector if not already configured and tag the `tenant_name` field. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name). Make sure you create the required sources in this collector. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />

### Configure metrics collection

import MetricsSource from '../../reuse/metrics-source.md';

<MetricsSource/>

### Configure logs collection

#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) to an Event Hub.

1. To set up the Azure Eventhubs source in Sumo Logic, refer to [Azure Eventhubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
1. To create the diagnostic settings in the Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#create-diagnostic-settings). Perform the following steps for each Azure SQL Managed Instance that you want to monitor.
1. Choose `Stream to an Eventhub` as the destination.
1. Select `allLogs`.
    1. Use the Eventhub namespace and Eventhub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Managed-SQL-Configure-Diagnostic-Logs.png')} alt="Azure SQL Managed Instance Tag Location" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with the right location value.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure SQL Managed Instance Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity logs (optional)

import ActivityLogs from '../../reuse/apps/azure-activity-logs.md';

<ActivityLogs/>

## Installing the Azure SQL Managed Instance app

This section provides instructions for installing the Azure SQL Managed Instance app for Sumo Logic and descriptions of each of the pre-configured dashboards.

import AppInstallIndexV2 from '../../reuse/apps/app-install-index-option.md';

<AppInstallIndexV2/>

As part of the app installation, the following fields will be created by default:

- `tenant_name`. This is a collector-level field set during collector configuration. Its value is the name of your Azure tenant.
- `location`. The region to which the resource name belongs.
- `subscription_id`. ID associated with a subscription where the resource is present.
- `resource_group`. The resource group name where the Azure resource is present.
- `provider_name`. Azure resource provider name (for example, Microsoft.Sql).
- `resource_type`. Azure resource type (for example, managedInstances).
- `resource_name`. The name of the resource (for example, managed instance name).
- `service_type`. The type of service that can be accessed with an Azure resource.
- `service_name`. Services that can be accessed with an Azure resource.

As part of the app installation process, the following FERs will be created by default:
### Azure location extraction FER

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

## Viewing the Azure SQL Managed Instance dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Overview

The **Azure SQL Managed Instance - Overview** dashboard provides a high-level summary of managed instance counts, error activity, audit event volume, query activity, and resource utilization across all instances.

Use this dashboard to:

- Monitor total managed instance count, error totals, audit events, and unique active databases at a glance.
- Identify the top 10 most active databases and highest-volume instances to prioritize operational attention.
- Track vCore utilization, event volume by category, and error distribution by database to assess overall health.

<!--IMAGE_PLACEHOLDER: Azure-SQL-MI-Overview.png-->

### Instance Resource Utilization

The **Azure SQL Managed Instance - Instance Resource Utilization** dashboard provides CPU, storage, and I/O performance metrics for each managed instance, including trend analysis and per-instance comparisons.

Use this dashboard to:

- Monitor average and peak CPU utilization per instance to detect compute saturation and plan capacity.
- Track storage used versus reserved and I/O request rates to identify storage pressure before it impacts workloads.
- Analyze CPU utilization trends and storage usage percentages to support right-sizing and scaling decisions.

<!--IMAGE_PLACEHOLDER: Azure-SQL-MI-Instance-Resource-Utilization.png-->

### Database Errors

The **Azure SQL Managed Instance - Database Errors** dashboard tracks error counts, severity distribution, affected databases, and top error patterns over time.

Use this dashboard to:

- Monitor total errors, user-defined errors, and unique error numbers to assess database stability.
- Identify the top 10 error numbers and messages to prioritize investigation and resolution.
- Analyze severity distribution and one-day error comparison trends to detect regressions quickly.

<!--IMAGE_PLACEHOLDER: Azure-SQL-MI-Database-Errors.png-->

### Database Wait Statistics

The **Azure SQL Managed Instance - Database Wait Statistics** dashboard provides insights into wait patterns, wait-type distribution, signal versus resource waits, and per-database wait-time analysis.

Use this dashboard to:

- Monitor total wait events, total wait time, and peak maximum wait to identify blocking and scheduling issues.
- Analyze wait type distribution and heatmaps to distinguish between I/O, locking, CPU scheduling, and memory waits.
- Track signal versus resource wait ratios and average wait time per task to diagnose root causes of latency.

<!--IMAGE_PLACEHOLDER: Azure-SQL-MI-Database-Wait-Statistics.png-->

### Query Performance

The **Azure SQL Managed Instance - Query Performance** dashboard monitors query CPU consumption, execution duration, I/O usage, and memory grants across databases.

Use this dashboard to:

- Track total query executions, CPU time, and maximum duration to identify the most expensive workloads.
- Identify the top queries by CPU and execution count using query hash to target optimization efforts.
- Analyze logical I/O reads and writes and memory consumption by the database to detect resource-intensive patterns.

<!--IMAGE_PLACEHOLDER: Azure-SQL-MI-Query-Performance.png-->

### SQL Security Audit

The **Azure SQL Managed Instance - SQL Security Audit** dashboard provides comprehensive visibility into authentication events, DML/DDL activity, client connection patterns, and privilege usage across all managed instance databases.

Use this dashboard to:

- Monitor successful and failed authentication events and event distribution by action type for threat detection.
- Identify top principals, client hosts, applications, and source IPs generating audit events.
- Review recent DDL, DML, and failed events to support compliance investigation and incident response.

<!--IMAGE_PLACEHOLDER: Azure-SQL-MI-SQL-Security-Audit.png-->

### DevOps Operations Audit

The **Azure SQL Managed Instance - DevOps Operations Audit** dashboard covers control-plane audit events, including session changes, server-level operations, and configuration events at the managed instance level.

Use this dashboard to:

- Monitor total, successful, and failed control-plane events and track trends over time.
- Identify top principals and event classes generating the highest operational activity.
- Analyze session changes and server-level configuration event details for administrative oversight.

<!--IMAGE_PLACEHOLDER: Azure-SQL-MI-DevOps-Operations-Audit.png-->

### Query IO and Concurrency

The **Azure SQL Managed Instance - Query IO and Concurrency** dashboard measures I/O performance, degree of parallelism, and I/O wait patterns for query execution.

Use this dashboard to:

- Monitor physical I/O reads, log bytes used, and average and maximum DOP to assess I/O intensity and parallelism.
- Identify top queries by physical reads and analyze I/O wait type distribution to isolate storage bottlenecks.
- Track log bytes written trends and physical I/O by query to support query-level I/O optimization.

<!--IMAGE_PLACEHOLDER: Azure-SQL-MI-Query-IO-and-Concurrency.png-->

### Security and Access Governance

The **Azure SQL Managed Instance - Security and Access Governance** dashboard monitors privilege escalations, permission changes, TLS compliance, and schema access patterns across managed instances.

Use this dashboard to:

- Track permission changes by database, failed events by source IP, and non-TLS 1.2 connections for governance compliance.
- Analyze securable class distribution, success versus failure trends, and server versus database audit event ratios.
- Review schema access by principal and TLS version distribution to identify unauthorized or insecure access patterns.

<!--IMAGE_PLACEHOLDER: Azure-SQL-MI-Security-and-Access-Governance.png-->

### Database Health and Workload Summary

The **Azure SQL Managed Instance - Database Health and Workload Summary** dashboard provides a combined health view that integrates error counts, wait statistics, and query performance metrics for each database.

Use this dashboard to:

- Identify databases with active errors and high-severity error counts for immediate remediation prioritization.
- Correlate error severity heatmaps, wait time by database, and top wait types for holistic workload health assessment.
- Track query execution and CPU trends alongside combined workload details to understand performance trajectory.

<!--IMAGE_PLACEHOLDER: Azure-SQL-MI-Database-Health-and-Workload-Summary.png-->

## Create monitors for Azure SQL Managed Instance

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure SQL Managed Instance alerts

| Alert Name | Alert Description and Conditions | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Azure SQL Managed Instance - High CPU Utilization` | This alert is triggered when average CPU utilization exceeds the threshold, indicating compute saturation. | Critical: `> TBD`<br/>Warning: `> TBD` | Critical: `<= TBD`<br/>Warning: `<= TBD` |
| `Azure SQL Managed Instance - High Storage Utilization` | This alert is triggered when storage usage percentage exceeds the threshold, indicating storage pressure. | Critical: `> TBD`<br/>Warning: `> TBD` | Critical: `<= TBD`<br/>Warning: `<= TBD` |
| `Azure SQL Managed Instance - Database Errors` | This alert is triggered when the total error count exceeds the threshold within the evaluation window. | Critical: `> TBD`<br/>Warning: `> TBD` | Critical: `<= TBD`<br/>Warning: `<= TBD` |
| `Azure SQL Managed Instance - High Wait Time` | This alert is triggered when total wait time exceeds the threshold, indicating locking or I/O contention. | Critical: `> TBD`<br/>Warning: `> TBD` | Critical: `<= TBD`<br/>Warning: `<= TBD` |
| `Azure SQL Managed Instance - Failed Security Audit Events` | This alert is triggered when the count of failed security audit events exceeds the threshold. | Critical: `> TBD`<br/>Warning: `> TBD` | Critical: `<= TBD`<br/>Warning: `<= TBD` |

## Upgrade/Downgrade the Azure SQL Managed Instance app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure SQL Managed Instance app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### Metrics collection via Azure Metrics Source

To troubleshoot metrics collection via Azure Metrics Source, follow the instructions in [Troubleshooting Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source/#troubleshooting).
