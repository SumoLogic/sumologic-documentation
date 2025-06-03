---
id: azure-service-bus
title: Azure Service Bus
description: Learn about the Sumo Logic collection process for the Azure Service Bus service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-service-bus.png')} alt="Thumbnail icon" width="50"/>

[Azure Service Bus](https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview) is a fully managed enterprise message broker with message queues and publish-subscribe topics (in a namespace) used for decoupling applications and services from each other. This integration helps in monitoring incoming/outgoing messages, connections, throttled requests, and resource usage of your Service Bus namespace.

## Log and metric types

For Azure Service Bus, you can collect the following logs and metrics:
* **Operational Logs**. To learn more about the resource log schema for Azure Service Bus, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/service-bus-messaging/monitor-service-bus-reference#resource-logs).
* **VNet And IP Filtering Logs**. To learn more about the resource log schema for Azure Service Bus, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/service-bus-messaging/monitor-service-bus-reference#resource-logs).
* **Runtime Audit Logs**. To learn more about the resource log schema for Azure Service Bus, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/service-bus-messaging/monitor-service-bus-reference#runtime-audit-logs).
* **Diagnostic Error Logs**. To learn more about the resource log schema for Azure Service Bus, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/service-bus-messaging/monitor-service-bus-reference#diagnostic-error-logs).
* **Platform Metrics for Azure Service Bus**. These metrics are available in [Microsoft.ServiceBus/namespaces](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-servicebus-namespaces-metrics) namespace. For more information on supported metrics and dimensions, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/service-bus-messaging/monitor-service-bus-reference#metrics).

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Azure Service Bus namespace you want to monitor. You can forward logs to the same Event Hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the Event Hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/ServiceBus/Logs`, `Azure/ServiceBus/Metrics`.

### Configure metrics collection

To set up the Azure Metrics source in Sumo Logic, refer to [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).


### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.
#### Diagnostic logs
1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
1. To create the Diagnostic settings in the Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#create-diagnostic-settings). Perform the steps below for each Azure Service Bus namespace that you want to monitor.
   1. Choose `Stream to an event hub` as the destination.
   1. Select `allLogs`.
   1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.
   1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/azure-servicebus-logs.png')} alt="Azure Service Bus logs" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with the right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Service Bus Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity Logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Do not perform this step in case you are already collecting activity logs for a subscription.

:::note
Since this source contains logs from multiple regions, make sure that you do not tag this source with the location tag.
:::


## Installing the Azure Service Bus app

Now that you have set up data collection, install the Azure Service Bus Sumo Logic app to use the pre-configured [dashboards](#viewing-the-azure-service-bus-dashboards) that provide visibility into your environment for real-time analysis of overall usage.

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
- `service_type`. The type of service that can be accessed with an Azure resource.
- `service_name`. Services that can be accessed with an Azure resource (for example, in Azure Container Instances, the service is Subscriptions).

## Viewing the Azure Service Bus dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Overview

The **Azure Service Bus - Overview** provides details on the overall performance and usage of your Azure Service Bus namespaces.

Use this dashboard to:
* Monitor namespace resource utilization like CPU and memory usage across different locations.
* Track message processing trends by analyzing incoming vs outgoing message differences, total errors and Average Server Send Latency over time.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureServiceBus/Azure-Service-Bus-Overview.png')} alt="Azure Service Bus - Overview" style={{border: '1px solid gray'}} width="800" />


### Administrative Operations

The **Azure Service Bus - Administrative Operations** provides an overview of management activities performed on your Azure Service Bus namespaces.

Use this dashboard to:
* Monitor the distribution of read, write, and delete operations across your service bus namespaces.
* Identify and investigate errors occurring during administrative operations to maintain optimal service bus configuration.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureServiceBus/Azure-Service-Bus-Administrative-Operations.png')} alt="Azure Service Bus - Overview" style={{border: '1px solid gray'}} width="800" />


### Errors

The **Azure Service Bus - Errors** provides details on various error types, failed operations, and error messages related to Azure Service Bus.

Use this dashboard to:
* Identify and troubleshoot common error patterns by analyzing the trend of user errors and server errors.
* Monitor message processing issues by tracking dead-lettered and abandoned messages over time.
<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureServiceBus/Azure-Service-Bus-Errors.png')} alt="Azure Service Bus - Overview" style={{border: '1px solid gray'}} width="800" />


### Messages

The **Azure Service Bus - Messages** provides a detailed view of message flow and status within your Azure Service Bus namespaces.

Use this dashboard to:
* Monitor the volume and status of messages across different categories like active, completed, and abandoned messages.
* Identify potential bottlenecks by comparing incoming and outgoing message rates.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureServiceBus/Azure-Service-Bus-Messages.png')} alt="Azure Service Bus - Overview" style={{border: '1px solid gray'}} width="800" />


### Policy and Recommendation

The **Azure Service Bus - Policy and Recommendation** provides information on policy enforcement and recommendations for your Azure Service Bus namespaces.

Use this dashboard to:
* Review policy success and failure events to ensure proper policy enforcement and security.
* Identify recommendations to improve the performance and security of your Service Bus instances.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureServiceBus/Azure-Service-Bus-Policy-and-Recommendation.png')} alt="Azure Service Bus - Overview" style={{border: '1px solid gray'}} width="800" />


### Traffic

The **Azure Service Bus - Traffic** provides insights into the network traffic and connections of your Azure Service Bus namespaces.

Use this dashboard to:
* Track active connections and analyze connection patterns over time.
* Monitor server send latency and identify any performance issues affecting message delivery.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureServiceBus/Azure-Service-Bus-Traffic.png')} alt="Azure Service Bus - Overview" style={{border: '1px solid gray'}} width="800" />

## Create monitors for Azure Service Bus App

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure Service Bus Alerts

These alerts are metrics-based and will work for all Azure Service Bus.

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Azure Service Bus - High Count of Active Messages` | This alert is triggered when active message count greater than 5000. Also, a warning type alert will be triggered when active message count greater than 1000. | Count > 5000 | Count < = 5000 |
| `Azure Service Bus - High Count of Dead-lettered Messages` | This alert is triggered when dead- lettered message count greater than 50. Also, a warning type alert will be triggered when dead- lettered message count greater than 10. | Count > 50 | Count < = 50 |
| `Azure Service Bus - High Count of Messages (Overall)` | This alert is triggered when messages count (active, dead-lettered, scheduled, etc.)  greater than 6000. Also, a warning type alert will be triggered when messages count greater than 1500. | Count > 6000 | Count < = 6000 |
| `Azure Service Bus - High Size Consumption` | This alert is triggered when average size is greater than 3000000000 bytes. Also, a warning type alert will be triggered when average size is greater than 1073741824 bytes. | Count > 3000000000 | Count < = 3000000000 |

## Upgrade/Downgrade the Azure Service Bus app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Service Bus app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
