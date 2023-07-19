---
id: apache-tomcat-opentelemetry
title: Apache Tomcat - OpenTelemetry Collector
sidebar_label: Apache Tomcat - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for Apache Tomcat.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/web-servers/apache-tomcat.png')} alt="Thumbnail icon" width="65"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The [Apache Tomcat](https://tomcat.apache.org/tomcat-8.5-doc/index.html) app is a logs app that helps you get insight into visitor locations, traffic patterns, errors, resource utilization, garbage collection, web server operations and access from known malicious sources.

Tomcat logs are sent to Sumo Logic through Opentelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Tomcat-OpenTelemetry/Apache-Tomcat-Schematics.png' alt="Schematics" />

## Fields Created in Sumo Logic for Tomcat

The following are the [Fields](/docs/manage/fields) that will be created as part of the Tomcat App install, if not already present.

- `webengine.cluster.name`. User configured. Set a value of the cluster where your Tomcat instance resides. This will be tagged along with the data sent to Sumo.
- `webengine.system`. Has a fixed value of **tomcat**.
- `sumo.datasource`. Has a fixed value of **tomcat**.

## Prerequisites

The Sumo Logic App for Apache Tomcat uses three types of logs:

1. Tomcat Access logs. [Log format description](https://tomcat.apache.org/tomcat-8.0-doc/config/valve.html). Recommended pattern used is pattern="common".
2. Tomcat Catalina.out logs. [Log format description](https://docs.oracle.com/javase/8/docs/api/java/util/logging/SimpleFormatter.html)
3. Tomcat Garbage Collection (GC) logs. [Log format description](https://stackoverflow.com/questions/4468546/explanation-of-tomcat-gc-log-statements)

By default, Tomcat logs are stored in `/usr/share/tomcat/logs/` The default directory for log files is listed in the `/usr/share/tomcat/conf/logging.properties` file.

## Collecting Logs and Installing the Apache Tomcat app

As part of data collection setup and app installation, you can select the **Apache Tomcat - OpenTelemetry** app from the **App Catalog** and click on **Install App**. Follow the steps below to configure the collection.

### Step 1: Set up Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Tomcat-OpenTelemetry/Apache-Tomcat-Collector.png' alt="Collector" />

### Step 2: Configure integration

In this step, you will configure the yaml required for Tomcat Collection.

The path of the log file configured to capture tomcat logs is needed to be given here.

The files are typically located in `/usr/share/tomcat/logs/*`. If you're using a customized path, check the Tomcat.conf file for this information.

You can add any custom fields which you want to tag along with the data ingested in Sumo. Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Tomcat-OpenTelemetry/Apache-Tomcat-YAML.png' alt="YAML" />

### Step 3: Send logs and metrics to Sumo

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

<Tabs
  className="unique-tabs"
  defaultValue="Linux"
  values={[
    {label: 'Linux', value: 'Linux'},
    {label: 'Windows', value: 'Windows'},
    {label: 'macOS', value: 'macOS'},
  ]}>

<TabItem value="Linux">

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Tomcat instance which needs to be monitored.
2. Restart the collector using:
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

</TabItem>
<TabItem value="Windows">

1. Copy the yaml file to `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
2. Restart the collector using:
  ```sh
  Restart-Service -Name OtelcolSumo
  ```

</TabItem>
<TabItem value="macOS">

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Tomcat instance which needs to be monitored.
2. Restart the otelcol-sumo process using the below command:
  ```sh
  otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
  ```

</TabItem>
</Tabs>

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample Log Messages

```
Dec 13, 2022 03:53:03 PM org.apache.catalina.startup.Catalina start INFO: Server startup in 63394 ms
179.105.33.169 - - [13/Dec/2022:15:53:03 +0000] "PUT /aboutus/ HTTP/1.1" 404 76246453 "http://bing.com/Nutch-1.4" "-"
```

## Sample Queries

```sql
 %"sumo.datasource"=tomcat %"webengine.cluster.name"=*
| json "log" as _rawlog nodrop 
| if (isEmpty(_rawlog), _raw, _rawlog) as _raw 
| parse regex "(?<time>\w+\s+\d+,\s+\d+\s+\d+:\d+:\d+\s+\w+)\s+(?<component>[\w\S]+)\s+(?<method>[\w\S]+)\s+(?<loglevel>\w+):\s+(?<message>[\s\w]+)(?:$|\n(?<thrown>[\s\S]+)$)"
| where (loglevel != "INFO")
| timeslice 1h
| count by _timeslice, component
| transpose row _timeslice column component
```

## Viewing Tomcat Dashboards

### Overview

The **Apache Tomcat - Overview** Dashboard provides a high-level view of information on visitor geographic locations, responses over time, and number of error codes and top urls causing error.

Use this dashboard to:

- Analyze http request about status code
- Gain insights into originated traffic location by region. This can help you allocate computer resources to different regions according to their needs.
- Gain insights into Client, Server Responses on Tomcat Server. This helps you identify errors in Tomcat Server.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Tomcat-OpenTelemetry/Apache-Tomcat-Overview.png' alt="Overview" />

#### Visitor Locations

The **Apache Tomcat - Visitor Locations** Dashboard provides a high-level view of Tomcat visitor geographic locations both worldwide and in the United States. Dashboard panels also show graphic trends for visits by country over time and visits by US region over time.

- Worldwide. Uses a geo lookup operation to display worldwide visitor locations by IP address on a map of the world, which allows you to see a count of hits per location for the last 24 hours.
- Visits by Country Over Time. Displays the number of visitors by country in a stacked column chart on a timeline for the last hour.
- United States. Uses a geo lookup operation to display US visitor locations by IP address on a map of the world, which allows you to see a count of hits per location for the last 24 hours.
- Visits by US State Over Time. Displays the number of US visitors by state in a stacked column chart on a timeline for the last hour.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Tomcat-OpenTelemetry/Apache-Tomcat-Visitor-Locations.png' alt="Locations" />

### Visitor Traffic Insight

The **Apache Tomcat - Visitor Traffic Insight** Dashboard provides detailed information on the top documents accessed, top referrers, top search terms from popular search engines, and the media types served.

Bytes Served. Displays bytes served in a single chart on a timeline for the last 60 minutes.

HTTP Methods. Shows the number of methods over time in a pie chart on a timeline for the last 60 minutes.

Top 5 url. Provides a list of the top 5 URLs being accessed by your visitors in a bar chart for the 60 minutes.

Media Types Served. Displays a list of file types being served in a pie chart for the 60 minutes.

Top 5 Referrers. Shows a list of the top 5 referring websites by URL in a bar chart for the 60 minutes.

Top 10 Search Terms from Popular Search Engines. Displays a list of the top 10 search terms and their count from search engines such as Google, Bing, and Yahoo in an aggregation table for the past hour.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Tomcat-OpenTelemetry/Apache-Tomcat-Visitor-Traffic-Insight.png' alt="Traffic Insight" />

### Web Server Operations

The **Apache Tomcat - Web Server Operations** Dashboard provides a high-level view combined with detailed information on the top ten bots, geographic locations and data for clients with high error rates, server errors over time, and non 200 response code status codes. Dashboard panels also show information on server error logs, error log levels, error responses by server, and the top URIs responsible for 404 responses.

Non 200 Response Status Codes. Displays the number of non-200 response status codes in a bar chart for the past hour.

Client Locations - 4xx Errors. Uses a geo lookup operation to display the location of clients with 4xx errors by IP address on a map of the world, which allows you to see a count of hits per location for the last hour.

Server Errors Over Time. Provides information on the type and number of server errors in a column chart on a line chart for the past hour.

Error Responses by Server. Shows error responses and their distribution by server in a line chart for the past hour.

Top 5 Clients Cause 4xx Errors. Displays a list of the top 5 clients that have 4xx errors in a bar chart for the past hour.

Top 5 URIs Causing 404 Responses. Provides a list of the top 5 URIs with 404 response types in a pie chart for the past hour.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Tomcat-OpenTelemetry/Apache-Tomcat-Web-Server-Operations.png' alt="Web Server Operations" />

### Logs Timeline Analysis

The **Apache Tomcat - Logs Timeline Analysis** dashboard provides a high-level view of the activity and health of Apache Tomcat servers on your network. Dashboard panels display visual graphs and detailed information on traffic volume and distribution, responses over time, as well as time comparisons for visitor locations and server hits.

Use this dashboard to:

- To understand the traffic distribution across servers, provide insights for resource planning by analyzing data volume and bytes served.
- Gain insights into originated traffic location by region. This can help you allocate compute resources to different regions according to their needs.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Tomcat-OpenTelemetry/Apache-Tomcat-Logs-Timeline-Analysis.png' alt="Logs Timeline Analysis" />

### Outlier Analysis

The **Apache Tomcat - Outlier Analysis** dashboard provides a high-level view of Apache Tomcat server outlier metrics for bytes served, number of visitors, and server errors. You can select the time interval over which outliers are aggregated, then hover the cursor over the graph to display detailed information for that point in time.

Use this dashboard to:

- Detect outliers in your infrastructure with Sumo Logic's machine learning algorithm.
- To identify outliers in incoming traffic and the number of errors encountered by your servers.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Tomcat-OpenTelemetry/Apache-Tomcat-Outlier-Analysis.png' alt="Outlier Analysis" />

### Catalina Overview

The **Apache Tomcat - Catalina** dashboard provides information about events such as the startup and shutdown of the Apache Tomcat application server, the deployment of new applications, or the failure of one or more subsystems.

Log Levels. Displays log levels types (Info, Severe, and Warning) in a pie chart for the last 24 hours.

Non-INFO Errors. Shows the number and type of errors (Severe or Warning) in a stacked column chart on a timeline for the last 24 hours.

Component Errors. Provides information on errors by component in a pie chart for the last 24 hours.

Errors by Component. Displays Info level errors by component in a stacked column chart on a timeline for the last 24 hours.

Top 10 Recent Exceptions. Shows the top 10 most recent exceptions in an aggregation table with columns for time, log level, message, method, source file, and thrown for the last 24 hours.

Exceptions. Provides the number of exceptions in a column chart on a timeline for the last seven days.

Average Server Startup Time. Displays the average server startup time per second by day as a column chart on a timeline for the last seven days.

Server State Events Over Time. Shows server state events (shutdown or startup) in a stacked column chart on a timeline for the last seven days.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Tomcat-OpenTelemetry/Apache-Tomcat-Catalina-Overview.png' alt="Catalina Overview" />

### Garbage Collection

The **Apache Tomcat - Garbage Collector** dashboard provides information on the garbage collection of the Java Virtual Machine.

Top 10 Host - High GC Time. Displays the top 10 hosts with high garbage collection operation time as a bar chart for the last 12 hours.

Top 10 Hosts - Low Average JVM Up-Time. Shows the top 10 hosts by low average JVM up-time as a bar chart for the last 12 hours.

Total GC Operation Time. Provides the total garbage collection operation time by time slices of 15 minutes in a column chart on a timeline for the last 12 hours.

Total GC Operations. Displays the total number of times Full-GC and Minor-GC collection processes are executed in time slices of 15 minutes on a stacked column chart on a timeline for the past 12 hours.

Heap. Shows the total heap memory utilization just before garbage collection was executed vs. total heap memory utilization after garbage collection was executed, in a line chart on a timeline for the last 12 hours.

PS Young Gen. PS Young Gen also refers to "New Space," which is composed of Eden-Space and two Survivor-Spaces of identical size, usually called From and To. This panel shows Young Gen memory utilization just before garbage collection was executed vs. Young Gen memory utilization after garbage collection was executed. This part of the heap always gets garbage collected.

Par Old Gen. Par Old Gen is also referred to as "Tenured Space". This panel shows Old Gen memory utilization just before garbage collection was executed vs. Old Gen memory utilization after garbage collection was executed.

PS Perm Gen. PS Perm Gen is also referred to as "Permanent Space". This panel shows Perm Gen memory utilization just before garbage collection was executed vs. Perm Gen memory utilization after garbage collection was executed.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Tomcat-OpenTelemetry/Apache-Tomcat-Garbage-Collection.png' alt="Garbage Collection" />

### Threat intel

The **Apache Tomcat - Threat Intel** dashboard provides an at-a-glance view of threats to Apache Tomcat servers on your network. Dashboard panels display the threat count over a selected time period, geographic locations where threats occurred, source breakdown, actors responsible for threats, severity, and a correlation of IP addresses, method, and status code of threats.

Use this dashboard to:

- To gain insights and understand threats in incoming traffic and discover potential IOCs. Incoming traffic requests are analyzed using the [Sumo - Crowdstrikes](https://help.sumologic.com/docs/integrations/security-threat-detection/threat-intel-quick-analysis/#03_Threat-Intel-FAQ) threat feed.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Tomcat-OpenTelemetry/Apache-Tomcat-Threat-Intel.png' alt="Threat intel" />
