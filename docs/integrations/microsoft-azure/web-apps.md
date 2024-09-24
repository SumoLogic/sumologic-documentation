---
id: web-apps
title: Azure Web Apps
sidebar_label: Azure Web Apps
description: The Sumo Logic app for Azure Web Apps allows you to collect Azure web server and application diagnostics logs and monitor the health of your Azure Web Apps environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/webapps.png')} alt="thumbnail icon" width="50"/>

The Azure Web Apps app allows you to collect Azure web server and application diagnostics logs and monitor the health of your Azure Web Apps environment. This app provides preconfigured dashboards that allow you to monitor server operation, traffic requests, and response times.

For more information, see [Azure Web Apps](https://azure.microsoft.com/en-us/services/app-service/web/).

## Log types

The Azure Web Apps app supports:
* **Web Server Logging.** Information about HTTP transactions using the [W3C extended log file format](http://msdn.microsoft.com/library/windows/desktop/aa814385.aspx). This is useful when determining overall site metrics such as the number of requests handled or how many requests are from a specific IP address.
* **Application Diagnostics Logs.** Application diagnostics allows you to capture information produced by a web application. ASP.NET applications can use the [System.Diagnostics.Trace](http://msdn.microsoft.com/library/windows/desktop/aa814385.aspx) class to log information to the application diagnostics log.
* **Activity logs**. Provides insight into any subscription-level or management group level events that have occurred in the Azure. To learn more, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log-schema).
* **AppServiceConsoleLogs**. Provides insight into any subscription-level or management group level events that have occurred in the Azure. To learn more, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/appserviceconsolelogs).
* **AppServiceHTTPLogs**. Provides detailed records of all HTTP requests made to your Azure services, helping you analyze traffic patterns and diagnose issues. To learn more, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/appservicehttplogs).
* **AppServiceEnvironmentPlatformLogs**. Offers insights into the underlying platform environment of your Azure App Service, allowing you to monitor the health and performance of your app's infrastructure. To learn more, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/appserviceenvironmentplatformlogs).
* **AppServiceAuditLogs**. Captures administrative actions taken on your Azure App Service resources, enabling you to track changes and maintain compliance. To learn more, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/appserviceauditlogs).
* **AppServiceFileAuditLogs**. Records actions taken on files within your Azure App Service, assisting in the auditing of file access and modifications. To learn more, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/appservicefileauditlogs).
* **AppServiceAppLogs**. Provides application-specific logging information, giving developers insights into application behavior and issues. To learn more, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/appserviceapplogs).
* **AppServiceIPSecAuditLogs**. Details the use of IPsec policies within your Azure App Service, helping to ensure secure network configurations. To learn more, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/appserviceipsecauditlogs).
* **AppServicePlatformLogs**. Gives an overview of the platform-level events that occur within your Azure App Service, helping you monitor service reliability and performance. To learn more, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/appserviceplatformlogs).
* **AppServiceAntivirusScanAuditLogs**. Provides records of antivirus scan activities within your Azure App Service, ensuring that your applications remain secure from malicious threats. To learn more, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/appserviceantivirusscanauditlogs).

### Sample log messages

```json
2017-09-25 23:27:36 eShopCart GET / X-ARR-LOG-ID=9b3056e8-21d5-43f7-8fd7-4aec6b29525e
80 - 60.4.192.44 Mozilla/5.0+(Macintosh+NT+6.3;+WOW64)+AppleWebKit/537.36+(KHTML,
+like+Gecko)+Chrome/60.4.192.44+Safari/537.36 PHPSESSID=tv2iv6tn8c9su542l464ibaro5;
+ARRAffinity=d6c6606b1a249bd37139b09d6c2cb4dd61f6b5cd607f934012aca86bd59515444 -
eShopCart.azurewebsites.net 200 0 0 3098 1008 1000
```

### Sample queries

```sql title="Traffic over time outlier"
_sourceCategory=Azure/Web-app
| parse regex "\d+-\d+-\d+ \d+:\d+:\d+ (?<s_sitename>\S+) (?<cs_method>\S+) (?<cs_uri_stem>\S+) (?<cs_uri_query>\S+) (?<src_port>\S+) (?<src_user>\S+) (?<client_ip>\S+) (?<cs_user_agent>\S+) (?<cs_cookie>\S+) (?<cs_referrer>\S+) (?<cs_host>\S+) (?<sc_status>\S+) (?<sc_substatus>\S+) (?<sc_win32_status>\S+) (?<sc_bytes>\S+) (?<cs_bytes>\S+) (?<time_taken>\S+)"
| timeslice 5m
| count by _timeslice
| outlier _count
```

## Collecting logs for Azure Web Apps

In this step, you configure a pipeline for shipping logs from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) to an Event Hub.

1. To set up the logs collection in Sumo Logic, refer to [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).

     When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/WebApps/Logs`.
2. Push logs from Azure Monitor to Event Hub.
    1. Sign in to [Azure Portal](https://portal.azure.com/).
    1. Go to your Azure Web App and in the left pane, go to **Monitoring** > **Diagnostics Settings.**
    1. Diagnostic Settings blade will show all your existing settings if any already exist. Click **Edit Setting** if you want to change your existing settings, or click **Add diagnostic setting** to add a new one.
    1. Select the **Stream to an event hub box** checkbox.
    1. Select an Azure subscription.
    1. **Event bub namespace.** If you have chosen Method 1 (Azure Event Hubs Source) for collecting logs, select the **EventHubNamespace** created manually, or else if you have chosen Method 2 (Collect logs from Azure monitor using Azure functions), then select `SumoAzureLogsNamespace<UniqueSuffix>` namespace created by the ARM template.
    1. **Event hub name (optional).** If you have chosen Method 1 (Azure Event Hub Source) for collecting logs, select the event hub name, which you created manually, or if you have chosen Method 2 (Collect logs from Azure monitor using Azure functions), then select **insights-operational-logs**.
    1. Select **RootManageSharedAccessKey** from **Select Event hub policy name** dropdown.
    1. Select the checkbox for log types under **Categories** which you want to ingest.<br/> <img src={useBaseUrl('img/integrations/microsoft-azure/diagnostic-setting-web-apps.png')} style={{border: '1px solid gray'}} alt="diagnostic-setting-web-apps" width="800"/>
    1. Click **Save**.

## Collecting Metrics for Azure Web Apps (Optional)

In this step, you configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic. The pipeline is described on [Collect Metrics from Azure Monitor](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor.md). For exporting metrics you need to create another diagnostic setting and select All Metrics only with the following Event Hub configurations.

The current Sumo Logic app for Web Apps does not support metric content so this step is optional.

1. Perform Steps 1 and Step 2 of [Collect Metrics from Azure Monitor](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor).  
In Step 1, you create an HTTP source. When you configure the, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/WebApp/Metrics`
2. Push metrics from Azure Monitor to Event Hub.
    1. Sign in to [Azure Portal](https://portal.azure.com/).
    1. Go to your Azure Web App and in the left pane, go to **Monitoring** > **Diagnostics Settings.**
    1. Diagnostic Settings blade will show all your existing settings if any already exist. Click **Edit Setting** if you want to change your existing settings, or click **Add diagnostic setting** to add a new one.
    1. Select the **Stream to an event hub box** checkbox.
    1. Select an Azure subscription.
    1. **Event hub namespace.** Namespace created in [Collect Metrics from Azure Monitor](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor) by Metrics ARM template starting with `SumoMetricsNamespace<unique suffix>`.
    1. **Event hub name (optional).** Select **insights-metrics-pt1m** from the **Select Event hub name** dropdown.
    1. **Event hub policy.** Select **RootManageSharedAccessKey** from **Select Event hub policy name** dropdown.
    1. Select the checkbox for **AllMetrics** types under **Metrics** which you want to ingest.
    1. Click **Save**.

### Configure field in field schema
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Fields**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**. 
1. Search for following fields:
   - `tenant_name`. This field is tagged at the collector level and you can get the tenant name using the instructions [here](https://learn.microsoft.com/en-us/azure/active-directory-b2c/tenant-management-read-tenant-name#get-your-tenant-name).
   - `location`. The region to which the resource name belongs to.
   - `subscription_id`. ID associated with a subscription where resource is present.
   - `resource_group`. The resource group name where the Azure resource is present.
   - `provider_name`. Azure resource provider name (for example, Microsoft.WEB).
   - `resource_type`. Azure resource type (for example, SITES).
   - `resource_name`. The name of the resource (for example, Azure Function App name).
1. Create the fields if they are not present. Refer to [Manage fields](/docs/manage/fields/#manage-fields).

### Configure Field Extraction Rules

Create a Field Extraction Rule (FER) by following the instructions [here](/docs/manage/field-extractions/create-field-extraction-rule/). If the FER already exists with same name, then skip this step.

#### Azure Location Extraction FER

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

#### Resource ID Extraction FER

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

#### Azure Observability Metadata Extraction Service Level

If this rule already exists, there's no need to create it again.

```sql
Rule Name: AzureObservabilityMetadataExtractionAppServiceLevel
```

```sql title="Metric match expression"
resourceId=/SUBSCRIPTIONS/*/RESOURCEGROUPS/*/PROVIDERS/*/SITES/* tenant_name=*
```

| Fields extracted | Metric rule    |
|:-----------------|:---------------|
| `subscription_id`  | $resourceId._1 |
| `resource_group`   | $resourceId._2 |
| `provider_name`    | $resourceId._3 |
| `resource_type`    | SITES |
| `resource_name`    | $resourceId._4 |


### Configure metrics collection

In this section, you will configure a pipeline for shipping metrics from Azure Monitor to an Event Hub, on to an Azure Function, and finally to an HTTP Source on a hosted collector in Sumo Logic.

1. [Configure an HTTP Source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-1-configure-an-http-source).
1. [Configure and deploy the ARM Template](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-2-configure-azure-resources-using-arm-template).
1. [Export metrics to Event Hub](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-metrics-azure-monitor/#step-3-export-metrics-for-a-particular-resource-to-event-hub). Perform below steps for each Azure WebApps that you want to monitor.
   1. Choose `Stream to an event hub` as destination.
   1. Select `AllMetrics`.
   1. Use the Event Hub namespace created by the ARM template in Step 2 above. You can create a new Event Hub or use the one created by ARM template. You can use the default policy `RootManageSharedAccessKey` as the policy name.

### Configure logs collection

#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to the [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
1. To create the **Diagnostic setting** in the Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform the below steps for each Azure WebApps that you want to monitor.
   1. Choose `Stream to an event hub` as the destination.
   1. Select `AllMetrics`.
   1. Use the Event Hub namespace and Event Hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-WebApps-Configure-Diagnostic-Metrics.png')} alt="Azure Storage Tag Location" style={{border: '1px solid gray'}} width="800" />
1. Tag the location field in the source with right location value.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure Storage Tag Location" style={{border: '1px solid gray'}} width="400" />

#### Activity logs (optional)

To collect activity logs, follow the instructions [here](/docs/integrations/microsoft-azure/audit). If you are already collecting activity logs for a subscription, do not perform this step.

:::note
Since this source contains logs from multiple regions, make sure that you do not tag this source with the location tag.
:::

##### Enabling Microsoft Defender for Cloud

For Security events, make sure you enable [Microsoft Defender for Cloud](https://learn.microsoft.com/en-us/azure/defender-for-cloud/tutorial-enable-app-service-plan#enable-the-defender-for-app-service-plan). In Defender Plans Settings page toggle the App Service status under Cloud Workload Protection section.

<img src={useBaseUrl('img/integrations/microsoft-azure/Microsoft-Cloud-Defender-Edit-Settings.png')} alt="Edit Settings" style={{border: '1px solid gray'}} width="800" />

<img src={useBaseUrl('img/integrations/microsoft-azure/Microsoft-Cloud-Defender-Plans-AppService.png')} alt="Cloud Defender Plans" style={{border: '1px solid gray'}} width="800" />

##### Enabling health check metric

For getting health check metric, make sure you enable **Health check** under the **Monitoring** dropdown.

<img src={useBaseUrl('img/integrations/microsoft-azure/Enable-Health-Check-Metric.png')} alt="Enable Health Check Metric" style={{border: '1px solid gray'}} width="800" />

## Installing the Azure Web Apps app

This section provides instructions on how to install the Azure Web Apps app, and shows examples of each of the preconfigured dashboards you can use to analyze your data.

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Azure Web Apps dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Azure WebApps - Overview** dashboard provides comprehensive information of all the service health incidents or resource health events associated with Azure WebApps in your azure account.

Use this dashboard to:
* View recent resource and service health incidents.
* View distribution of service and resource health by incident type.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Overview.png')} alt="Azure WebApps Overview dashboard" style={{border: '1px solid gray'}} width="800" />

### Antivirus Scan Audit

The **Azure WebApps - Antivirus Scan Audit** dashboard provides detailed insights into the antivirus scan results and audit logs associated with your Azure WebApps.

Use this dashboard to:
*  View recent antivirus scan results and their statuses.
*  Analyze audit logs for compliance and security checks.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Health.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Content and Client Platform

The **Azure WebApps - Content and Client Platform** dashboard offers an overview of the content delivery performance and client platform statistics for your Azure WebApps.

Use this dashboard to:
*  Monitor content delivery metrics and client platform usage.
*  Identify trends in client platform access and performance.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Health.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Cost

The **Azure WebApps - Cost** dashboard presents an overview of the costs associated with your Azure WebApps services.

Use this dashboard to:
*  Analyze cost trends and breakdowns for your Azure WebApps usage.
*  Review budget forecasts and optimize spending.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Health.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### IP Restrictions

The **Azure WebApps - IP Restrictions** dashboard provides insights into the IP address restrictions configured for your Azure WebApps.

Use this dashboard to:
*  View configured IP restrictions and their statuses.
*  Monitor access attempts based on IP restrictions.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Health.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Memory

The **Azure WebApps - Memory** dashboard tracks memory usage and performance metrics for your Azure WebApps.

Use this dashboard to:
*  Monitor real-time memory utilization and trends.
*  Identify memory-related performance issues and bottlenecks.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Health.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Network

The **Azure WebApps - Network** dashboard offers comprehensive insights into the network performance and traffic for your Azure WebApps.

Use this dashboard to:
*  Analyze network traffic patterns and performance metrics.
*  Identify potential network issues affecting your applications.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Health.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Operations

The **Azure WebApps - Operations** dashboard provides a comprehensive view of the operational metrics and activities associated with your Azure WebApps.

Use this dashboard to:
*  Monitor operational events and their impact on service availability.
*  Analyze trends in operational performance over time.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Health.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### OS Statistics

The **Azure WebApps - OS Statistics** dashboard presents an overview of operating system metrics related to your Azure WebApps.

Use this dashboard to:
*  Monitor key OS performance indicators and health metrics.
*  Identify potential issues at the operating system level.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Health.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Platform

The **Azure WebApps - Platform** dashboard provides insights into the underlying platform performance and configurations of your Azure WebApps.

Use this dashboard to:
*  Monitor platform health metrics and configurations.
*  Identify trends and issues related to platform performance.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Health.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Server Operations - Errors and Response Codes

The **Azure WebApps - Server Operations - Errors and Response Codes** dashboard details the error rates and response codes generated by your Azure WebApps.

Use this dashboard to:
*  Analyze error trends and response code distribution.
*  Identify common issues affecting application performance.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Health.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Server Operations - Request and Response Time

The **Azure WebApps - Server Operations - Request and Response Time** dashboard tracks request and response times for your Azure WebApps.

Use this dashboard to:
*  Monitor performance metrics related to request and response times.
*  Identify latency issues and optimize response performance.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Health.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Traffic Insights - Apps and Requests

The **Azure WebApps - Traffic Insights - Apps and Requests** dashboard provides a comprehensive view of traffic patterns for your Azure WebApps.

Use this dashboard to:
*  Analyze traffic metrics for different applications and requests.
*  Identify usage trends and optimize application performance.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Health.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Health

The **Azure WebApps - Health** dashboard provides information of any service health incidents or resource health events associated with Azure WebApps in your azure account.

Use this dashboard to:
* View recent resource and service health incidents.
* View distribution of service and resource health by incident type.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Health.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Policy and Recommendations

The **Azure WebApps - Policy and Recommendations** dashboard provides information of all effect action operations performed by Azure policy and recommendations events from Azure Advisor.

Use this dashboard to:
* Monitor policy events with warnings and errors.
* View recent failed policy events.
* View total recommendation events.
* Identify High Impact recommendations.
* View recent recommendation events and navigate to the affected resource.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Policy-and-Recommendations.png')} alt="Azure WebApps - Policy and Recommendations dashboard" style={{border: '1px solid gray'}} width="800" />

### Administrative Operations

The **Azure SQL - Administrative Operations** dashboard provides details on read/write/delete specific changes, different operations used, top 10 operations that caused most errors, and users performing admin operations.

Use this dashboard to:
* Identify top users performing administrative operations.
* View Top 10 operations that caused the most errors.
* View recent read, write, and delete operations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Administrative-Operations.png')} alt="Azure WebApps Administrative Operations dashboard" style={{border: '1px solid gray'}} width="800" />

## Upgrading the Azure Web Apps app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Web Apps app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>