---
id: memcached-opentelemetry
title: Memcached - OpenTelemetry Collector
sidebar_label: Memcached - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for Memcached.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/databases/memcached.png')} alt="Thumbnail icon" width="50"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The [Memcached](https://memcached.org/about) app is a logs based app that helps you monitor your Memcached clusters. Preconfigured dashboards provide insight into errors, warnings, and commands executed.

The Sumo Logic App for Memcached is tested for Version: 1.4.15.

Memcache logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Memcached-OpenTelemetry/Memcached-Schematics.png')} alt="Schematics" />

## Sample Log Message

```
Jun 23 07:35:01 node03 memcached: \
<31 set GFcIh47CswfCnwk3JkmJ 0 0 4096
```

## Sample Query

Following is the query from Errors panel of Memcached app's overview Dashboard :

```sql
%"deployment.environment"=* %"db.cluster.name"=* %"sumo.datasource"=memcached memcached ">" ERROR | json "log" as _rawlog nodrop 
| if (isEmpty(_rawlog), _raw, _rawlog) as memcached_log_message
| parse regex field=memcached_log_message ">(?<pid>\d+) (?<cmd>\w+)"
| if(cmd matches "ERROR",1,0) as ERROR
| timeslice by 1h 
| sum(ERROR) as ERROR by _timeslice
```

## Fields creation in Sumo Logic for Memcached

Following are the [Fields](https://help.sumologic.com/docs/manage/fields/) which will be created as part of Memcached App install if not already present.

- **`db.cluster.name`** - User configured. Enter a name to identify this Memcache cluster. This cluster name will be shown in the Sumo Logic dashboards.
- **`db.system`** - Has a fixed value of memcached
- **`deployment.environment`** - User configured. This is the deployment environment where the Memcache cluster resides. For example: dev, prod or qa.
- **`sumo.datasource`** - Has a fixed value of memcached

## Prerequisites

1.  Configure logging in Memcached : By default, the installation of Memcached will not write any request logs to disk. To add a log file for Memcached, you can use the following syntax:
    ```sql
    memcached -d -m 3072 -l localhost -p 11211 -u nobody -v 2>>/var/log/memcached/memcached.log
    ```
2.  Or, if you're on RHEL/CentOS, you can edit the file `/etc/sysconfig/memcached` like so:
    ```sql
    PORT="11211"
    USER="memcached"
    MAXCONN="3048"
    CACHESIZE="256"
    OPTIONS="-vv >> /var/log/memcached/memcached.log 2>&1"
    ```
3.  Save the file and restart Memcached.

## Configure Memcached Logs Collection and App installation

### Step1: Set up Collector

:::note
If you want to use an existing OpenTelemetry Collector, you can skip this step by selecting the **Use an existing Collector** option.
:::

To create a new Collector:
	
1. Select the **Add a new Collector** option.
2. Select the platform for which you want to install the Sumo OpenTelemetry Collector.
	
This will generate a command which can be executed in the machine which needs to get monitored. Once executed it will install the Sumo Logic OpenTelemetry Collector agent.


This will generate a command which can be executed in the machine which needs to get monitored. Once executed it will install the Sumo Logic OpenTelemetry Collector agent.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Memcached-OpenTelemetry/Memcached-Collector.png')} alt="Collector" />

### Step 2: Configure integration

In this step we will be configuring the yaml file required for Memcached Collection.Path of the log file configured to capture Memcached logs needs to be given here.

The files are typically located in `/var/log/memcached/memcached.log`. If you're using a customized path, check the respective conf file (default location : `/etc/memcached.conf`  ) for this information.

Any additional custom tags can be added in this step. These tags will be tagged along with the data ingested.

Click on the **Download YAML File** button to get the yaml file.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Memcached-OpenTelemetry/Memcached-YAML.png')} alt="YAML" />

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

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Memcache instance which needs to be monitored.
2. Restart the collector using
```sh
 sudo systemctl restart otelcol-sumo
```

</TabItem>
<TabItem value="Windows">

1. Copy the yaml file to `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
2. Restart the collector using 
```sh
Restart-Service -Name OtelcolSumo
```

</TabItem>
<TabItem value="macOS">

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Memcache instance which needs to be monitored.
2. Restart the otelcol-sumo process using the below command 
```sh
 otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
```

</TabItem>
</Tabs>

After successful execution of the above command, Sumo will start receiving the data from your host machine.

Press Next.This will install the app to your Sumo Logic Org. The app consists of Dashboards.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but within 20 minutes, you'll see full graphs and maps.

## Viewing Memcached Dashboards

### Overview

The **Memcached - Overview** dashboard provides an at-a-glance view of the Memcached errors, client protocol, and command executed.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Memcached-OpenTelemetry/Memcached-Overview.png')} alt="Overview" />

### Logs

The **Memcached - Logs** dashboard helps you quickly analyze your Memcached error logs, commands executed, and objects stored.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Memcached-OpenTelemetry/Memcached-Logs.png')} alt="Logs" />
