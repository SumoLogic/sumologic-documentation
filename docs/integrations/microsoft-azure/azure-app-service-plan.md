---
id: azure-app-service-plan
title: Azure App Service Plan
description: Learn about the Sumo Logic collection process for the Azure App Service Plan service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-app-service-plan.png')} alt="Thumbnail icon" width="50"/>

[Azure App Service Plan](https://learn.microsoft.com/en-us/azure/app-service/overview-hosting-plans) defines a set of compute resources for a app service to run. This integration helps in monitoring memory, CPU, incoming and outgoing bandwidth, number of sockets and their states across all the instances of the plan.

## Log and metric types

For Azure App Service Plan, you can collect the following metrics:

- **Activity logs**, provides insight into any subscription-level or management group level events that have occurred in the Azure. To learn more, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log-schema).

- **Platform Metrics for Azure App Service Plan**. These metrics are available in the [Microsoft.Web/serverfarms](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-web-serverfarms-metrics) namespace. For more information on supported metrics, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/app-service/web-sites-monitor#understand-metrics). App Service Plan metrics are available only for plans in Basic, Standard, Premium and Isolated tiers.

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/).
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Azure App Service plan you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/AppServicePlan/Logs`, `Azure/AppServicePlan/Metrics`.

### Configure metric rules

#### Azure Observability Metadata Extraction Service Level

If this rule already exists, there's no need to create it again.

```sql
Rule Name: AzureObservabilityMetadataExtractionWebAppServerFarmLevel
```

```sql title="Metric match expression"
resourceId=/SUBSCRIPTIONS/*/RESOURCEGROUPS/*/PROVIDERS/*/SERVERFARMS/* tenant_name=*
```

| Fields extracted | Metric rule    |
|:-----------------|:---------------|
| `subscription_id`  | $resourceId._1 |
| `resource_group`   | $resourceId._2 |
| `provider_name`    | $resourceId._3 |
| `resource_type`    | SERVERFARMS |
| `resource_name`    | $resourceId._4 |

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. Create hosted collector and tag tenant_name field. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />
1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
1. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
1. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure App Service plan that you want to monitor.
   1. Choose `Stream to an event hub` as destination.
   1. Select `AllMetrics`.
   1. Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.
4. Tag the location field in the source with right location value.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Storage Tag Location" style={{border: '1px solid gray'}} width="400" />

### Configure logs collection

#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the **Diagnostic setting** in the Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform the below steps for each Azure Functions that you want to monitor.
   1. Choose `Stream to an event hub` as the destination.
   1. Select `AllMetrics`.
   1. Use the Event Hub namespace and Event Hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-App-Service-Plan-Configure-Diagnostic-Metrics.png')} alt="Azure App Service Plan Tag Location" style={{border: '1px solid gray'}} width="800" />
3. Tag the location field in the source with right location value.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Storage Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity logs (optional)

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). If you are already collecting activity logs for a subscription, do not perform this step.

## Installing the Azure App Service Plan app

This section provides instructions on how to install the Azure App Service Plan app, and shows examples of each of the preconfigured dashboards you can use to analyze your data.

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Azure App Service Plan dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Azure AppService - Overview** dashboard provides comprehensive information of all the service health incidents or resource health events associated with Azure AppService in your azure account.

Use this dashboard to:
* View recent resource and service health incidents.
* View distribution of service and resource health by incident type.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-AppService/Azure-App-Service-Plan-Overview.png')} alt="Azure AppService Overview dashboard" style={{border: '1px solid gray'}} width="800" />

### Network

The **Azure AppService - Network** dashboard offers comprehensive insights into the network performance and traffic for your Azure AppService.

Use this dashboard to:
*  Analyze network traffic patterns and performance metrics.
*  Identify potential network issues affecting your applications.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-AppService/Azure-App-Service-Plan-Network.png')} alt="Azure AppService Network dashboard" style={{border: '1px solid gray'}} width="800" />

### Resource Utilisation

The **Azure AppService - Resource Utilisation** dashboard provides a comprehensive view of the resource utilisation metrics and activities associated with your Azure AppService.

Use this dashboard to:
*  Monitor resource utilisation events and their impact on service availability.
*  Analyze trends in operational performance over time.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-AppService/Azure-App-Service-Plan-Resource-Utilisation.png')} alt="Azure AppService Resource Utilisation dashboard" style={{border: '1px solid gray'}} width="800" />

### Administrative Operations

The **Azure AppService - Administrative Operations** dashboard provides details on read/write/delete specific changes, different operations used, top 10 operations that caused most errors, and users performing admin operations.

Use this dashboard to:
* Identify top users performing administrative operations.
* View Top 10 operations that caused the most errors.
* View recent read, write, and delete operations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-AppService/Azure-App-Service-Plan-Administrative-Operations.png')} alt="Azure AppService Administrative Operations dashboard" style={{border: '1px solid gray'}} width="800" />

## Upgrading the Azure App Service Plan app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure App Service Plan app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
