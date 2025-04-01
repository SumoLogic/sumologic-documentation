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
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Azure Service Bus namespace you want to monitor. You can forward logs to the same Event Hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the Event Hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/ServiceBus/Logs`, `Azure/ServiceBus/Metrics`.

### Configure field in field schema

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Fields**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**. 
1. Search for the following fields:
   - `tenant_name`. This field is tagged at the collector level. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
   - `location`. The region to which the resource name belongs to.
   - `subscription_id`. ID associated with a subscription where the resource is present.
   - `resource_group`. The resource group name where the Azure resource is present.
   - `provider_name`. Azure resource provider name (for example, Microsoft.Network).
   - `resource_type`. Azure resource type (for example, storage accounts).
   - `resource_name`. The name of the resource (for example, storage account name).
   - `service_type`. Type of the service that can be accessed with a Azure resource.
   - `service_name`. Services that can be accessed with an Azure resource (for example, in Azure Service Bus service is Subscriptions).
1. Create the fields if they are not present. Refer to [Manage fields](/docs/manage/fields/#manage-fields).

### Configure field extraction rules

Create the following Field Extraction Rule(s) (FER) for Azure Storage by following the instructions in [Create a Field Extraction Rule](/docs/manage/field-extractions/create-field-extraction-rule/).

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

#### Azure observability metadata extraction service level

If this rule already exists, there is no need to create it again.

   ```sql
   Rule Name: AzureObservabilityMetadataExtractionServiceLevel    
   ```
   
   ```sql title="Metric match expression"
   resourceId=/SUBSCRIPTIONS/*/RESOURCEGROUPS/*/PROVIDERS/*/*/*/*/* tenant_name=*
   ```
   | Fields extracted | Metric rule    |
   |------------------|----------------|
   | subscription_id  | $resourceId._1 |
   | resource_group   | $resourceId._2 |
   | provider_name    | $resourceId._3 |
   | resource_type    | $resourceId._4 |
   | resource_name    | $resourceId._5 |
   | service_type     | $resourceId._6 |
   | service_name     | $resourceId._7 |

#### Azure observability metadata extraction service bus level

   ```sql
   Rule Name: AzureObservabilityMetadataExtractionAzureServiceBusLevel
   ```
   
   ```sql title="Metric match expression"
   resourceId=/SUBSCRIPTIONS/*/RESOURCEGROUPS/*/PROVIDERS/MICROSOFT.SERVICEBUS/NAMESPACES/* tenant_name=*
   ```
   | Fields extracted  | Metric rule           |
   |:------------------|:----------------------|
   | subscription_id   | $resourceId._1        |
   | resource_group    | $resourceId._2        |
   | provider_name     | MICROSOFT.SERVICEBUS  |
   | resource_type     | NAMESPACES            |
   | resource_name     | $resourceId._3        |

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. Create hosted collector and tag tenant_name field. You can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name). <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />
1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
1. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
1. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure Service Bus namespace that you want to monitor.
   * Choose `Stream to an event hub` as destination.
   * Select `AllMetrics`.
   * Use the Event Hub namespace created by the ARM template in Step 2 above. You can create a new Event Hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/azure-service-bus-metrics.png')} alt="Azure service bus metrics" style={{border: '1px solid gray'}} width="800" />
   * Tag the location and entityname fields in the source with right values. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Service-Bus-Tag-Metric-Fields.png')} alt="Azure Service Bus Tag location and entityname" style={{border: '1px solid gray'}} width="400" />

### Configure logs collection

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.
#### Diagnostic logs
1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
1. To create the Diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#create-diagnostic-settings). Perform below steps for each Azure Service Bus namespace that you want to monitor.
   1. Choose `Stream to an event hub` as the destination.
   1. Select `allLogs`.
   1. Use the Event Hub namespace and Event Hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.
   1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/azure-servicebus-logs.png')} alt="Azure Service Bus logs" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Service Bus Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity Logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Do not perform this step in case you are already collecting activity logs for a subscription.

:::note
Since this source contains logs from multiple regions, make sure that you do not tag this source with the location tag.
:::


## Installing the Azure Service Bus app

Now that you have set up data collection, install the Azure Service Bus Sumo Logic app to use the pre-configured [dashboards](#viewing-the-azure-service-bus-app-dashboards) that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Viewing the Azure Service Bus dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

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

## Upgrade/Downgrade the Azure Service Bus app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Service Bus app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
