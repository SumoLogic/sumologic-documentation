---
id: host-metrics
title: Host Metrics Sumo Logic app
sidebar_label: Host Metrics
description: The Sumo Logic app for Host Metrics allows you to collect your local host metrics and display them using predefined search queries and Dashboards.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/hosts-operating-systems/HostMetrics.png')} alt="Thumbnail icon" width="75"/>

The Host Metrics app allows you to monitor the performance and resource utilization of hosts and processes that your mission critical applications are dependent upon. Preconfigured dashboards provide insight into CPU, memory, network, file descriptors, page faults, and TCP connectors. This app uses the Sumo Logic installed collector for the collection of host metrics data.


## Collecting metrics for the Host Metrics app

This procedure explains how to collect metrics from a host machine and ingest them into Sumo Logic for metrics visualization.

### Configure a Collector

Configure an [Installed Collector](/docs/send-data/installed-collectors). Collectors can be installed on Linux, Windows, or Mac OS hosts.


### Configure a Source

1. Configure a [Host Metrics Source](/docs/send-data/installed-collectors/sources/host-metrics-source). Choose **Add Source** and select **Host Metrics** as the source type.
2. Configure the Source Fields as follows:
    1. **Name.** Required. Description is optional. The source name is stored in a searchable field called `_sourceName`.
    2. **Source Host**. Enter the host name of the machine from which the metrics will be collected.
    3. **Source Category.** Required. The Source Category metadata field is a fundamental building block to organize and label Sources. For details, see [Best Practices](/docs/send-data/best-practices).
    4. **Scan Interval**. Select the frequency for the Source to scan for hostmetrics data. Selecting a short interval will increase the message volume and could cause your deployment to incur additional charges. The default is 1 minute.
    5. **Metrics**. Select check boxes for the metrics to collect. By default, all CPU and memory metrics are collected. Select the top level check box to select all metrics in that category. A blue checkmark icon indicates that the category is selected. To select individual metrics, click the right-facing arrow to expand the category and select the individual metrics. The icon changes to <img src={useBaseUrl('img/integrations/hosts-operating-systems/icon_blue_minus.png')} alt="icon_blue_minus" />, as shown below.<br/><img src={useBaseUrl('img/integrations/hosts-operating-systems/host_metrics_config_window.png')} alt="host_metrics_config_window" />
3. Click **Save**.


## Metric types

Available metrics include:
* CPU
* Memory
* TCP
* Network
* Disk

The metrics that are collected are described in [Host Metrics for Installed Collectors](/docs/send-data/installed-collectors/sources/host-metrics-source#collected-metrics).

Host metrics are gathered by the open-source [SIGAR library](https://github.com/hyperic/sigar).

The following tables list the available host metrics.

### CPU metrics

| Metric | Units | Description |
|---|---|---|
| CPU_User | % | Total system cpu user time |
| CPU_Sys | % | Total system cpu kernel time |
| CPU_Nice | % | Total system cpu nice time |
| CPU_Idle | % | Total system cpu idle time |
| CPU_IOWait | % | Total system cpu IO wait time |
| CPU_Irq | % | Total system cpu time servicing interrupts |
| CPU_SoftIrq | % | Total system cpu time servicing softirqs |
| CPU_Stolen | % | Total system cpu involuntary wait time |
| CPU_LoadAvg_1min* | Average | System load average for past 1 minute |
| CPU_LoadAvg_5min* | Average | System load average for past 5 minutes |
| CPU_LoadAvg_15min* | Average | System load average for past 15 minutes |
| CPU_Total | % | Total system CPU usage time |

Load averages are not available on Windows platform.


### Memory Metrics

<table>
  <tr>
   <td><strong>Metric</strong> </td>
   <td><strong>Units</strong>   </td>
   <td><strong>Description</strong>   </td>
  </tr>
  <tr>
   <td>Mem_Total </td>
   <td>Bytes   </td>
   <td>Total amount of physical RAM   </td>
  </tr>
  <tr>
   <td>Mem_Free </td>
   <td>Bytes   </td>
   <td>The amount of physical RAM left unused by the system</td>
  </tr>
  <tr>
   <td>Mem_Used   </td>
   <td>Bytes </td>
   <td>Total used system memory, calculated as
   <p><code>MemTotal - MemFree</code></p>
   <p>This metric includes the space allocated in buffers and in the <a href="https://en.wikipedia.org/wiki/Page_cache">Page Cache</a>, which can make it appear that a larger portion of physical RAM is being consumed than is actually in use.  See <code>Mem_ActualUsed</code> below.</p> </td>
  </tr>
  <tr>
   <td>Mem_ActualFree </td>
   <td>Bytes </td>
   <td>Actual total free system memory calculated as:
<p><code>Mem_Free + Buffers + Cached</code></p>
<p>Where</p>
<p><code>Buffers</code> = The amount of physical RAM used for file buffers</p>
<p><code>Cached</code> = The amount of physical RAM used as cache memory</p>   </td>
  </tr>
  <tr>
   <td>Mem_ActualUsed   </td>
   <td>Bytes   </td>
   <td>Actual total used system memory calculated as: <code>Mem_Total - Mem_Actual_Free</code><br/>This metric better represents the amount of physical RAM in use than <code>Mem_Used</code>.   </td>
  </tr>
  <tr>
   <td>Mem_UsedPercent </td>
   <td>%   </td>
   <td>Percent total used system memory calculated as: <code>(Mem_Total - Mem_Actual_Free) / Mem_total</code>   </td>
  </tr>
  <tr>
   <td>Mem_FreePercent   </td>
   <td>%   </td>
   <td>Percent total free system memory   </td>
  </tr>
  <tr>
   <td>Mem_PhysicalRam </td>
   <td>Bytes   </td>
   <td>System random access memory   </td>
  </tr>
</table>


### TCP metrics

| Metric | Units | Description |
|---|---|---|
| TCP_InboundTotal | Count | TCP inbound connection count |
| TCP_OutboundTotal | Count | TCP outbound connection count |
| TCP_Established | Count | TCP established connection count |
| TCP_Listen | Count | TCP listen connection count |
| TCP_Idle | Count | TCP idle connection count |
| TCP_Closing | Count | TCP closing connection count |
| TCP_CloseWait | Count | TCP close_wait connection count |
| TCP_Close | Count | TCP close connection count |
| TCP_TimeWait | Count | TCP time_wait connection count |

### Networking metrics

These have two additional dimensions:
* Interface: Name of the network interface (example: `eth0`)
* Description: Description of the network interface (example: `Dual Band Wireless-AC 8265`)

Networking metrics are cumulative, so you can use the rate operator to display these metrics as a rate per second. For example: `metric=Net_InBytes Interface=eth0 | rate`.

| Metric | Units | Description |
|---|---|---|
| Net_InPackets | Packets | Number of received packets |
| Net_OutPackets | Packets | Number of sent packets |
| Net_InBytes | Bytes | Number of received bytes |
| Net_OutBytes | Bytes | Number of sent bytes |


### Disk metrics

Disk metrics have two additional dimensions:

* DevName: Device name, such as the mount name (example: `udev`)
* DirName: Directory name, such as the mount directory (example: `/dev`)

`Disk_Reads`, `Disk_Writes`, `Disk_ReadBytes`, and `Disk_WriteBytes` are cumulative, so you can use the rate operator to display these metrics as a rate per second. For example: `metric=Disk_WriteBytes | rate`.

| Metric | Units | Description |
|---|---|---|
| Disk_Reads | Operations | Number of physical disk reads |
| Disk_ReadBytes | Bytes | Number of physical disk bytes read |
| Disk_Writes | Operations | Number of physical disk writes |
| Disk_WriteBytes | Bytes | Number of physical disk bytes written |
| Disk_Queue | Operations | Number of disk queue operations |
| Disk_InodesAvailable* | Nodes | Number of free file nodes |
| Disk_Used | Bytes | Total used bytes on filesystem |
| Disk_UsedPercent | % | Percentage of filesystem space used |
| Disk_Available | Bytes | Total available bytes on filesystem |

`Disk_InodesAvailable` is not available on Windows platform.


### Time Intervals

The time interval determines how frequently the Source is scanned for metrics data. Sumo Logic supports pre-specified time intervals (10 seconds, 15 seconds, 30 seconds, 1 minute, and 5 minutes).

You can also specify a time interval in JSON by using the interval parameter, as follows:
```bash
"interval" : 60000
```

The JSON parameter is in milliseconds. We recommend 60 seconds (60000 ms) or longer granularity. Specifying a shorter interval will increase the message volume and could cause your deployment to incur additional charges.


### AWS Metadata

Collectors running on AWS EC2 instances can optionally collect AWS Metadata such as EC2 tags to make it easier to search for Host Metrics. For more information, see [AWS Metadata Source for Metrics](/docs/send-data/hosted-collectors/amazon-aws/aws-metadata-tag-source).

Only one AWS Metadata Source for Metrics is required to collect EC2 tags from multiple hosts.


## Installing the Host Metrics app

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing Host Metrics dashboards​

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

<img src={useBaseUrl('img/integrations/hosts-operating-systems/Host_Metrics_Overview.png')} alt="Host Metrics dashboards" />

**Overall Average CPU Idle**. Displays the CPU idle time averaged across all hosts in a line chart on a timeline for the last hour. You can modify the list of hosts using the provided filters.

**Overall Average CPU Load (1m, 5m, 15m)**. Shows the CPU load time for one, five, and 15 minutes averaged across all hosts in a line chart on a timeline for the last hour.

**Total Free System Memory per Host**. Provides information on the total free system memory per host in a line chart on a timeline for the last hour.

**Total Used, Less Buffers and Cached Memory per Host**. Displays the total memory used less buffers and cached memory per host in a line chart on a timeline for the last hour.

**Disk Used Bytes per Host**. Shows the disk used bytes per host in a line chart on a timeline for the last hour.

**Disk Available Bytes per Host**. Provides the disk available bytes per host in a line chart on a timeline for the last hour.

**Network InBytes Rate per Host**. Displays the rate of network InBytes per host in a line chart on a timeline for the last hour.

**Network OutBytes Rate per Host**. Shows the rate of network OutBytes per host in a line chart on a timeline for the last hour.


### CPU

<img src={useBaseUrl('img/integrations/hosts-operating-systems/Host-Metrics-CPU.png')} alt="Host Metrics dashboards" />

**CPU User Time per Host.** Displays the CPU user time per host in a line chart on a timeline for the last hour.

**Overall Average CPU User Time**. Shows the CPU user time averaged across all hosts in a line chart on a timeline for the last hour.

**CPU System Time per Host**. Provides details on CPU system time per host in a line chart on a timeline for the last hour.

**Overall Average CPU System Time.** Displays the CPU system time averaged across all hosts in a line chart on a timeline for the last hour.

**CPU 1 min Average Load per Host**. Shows the CPU 1 minute average load per host in a line chart on a timeline for the last hour.

**Overall Average CPU Load (1m, 5m, 15m)**. Provides the CPU load time for one, five, and 15 minutes averaged across all hosts in a line chart on a timeline for the last hour.

**CPU Idle Time per Host**. Displays the CPU idle time per host in a line chart on a timeline for the last hour.

**Overall Average CPU Idle Time**. Shows the CPU idle time averaged across all hosts in a line chart on a timeline for the last hour.

**CPU IO Wait Time per Host**. Displays the CPU IO wait time per host on a line chart on a timeline for the last hour


### Disk

<img src={useBaseUrl('img/integrations/hosts-operating-systems/HostMetricsDisk.png')} alt="Host Metrics dashboards" />

**Disk Used Bytes per Host.** Displays disk used bytes per host in a line chart on a timeline for the last hour.

**Disk Available Bytes per Host.** Shows disk available bytes per host in a line chart on a timeline for the last hour.

**Disk Read Rate per Host**. Provides details on disk read rate per host in a line chart on a timeline for the last hour.

**Disk Read Byte Rate per Host**. Displays disk read byte rate per host in a line chart on a timeline for the last hour.

**Disk Write Rate per Host**. Shows disk write rate per host in a line chart on a timeline for the last hour.

**Disk Write Byte Rate per Host**. Provides details on disk write byte rate per host in a line chart on a timeline for the last hour.


### Memory

<img src={useBaseUrl('img/integrations/hosts-operating-systems/host_metrics_app_memory.png')} alt="Host Metrics dashboards" />

**Total Memory per Host.** Displays total memory per host in a line chart on a timeline for the last hour.

**Percent Memory Used per Host.** Shows percent memory used per host in a line chart on a timeline for the last hour.

**Total Free, Buffers, and Cached Memory per Host.** Provides details on the total free, buffers, and cached memory per host (from a metric called ActualFree) in a line chart on a timeline for the last hour.

**Total Used, Less Buffers, and Cached Memory per Host.** Displays the total used, buffers, and cached memory (from a metric called ActualUsed) in a line chart on a timeline for the last hour.

**Total Free Memory per Host.** Shows the amount of total free memory per host available in a line chart on a timeline for the last hour.

**Total Used System Memory per Host.** Provides details on the total system memory per host used in a line chart on a timeline for the last hour.


### Network

<img src={useBaseUrl('img/integrations/hosts-operating-systems/HostMetricsNetwork.png')} alt="Host Metrics dashboards" />

**Network InPacket Rate per Host**. Displays network InPacket rate per host in a line chart on a timeline for the last hour.

**Network OutPacket Rate per Host**. Shows network OutPacket rate per host in a line chart on a timeline for the last hour.

**Network InByte Rate per Host**. Provides details on network InByte rate per host in a line chart on a timeline for the last hour.

**Network OutByte Rate per Host.** Displays network OutByte rate per host in a line chart on a timeline for the last hour.


### TCP

<img src={useBaseUrl('img/integrations/hosts-operating-systems/host_metrics_app_tcp.png')} alt="Host Metrics dashboards" />

**Inbound Connections per Host.** Displays inbound connections per host in a line chart on a timeline for the last hour.

**Outbound Connections per Host.** Shows outbound connections per host in a line chart on a timeline for the last hour.

**Listen Connections per Host.** Provides details on listen connections per host in a line chart on a timeline for the last hour.

**Established Connections per Host.** Displays established connections per host in a line chart on a timeline for the last hour.

**CloseWait Connections per Host.** Shows CloseWait connections per host in a line chart on a timeline for the last hour.

**TimeWait Connections per Host.** Provides details on TimeWait connections per host in a line chart on a timeline for the last hour.


### Filters
The supported filters are:
* `_sourceCategory`
* `_sourceHost`
* `_source`
* `_collector`

## Upgrade/Downgrade the Host Metrics app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Host Metrics app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>