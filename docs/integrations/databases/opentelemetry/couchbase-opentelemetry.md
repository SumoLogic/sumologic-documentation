---
id: couchbase-opentelemetry
title: Couchbase - OpenTelemetry Collector
sidebar_label: Couchbase - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for Couchbase.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/databases/couchbase-logo.png')} alt="Thumbnail icon" width="50"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

[Couchbase](https://developer.couchbase.com/what-is-couchbase/), a modern database for enterprise applications, is a distributed document database with a powerful search engine and in-built operational and analytical capabilities. It brings the power of NoSQL to the edge and provides fast, efficient bidirectional synchronization of data between the edge and the cloud.

The Sumo Logic app for Couchbase helps you monitor activity in Couchbase. The pre-configured dashboards provide insight into the Error, events and HTTP Access pattern that help you understand your clusters.

Couchbase logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

This App has been tested with the following version of Couchbase:

Non-Kubernetes: Couchbase version: 7.0.2

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Couchbase-OpenTelemetry/schematics-couchbase.png')} alt="Schematics" />

## Fields creation in Sumo Logic for Couchbase

Following are the [Fields](/docs/manage/fields/) which will be created as part of Couchbase App install if not already present:

**`db.cluster.name`** - User configured. Enter a name to identify this Couchbase cluster. This cluster name will be shown in the Sumo Logic dashboards.
**`db.system`** - Has a fixed value of **couchbase**.
**`deployment.environment`** - User configured. Through this Couchbase cluster is identified by the environment where it resides. For example: dev, prod or qa.
**`sumo.datasource`** - has a fixed value of **couchbase**.

### Prerequisite

By default, the Couchbase will write the log to the log directory that was configured during installation. For example, on Linux, the log directory would be `/opt/couchbase/var/lib/couchbase/logs`. By default, the Audit log is disabled, you must enable the audit log following these [instructions](https://docs.couchbase.com/server/current/manage/manage-security/manage-auditing.html). Query log, error log, the access log will be enabled by default.

## Configure Couchbase Logs Collection

### Step 1: Set up Collector

If you want to use an existing OTel Collector, this step can be skipped by selecting the option of using an existing Collector.

If you want to create a new Collector please select **Add a new Collector** option.

Select the platform for which you want to install the Sumo OpenTelemetry Collector.

This will generate a command which can be executed in the machine which needs to get monitored. Once executed it will install the Sumo Logic OpenTelemetry Collector agent.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Couchbase-OpenTelemetry/collector.png')} alt="Collector" />

### Step 2: Configure integration

In this step we will be configuring the yaml file required for Couchbase Log Collection. Path of the log file configured to capture couchbase logs needs to be given here.

The files are typically located in folder `/opt/couchbase/var/lib/couchbase/logs`.

* For Audit Log: `/opt/couchbase/var/lib/couchbase/logs/audit.log`
* For Error Log: `/opt/couchbase/var/lib/couchbase/logs/error.log`
* For Access Log: `/opt/couchbase/var/lib/couchbase/logs/http_access.log`
* For Query Log: `/opt/couchbase/var/lib/couchbase/logs/query.log`

Click on the **Download YAML File** button to get the yaml file.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Couchbase-OpenTelemetry/Download-YAML-File.png')} alt="Configuration" />

### Step 3: Sending logs to Sumo

Once you have the yaml file downloaded in step 2, you can copy the same to the machine which needs to be monitored. Follow the below steps based on the platform of the machine:

<Tabs
  className="unique-tabs"
  defaultValue="Linux"
  values={[
    {label: 'Linux', value: 'Linux'},
    {label: 'Windows', value: 'Windows'},
    {label: 'macOS', value: 'macOS'},
  ]}>

<TabItem value="Linux">

1.  Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Couchbase instance which needs to be monitored.
2.  restart the collector using
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

</TabItem>
<TabItem value="Windows">

1.  Copy the yaml file to `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
2.  Restart the collector using
  ```sh
  Restart-Service -Name OtelcolSumo
  ```

</TabItem>
<TabItem value="macOS">

1.  Copy the yaml file to **/etc/otelcol-sumo/conf.d/** folder in the Couchbase instance which needs to be monitored.
2.  Restart the otelcol-sumo process using the below command
  ```sh
  otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
  ```

</TabItem>
</Tabs>

This will install the app to your Sumo Logic Org. The app consists of Dashboards.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but within 20 minutes, you'll see full graphs and maps.

Sample Logs:

```
_time=09/Jan/2023:04:50:03 +0000+07:00 _level=ERROR _msg=Failed to perform INSERT on key <ud>key1</ud> for Keyspace default:beer-sample.inventory.hotel. Error - <ud>Duplicate Key key1</ud>
```

Sample Query:

Following query is from **Average Latency of All HTTP Requests** panel from overview dashboard of the Couchbase Application :

```sql
 %"db.cluster.name"=* %"deployment.environment"=* %"sumo.datasource"="couchbase"
| json "log" as _rawlog nodrop
| if(isEmpty(_rawlog),_raw,_rawlog) as _raw
| parse regex "(?<src_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+\-\s+(?<username>\S+)\s+\[(?<time>.+)\]\s+\"(?:(?<method>\w+)\s+(?<path>\S+)\sHTTP\/1.1)\"\s+(?<code>\d+)\s(?<bytes>\d+)\s(?<origin_url>\S+) \"(?<agent>.+)\"\s(?<latency>\d+)"
| avg(latency)
```

## Viewing Couchbase Dashboards

### Overview

The **Couchbase - Overview** dashboard provides an at-a-glance view of the health of the Couchbase clusters and servers, performance, and problems causing errors.

Use this dashboard to:

- Gain insights into information about Average Latency and Response code distribution.
- Determine errors in clusters: get the list of top error logs and error queries

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Couchbase-OpenTelemetry/Couchbase-Overview.png')} alt="Overview" />


### Errors

The **Couchbase - Errors** dashboard provides insights into errors from error logs in couchbase servers and couchbase clusters: buckets not ready, nodes not responding, node down, error queries, last error logs.

Use this dashboard to:

- Quickly identify critical errors affecting your couchbase servers.
- Identify SQL error queries from clients.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Couchbase-OpenTelemetry/Couchbase-Errors.png')} alt="Errors" />


### Events

The **Couchbase - Events** dashboard provides insights into events from couchbase servers and couchbase clusters: the number of login failure, login success from clients, add/remove node events, add/remove bucket events, rebalance events.

Use this dashboard to:

- To audit the activities happening in the cluster. This helps to determine what activities have occurred in the system, helping to control system security.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Couchbase-OpenTelemetry/Couchbase-Events.png')} alt="Events" />


### HTTP Access

The **Couchbase - HTTP Access** dashboard provides insights into HTTP Rest API requests from clients to couchbase servers and couchbase clusters: the latency, HTTP codes, client agents, IP clients, errors with 4XX 5XX response code.

Use this dashboard to:

- To understand user behavior accessing clusters and servers through Rest API.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Couchbase-OpenTelemetry/Couchbase-HTTP-Access.png')} alt="Access" />
