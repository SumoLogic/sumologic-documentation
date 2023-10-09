---
id: linux-opentelemetry
title: Linux - OpenTelemetry Collector
sidebar_label: Linux - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for Linux.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/hosts-operating-systems/linux-transparent.png')} alt="Thumbnail icon" width="45"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The Sumo Logic App for Linux allows you to monitor the performance and resource utilization of hosts and processes that your mission-critical applications are dependent upon. In addition to that, it allows you to view information about events, logins, and the security status of your Linux system using Linux system logs.

The app consists of predefined searches and dashboards that provide visibility into your environment for real-time or historical analysis. Our dashboards provide insight into CPU, memory, network, file descriptors, page faults, and TCP connectors. This app uses OpenTelemetry, an open-source collector for the collection of both metrics and log data.

We use the Sumo Logic Distribution for OpenTelemetry Collector to collect Linux metrics and system logs. The OpenTelemetry collector runs on the Linux machine and uses the [Host Metric Receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver) to obtain Host and process metrics, and the [Sumo Logic OpenTelemetry Exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/sumologicexporter) to send the metrics to Sumo Logic. Linux logs are sent to Sumo Logic through a [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-OpenTelemetry/Linux-Schematics.png' alt="Schematics" />

## Fields Created in Sumo Logic for Linux

Following are the [fields](/docs/manage/fields) that will be created as part of Linux App install if not already present. 

### Across apps

- **`sumo.datasource`** - has a fixed value of **linux**.

## Collection configuration and app installation

:::note
You can skip this section if you have already set up the logs collection through [Linux PCI](/docs/integrations/pci-compliance/opentelemetry/linux-opentelemetry) or [Linux - Cloud Security Monitoring and Analytics](/docs/integrations/cloud-security-monitoring-analytics/opentelemetry/linux-opentelemetry) app installation. Additional collection is not required as the logs used by this app are already ingested into Sumo Logic.
:::

{@import ../../../reuse/apps/opentelemetry/config-app-install.md}

### Step 1: Set up Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-OpenTelemetry/Linux-Collector.png' alt="Collector" />

### Step 2: Configure integration

In this step, you will configure the yaml file required for Linux Collection. The app requires path for system log file, based on your Linux version used.

#### Required Logs for Ubuntu

The following logs, located in your Linux machine's `/var/log` folder, are required for using the Sumo app for Linux with Ubuntu:

- `auth.log`
- `syslog`
- `daemon.log`
- `dpkg.log`
- `kern.log`

#### Required Logs for CentOS, Amazon Linux, and Red Hat

The following logs, located in your Linux machine's `/var/log` folder, are required for using the Sumo app for Linux with CentOS, Amazon Linux, and most Red Hat forks:

- `audit/audit.log`
- `secure`
- `Messages`
- `yum.log`

Click on the **Download YAML File** button to get the yaml file.<br/><img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-OpenTelemetry/Linux-YAML.png' alt="YAML" />

:::note 

By default, the path for linux log files required for all the distros are pre populated in the UI. Not all of the files might be available on your Linux distribution and unwanted file paths can be removed from the list. This is an optional step and the collection will work properly even if not all of the files are present on your system. If in doubt, you can leave the default file paths values.  

By default, the collector will be sending process metrics to Sumo Logic. Since the number of processes running can be very large, this may result in significant increase in Data Points per Minute (DPM). If you would like to narrow down the list of processes being monitored, this can be done by adding the following entry under the process section of the downloaded yaml.
```sh
process:
  include:
    names: [ <process name1>, <process name2> ... ]
    match_type: <strict|regexp>
```

:::

### Step 3: Send logs and metrics to Sumo

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Linux instance which needs to be monitored.
2. Restart the collector using:
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample Log Messages

```
Dec 13 04:44:00 <1> [zypper++] Summary.cc(readPool):133 I_TsU(27372)Mesa-libGL1-8.0.4-20.4.1.i586(@System)
```

## Sample Metrics

```json
{
	"queryId":"A",
	"_source":"linux-otel-metric",
	"process.executable.name":"apache2",
	"_sourceName":"Http Input",
	"process.command":"/usr/sbin/apache2",
	"host":"ip-172-31-90-39.ec2.internal",
	"os.type":"linux",
	"sumo.datasource":"linux",
	"process.executable.path":"/usr/sbin/apache2",
	"process.command_line":"/usr/sbin/apache2_-k_start",
	"process.owner":"www-data",
	"_sourceCategory":"Labs/linux-otel/metric",
	"_contentType":"Carbon2",
	"metric":"process.memory.physical_usage",
	"_collectorId":"000000000C984E1A",
	"_sourceId":"0000000042E512AE",
	"unit":"By",
	"_collector":"Labs - linux-otel",
	"process.pid":"26967",
	"max":42295296,
	"min":536576,
	"avg":9061120,
	"sum":144977920,
	"latest":8069120,
	"count":16
}
```

## Sample Queries

### Log query

Logs query from the **Total Event Distribution** panel.

```sql
%"sumo.datasource"=linux   
| parse regex "\d+\s+\d+:\d+:\d+\s(?<dest_hostname>\S+)\s(?<process_name>\w*)(?:\[\d+\]|):\s+"
|where dest_hostname matches "{{dest_hostname}}" AND process_name matches "{{process_name}}"
|count as Events by dest_hostname
```

### Metrics query

Metrics query from the **CPU Utilization Over Time** panel.

```sql
sumo.datasource=linux host.name=* metric=system.cpu.utilization state=(user OR system OR wait OR steal OR softirq OR interrupt OR nice) | sum by host.name | outlier
```

## Linux app dashboards

### Linux - Overview

The **Linux - Overview** dashboard provides an overview of Linux activity, including the distribution of system events across hosts, group assignment changes, successful and failed logins, sudo attempts, and the count of reporting hosts. This dashboard also gives you an at-a-glance view of the key metrics like CPU, memory, disk, network, and TCP connections of all your hosts. You can drill down from this dashboard to the Host Metrics - CPU/Disk/Memory/Network/TCP dashboard by using the honeycombs or line charts in all the panels.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-OpenTelemetry/Linux-Overview.png' alt="Linux - Overview" />

### Host Metrics - CPU

The **Host Metrics - CPU** dashboard provides a detailed analysis based on CPU metrics. You can drill down from this dashboard to the Process Metrics - Details dashboard by using the honeycombs or line charts in all the panels.

Use this dashboard to:

- Identify hosts and processes with high CPU utilization.
- Examine CPU usage by type and identify anomalies over time.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-OpenTelemetry/Host-Metrics-CPU.png' alt="Host Metrics - CPU" />

### Host Metrics - Disk

The **Host Metrics - Disk** dashboard provides detailed information about on disk utilization and disk IO operations.You can drill down from this dashboard to the Process Metrics - Details dashboard by using the honeycombs or line charts in all the panels.

Use this dashboard to:

- Identify hosts with high disk utilization and disk IO operations.
- Monitor abnormal spikes in read/write rates.
- Compare disk throughput across storage devices of a host.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-OpenTelemetry/Host-Metrics-Disk.png' alt="Host Metrics - Disk" />

### Host Metrics - Memory

The **Host Metrics - Memory** dashboard provides detailed information on host memory usage, memory distribution, and swap space utilization. You can drill down from this dashboard to the Process Metrics - Details dashboard by using the honeycombs or line charts in all the panels.

Use this dashboard to:

- Identify hosts with high memory utilization.
- Examine memory distribution (free, buffered-cache, used, total) for a given host.
- Monitor abnormal spikes in memory and swap utilization.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-OpenTelemetry/Host-Metrics-Memory.png' alt="Host Metrics - Memory" />

### Host Metrics - Network

The **Host Metrics - Network** dashboard provides detailed information on host network errors, throughput, and packets sent and received.

Use this dashboard to:

- Determine top hosts with network errors and dropped packets.
- Monitor abnormal spikes in incoming/outgoing packets and bytes sent and received.
- Use dashboard filters to compare throughput across the interface of a host.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-OpenTelemetry/Host-Metrics-Network.png' alt="Host Metrics - Network" />

### Host Metrics - TCP

The **Host Metrics - TCP** dashboard provides detailed information around inbound, outbound, open, and established TCP connections.

Use this dashboard to:

- Identify abnormal spikes in inbound, outbound, open, or established connections.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-OpenTelemetry/Host-Metrics-TCP.png' alt="Host Metrics - TCP" />

### The Process Metrics - Overview

The **Process Metrics - Overview** dashboard gives you an at-a-glance view of all the processes by open file descriptors,  CPU usage, memory usage, disk read/write operations and thread count.

User this dashboard to:
- Process wise distribution of CPU and memory usage.
- Process wise read/write operations.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-OpenTelemetry/Process-Metrics-Overview.png' alt="Process Metrics - Overview" />

### Process Metrics - Details

The **Process Metrics - Details** dashboard gives you a detailed view of key process related metrics such as CPU and memory utilization, disk read/write throughput, and major/minor page faults.

Use this dashboard to:

- Determine the number of open file descriptors in all hosts. If the number of open file descriptors reaches the maximum file descriptor limits, it can cause IOException errors.
- Identify anomalies in CPU usage, memory usage, major/minor page faults and reads/writes over time.
- Troubleshoot memory leaks using the resident set memory trend chart.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-OpenTelemetry/Process-Metrics-Details.png' alt="Process Metrics - Details" />


### Linux - Event Sources

The **Linux - Event Sources** dashboard provides information about system events, including their distribution across hosts, event counts per host by hour, and even counts by host and service.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-OpenTelemetry/Linux-Event-Sources.png' alt="Linux - Event Sources" />


### Linux - Login Status

The **Linux - Login Status** dashboard provides information about logins to Linux hosts; including logins by hour; failed logins per host; the top 30 successful and failed logins; and the top 30 successful and failed remote logins.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-OpenTelemetry/Linux-Login-Status.png' alt="Linux - Login Status" />

### Linux - Security Status

The **Linux - Security Status** dashboard provides information about security on Linux hosts, including su, sudo attempts, new and existing user assignments, package operations, and system start events.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Linux-OpenTelemetry/Linux-Security-Status.png' alt="Linux - Security Status" />

