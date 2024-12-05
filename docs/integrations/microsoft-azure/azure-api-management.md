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
* Metrics collection using our [HTTP Logs and Metrics source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/) via Azure Functions deployed using the ARM template.

You must explicitly enable diagnostic settings for each Azure API Management service you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/APIManagement/Logs`, `Azure/APIManagement/Metrics`.

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
   - `service_name`. Services that can be accessed with an Azure resource (for example, in Azure API Management service is Subscriptions).
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

#### Azure observability metadata extraction application gateway level

   ```sql
   Rule Name: AzureObservabilityMetadataExtractionAppGatewayLevel
   ```
   
   ```sql title="Metric match expression"
   resourceId=/SUBSCRIPTIONS/*/RESOURCEGROUPS/*/PROVIDERS/*/APPLICATIONGATEWAYS/* tenant_name=*
   ```
   | Fields extracted  | Metric rule             |
   |:------------------|:------------------------|
   | subscription_id   | $resourceId._1          |
   | resource_group    | $resourceId._2          |
   | provider_name     | MICROSOFT.APIMANAGEMENT |
   | resource_type     | SERVICE                 |
   | resource_name     | $resourceId._3          |

### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. Create hosted collector and tag tenant_name field. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Tenant-Name.png')} alt="Azure Tag Tenant Name" style={{border: '1px solid gray'}} width="500" />
1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
1. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
1. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure API Management that you want to monitor.
   1. Choose `Stream to an event hub` as destination.
   1. Select `AllMetrics`.
   1. Use the Event hub namespace created by the ARM template in Step 2 above. You can create a new Event hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name. <br/><img src={useBaseUrl('img/send-data/azure-apimanagement-metrics.png')} alt="Azure application gateway metrics" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure API Management Tag Location" style={{border: '1px solid gray'}} width="400" />
   
:::note
In the v2 service tiers, API Management has replaced the capacity metric with separate CPU and memory utilization metrics
:::

### Configure logs collection

#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from Azure Monitor to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to the [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
1. To create the diagnostic settings in Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform the steps below for each Azure application gateway account that you want to monitor.
   1. Choose **Stream to an event hub** as the destination.
   1. Select `allLogs`.
   1. Use the Event Hub namespace and Event Hub name configured in the previous step in the destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/azure-apimanagement-logs.png')} alt="Azure API Management logs" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with right location value. <br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure API Management Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity Logs

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). Do not perform this step in case you are already collecting activity logs for a subscription.

:::note
Since this source contains logs from multiple regions, make sure that you do not tag this source with the location tag.
:::

:::note
Enable Defender for Cloud On Azure portal go to -> api management resource -> Security -> Defender for Cloud -> Click on button **Enable Defender on the subscription (recommended)** on the Defender plan page turn status on for selected plans and click on **Save** button. 
:::

## Installing the Azure API Management app

Now that you have set up data collection, install the Azure API Management Sumo Logic app to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstallNoDataSourceV2 from '../../reuse/apps/app-install-index-apps-v2.md';

<AppInstallNoDataSourceV2/>

## Viewing the Azure API Management dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

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

## Upgrade/Downgrade the Azure API Management app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure API Management app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

## Troubleshooting

### HTTP Logs and Metrics Source used by Azure Functions

To troubleshoot metrics collection, follow the instructions in [Collect Metrics from Azure Monitor > Troubleshooting metrics collection](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#troubleshooting-metrics-collection).
