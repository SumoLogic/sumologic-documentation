---
id: azure-cache-for-redis
title: Azure Cache for Redis
description: Learn about the Sumo Logic collection process for the Azure Cache for Redis service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-cache-for-redis.png')} alt="Thumbnail icon" width="50"/>

[Azure Cache for Redis](https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/cache-overview) provides an in-memory data store based on the Redis software. It offers both the Redis open-source (OSS Redis) and a commercial product from Redis Inc. (Redis Enterprise) as a managed service. This integration helps in tracking cache performance (miss rate, latency, read and write rate) and monitor resource usage (CPU, used memory, server load, and connections) of your instances.

## Log and metric types

For Azure Cache for Redis, you can collect the following logs and metrics:

* **Connection logs**. These logs contains information about the connections to the cache for security and diagnostic purposes. To learn more about the [limitations of connection logging](https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/cache-monitor-diagnostic-settings?tabs=basic-standard-premium#prerequisiteslimitations-of-connection-logging) and [schemas](https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/cache-monitor-diagnostic-settings?tabs=basic-standard-premium#contents-of-the-connection-logs) collected for Azure Cache for Redis, refer to the Azure documentation.
* **Activity logs**, provides insight into any subscription-level or management group level events that have occurred in the Azure. To learn more, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log-schema).
* **Cache Metrics**. These metrics are available in [Microsoft.Cache/redis](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-cache-redis-metrics) and [Microsoft.Cache/redisEnterprise](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-cache-redisenterprise-metrics) namespace. For more information on supported metrics, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/cache-how-to-monitor#list-of-metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Activity Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/). It is recommended to create a separate source for activity logs. If you are already collecting these logs, you can skip this step.
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Azure Cache for Redis you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/RedisCache/Logs` and `Azure/RedisCache/Metrics`.

### Configure metrics collection

import MetricsSourceBeta from '../../reuse/metrics-source-beta.md';

<MetricsSourceBeta/>

### Configure logs collection

#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to the [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform the steps below for each azure redis cache account that you want to monitor.
   1. Choose **Stream to an event hub** as the destination.
   1. Select `allLogs`.
   1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.
   <img src={useBaseUrl('img/send-data/azureredis-cache-logs.png')} alt="Azure Redis Cache logs" style={{border: '1px solid gray'}} width="800" /> 
3. Tag the location field in the source with right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Redis Cache Tag Location" style={{border: '1px solid gray'}} width="500" />

#### Activity Logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Do not perform this step if you are already collecting activity logs for a subscription.

:::note
Since this source contains logs from multiple regions, ensure that you do not tag this source with the location tag.
:::

## Installing the Azure Redis Cache app

Now that you have set up data collection, install the Azure Load Balancer Sumo Logic app to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallIndexV2 from '../../reuse/apps/app-install-index-option.md';

<AppInstallIndexV2/>

As part of the app installation process, the following fields will be created by default:

- `tenant_name`. This field is tagged at the collector level. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
- `location`. The region to which the resource name belongs to.
- `subscription_id`. ID associated with a subscription where the resource is present.
- `resource_group`. The resource group name where the Azure resource is present.
- `provider_name`. Azure resource provider name (for example, Microsoft.Network).
- `resource_type`. Azure resource type (for example, storage accounts).
- `resource_name`. The name of the resource (for example, storage account name).
- `service_type`. Type of the service that can be accessed with an Azure resource.
- `service_name`. Services that can be accessed with an Azure resource (for example, in Azure Container Instances the service is Subscriptions).

## Viewing the Azure Cache for Redis dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Administrative Operations

The **Azure Cache for Redis - Administrative Operations** dashboard provides details like distribution by operation type, by operation, recent delete operations, top 10 operations that caused most errors, and users/applications by operation type.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureCacheForRedis/Azure-Cache-for-Redis-Administrative-Operations.png')} alt="Azure Cache for Redis - Administrative Operations" style={{border: '1px solid gray'}} width="800" />

### Connections(Enterprise)

The **Azure Cache for Redis - Connections(Enterprise)** provides details like connections by location, total unique connected clients, total connections, event types, disconnection events, failure by operations, connected clients, cache read vs write, and hit vs misses.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureCacheForRedis/Azure-Cache-for-Redis-Connections-Enterprise.png')} alt="Azure Cache for Redis - Connections(Enterprise" style={{border: '1px solid gray'}} width="800" />

### Connections(Non-Enterprise)

The **Azure Cache for Redis - Connections(Non-Enterprise)** dashboard provides details like connections by location, total unique connected clients, total connections, top 10 ip's by connection count, connections by resource name, connected clients (instance based), connected clients, cache read vs write, and hit vs misses.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureCacheForRedis/Azure-Cache-for-Redis-Connections-Non-Enterprise.png')} alt="Azure Cache for Redis - Connections(Non-Enterprise)" style={{border: '1px solid gray'}} width="800" />


### Geo Replication

The **Azure Cache for Redis - Geo Replication** dashboard provides details like geo-replication healthy - fetched from geo-secondary cache, geo-replication full sync events - fetched from geo-secondary cache, geo-replication data sync offset - fetched from geo-primary cache, and geo-replication connectivity lag - fetched from geo-secondary cache.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureCacheForRedis/Azure-Cache-for-Redis-Geo-Replication.png')} alt="Azure Cache for Redis - Geo Replication" style={{border: '1px solid gray'}} width="800" />


### MSEntra Authentication Audit

The **Azure Cache for Redis - MSEntra Authentication Audit** dashboard provides details like requests by location, requests by resource name, requests by username, and MSEntra authentication audit details.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureCacheForRedis/Azure-Cache-for-Redis-MSEntra-Authentication-Audit.png')} alt="Azure Cache for Redis - MSEntra Authentication Audit" style={{border: '1px solid gray'}} width="800" />

### Policy and Recommendations

The **Azure Cache for Redis - Policy and Recommendations** dashboard provides details like total success policy events, total failed policy events, total recommendation events, and recent recommendation events.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureCacheForRedis/Azure-Cache-for-Redis-Policy-and-Recommendations.png')} alt="Azure Cache for Redis - Policy and Recommendations" style={{border: '1px solid gray'}} width="800" />

### Resource Operations (Enterprise)

The **Azure Cache for Redis - Resource Operations(Enterprise)** dashboard provides details like total operations, ops per second (max), gets, sets, evicted key count, and expired key count.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureCacheForRedis/Azure-Cache-for-Redis-Resource-Operations-Enterprise.png')} alt="Azure Cache for Redis - Resource Operations(Enterprise)" style={{border: '1px solid gray'}} width="800" />

### Resource Operations (Non-Enterprise)

The **Azure Cache for Redis - Resource Operations(Non-Enterprise)** dashboard provides details like total operations, ops per second (max), gets, sets, evicted key count, and expired key count.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureCacheForRedis/Azure-Cache-for-Redis-Resource-Operations-Non-Enterprise.png')} alt="Azure Cache for Redis - Resource Operations(Non-Enterprise)" style={{border: '1px solid gray'}} width="800" />


### Resource Overview (Enterprise)

The **Azure Cache for Redis - Resource Overview(Enterprise)** dashboard provides details like max server load %, max CPU %, max bytes used, max number of connected clients, and errors.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureCacheForRedis/Azure-Cache-for-Redis-Resource-Overview-Enterprise.png')} alt="Azure Cache for Redis - Resource Overview(Enterprise)" style={{border: '1px solid gray'}} width="800" />

### Resource Overview (Non-Enterprise)

The **Azure Cache for Redis - Resource Overview(Non-Enterprise)** dashboard provides details like max server load %, max CPU %, max bytes used, max number of connected clients, and errors.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureCacheForRedis/Azure-Cache-for-Redis-Resource-Overview-Non-Enterprise.png')} alt="Azure Cache for Redis - Resource Overview(Non-Enterprise)" style={{border: '1px solid gray'}} width="800" />


### Resource Performance (Enterprise)

The **Azure Cache for Redis - Resource Performance(Enterprise)** dashboard provides details like cache hits, cache misses, cache write (max), cache read (max), cache latency microseconds, and 99th percentile latency (max).

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureCacheForRedis/Azure-Cache-for-Redis-Resource-Performance-Enterprise.png')} alt="Azure Cache for Redis - Resource Performance(Enterprise)" style={{border: '1px solid gray'}} width="800" />

### Resource Performance (Non-Enterprise)

The **Azure Cache for Redis - Resource Performance(Non-Enterprise)** dashboard provides details like cache hits, cache misses, cache write (max), cache read (max), cache latency microseconds, and 99th percentile latency (max).

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureCacheForRedis/Azure-Cache-for-Redis-Resource-Performance-Non-Enterprise.png')} alt="Azure Cache for Redis - Resource Performance(Non-Enterprise)" style={{border: '1px solid gray'}} width="800" />


### Azure Cache for Redis alerts
These alerts are metric based and will work for all Azure Cache for Redis.

| Alert Name                                       | Alert Description and Conditions                                                                                                                                                        | Alert Condition    | Recover Condition |
|:-------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------|:------------------|
| `Azure Cache For Redis - Cache Read`             | This alert is triggered  when Average Cache Read bytes are greater than 140625000. Also, a warning type alert will be triggered when Cache Read Units bytes are greater than 130625000. | bytes >= 140625000 | bytes < 140625000 |
| `Azure Cache For Redis - Connected Clients`      | This alert is triggered  when Connected Clients count is greater than 5625. Also, a warning type alert will be triggered when Connected Clients count is greater than 4625.             | count >= 5625      | count < 5625      |
| `Azure Cache For Redis - CPU Utilization`        | This alert is triggered when CPU Utilization percentage greater than 80. Also a warning type alert will be triggered when CPU Utilization percentage greater than 70.                   | percentage >= 80   | percentage < 80   |
| `Azure Cache For Redis - Server Load`            | This alert is triggered when Server Load percentage greater than 80. Also a warning type alert will be triggered when Server Load percentage greater than 70.                           | percentage >= 80   | percentage < 80   |
| `Azure Cache For Redis - Used Memory Percentage` | This alert is triggered when Used Memory percentage greater than 80. Also a warning type alert will be triggered when Used Memory percentage greater than 70.                           | percentage >= 80   | percentage < 80   |

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
