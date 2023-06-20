---
id: web-apps
title: Azure Web Apps
sidebar_label: Azure Web Apps
description: The Sumo Logic app for Azure Web Apps allows you to collect Azure web server and application diagnostics logs and monitor the health of your Azure Web Apps environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/webapps.png')} alt="thumbnail icon" width="50"/>

The Azure Web Apps app allows you to collect Azure web server and application diagnostics logs and monitor the health of your Azure Web Apps environment. This app provides preconfigured dashboards that allow you to monitor server operation, traffic requests, and response times.

For more information on Azure Web Apps, see [https://azure.microsoft.com/en-us/se...p-service/web/](https://azure.microsoft.com/en-us/services/app-service/web/).

## Log types

The Azure Web Apps app supports:
* **Web Server Logging.** Information about HTTP transactions using the [W3C extended log file format](http://msdn.microsoft.com/library/windows/desktop/aa814385.aspx). This is useful when determining overall site metrics such as the number of requests handled or how many requests are from a specific IP address.
* **Application Diagnostics Logs.** Application diagnostics allows you to capture information produced by a web application. ASP.NET applications can use the [System.Diagnostics.Trace](http://msdn.microsoft.com/library/windows/desktop/aa814385.aspx) class to log information to the application diagnostics log.

### Sample log message

```json
2017-09-25 23:27:36 eShopCart GET / X-ARR-LOG-ID=9b3056e8-21d5-43f7-8fd7-4aec6b29525e
80 - 60.4.192.44 Mozilla/5.0+(Macintosh+NT+6.3;+WOW64)+AppleWebKit/537.36+(KHTML,
+like+Gecko)+Chrome/60.4.192.44+Safari/537.36 PHPSESSID=tv2iv6tn8c9su542l464ibaro5;
+ARRAffinity=d6c6606b1a249bd37139b09d6c2cb4dd61f6b5cd607f934012aca86bd59515444 -
eShopCart.azurewebsites.net 200 0 0 3098 1008 1000
```

### Sample Query

```sql title="Traffic over time outlier"
_sourceCategory=Azure/Web-app
| parse regex "\d+-\d+-\d+ \d+:\d+:\d+ (?<s_sitename>\S+) (?<cs_method>\S+) (?<cs_uri_stem>\S+) (?<cs_uri_query>\S+) (?<src_port>\S+) (?<src_user>\S+) (?<client_ip>\S+) (?<cs_user_agent>\S+) (?<cs_cookie>\S+) (?<cs_referrer>\S+) (?<cs_host>\S+) (?<sc_status>\S+) (?<sc_substatus>\S+) (?<sc_win32_status>\S+) (?<sc_bytes>\S+) (?<cs_bytes>\S+) (?<time_taken>\S+)"
| timeslice 5m
| count by _timeslice
| outlier _count
```

## Collecting Logs for Azure Web Apps

Sumo Logic supports several methods for collecting logs from Event Hub. You can choose any of them to collect logs.

- [Azure Event Hubs Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/azure-event-hubs-source/) (Recommended) 
- [Collect Logs from Azure Monitor using Azure Functions](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-logs-azure-monitor/#configure-log-collection)


### Solution Overview

The following is how the solution fits together:

* Azure Monitor collects logs for most Microsoft Azure services, including Azure Web Apps, and streams the data to an Azure Event Hub.
* Azure Event Hub is a data streaming platform and event ingestion service. In this pipeline, an Event Hub streams the logs collected by Azure Monitor to an Azure function.
* The Azure function is a small piece of code that is triggered by Event Hub to send logs to the Sumo HTTP Source, function logs to one Storage Account, and failover data to another.

### Export logs for a particular Web App to Event Hub

In this task, you enable logs for your Azure Web app. For related information see [Enable diagnostics logging for web apps in Azure App Service](https://docs.microsoft.com/en-us/azure/app-service/troubleshoot-diagnostic-logs#send-logs-to-azure-monitor-preview) in the Azure help documentation.

To enable logs for an Azure web app, do the following:
1. Sign in to [Azure Portal](https://portal.azure.com/).
1. Go to your Azure Web App and in the left pane, go to **Monitoring >** **Diagnostics Settings.**
1. Diagnostic Settings blade will show all your existing settings if any already exist. Click **Edit Setting** if you want to change your existing settings, or click **Add diagnostic setting** to add a new one.
2. Select the **Stream to an event hub box** checkbox.
3. Select an Azure subscription.
4. **Event bub namespace.** If you have chosen Method 1 (Azure Event Hubs Source) for collecting logs, select the **EventHubNamespace** created manually, or else if you have chosen Method 2 (Collect logs from Azure monitor using Azure functions), then select `SumoAzureLogsNamespace<UniqueSuffix>` namespace created by the ARM template.
5. **Event hub name (optional).** If you have chosen Method 1 (Azure Event Hub Source) for collecting logs, select the event hub name, which you created manually, or if you have chosen Method 2 (Collect logs from Azure monitor using Azure functions), then select **insights-operational-logs**.
6. Select **RootManageSharedAccessKey** from **Select Event hub policy name** dropdown.
7. Select the checkbox for log types under **Category Details** which you want to ingest.
8. Click **Save**.

### Export metrics for a particular web app to Event Hub (Optional)

The current Sumo Logic app for Web Apps does not support metric content so this step is optional. For exporting metrics you need to create another diagnostic setting and select All Metrics only with the following Event Hub configurations.

**Event hub namespace.** Namespace created in [Step 2](#Step_2._Configure_Azure_resources_using_ARM_template) by Metrics ARM template starting with `SumoMetricsNamespace<unique suffix>`

**Event hub name.** Select **insights-metrics-pt1m** from the **Select Event hub name** dropdown.

**Event hub policy.** Select **RootManageSharedAccessKey** from **Select Event hub policy name** dropdown.

## Installing the Azure Web Apps app

This section provides instructions on how to install the Azure Web Apps app, and shows examples of each of the preconfigured dashboards you can use to analyze your data.

{@import ../../reuse/apps/app-install.md}

## Viewing Azure Web Apps dashboards

### Overview

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/AzureWebApps/WebApps-Overview.png')} alt="Overview" />

**Visits by Country.** Performs a geo location operation to display the IP addresses of visitors on a map of the world for the last three hours.

**Response Time and Data Volume.** Displays the average response time and data volume in a line chart on a timeline for the last three hours.

**Traffic Over Time.** Shows the traffic in a line chart on a timeline for the last 24 hours.

**OS Platform Breakdown.** Provides the operating systems used in a pie chart for the last three hours.

**400 and 500 Server Errors.** Displays any 400 and 500 server errors in a pie chart for the last 15 minutes.

**Traffic Over Time (Outlier).** Shows the traffic and any outliers in an outlier chart on a timeline for the last 24 hours.

**OS Platform Breakdown by Country.** Lists the operating system used by country in a table chart for the last three hours.

**Errors by Country.** Displays the number of errors by country in a bar chart for the last three hours.


### Server Operation - Errors and Response Codes

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/AzureWebApps/AzureWebApps-ServerOperation-ErrorsAndResponseCodes.png')} alt="Server Operation - Errors and Response Codes" />

**Server Errors by Site.** Shows details on server errors by site in a column chart for the last three hours.

**Response Codes Over Time.** Displays the number of response codes over time in a line chart on a timeline for the last three hours.

**Application Log Levels Over Time.** Shows details on log levels over time in a column chart on a timeline for the last three hours.

**Application Errors by Site.** Provides details about application errors by site in a line chart on a timeline for the last three hours.

**Client Errors.** Displays details on client errors in a column chart for the last three hours.


### Server Operation - Requests and Response Time

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/AzureWebApps/AzureWebApps-ServerOperation-RequestsAndResponseTime.png')} alt="Server Operation - Requests and Response Time" />

**Requests by Hostname.** Displays the number of requests by hostname in a line chart on a timeline for the last three hours.

**Requests by Site Over Time.** Shows the number of requests by site in a line chart on a timeline for the last three hours.

**Top 10 Slowest Pages.** Provides details on the top 10 slowest pages in a table chart including information on the URL and the average time in seconds for the last three hours.

**Response Time Histogram.** Displays response times in a column chart for the last three hours.

**Response Throughput.** Shows details on response throughput in a table chart including information on the URL and the average throughput in seconds for the last three hours.


### Traffic Insights - Apps and Requests

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/AzureWebApps/AzureWebApps-TrafficInsights-AppsAndRequests.png')} alt="Traffic Insights - Apps and Requests" />

**Visits by Country.** Performs a geo lookup operation and displays the IP addresses of worldwide visitors on a map of the world for the last three hours.

**US Visits by State.** Performs a geo lookup operation and displays the IP addresses of US visitors on a map of the United States for the last three hours.

**Requests by App.** Displays the number of requests by app in a line chart on a timeline for the last three hours.

**Top Clients.** Provides details on the top clients by IP address in a bar chart for the last three hours.

**Traffic Over Time (Outlier).** Shows the traffic and any outliers in an outlier chart on a timeline for the last 24 hours.


### Traffic Insights - Content and Client Platform

<img src={useBaseUrl('https://sumologic-app-data.s3.amazonaws.com/dashboards/AzureWebApps/AzureWebApps-TrafficInsights-ContentAndClientPlatform.png')} alt="Traffic Insights - Content and Client Platform" />

**Media Types Requested Over Time.** Displays media types requested over time by count in a line chart on a timeline in the last three hours.

**OSes and Browsers.** Shows details on operating systems and browsers used in a column chart for the last three hours.

**Top Requested Documents.** Provides the top requested documents in a table chart including details on the URL and number of requests for the last three hours.

**OS Platform.** Displays the different operating systems used in a pie chart for the last three hours.

**Top Requested Documents by Country.** Lists the top requested documents in a table chart including details on URI, country name, and number of requests for the last three hours.

**Top 10 Slowest Pages by Country.** Lists the 10 slowest pages by country in a table chart including details on URI, country name, and average time in seconds for the last three hours.
