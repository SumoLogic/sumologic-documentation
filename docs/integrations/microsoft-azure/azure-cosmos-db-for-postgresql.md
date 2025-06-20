---
id: azure-cosmos-db-for-postgresql
title: Azure Cosmos DB for PostgreSQL
description: Learn about the Sumo Logic collection process for the Azure Cosmos DB for PostgreSQL service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-cosmos-db-for-postgresql.png')} alt="Thumbnail icon" width="50"/>

[Azure Cosmos DB for PostgreSQL](https://learn.microsoft.com/en-us/azure/cosmos-db/postgresql/introduction) is a managed service for PostgreSQL powered by the Citus open source extension which enables you to build highly scalable relational apps. This integration helps in identifying configurations errors, analyzing executed statements, and monitoring resource usage of individual nodes in a cluster.

## Log and metric types

For Azure Cosmos DB for PostgreSQL, you can collect the following logs and metrics:

* **PostgreSQL Server Logs**. These logs are available for every node of a cluster and can be used to identify, troubleshoot, and repair configuration errors and suboptimal performance.
* **Activity logs**. Provides insight into any subscription-level or management group level events that have occurred in Azure. To learn more, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log-schema).
* **Metrics**. These metrics are available for every node of a cluster, and in aggregate across the nodes. For more information on supported metrics, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/cosmos-db/postgresql/concepts-monitoring#list-of-metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Azure Cosmos DB for PostgreSQL cluster you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/CosmosDBforPostgreSQL/Logs`, `Azure/CosmosDBforPostgreSQL/Metrics`.

### Configure metrics collection

To set up the Azure Metrics source in Sumo Logic, refer to [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to the [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform the steps below for each Azure Redis cache account that you want to monitor.
   1. Choose **Stream to an event hub** as the destination.
   1. Select `allLogs`.
   1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/export-logs-diagnostic-settings-cosmosdbforpostgresql.png')} alt="Azure flexible postgresql server logs" style={{border: '1px solid gray'}} width="800" />
3. Set server parameters as given below:
   - `log_statement`. Select **DDL**.
   - `log_lock_waits`. Set to **ON**. If required, you can also configure `deadlock_timeout`.
   - `log_connections`. Set to **ON**.
   - `log_disconnections`. Set to **ON**.
   - `log_duration`. Set to **ON**. If required, you can also configure `log_min_duration_statement`.
   - `log_hostname`. Set to **ON**.
   - `log_min_error_statement`. Set to **INFO**.
   - `log_min_messages`. Set to **INFO**.
   - `log_line_prefix`. Set to `%m [%p][%v] : %q[app=%a]`.

4. Tag the location field in the source with right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Redis Cache Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity Logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Skip this step if you are already collecting activity logs for a subscription.

:::note
Since this source contains logs from multiple regions, ensure that you do not tag this source with the location tag.
:::

## Installing the Azure Cosmos DB for PostgreSQL app

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

## Viewing the Azure Cosmos DB for PostgreSQL dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Overview

The **Azure Cosmos DB for PostgreSQL - Overview** dashboard provides details about replication lag, active connections and query duration distribution across clusters and servers.

Use this dashboard to:
* Track replication lag across replica clusters.
* Analyse query execution duration distribution and common errors across all servers.
* Identify clusters with max cpu usage, memory usage, and storage usage.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-CosmosDB-for-PostgreSQL/Azure-Cosmos-DB-for-PostgreSQL-Overview.png')} alt="Azure Cosmos DB for PostgreSQL - Overview dashboard" style={{border: '1px solid gray'}} width="800" />

### Network

The **Azure Cosmos DB for PostgreSQL - Network** dashboard provides insights on active connections, failed Ccnnections, and network activity including ingress and egress bytes.

Use this dashboard to:

* Quickly identify connection errors across clusters.
* Monitor active connections, ingress, and egress trends across clusters.
* Identify abnormally long sessions.


<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-CosmosDB-for-PostgreSQL/Azure-Cosmos-DB-for-PostgreSQL-Network.png')} alt="Azure CosmosDB for PostgreSql - Network" style={{border: '1px solid gray'}} width="800" />

### Errors

The **Azure Cosmos DB for PostgreSQL - Errors** dashboard provides insight into server error logs by specifically monitoring errors and database shutdown/start events.

Use this dashboard to:

* Quickly identify top errors across clusters and servers.
* Monitor error trends and distribution across clusters and servers.
* Identify unexpected database shutdown or start activity.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-CosmosDB-for-PostgreSQL/Azure-Cosmos-DB-for-PostgreSQL-Errors.png')} alt="Azure CosmosDB for PostgreSql - Errors" style={{border: '1px solid gray'}} width="800" />


### Security

The **Azure Cosmos DB for PostgreSQL - Security** dashboard provides insight into locations of incoming connections, failed authentications, and top database errors and warnings.

Use this dashboard to:

* Monitor incoming connections, failed authorization requests, and failed authentication requests.
* Track the user performing failed authentication attempts across servers.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-CosmosDB-for-PostgreSQL/Azure-Cosmos-DB-for-PostgreSQL-Security.png')} alt="Azure CosmosDB for PostgreSql - Security" style={{border: '1px solid gray'}} width="800" />

### Storage

The **Azure Cosmos DB for PostgreSQL - Storage** dashboard provides details about data usage, document count, and physical partition size by database.

Use this dashboard to:
* Monitor the storage utilisation to decide on scaling up storage or scaling out the nodes if this metric exceeds 85 percent consistently.
* Track total storage used across the clusters.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-CosmosDB-for-PostgreSQL/Azure-Cosmos-DB-for-PostgreSQL-Storage.png')} alt="Azure Cosmos DB for PostgreSQL - Storage dashboard" style={{border: '1px solid gray'}} width="800" />

### Performance

The **Azure Cosmos DB for PostgreSQL - Performance** dashboard provides insights into the performance of your Azure Cosmos DB for PostgreSQL databases. This includes metrics on query duration, server side latency, and failed queries.

Use this dashboard to:
* Track clusters approaching the maximum IOPS capacity, to decide on adding worker nodes.
* Identify clusters using a high percentage of the clusters available memory to decide on scaling up the compute if this metric consistently exceeds 90 percent.
* Monitor the CPU usage to decide on scaling up the compute if this metric exceeds 95 percent consistently.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-CosmosDB-for-PostgreSQL/Azure-Cosmos-DB-for-PostgreSQL-Performance.png')} alt="Azure Cosmos DB for PostgreSQL - Performance dashboard" style={{border: '1px solid gray'}} width="800" />

### Queries

The **Azure Cosmos DB for PostgreSQL - Queries** dashboard provides insights into the queries executed in your Azure Cosmos DB for PostgreSQL databases.

Use this dashboard to:
* Analyze query execution duration distribution across servers.
* Identify query statements with errors.
* Monitor spike in query duration.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-CosmosDB-for-PostgreSQL/Azure-Cosmos-DB-for-PostgreSQL-Queries.png')} alt="Azure Cosmos DB for PostgreSQL - Queries dashboard" style={{border: '1px solid gray'}} width="800" />

### Health

The **Azure Cosmos DB for PostgreSQL - Health** dashboard provides information of any service health incidents or resource health events associated with Azure Cosmos DB for PostgreSQL accounts in your azure account.

Use this dashboard to:
* View recent resource and service health incidents.
* View distribution of service and resource health by incident type.
* Monitor service availability.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-CosmosDB-for-PostgreSQL/Azure-Cosmos-DB-for-PostgreSQL-Health.png')} alt="Azure Cosmos DB for PostgreSQL - Health dashboard" style={{border: '1px solid gray'}} width="800" />

### Administrative Operations

The **Azure Cosmos DB for PostgreSQL - Administrative Operations** dashboard provides details on users performing admin operations.

Use this dashboard to:
* Identify top users performing administrative operations.
* View top 10 operations that caused the most errors.
* View recent diagnostic, network, and replication settings updates operations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-CosmosDB-for-PostgreSQL/Azure-Cosmos-DB-for-PostgreSQL-Administrative-Operations.png')} alt="Azure Cosmos DB for PostgreSQL - Administrative Operations dashboard" style={{border: '1px solid gray'}} width="800" />


## Upgrade/Downgrade the Azure Cosmos DB for PostgreSQL app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Cosmos DB for PostgreSQL app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).

