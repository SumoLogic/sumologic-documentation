---
id: azure-event-hubs
title: Azure Event Hubs
description: Learn about the Sumo Logic collection process for the Azure Event Hubs service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-event-hubs.png')} alt="Thumbnail icon" width="50"/>

[Azure Event Hubs](https://learn.microsoft.com/en-us/azure/event-hubs/event-hubs-about) is a modern big data streaming platform and event ingestion service that can seamlessly integrate with other Azure and Microsoft services, such as Stream Analytics, Power BI, and Event Grid, along with outside services like Apache Spark. This integration helps in monitoring data plane access operations (such as send or receive events), and tracking performance metrics like consumer lag, consumer and publisher throughput, and active connections in your Event Hub.

## Log and metric types

For Azure Event Hubs, you can collect the following logs and metrics:

* **Resource logs**. To learn more about the different resource log category types and schemas collected for Azure Event Hubs, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/event-hubs/monitor-event-hubs-reference#resource-logs).
:::info
Some log types are only available in premium and dedicated tiers.
:::
* **Platform Metrics for Azure Event Hubs**. These metrics are available in the namespaces below:
  * [Microsoft.EventHub/clusters](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-eventhub-clusters-metrics)
  * [Microsoft.EventHub/namespaces](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-eventhub-namespaces-metrics)

For more information on supported metrics, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/event-hubs/monitor-event-hubs-reference#metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Event Hub Namespace you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/EventHub/Logs`, `Azure/EventHub/Metrics`.

###  Configure collector

Create a hosted collector if not already configured and tag the `tenant_name` field. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name). Make sure you create the required sources in this collector. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />

### Configure metrics collection

import MetricsSource from '../../reuse/metrics-source.md';

<MetricsSource/>

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

#### Diagnostic logs

1. To set up the Azure Event Hubs source in Sumo Logic, refer to the  [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
1. To create the diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#create-diagnostic-settings). Perform the steps below for each Azure Event Hubs namespace that you want to monitor.
    1. Choose `Stream to an event hub` as the destination.
    1. Select `allLogs`.
    1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/azure-eventgrid-logs.png')} alt="Azure Event Grid logs" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with the right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Virtual Machine Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity logs (optional)

import ActivityLogs from '../../reuse/apps/azure-activity-logs.md';

<ActivityLogs/>

## Installing the Azure Event Hubs app

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
- `service_name`. Services that can be accessed with an Azure resource. (For example, in Azure Container Instances the service is Subscriptions.)

## Viewing the Azure Event Hubs dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Overview

The **Azure Event Hubs - Overview** dashboard provides comprehensive details on Eventhubs and details such as overall number of requests, namespaces and instances, size by eventhubs, operation types, ingress and egress of data
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureEventHubs/Azure-Event-Hubs-Overview.png')} alt="Azure Event Hubs - Overview dashboard" style={{border: '1px solid gray'}} width="800" />

### Operations

The **Azure Event Hubs - Operations** dashboard provides details over the recent create, read, delete or update operations done by the event hubs.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureEventHubs/Azure-Event-Hubs-Operations.png')} alt="Azure Event Hubs - Operations" style={{border: '1px solid gray'}} width="800" />

### Performance

The **Azure Event Hubs - Performance** dashboard provides insights into the performance of your Azure Event Hubs. This includes metrics on Replication lag and count, cluster CPU usage and memory usage.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureEventHubs/Azure-Event-Hubs-Performance.png')} alt="Azure Event Hubs - Performance" style={{border: '1px solid gray'}} width="800" />

### Network

The **Azure Event Hubs - Network** dashboard provides details on network traffic and connectivity related to your Azure Event Hubs. This includes data on inbound and outbound traffic in bytes and message, connections and requests.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureEventHubs/Azure-Event-Hubs-Network.png')} alt="Azure Event Hubs - Network" style={{border: '1px solid gray'}} width="800" />

### Kafka Overview

The **Azure Event Hubs - Kafka Overview** dashboard provides details on Kafka Coordinator events based on different operations count, Kafka Coordinator operations based on namespaces and clients, last 10 log messages and heartbeat events.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureEventHubs/Azure-Event-Hubs-Kafka-Overview.png')} alt="Azure Event Hubs - Kafka Overview" style={{border: '1px solid gray'}} width="800" />

### Kafka Errors

The **Azure Event Hubs - Kafka Errors** dashboard provides information about Kafka related errors in Event Hubs including error count, errors by object and error messages, error by namespaces and last 10 Kafka error messages
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureEventHubs/Azure-Event-Hubs-Kafka-Errors.png')} alt="Azure Event Hubs - Kafka Errors" style={{border: '1px solid gray'}} width="800" />

### Errors

The **Azure Event Hubs - Errors** dashboard provides information about errors in Event Hubs including user errors, diagnostic errors, operation errors, top 10 error numbers and error messages, error trend and comparison analyses by types of activity, operation result and entity.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureEventHubs/Azure-Event-Hubs-Errors.png')} alt="Azure Event Hubs - Errors" style={{border: '1px solid gray'}} width="800" />

### Audit

The **Azure Event Hubs  - Audit** dashboard provides audit information on namespace level events, and cluster level events such as audit failures, auth failures, auth protocols, status and connections.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureEventHubs/Azure-Event-Hubs-Audit.png')} alt="Azure Event Hubs - Operations" style={{border: '1px solid gray'}} width="800" />

### Administrative Operations

The **Azure Event Hubs - Administrative Operations** dashboard provides details on the operational activities and status of your Azure Event Hubs resources.

Use this dashboard to:
* Monitor the distribution of operation types and their success rates to ensure proper functioning of your Event Hubs.
* Identify potential issues by analyzing the top operations causing errors and correlating them with specific users or applications.
* Track recent write and delete operations to maintain an audit trail of changes made to your Event Hubs.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureEventHubs/Azure-Event-Hubs-Administrative-Operations.png')} alt="Azure Event Hubs - Administrative Operations dashboard" style={{border: '1px solid gray'}} width="800" />

### Policy and Recommendations

The **Azure Event Hubs - Policy and Recommendations** dashboard provides details on policy events and recommendations for your Azure Event Hubs resources.

Use this dashboard to:
* Monitor the success and failure rates of policy events to ensure proper configuration and compliance.
* Track and analyse recent recommendations to improve the performance and security of your Event Hubs setup.
* Identify trends in policy events and recommendations over time to proactively address potential issues.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/AzureEventHubs/Azure-Event-Hubs-Policy-and-Recommendations.png')} alt="Azure Event Hubs - Policy and Recommendations dashboard" style={{border: '1px solid gray'}} width="800" />

## Create monitors for Azure Event Hubs

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure Event Hubs alerts

These alerts are metric based and will work for all Azure Storage.

| Alert Name                                           | Alert Description and Conditions                                                                                                                          | Alert Condition | Recover Condition |
|:-----------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------|:------------------|
| `Azure Event Hubs - Available Memory (Cluster Only)` | This alert is triggered when Average Available Memory Percentage is less than 10% and a warning alert is triggered at 20% available memory.               | Count < 10      | Count > = 10      |
| `Azure Event Hubs - CPU Usage (Cluster Only)`        | This alert is triggered when Average CPU Usage is greater than 80% and a warning alert is triggered at 70% CPU usage.                                     | Count > 80      | Count < = 80      |
| `Azure Event Hubs - Incoming Messages`               | This alert is triggered when Total Incoming Messages Count is greater than 1000.                                                                          | Count > 1000    | Count < = 1000    |
| `Azure Event Hubs - Server Errors`                   | This alert is triggered when Total Server Errors Count is greater than 1.                                                                                 | Count > 1       | Count < = 1       |
| `Azure Event Hubs - Throttled Requests`              | This alert is triggered when Total Throttled Requests Count is greater than 1.                                                                            | Count > 1       | Count < = 1       |
| `Azure Event Hubs - User Errors`                     | This alert is triggered when Total User Errors Count is greater than 1.                                                                                   | Count > 1       | Count < = 1       |

## Upgrade/Downgrade the Azure Event Hubs app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Event Hubs app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
