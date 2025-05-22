---
id: azure-api-management
title: Azure API Management
description: Learn about the Sumo Logic collection process for the Azure API Management service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-api-management.png')} alt="Thumbnail icon" width="50"/>

[Azure API Management](https://learn.microsoft.com/en-us/azure/api-management/api-management-key-concepts) is a hybrid multicloud platform for managing APIs across different environments. As a platform-as-a-service, it supports the entire API lifecycle and provides near real-time visibility into API status and health, offering essential API Management operations and details for auditing.

## Log and metric types

For Azure API Management, you can collect the following logs and metrics:

* **Gateway logs**. To learn more about the resource log schema for Azure API Management, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/api-management/gateway-log-schema-reference). The Consumption tier doesn't support the collection of resource logs.
* **WebSocket connection logs**. To learn more about the resource log schema for Azure API Management, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/apimanagementwebsocketconnectionlogs). The Consumption tier doesn't support the collection of resource logs.
* **Developer portal audit logs**. To learn more about the resource log schema for Azure API Management, refer to the [Azure documentation](https://learn.microsoft.com/en-us/azure/api-management/developer-portal-audit-log-schema-reference). The Consumption tier doesn't support the collection of resource logs.
* **Platform metrics**. These metrics are available in the [Microsoft.ApiManagement/service](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-apimanagement-service-metrics) namespace.

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each Azure API Management service you want to monitor. You can forward logs to the same Event Hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the Event Hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/APIManagement/Logs`, `Azure/APIManagement/Metrics`.

### Configure metrics collection

To set up the Azure Metrics source in Sumo Logic, refer to [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

   
:::note
In the v2 service tiers, API Management has replaced the capacity metric with separate CPU and memory utilization metrics
:::

### Configure logs collection

#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to the [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
1. To create the diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform the steps below for each Azure API management account that you want to monitor.
   1. Choose **Stream to an event hub** as the destination.
   1. Select `allLogs`.
   1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/azure-apimanagement-logs.png')} alt="Azure API Management logs" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure API Management Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity Logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Do not perform this step in case you are already collecting activity logs for a subscription.

:::note
Since this source contains logs from multiple regions, make sure that you do not tag this source with the location tag.
:::

##### Enabling Microsoft Defender for Cloud

For Security events, make sure you enable [Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/tutorial-enable-app-service-plan#enable-the-defender-for-app-service-plan). In Defender Plans Settings page toggle the **APIs** status under **Cloud Workload Protection (CWP)** section.

<img src={useBaseUrl('img/integrations/microsoft-azure/Microsoft-Cloud-Defender-Edit-Settings.png')} alt="Edit Settings" style={{border: '1px solid gray'}} width="800" />

<img src={useBaseUrl('img/integrations/microsoft-azure/azure-api-management-services.png')} alt="Cloud Defender Plans" style={{border: '1px solid gray'}} width="800" />

## Installing the Azure API Management app

Now that you have set up data collection, install the Azure API Management Sumo Logic app to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

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

## Viewing the Azure API Management dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

### Administrative Operations

The **Azure API Management - Administrative Operations** dashboard provides details like Top 10 Operations That Caused The Most Errors, Distribution by Operation Type (Read, Write, and Delete), Distribution by Operations, Recent Write Operations, Recent Delete Operations, Users/Applications by Operation type, and Distribution by Status.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureApiManagement/Azure-API-Management-Administrative-Operations.png')} alt="Azure API Management - Overview" style={{border: '1px solid gray'}} width="800" />

### Developer Portal

The **Azure API Management - Developer Portal** dashboard provides details like Total Success Requests, Total Failed Requests, Success Requests vs Failed Requests, Failed Requests by Method, Requests by Response Code, Failed Request Details, and Failed Requests by Resource.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureApiManagement/Azure-API-Management-Developer-Portal.png')} alt="Azure API Management - Overview" style={{border: '1px solid gray'}} width="800" />

### Errors

The **Azure API Management - Errors** dashboard provides details like Failed Backend Requests by Backend Method, Failed Backend Requests by Backend Url, Failed Backend Requests by Backend Protocol, Failed Requests by Method, Failed Requests by Protocol, Requests by Response Code, Requests by Backend Response Code, Failed Requests, Failed Backend Requests, Failed Requests by Url, Top 10 Failed API Urls, Failed Request Details, and Top 3 Caller IPs With Failures by Resource.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureApiManagement/Azure-API-Management-Errors.png')} alt="Azure API Management - Overview" style={{border: '1px solid gray'}} width="800" />

### Overview

The **Azure API Management - Overview** dashboard provides details like Requests by Location, Total Requests by Method, Total Requests by Response Code, Top Operations with Request Size, Top Operations with Response Size, Backend, Top Backend Url by Request Size, Top Backend Urls with Response Size, Websockets, Websocket Connections by Event Name, Websocket Connection Details, Current Capacity Utilization, Total Requests, Requests Summary by Users, API Requests (Today, Yesterday, Last Week), Average Capacity Utilization (%), and CPU (%).

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureApiManagement/Azure-API-Management-Overview.png')} alt="Azure API Management - Overview" style={{border: '1px solid gray'}} width="800" />

### Performance

The **Azure API Management - Performance** dashboard provides details like Request Duration by Url, Request Duration by Method, Requests by Response Code, Requests by Result Type, Backend Request Duration by Backend Url, Backend Request Duration by Backend Method, Backend Requests by Response Code, Overall Duration Vs Backend Duration, Successful Requests by Method, Successful Requests by Client Protocol, Top 10 APIs With Highest Backend Execution Duration, and Top 10 APIs With Highest Number of Requests.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureApiManagement/Azure-API-Management-Performance.png')} alt="Azure API Management - Overview" style={{border: '1px solid gray'}} width="800" />

### Policy and Recommendations

The **Azure API Management - Policy and Recommendations** dashboard provides details like Total Recommendation Events, Total Success Policy Events, Total Failed Policy Events, Failed Policy Events, Recent Recommendation Events, Recommendation, and Policy.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureApiManagement/Azure-API-Management-Policy-and-Recommendations.png')} alt="Azure API Management - Overview" style={{border: '1px solid gray'}} width="800" />

### Subscriptions

The **Azure API Management - Subscriptions** dashboard provides details like Total Requests by Subscription, Failed Requests by Subscription, Requests by Subscription, Failed Requests by Subscription, Top 10 Failed Subscription, and Recent Changes in Subscription.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/AzureApiManagement/Azure-API-Management-Subscriptions.png')} alt="Azure API Management - Overview" style={{border: '1px solid gray'}} width="800" />


## Create monitors for Azure API Management App

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure API Management Alerts

These alerts are metrics-based and will work for all Azure API Management.

| Name | Description | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Azure API Management - High Capacity Utilization` | This alert is triggered when average capacity utilization percentage greater than 80. Also, a warning type alert will be triggered when average capacity utilization percentage greater than 70. | Count > 80 | Count <= 80 |
| `Azure API Management - High Duration of Backend Requests` | This alert is triggered when average duration of backend requests greater than 2000ms. Also, a warning type alert will be triggered when average duration of backend requests greater than 1000ms. | Count > 2000 | Count <= 2000 |
| `Azure API Management - High Gateway Client Errors (4xx)` | This alert is triggered when count of gateway requests resulting in a 4xx client error greater than 10. | Count > 10 | Count <= 10 |
| `Azure API Management - High Gateway Server Errors (5xx)` | This alert is triggered when count of gateway requests resulting in a 5xx server error greater than 5. | Count > 5 | Count <= 5 |
| `Azure API Management - High Overall  Duration of Gateway Requests` | This alert is triggered when average overall duration of gateway requests greater than 3000ms. Also, a warning type alert will be triggered when average overall duration of gateway requests greater than 1500ms. | Count > 3000 | Count <= 3000 |


## Upgrade/Downgrade the Azure API Management app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure API Management app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
