---
id: docker-opentelemetry
title: Docker - OpenTelemetry Collector
sidebar_label: Docker - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry app for Docker.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/app-development/docker-icon.png')} alt="Thumbnail icon" width="120"/>

The Sumo Logic app for Docker ULM is a unified logs and metrics app that enables you to monitor Docker deployment. The app provides preconfigured dashboards that include information about container state and resource usage, including information on CPU, memory, block I/O, and network.

OpenTelemetry collector runs on the same host as Docker and helps to collect Docker metric and container event logs. 

- Docker metrics are collected using the [Docker receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/dockerstatsreceiver) and sent to Sumo Logic through the [Sumo Logic OpenTelemetry Exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/sumologicexporter). 
- Docker container event logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

:::info
The Sumo Logic app for Docker supports Docker version 23.0.2.
:::

<img src={useBaseUrl('img/integrations/app-development/Docker-Schematics.png')} alt="Docker-Schematics"/>

## Fields creation in Sumo Logic for Docker

Following are the tags which will be created as part of the Docker app installation, if not already present.

* `sumo.datasource`. Has a fixed value of **docker**.

## Prerequisites

This section provides instructions for configuring metrics and log collection for the Sumo Logic app for Docker.

### Metric collection

Metrics are collected through the [Docker Stats Receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/README.md) of OpenTelemetry.

### Log collection

To collect the Docker container event logs, the following command needs to be executed on the host machine and needs to be kept running, for monitoring all the Docker container-related events. The following command also needs a JSON file path where these container events can be dumped.

```
docker events docker events -f 'type=container' --format '{{json .}}' > <PATH_TO_JSON> & disown
```
Path to this JSON file will be required in the [next step](#step-2-configure-integration), where events are sent to Sumo Logic through a filelog receiver and seen as part of the **Docker - Overview** dashboard. Also, you can add additional parameters to this command to send events for specific containers. Learn [more](https://docs.docker.com/engine/reference/commandline/events/). 

## Collecting Logs, Metrics, and Installing app for Docker​

Follow the below steps for collecting logs, metric and installing the app:

### Step 1: Set up Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src={useBaseUrl('img/integrations/app-development/Docker-collector.png')} alt="Docker-collector"/>

### Step 2: Configure integration

In this step, you will configure the yaml required for the Docker Collection.

- **Docker Event log location**. Enter the path of the JSON file generated through the command in the prerequisite section.
- **Excluded Image List**. A list of strings, [regexes](https://golang.org/pkg/regexp/), or [globs](https://github.com/gobwas/glob) whose referent container image names will not be among the queried containers for scrapping metrics. Learn more about [*excluded_images*](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/README.md#configuration).

You can add any custom fields which you want to tag along with the data ingested in sumo.

Click on the **Download YAML File** button to get the yaml file.

<img src={useBaseUrl('img/integrations/app-development/Docker-YAML.png')} alt="Docker-YAML"/>

### Step 3: Send logs to Sumo

Once you have downloaded the yaml file as described in the previous step, follow the below steps based on your platform.

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Docker instance that needs to be monitored.
1. Place `Env` file in the `/etc/otelcol-sumo/env/` directory.
1. Restart the collector using:
  ```
  sudo systemctl restart otelcol-sumo
  ```

After successfully executing the above command, Sumo Logic will start receiving data from your host machine.

Click **Next**. This will install the app (dashboards and monitors) to your Sumo Logic Org.

Dashboard panels will start to fill automatically. It's important to note that each panel fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but within 20 minutes, you'll see full graphs and maps.

## Sample Log Messages

<details><summary>Click here to expand</summary>

```json title="Log message"
{
  "status":"start",
  "id":"51f87a02dbcebbfe85bd3f9edb092132b6ac8ee873d541cdc059c70e17e52835",
  "from":"hello-world",
  "Type":"container",
  "Action":"start",
  "Actor":
  {
    "ID":"51f87a02dbcebbfe85bd3f9edb092132b6ac8ee873d541cdc059c70e17e52835",
    "Attributes":
    {
      "image":"hello-world",
      "name":"agitated_ardinghelli"
    }
  },
  "scope":"local",
  "time":"1683892564",
  "timeNano":"timestamp_2"
}
```
```json title="Metric message"
{
  "queryId":"A",
  "_source":"docker-otel",
  "_metricId":"ijgj8tTQV9UGOJWs2k_aew",
  "container.hostname":"6ebcc74fe914",
  "_sourceName":"Http Input",
  "host.id":"ea5f7c340247429887f632c6b6fa6c53",
  "os.type":"linux",
  "sumo.datasource":"docker",
  "container.runtime":"docker",
  "container.name":"docker-apache",
  "_sourceCategory":"Labs/docker-otel",
  "deployment.environment":"dockerEnvtest1",
  "_contentType":"Carbon2",
  "host.name":"ip-172-31-20-114.ec2.internal",
  "metric":"container.cpu.percent",
  "_collectorId":"000000000D7C5F4F",
  "container.image.name":"httpd",
  "_sourceId":"0000000048C9E05B",
  "unit":"1",
  "container.id":"6ebcc74fe914fbe88fcf93c289921d675fd7d57e4c835fc0e72ef067583500ea",
  "_collector":"Labs - docker-otel",
  "max":30,
  "min":10,
  "avg":20.36,
  "sum":570.1,
  "latest":20,
  "count":28
}
```
</details>

## Sample Query

<details><summary>Click here to expand</summary>

This sample Query is from the **Docker - Overview** > **Docker Events Over Time** panel.

```sql title="Log query"
sumo.datasource=docker
| json field=_raw "status" as state
| json field=_raw "Type" as type
| json field=_raw "Actor.Attributes.image" as image
| json field=_raw "Actor.Attributes.name" as name
| timeslice 1h
| where image matches "{{container.image.name}}" AND state matches "{{state}}" AND name matches "{{container.name}}"
|count by _timeslice, state
| transpose row _timeslice column state
| fillmissing timeslice(1h)
```

This sample Query is from the **Docker - Overview** > **Top 5 Containers by CPU Usage** panel.

```sql title="Log query"
sumo.datasource=docker container.image.name={{container.image.name}} container.name={{container.name}}  metric=container.cpu.usage.total 
| avg by container.name 
| topk(5,avg)
```
</details>

## Viewing Docker dashboards

### Docker - Overview

The **Docker - Overview** dashboard provides an overview of Docker activity.

- **Number of Docker Hosts**. The total number of Docker hosts monitored over the last 24 hours.
- **Number of Containers Started**. The total number of containers started over the last 24 hours
- **Number of Containers Paused**. The total number of containers paused over the last 24 hours
- **Number of Containers Stopped**. The total number of containers stopped over the last 24 hours
- **Number of Containers Killed**. The total number of containers killed over the last 24 hours
- **Docker Events Over Time**. Count of specific Docker container events (such as pause, stop, die, restart, start, kill, unpause) per time slice over the last 24 hours.
- **Containers by State**. A table that lists container events that occurred during the last 24 hours, the time the event occurred, the container image, the container name, and the event type.
- **Container Events - One Day Time Comparison**. A table that lists the count of a particular event (such as pause, stop, die, restart, start, kill, unpause) for an image/container combination over the last 24 hours and compares it with the previous 24 hours time range.
- **Top 5 Containers by CPU Usage**. CPU usage by the five containers that have used the most CPU over the last 24 hours.
- **Top 5 Containers by Tx Bytes**. Bytes transmitted by the top five containers that have transmitted the most bytes over the last 24 hours.
- **Top 5 Containers by Rx Bytes**. Bytes received by the five containers that have received the most bytes over the last 24 hours.
- **Top 5 Containers by Memory Usage**. Memory usage by the top five containers that used the most memory over the last 24 hours.

### Docker - CPU Usage

The **Docker - CPU Usage** dashboard provides information about CPU usage and container throttling over the last three hours.

- **Total CPU Consumed by Container in Kernel Mode**. Total CPU consumed in kernel mode by each container over the last three hours.
- **CPU Usage by Image Name**. CPU consumed by container image name per timeslice over the last three hours.
- **CPU Usage in Kernel Mode**. CPU consumed in kernel mode by each container per timeslice over the last three hours.
- **CPU Usage in User Mode**. CPU consumed in user mode by each container per timeslice over the last three hours.
- **Time for Which Container was Throttled**. Duration for which each container's CPU was throttled over the last three hours.
- **Count of Periods with Throttling Active**. A chart that shows how many times each container's CPU was throttled over the last three hours.

### Docker - Memory Usage

The **Docker - Memory Usage** dashboard provides information about container memory limits, memory usage, and page faults over the last three hours.

- **Number of Times Container Hit Memory Limit**. Number of times that each container reached its memory limit over the last three hours.
- **Memory Limit by Container**. Memory limit for each container over the last three hours.
- **Percentage of Memory Used by Container**. Percentage of memory used by each container over the last three hours.
- **Current and Max Memory Usage**. Current and maximum memory used by each container over the last three hours.
- **Count of Page Faults by Container**. Number of page faults for each container over the last three hours.
- **Memory that Cannot be Reclaimed**. Amount of memory that cannot be reclaimed for each container over the last three hours.
- **Number of Bytes Transferred to/from the Disk**. Number of bytes transferred to and from disk by each container over the last three hours.

### Docker - Network Usage

The **Docker - Network Usage** dashboard provides information about network usage over the last three hours.

- **Average Rx Bytes by Container**. Displays the average number of bytes received per timeslice by each container over the last three hours.
- **Average Tx Bytes by Container**. Displays the average number of bytes transmitted per timeslice by each container over the last three hours.
- **Count of Rx Dropped Packets**. Count of received packets dropped by each container per timeslice over the last three hours.
- **Count of Rx Error Packets**. Count of error packets received per timeslice by each container over the last three hours.
- **Average Rx Packets by Container**. Average packets received per timeslice by each container over the last three hours.
- **Average Tx Packets by Container**. Average packets transmitted per timeslice by each container over the last three hours.
- **Count of Tx Dropped Packets**. Count of packets dropped during transmission per timeslice by each container over the last three hours.
- **Count of Tx Error Packets**. Count of error packets transmitted per timeslice by each container over the last three hours.





