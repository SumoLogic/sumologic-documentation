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

## Log and metric types

For Azure Web Apps, you can collect the following logs and metrics:

- **Resource logs**, which provide an insight into operations that were performed within an Azure resource. For a complete schema for resource logs refer to the below documentation:
    * [Web Server Logging](http://msdn.microsoft.com/library/windows/desktop/aa814385.aspx)
    * [Application Diagnostics Logs](http://msdn.microsoft.com/library/windows/desktop/aa814385.aspx)
    * [Activity logs](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log-schema)
    * [AppServiceAuditLogs](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/appserviceauditlogs)
    * [AppServiceFileAuditLogs](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/appservicefileauditlogs)
    * [AppServiceIPSecAuditLogs](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/appserviceipsecauditlogs)
    * [AppServicePlatformLogs](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/appserviceplatformlogs)
    * [AppServiceAntivirusScanAuditLogs](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/tables/appserviceantivirusscanauditlogs)

- **Activity logs**, provides insight into any subscription-level or management group level events that have occurred in the Azure. To learn more, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log-schema).

* **Azure WebApps platform metrics**. These are metrics specific to Functions like execution count and execution units.
  For more information on supported metrics, refer to [Azure documentation](https://learn.microsoft.com/en-us/azure/azure-monitor/reference/supported-metrics/microsoft-web-sites-metrics).

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

## Setup

Azure service sends monitoring data to Azure Monitor, which can then [stream data to Eventhub](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/stream-monitoring-data-event-hubs). Sumo Logic supports:

* Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
* Activity Logs collection from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) using our [Azure Event Hubs source](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/). It is recommended to create a separate source for activity logs. If you are already collecting these logs, you can skip this step.
* Metrics collection using our [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

You must explicitly enable diagnostic settings for each web app that you want to monitor. You can forward logs to the same event hub provided they satisfy the limitations and permissions as described [here](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings?tabs=portal#destination-limitations).

When you configure the event hubs source or HTTP source, plan your source category to ease the querying process. A hierarchical approach allows you to make use of wildcards. For example: `Azure/WebApps/Logs`, `Azure/WebApps/Metrics`.

### Configure metrics collection

To set up the Azure Metrics source in Sumo Logic, refer to [Azure Metrics Source](/docs/send-data/hosted-collectors/microsoft-source/azure-metrics-source).

### Configure logs collection

#### Diagnostic logs

In this section, you will configure a pipeline for shipping diagnostic logs from [Azure Monitor](https://docs.microsoft.com/en-us/azure/monitoring-and-diagnostics/monitoring-get-started) to an Event Hub.

1. To set up the Azure Event Hubs source in Sumo Logic, refer to the [Azure Event Hubs Source for Logs](/docs/send-data/collect-from-other-data-sources/azure-monitoring/ms-azure-event-hubs-source/).
2. To create the **Diagnostic setting** in the Azure portal, refer to the [Azure documentation](https://learn.microsoft.com/en-gb/azure/data-factory/monitor-configure-diagnostics). Perform the below steps for each Azure WebApps that you want to monitor.
    1. Choose `Stream to an event hub` as the destination.
    1. Select `HTTP logs`, `App Service Console Logs`, `App Service Application Logs`, `Access Audit Logs`, `IPSecurity Audit logs`, `App Service Platform logs`, `Report Antivirus Audit Logs`, `Site Content Change Audit Logs`.
    1. Use the Event Hub namespace and Event Hub name configured in previous step in destination details section. You can use the default policy `RootManageSharedAccessKey` as the policy name.<br/><img src={useBaseUrl('img/send-data/azure-webapps-logs.png')} alt="Azure WebApps logs" style={{border: '1px solid gray'}} width="800" />
3. Tag the location field in the source with right location value.<br/><img src={useBaseUrl('img/integrations/microsoft-azure/Azure-Storage-Tag-Location.png')} alt="Azure WebApps Tag Location" style={{border: '1px solid gray'}} width="400" />

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
- `service_type`. Type of the service that can be accessed with a Azure resource.
- `service_name`. Services that can be accessed with an Azure resource (for example, in Azure Container Instances the service is Subscriptions).

## Viewing Azure Web Apps dashboards

import ViewDashboardsIndex from '../../reuse/apps/view-dashboards-index.md';

<ViewDashboardsIndex/>

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

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Antivirus-Scan-Audit.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Content and Client Platform

The **Azure WebApps - Content and Client Platform** dashboard offers an overview of the content delivery performance and client platform statistics for your Azure WebApps.

Use this dashboard to:
*  Monitor content delivery metrics and client platform usage.
*  Identify trends in client platform access and performance.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Content-and-Client-Platform.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### IP Restrictions

The **Azure WebApps - IP Restrictions** dashboard provides insights into the IP address restrictions configured for your Azure WebApps.

Use this dashboard to:
*  View configured IP restrictions and their statuses.
*  Monitor access attempts based on IP restrictions.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-IP-Restrictions.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Memory

The **Azure WebApps - Memory** dashboard tracks memory usage and performance metrics for your Azure WebApps.

Use this dashboard to:
*  Monitor real-time memory utilization and trends.
*  Identify memory-related performance issues and bottlenecks.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Memory.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Network

The **Azure WebApps - Network** dashboard offers comprehensive insights into the network performance and traffic for your Azure WebApps.

Use this dashboard to:
*  Analyze network traffic patterns and performance metrics.
*  Identify potential network issues affecting your applications.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Network.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### I/O Operations

The **Azure WebApps - I/O Operations** dashboard provides a comprehensive view of the I/O operational metrics and activities associated with your Azure WebApps.

Use this dashboard to:
*  Monitor I/O operational events and their impact on service availability.
*  Analyze trends in operational performance over time.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-I-O-Operations.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### OS Statistics

The **Azure WebApps - OS Statistics** dashboard presents an overview of operating system metrics related to your Azure WebApps.

Use this dashboard to:
*  Monitor key OS performance indicators and health metrics.
*  Identify potential issues at the operating system level.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-OS-Statistics.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Platform

The **Azure WebApps - Platform** dashboard provides insights into the underlying platform performance and configurations of your Azure WebApps.

Use this dashboard to:
*  Monitor platform health metrics and configurations.
*  Identify trends and issues related to platform performance.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Platform.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Errors

The **Azure WebApps - Errors** dashboard details the error rates and response codes generated by your Azure WebApps.

Use this dashboard to:
*  Analyze error trends and response code distribution.
*  Identify common issues affecting application performance.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Errors.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Server Operations

The **Azure WebApps - Server Operations** dashboard tracks request and response times for your Azure WebApps.

Use this dashboard to:
*  Monitor performance metrics related to request and response times.
*  Identify latency issues and optimize response performance.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Server-Operations.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

### Traffic Insights

The **Azure WebApps - Traffic Insights** dashboard provides a comprehensive view of traffic patterns for your Azure WebApps.

Use this dashboard to:
*  Analyze traffic metrics for different applications and requests.
*  Identify usage trends and optimize application performance.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Traffic-Insights.png')} alt="Azure WebApps health dashboard" style={{border: '1px solid gray'}} width="800" />

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

The **Azure WebApps - Administrative Operations** dashboard provides details on read/write/delete specific changes, different operations used, top 10 operations that caused most errors, and users performing admin operations.

Use this dashboard to:
* Identify top users performing administrative operations.
* View Top 10 operations that caused the most errors.
* View recent read, write, and delete operations.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Administrative-Operations.png')} alt="Azure WebApps Administrative Operations dashboard" style={{border: '1px solid gray'}} width="800" />

### Instances

The **Azure Web Apps - Instances** dashboard provides information of all effect action details performed based on Azure Web Apps Instances.

Use this dashboard to:
* View recent resource usage and performance based on Instances.
* View distribution and service usage of resources by Instance.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Azure-WebApps/Azure-WebApps-Instances.png')} alt="Azure Web Apps Instances dashboard" style={{border: '1px solid gray'}} width="800" />


## Create monitors for Azure Web Apps app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Azure Web Apps alerts

These alerts are metrics-based and will work for all Web Apps.

| Alert Name                                | Description                                                                                | Alert Condition | Recover Condition |
|:------------------------------------------|:-------------------------------------------------------------------------------------------|:----------------|:------------------|
| `Azure Web Apps - Average Response Time` | This alert gets triggered when there is high response time detected in any Azure Function. | Count < 1       | Count >= 1        |
| `Azure Web Apps - Delete function app`   | This alert gets triggered when a function app is deleted.                                  | Count >= 1      | Count < 1         |
| `Azure Web Apps - Health Check Status`   | This alert gets triggered when there is Health Check Status average drops less than 100.   | Count < 100     | Count >= 100      |
| `Azure Web Apps - Http 4xx Error`        | This alert gets triggered when HTTP 4xx errors are high in the Azure Web Apps.            | Count > 25      | Count =< 25       |
| `Azure Web Apps - Https Server Error`    | This alert gets triggered when HTTP 5xx errors are high in the Azure Web Apps.            | Count > 25      | Count =< 25       |


## Upgrade/Downgrade the Azure Web Apps app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Azure Web Apps app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>

