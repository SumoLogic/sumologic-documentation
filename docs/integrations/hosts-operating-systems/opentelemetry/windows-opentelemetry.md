---
id: windows-opentelemetry
title: Windows - OpenTelemetry Collector
sidebar_label: Windows - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for Windows.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/microsoft-azure/windows.png')} alt="thumbnail icon" width="45"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The Sumo Logic App for Windows allows you to monitor the performance and resource utilization of hosts and processes that your mission-critical applications are dependent upon. In addition to that, our Windows App provides insight into your Windows system's operation and events so that you can better manage and maintain your environment.

The Windows App, which is based on the Windows event log format, consists of predefined searches and dashboards that provide visibility into your environment for real-time analysis of overall usage of Security Status, System Activity, Updates, User Activity, and Applications. Our dashboards provide insight into CPU, memory, network, file descriptors, page faults, and TCP connectors.

* Windows event logs are sent to Sumo Logic through OpenTelemetry [Event Log receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/windowseventlogreceiver).
* Windows Host metrics are sent to Sumo Logic through OpenTelemetry [Host Metrics receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Windows-Schematics.png' alt="Schematics" />

## Fields Created in Sumo Logic for Windows

Following are the [fields](/docs/manage/fields/) which will be created as part of Windows App install if not already present. 

- **`sumo.datasource`**. Has a fixed value of **windows**.

## Log Types

The Windows App assumes events are coming from Windows Event Log receiver in JSON format. It does not work with third party logs.

Standard Windows event channels include:

- Security
- System
- Application

## Collection configuration and app installation

{@import ../../../reuse/apps/opentelemetry/config-app-install.md}

### Step 1: Set up Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Windows-Collector.png' alt="Collector" />

### Step 2: Configure integration

In this step, you will configure the yaml file required for Windows event logs and metrics Collection.

Any custom fields can be tagged along with the data in this step.

Once the details are filled in, click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Windows-YAML.png' alt="YAML" />

:::note
By default the collector will be sending process metrics to Sumo Logic. Since the number of processes running can be very large, this may result in significant increase in Data Points per Minute (DPM) . If you would like to narrow down the list of processes being monitored, this can be done by adding the following entry under the process section of the downloaded yaml.

```sh
process:
  include:
    names: [ <process name1>, <process name2> ... ]
    match_type: <strict|regexp>
```
:::

### Step 3: Send logs to Sumo

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

1. Copy the yaml file to `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
2. Restart the collector using:
  ```sh
  Restart-Service -Name OtelcolSumo
  ```

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample Metrics Message

```sql
{
	"queryId":"A",
	"_source":"windows-otel-metric",
	"_metricId":"tYzy7VHWrdxuGHOkPRT5pA",
	"_sourceName":"Http Input",
	"os.type":"windows",
	"sumo.datasource":"windows",
	"direction":"transmit",
	"_sourceCategory":"Labs/windows-otel",
	"_contentType":"Carbon2",
	"host.name":"EC2AMAZ-T30T53R.ec2.internal",
	"metric":"system.network.io",
	"_collectorId":"000000000CEC8ECC",
	"_sourceId":"0000000044DB46EF",
	"unit":"By",
	"_collector":"Labs - windows-otel",
	"device":"Loopback_Pseudo-Interface_1",
	"max":289495780,
	"min":0,
	"avg":229918329.73,
	"sum":3448774946,
	"latest":289485558,
	"count":15
}
```

## Sample Queries

This sample metrics query is from the **Host Metric - CPU** dashboard > **CPU User Time** panel.

```sql title="Metrics Query String"
sumo.datasource=windows host.name={{host.name}} cpu=cpu0  metric=system.cpu.utilization state=user | avg by host.name
```

This sample log query is from the **Windows - Overview** dashboard > **System Restarts** panel.

```sql title="Log Query String"
%"sumo.datasource"=windows  "\"channel\":\"Security\""
| json "event_id", "computer", "message", "channel" as event_id_obj, host.name, msg_summary, channel nodrop 
| json field=event_id_obj "id" as event_id
| parse regex field=msg_summary "(?<msg_summary>.*\.*)" nodrop
| where event_id = "4608" and channel = "Security" and host.name matches "{{host.name}}"
| count as Restarts
```


## Sample Logs

```json
{
	"record_id":"6316",
	"channel":"Application",
	"event_data":"",
	"task":"0",
	"provider":"{\"name\":\"Microsoft-Windows-Security-SPP\",\"guid\":\"{E23B33B0-C8C9-472C-A5F9-F2BDFEA0F156}\",\"event_source\":\"Software Protection Platform Service\"}",
	"system_time":"2023-01-20T15:22:02+0000816Z",
	"computer":"EC2AMAZ-T30T53R",
	"opcode":"0",
	"keywords":"Classic",
	"message":"Offline downlevel migration succeeded.",
	"event_id":"{\"id\":\"16394\",\"qualifiers\":\"49152\"}",
	"level":"Information"
}
```

## Viewing Windows Event Log-Based Dashboards

### Windows - Overview

The **Windows - Overview** dashboard provides insights into fatal or warning messages, policy changes, system restarts, and changes to administrative groups.

Use this dashboard to:

- Monitor systems experiencing fatal errors, warnings, and system restarts.
- View system login attempts. 
- Monitor policy changes performed on the system.
- Monitor services installed on the systems.
- Monitor the number of changes performed on the Administrative groups.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Windows-Overview.png' alt="Windows - Overview" />

### Windows - Default

The **Windows - Default** dashboard provides information about the start and stop operations for Windows services, Windows events, operations events, and Errors and Warnings.

Use this dashboard to:

- Monitor services being stopped, started on the system.
- Monitor event types (channels) collected from the system.
- Monitor log level (error, warning) trend on the systems.
- Monitor operations performed on the system like restarts, user creation, group creation, and firewall changes.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Windows-Default.png' alt="Windows - Default" />

### Windows - Login Status

The **Windows - Login Status** dashboard provides information about successful and failed logins, successful Remote Desktop Protocol (RDP) reconnects, and failed login outliers.

Use this dashboard to:
* Monitor successful and failed logins by the user and track their locations with successful and failed login attempts.
* Monitor RDP reconnect events.
* Track failed login outliers to identify mischievous login activities.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Windows-Login-Status.png')} alt="Windows - Login Status" />

### Windows - Event Errors

The **Windows - Event Errors** dashboards provide insights into error keyword trends and outliers.

Use this dashboard to:

- Monitor various errors in the systems.
- Monitor error trends and outliers to ensure they are within acceptable limits to decide the next step.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Windows-Event-Errors.png' alt="Windows - Event Errors" />

### Windows - Application

The **Windows - Application** dashboard provides detailed information about install, uninstall, and event trends.

Use this dashboard to:

- Monitor Install and uninstall of applications performed on the system.
- Monitor log levels (error, warning, information) through trends and quick snapshots.
- Monitor various application-specific events happening through recent messages.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Windows-Application.png' alt="Windows - Application" />

## Windows - Host Metric Based Dashboards 

### Host Metrics - Overview

The **Host Metrics - Overview** dashboard gives you an at-a-glance view of the key metrics like CPU, memory, disk, network, and TCP connections of all your hosts. You can drill down from this dashboard to the Host Metrics - CPU/Disk/Memory/Network/TCP dashboard by using the honeycombs or line charts in all the panels.

Use this dashboard to:

- Identify hosts with high CPU, disk, memory utilization, and identify anomalies over time.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Host-Metrics-Overview.png' alt="Host Metrics - Overview" />

### Host Metrics - CPU

The **Host Metrics - CPU** dashboard provides a detailed analysis based on CPU metrics. You can drill down from this dashboard to the Process Metrics - Details dashboard by using the honeycombs or line charts in all the panels.

Use this dashboard to:

- Identify hosts and processes with high CPU utilization.
- Examine CPU usage by type and identify anomalies over time.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Host-Metrics-CPU.png' alt="Host Metrics - CPU" />

### Host Metrics - Disk

The **Host Metrics - Disk** dashboard provides detailed information about disk utilization and disk IO operations.You can drill down from this dashboard to the Process Metrics - Details dashboard by using the honeycombs or line charts in all the panels.

Use this dashboard to:

- Identify hosts with high disk utilization and disk IO operations.
- Monitor abnormal spikes in read/write rates.
- Compare disk throughput across storage devices of a host.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Host-Metrics-Disk.png' alt="Host Metrics - Disk" />

### Host Metrics - Memory

The **Host Metrics - Memory** dashboard provides detailed information on host memory usage, memory distribution, and swap space utilization. You can drill down from this dashboard to the Process Metrics - Details dashboard by using the honeycombs or line charts in all the panels.

Use this dashboard to:

- Identify hosts with high memory utilization.
- Examine memory distribution (free, buffered-cache, used, total) for a given host.
- Monitor abnormal spikes in memory and swap utilization.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Host-Metrics-Memory.png' alt="Host Metrics - Memory" />

### Host Metrics - Network

The **Host Metrics - Network** dashboard provides detailed information on host network errors, throughput, and packets sent and received.

Use this dashboard to:

- Determine top hosts with network errors and dropped packets.  
- Monitor abnormal spikes in incoming/outgoing packets and bytes sent and received.
- Use dashboard filters to compare throughput across the interface of a host.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Host-Metrics-Network.png' alt="Host Metrics - Network" />

### Host Metrics - TCP

The **Host Metrics - TCP** dashboard provides detailed information around inbound, outbound, open, and established TCP connections.

Use this dashboard to:

- Identify abnormal spikes in inbound, outbound, open, or established connections.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Host-Metrics-TCP.png' alt="Host Metrics - TCP" />

### The Process Metrics - Overview

The **Process Metrics - Overview** dashboard gives you an at-a-glance view of all the processes by open file descriptors,  CPU usage, memory usage, disk read/write operations and thread count.

User this dashboard to :
- Process wise distribution of CPU and memory usage
- Process wise read/write operations 

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Process-Metrics-Overview.png' alt="Process Metrics - Overview" />

### Process Metrics - Details

The **Process Metrics - Details** dashboard gives you a detailed view of key process related metrics such as CPU and memory utilization, disk read/write throughput, and major/minor page faults.

Use this dashboard to:

- Determine the number of open file descriptors in all hosts. If the number of open file descriptors reaches the maximum file descriptor limits, it can cause IOException errors.
- Identify anomalies in CPU usage, memory usage, major/minor page faults and reads/writes over time.
- Troubleshoot memory leaks using the resident set memory trend chart.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Process-Metrics-Details.png' alt="Process Metrics - Details" />
