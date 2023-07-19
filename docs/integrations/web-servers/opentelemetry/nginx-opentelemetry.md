---
id: nginx-opentelemetry
title: Nginx - OpenTelemetry Collector
sidebar_label: Nginx - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for Nginx.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/web-servers/nginx.png')} alt="Thumbnail icon" width="75"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

Nginx is a web server used as a reverse proxy, load balancer, mail proxy, and HTTP cache. The Sumo Logic App for Nginx helps you monitor activity in Nginx. The preconfigured dashboards provide information about site visitors, including the location of visitors, devices/operating systems, and browsers used, and information about server activity, including bots, observed, and error information.

The app has been tested with Nginx version: 1.19.8, 1.21.4, 1.23.1.

We use the OpenTelemetry collector for Nginx metric collection and for collecting Nginx logs.

The diagram below illustrates the components of the Nginx collection for each web server.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Nginx-OpenTelemetry/Nginx-Schematic.png' alt="Schematic" />

OpenTelemetry collector runs on the same host as Nginx, and uses the [Nginx Receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/nginxreceiver) to obtain Nginx metrics, and the [Sumo Logic OpenTelemetry Exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/sumologicexporter) to send the metrics to Sumo Logic. Nginx logs are sent to Sumo Logic through a [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

## Log Types and Metrics

The Sumo Logic App for Nginx assumes:

- Nginx app supports the default access logs and error logs format.
- For a list of metrics that are collected and used by the app, see [Nginx Metrics](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/nginxreceiver/documentation.md).

## Fields Creation in Sumo Logic for Nginx

Following are the [Fields](/docs/manage/fields/) which will be created as part of Nginx App install if not already present.

- `webengine.cluster.name`. User configured.Enter a name to uniquely identify your Nginx web server cluster. This cluster name will be shown in the Sumo Logic dashboards.
- `webengine.node.name`. Has value of host name.
- `webengine.system`. Has fixed value of nginx.
- `sumo.datasource`. Has fixed value of nginx.

## Prerequisites

* Configure your Nginx server to expose status endpoint for collecting metrics: The receiver used gets stats from an Nginx Web Server instance using the status endpoint. In order to receive server statistics, you must configure the server's nginx.conf file to [enable status support](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/nginxreceiver#configuration).
* Configure and retrieve access and error log files: Before you can configure Sumo Logic to ingest logs, you must configure the logging of errors and processed requests in NGINX Open Source and NGINX Plus. For instructions, refer to the following [documentation](https://docs.nginx.com/nginx/admin-guide/monitoring/logging/).

## Collecting Logs, Metrics, and Installing Nginx App

As part of data collection setup and app installation, you can select the **Nginx - OpenTelemetry** app from the **App Catalog** and click on **Install App**. Follow the steps below to configure the collection.

### Step 1: Set up OpenTelemetry Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Nginx-OpenTelemetry/Nginx-Collector.png' alt="Access" />

### Step 2: Configure integration

In this step, you will configure the yaml required for Nginx Collection.

Below are the inputs required:

- **Endpoint**. The URL of the status endpoint (default: `http://localhost:80/status`).
- **Access File log Path**. Enter the path to the Access log file for your nginx instance.
- **Error file log path**. Enter the path to the error log file for your nginx instance.
- **Fields**. `webengine.cluster.name` User configured. Enter a name to identify this nginx cluster. This cluster name will be shown in the Sumo Logic dashboards.

Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Nginx-OpenTelemetry/Nginx-YAML.png' alt="Nginx-YAML" />

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

1. Copy the yaml to the `/etc/otelcol-sumo/conf.d/` folder for the Nginx instance which needs to be monitored.
2. Restart the collector using:
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

</TabItem>
<TabItem value="Windows">

1. Copy the yaml to the `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
2. Restart the collector using 
  ```sh
  Restart-Service -Name OtelcolSumo
  ```

</TabItem>
<TabItem value="macOS">

1. Copy the yaml to the `/etc/otelcol-sumo/conf.d/` folder in the Nginx instance which needs to be monitored.
2. Restart the otelcol-sumo process using the below command:
  ```sh
  otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
  ```

</TabItem>
</Tabs>

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Viewing Nginx Dashboards

### Overview

The **Nginx - Overview** dashboard provides an at-a-glance view of the NGINX server access locations, error logs along with connection metrics.

Use this dashboard to:

- Gain insights into originated traffic location by region. This can help you allocate computer resources to different regions according to their needs.
- Gain insights into your Nginx health using Critical Errors and Status of Nginx Server.
- Get insights into Active and dropped connection.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Nginx-OpenTelemetry/Nginx-Overview.png' alt="Access" />

### Error Logs

The **Nginx - Error Logs** Analysis dashboard provides a high-level view of log level breakdowns, comparisons, and trends. The panels also show the geographic locations of clients and clients with critical messages, new connections and outliers, client requests, request trends, and request outliers.

Use this dashboard to:

- Track requests from clients. A request is a message asking for a resource, such as a page or an image.
- Track and view client geographic locations generating errors.
- Track critical alerts and emergency error alerts.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Nginx-OpenTelemetry/Nginx-Error-Logs.png' alt="Access" />

### Trends

The **Nginx - Trends** dashboard provides a high-level view of the activity and health of Nginx servers on your network. Dashboard panels display visual graphs and detailed information on traffic volume and distribution, responses over time, as well as time comparisons for visitor locations and server hits.

Use this dashboard to:

- Understand the traffic distribution across servers, provide insights for resource planning by analyzing data volume and bytes served.
- Gain insights into originated traffic location by region. This can help you allocate compute resources to different regions according to their needs.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Nginx-OpenTelemetry/Nginx-Trends.png' alt="Access" />

### Outlier Analysis

The **Nginx - Outlier Analysis** dashboard provides a high-level view of Nginx server outlier metrics for bytes served, number of visitors, and server errors. You can select the time interval over which outliers are aggregated, then hover the cursor over the graph to display detailed information for that point in time.

Use this dashboard to:

- Detect outliers in your infrastructure with Sumo Logic's machine learning algorithm.
- Identify outliers in incoming traffic and the number of errors encountered by your servers.

You can use schedule searches to send alerts to yourself whenever there is an outlier detected by Sumo Logic.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Nginx-OpenTelemetry/Nginx-Outlier-Analysis.png' alt="Access" />

### Threat Intel

The **Nginx - Threat Intel** dashboard provides an at-a-glance view of threats to Nginx servers on your network. Dashboard panels display the threat count over a selected time period, geographic locations where threats occurred, source breakdown, actors responsible for threats, severity, and a correlation of IP addresses, method, and status code of threats.

Use this dashboard to:

- Gain insights and understand threats in incoming traffic and discover potential IOCs. Incoming traffic requests are analyzed using the [Sumo - Crowdstrikes](https://help.sumologic.com/docs/integrations/security-threat-detection/threat-intel-quick-analysis/#03_Threat-Intel-FAQ) threat feed.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Nginx-OpenTelemetry/Nginx-Threat-Intel.png' alt="Access" />

### Web Server Operations

The **Nginx - Web Server Operations** dashboard provides a high-level view combined with detailed information on the top ten bots, geographic locations, and data for clients with high error rates, server errors over time, and non 200 response code status codes. Dashboard panels also show information on server error logs, error log levels, error responses by a server, and the top URIs responsible for 404 responses.

Use this dashboard to:

- Gain insights into Client, Server Responses on Nginx Server. This helps you identify errors in Nginx Server.
- Identify geo-locations of all Client errors. This helps you identify client location causing errors and helps you to block client IPs.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Nginx-OpenTelemetry/Nginx-Web-Server-Operations.png' alt="Access" />

### Visitor Access Types

The **Nginx - Visitor Access Types** dashboard provides insights into visitor platform types, browsers, and operating systems, as well as the most popular mobile devices, PC and Mac versions used.

Use this dashboard to:

- Understand which platform and browsers are used to gain access to your infrastructure.
- These insights can be useful for planning in which browsers, platforms, and operating systems (OS) should be supported by different software services.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Nginx-OpenTelemetry/Nginx-Visitor-Access-Types.png' alt="Access" />

### Visitor Locations

The **Nginx - Visitor Locations** dashboard provides a high-level view of Nginx visitor geographic locations both worldwide and in the United States. Dashboard panels also show graphic trends for visits by country over time and visits by US region over time.

Use this dashboard to:

- Gain insights into geographic locations of your user base. This is useful for resource planning in different regions across the globe.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Nginx-OpenTelemetry/Nginx-Visitor-Locations.png' alt="Access" />

### Visitor Traffic Insight

The **Nginx - Visitor Traffic Insight** dashboard provides detailed information on the top documents accessed, top referrers, top search terms from popular search engines, and the media types served.

Use this dashboard to:

- Understand the type of content that is frequently requested by users.
- It helps in allocating IT resources according to the content types.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Nginx-OpenTelemetry/Nginx-Visitor-Traffic-Insight.png' alt="Access" />

### Connections and Requests Metrics

The **Nginx - Connections and Requests Metrics** dashboard provides insight into active, dropped connections, reading, writing, and waiting requests.

Use this dashboard to:

- Gain information about active and dropped connections. This helps you identify the connection rejected by Nginx Server.
- Gain information about the total requests handled by Nginx Server per second. This helps you understand read, write requests on Nginx Server.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Nginx-OpenTelemetry/Nginx-Connections-and-Requests-Metrics.png' alt="Connections and Requests Metrics" />
