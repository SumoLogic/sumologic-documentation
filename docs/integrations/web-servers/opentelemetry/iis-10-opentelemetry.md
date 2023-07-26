---
id: iis-10-opentelemetry
title: IIS 10 - OpenTelemetry Collector
sidebar_label: IIS 10 - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for IIS 10.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/microsoft-azure/microsoft_iis_10.png')} alt="thumbnail icon" width="130"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The [Internet Information Services](https://learn.microsoft.com/en-gb/iis/get-started/introduction-to-iis/introduction-to-iis-architecture) (IIS) 10 app is a logs app that helps you monitor your IIS web servers' availability. Preconfigured dashboards provide insight into application pools, ASP.NET applications, requests, latency, visitor locations, visitor access types, traffic patterns, errors, web server operations, and access from known malicious sources.

IIS logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Schematics.png' alt="Schematics" />

## Fields creation in Sumo Logic for IIS

Following are the [Fields](/docs/manage/fields/) which will be created as part of IIS App install if not already present.

- `webengine.cluster.name`. User configured.Enter a name to uniquely identify your IIS web server cluster. This web server cluster name will be shown in the Sumo Logic dashboards.
- `webengine.system`. Has fixed value of **iis**
- `sumo.datasource`. Has fixed value of **iis**.

## Prerequisites

This section provides instructions for configuring log collection for IIS running on a non-Kubernetes environment for the Sumo Logic App for IIS. Sumo Logic supports the collection of logs from an IIS server in standalone environments. By default, IIS logs are stored in a log file. 

This section covers the following default log formats for IIS 10 and IIS 8.5:
- IIS Access Logs (W3C format)
- HTTP Error Logs

Default log formats are used by IIS App. IIS allows you to choose which fields to log in IIS access logs. To understand the various fields and their significance see this [link](https://docs.microsoft.com/en-us/windows/desktop/http/w3c-logging).

IIS Log files are generated as local files. For a standard Windows Server, the default log location is: `%SystemDrive%\inetpub\logs\LogFiles`. For example: `c:\inetpub\logs\LogFiles\`.

Within the folder, you will find subfolders for each site configured with IIS. The logs are stored in folders that follow a naming pattern like W3SVC1, W3SVC2, W3SVC3, etc. The number at the end of the folder name corresponds to your site ID. For example, W3SVC2 is for site ID 2.

- IIS Access Logs (W3C default format) Sumo Logic expects logs in [W3C](https://docs.microsoft.com/en-us/windows/desktop/http/w3c-logging) format with following fields:
  ```sql
  #Fields: date time s-ip cs-method cs-uri-stem cs-uri-query s-port cs-username c-ip cs(User-Agent) cs(Referer) sc-status sc-substatus sc-win32-status time-taken
  ```
   * IIS allows you to choose fields to log in IIS access logs. For explanations on the various fields and their significance see this [link](https://docs.microsoft.com/en-us/windows/desktop/http/w3c-logging).
- HTTP Error Logs Sumo Logic expects Error logs in following format:
  ```sql
  #Fields: date time c-ip c-port s-ip s-port protocol_version verb cookedurl_query protocol_status siteId Reason_Phrase Queue_Name
  ```

For information on HTTP Error Logs configuration and various HTTP Error Log fields, see [this link](https://support.microsoft.com/en-us/help/820729/error-logging-in-http-apis).

## Enable logging on your IIS Server

Perform the following task, if logging on your IIS Server is not already enabled. To enable logging on your IIS Server, do the following:

1. Open IIS Manager.
1. Select the site or server in the Connections pane, then double-click Logging.
  :::note
  Enhanced logging is only available for site-level logging. If you select the server in the Connections pane, then the Custom Fields section of the W3C Logging Fields dialog is disabled.
  :::
1. In the Format field under Log File, select W3C and then click Select Fields. IIS App works on default fields selection.
1. Select following fields, if not already selected. Sumo Logic expects these fields in IIS logs for the IIS App to work by default:
  ```sh
  date time s-ip cs-method cs-uri-stem cs-uri-query s-port cs-username c-ip cs(User-Agent) cs(Referer) sc-status sc-substatus sc-win32-status time-taken
  ```

For more information about IIS log format and log configuration refer to this [link](https://docs.microsoft.com/en-us/iis/get-started/whats-new-in-iis-85/enhanced-logging-for-iis85).

Once the logs are configured to be written into a local file follow the below step to configure collection in Sumo.

## Collection configuration and app installation

{@import ../../../reuse/apps/opentelemetry/config-app-install.md}

### Step 1: Set up Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Collector.png' alt="Collector" />

### Step 2: Configure integration

In this step, you will configure the yaml required for IIS Collection.

Path of the different log file configured to capture IIS logs is needed to be given here (see [Prerequisites](#prerequisites)).

You can add any custom fields which you want to tag along with the data ingested in Sumo. Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-YAML.png' alt="YAML" />

### Step 3: Send logs to Sumo

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

1. Copy the yaml file to `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
2. Restart the collector using: 
  ```sh
  Restart-Service -Name OtelcolSumo
  ```

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample Log Messages

```sql title="Sample Log Message - Non-Kubernetes environments"
2023-01-13 10:56:55 10.0.0.111 GET / ProgramID=236 443 - 207.235.176.5 Mozilla/5.0+(compatible;+Nimbostratus-Bot/v1.3.2;+http://cloudsystemnetworks.com) http://www.google.com/url?sa=t&rct=j&q=anomaly%20detection&source=web&cd=4 304 11 1236 70
```

## Sample Queries

This sample Query is from the **IIS - Overview** > **Visitor Location** panel.

```sql title="Query String"
" %\"sumo.datasource\"=iis %\"webengine.cluster.name\"=* | json \"log\" as _rawlog nodrop \n| if (isEmpty(_rawlog), _raw, _rawlog) as iis_log_message\n| parse regex field=iis_log_message \"(?<server_ip>\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}) (?<method>\\S+?) (?<cs_uri_stem>\\S+?) (?<cs_uri_query>\\S+?) (?<s_port>\\S+?) (?<cs_username>\\S+?) (?<c_ip>\\S+?) (?<cs_User_Agent>\\S+?) (?<cs_referer>\\S+?) (?<sc_status>\\S+?) (?<sc_substatus>\\S+?) (?<sc_win32_status>\\S+?) (?<time_taken>\\S+?)$\"\n| count by c_ip\n| lookup latitude, longitude, country_name from geo://location on ip=c_ip\n| where !isNull(latitude)"
```

## Viewing IIS Dashboards

### IIS - Overview

The **IIS - Overview** Dashboard provides a high-level view of the integrity of your Microsoft Internet Information Services (IIS) infrastructure. Dashboard panels display visual graphs and detailed information on IIS versions, platforms, and log formats. Panels also show visitor geographic locations, top app requests. OS platforms, response status, response times, and client and server errors.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Overview.png' alt="Overview" />

### IIS - Performance Snapshot

The **IIS - Performance Snapshot** Dashboard provides detailed information on your IIS infrastructure integrity and performance. Dashboard panels show details on Web Service uptime, active connections, requests, user activity, and total bytes transferred. Panels also provide HTTP Service Request Queues details, such as arrivals, queue size, cache hit rate, and rejection rate.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Performance-Snapshot.png' alt="Performance Snapshot" />

### IIS - Performance Trends

The **IIS - Performance Trends** Dashboard provides details on ISS infrastructure trends for requests, active connections, bytes received and sent, files received and sent, queue size, arrival rate, and cache hit rate.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Performance-Trends.png' alt="Performance Trends" />

### IIS - HTTP Error

The **IIS - HTTP Error** Dashboard provides detailed information on IIS error logging in HTTP. Dashboard panels show details on error events, top client and server IP addresses, top protocol versions and protocol status. Panels also show information on top reason phrases and verbs associated with HTTP errors, as well as top request details by reason.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-HTTP-Error.png' alt="HTTP Error" />

### IIS - Latency

The **IIS - Latency** provides visual graphs and detailed information for the integrity of performance throughout your IIS infrastructure. Dashboard panels show response time averages, cumulative percentiles, histograms, and outliers. Panels also show details for traffic distribution, slowest pages, slowest GET and POST requests, and average redirection time.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Latency.png' alt="Latency" />

### IIS - Web Server Operations

The **IIS - Web Server Operations** Dashboard provides visual graphs and detailed information on server operation errors in your IIS infrastructure. Dashboard panels show server errors by the server, server errors over time, server error outliers, and redirections by the server. Panels also show client errors by the server, client error outliers, top URLs with 404 errors, and response codes over time.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Web-Server-Operations.png' alt="Web Server Operations" />

### The IIS - Requests Stats

The **IIS - Requests Stats** Dashboard provides visual graphs and statistics for requests made throughout your IIS infrastructure. Dashboard panels show the number of requests, request methods, request outliers, and requests by server. Panels also show details on GET, PUT, POST, and DELETE requests, as well as requests time, compare and unique visitors outlier.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Requests-Stats.png' alt="Requests Stats" />

### IIS - Threat Analysis

The **IIS - Threat Analysis** Dashboard provides high-level views of threats throughout your IIS network. Dashboard panels display visual graphs and detailed information on Threats by Client IP, Threats by Referrer, and Threats by URL.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Threat-Analysis.png' alt="RThreat Analysis" />

### IIS - Visitor Access Types

The **IIS  - Visitor Access Types** Dashboard provides insights into visitor platform types, browsers, and operating systems, as well as the most popular mobile devices, PC and Mac versions used.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Visitor-Access-Types.png' alt="Visitor Access Types" />

### IIS - Visitor Locations

The **IIS - Visitor Locations** Dashboard provides a high-level view of Nginx visitor geographic locations both worldwide and in the United States. Dashboard panels also show graphic trends for visits by country over time and visits by  US region over time.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Visitor-Locations.png' alt="Visitor Locations" />

### IIS - Visitor Traffic Insights

The **IIS - Visitor Traffic Insight** Dashboard provides detailed information on the top documents accessed, top referrers, top search terms from popular search engines, and the media types served.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/IIS-OpenTelemetry/IIS-Visitor-Traffic-Insights.png' alt="Visitor Traffic Insights" />
