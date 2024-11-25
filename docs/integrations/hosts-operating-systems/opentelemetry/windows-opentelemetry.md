---
id: windows-opentelemetry
title: Windows - OpenTelemetry Collector
sidebar_label: Windows - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry app for Windows.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/microsoft-azure/windows.png')} alt="thumbnail icon" width="45"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The Sumo Logic app for Windows allows you to monitor the performance and resource utilization of hosts and processes that your mission-critical applications are dependent upon. In addition to that, our Windows app provides insight into your Windows system's operation and events so that you can better manage and maintain your environment.

The Windows app, which is based on the Windows event log format, consists of predefined searches and dashboards that provide visibility into your environment for real-time analysis of overall usage of Security Status, System Activity, Updates, User Activity, and applications. Our dashboards provide insight into CPU, memory, network, file descriptors, page faults, and TCP connectors.

* Windows event logs are sent to Sumo Logic through OpenTelemetry [Event Log receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/windowseventlogreceiver).
* Windows Host metrics are sent to Sumo Logic through OpenTelemetry [Host Metrics receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Windows-Schematics.png' alt="Schematics" />

:::info
This app includes [built-in monitors](#windows-alerts). For details on creating custom monitors, refer to [Create monitors for Windows app](#create-monitors-for-windows-app).
:::

## Fields Created in Sumo Logic for Windows

Following are the [fields](/docs/manage/fields/) which will be created as part of Windows app install if not already present. 

- **`sumo.datasource`**. Has a fixed value of `windows`.
- **`deployment.environment`**. This is a collector level field and is user configured (at the time of collector installation). Through this, the Windows host cluster is identified by the environment where it resides. For example: `dev`, `prod`, or `qa`.
- **`host.group`**. This is a collector level field and is user configured (at the time of collector installation). Through this, the Windows host group is identified.
- **`host.name`**. This is tagged through the `resourcedetection` processor. It holds the value of the host name where the OTel collector is installed. 

## Log types

The Windows app assumes events are coming from Windows Event Log receiver in JSON format. It does not work with third party logs.

Standard Windows event channels include:

- Security
- System
- application

## Collection configuration and app installation

:::note
You can skip this section if you have already set up the logs collection through [Windows PCI](/docs/integrations/pci-compliance/opentelemetry/windows-json-opentelemetry), [Windows - Cloud Security Monitoring and Analytics](/docs/integrations/cloud-security-monitoring-analytics/opentelemetry/windows-opentelemetry), or [Active Directory](/docs/integrations/microsoft-azure/opentelemetry/active-directory-json-opentelemetry) app installation. Additional collection is not required as the logs used by this app are already ingested into Sumo Logic.
:::

import ConfigAppInstall from '../../../reuse/apps/opentelemetry/config-app-install.md';

<ConfigAppInstall/>

### Step 1: Set up Collector

import SetupColl from '../../../reuse/apps/opentelemetry/set-up-collector.md';

<SetupColl/>

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Windows-Collector.png' style={{border:'1px solid gray'}} alt="Collector" />

### Step 2: Configure integration

In this step, you will configure the YAML file required for Windows event logs and metrics Collection.

Any custom fields can be tagged along with the data in this step.

#### Enable process metric collection (Optional)

import ProcMetrics from '../../../reuse/apps/opentelemetry/process-metric-collection.md';

<ProcMetrics/>

Click on the **Download YAML File** button to get the YAML file.<br/><img src={useBaseUrl('img/integrations/hosts-operating-systems/Windows-YAML.png')} alt="Windows-YAML" style={{border:'1px solid gray'}} width="800"/>

### Step 3: Send logs to Sumo

import LogsIntro from '../../../reuse/apps/opentelemetry/send-logs-intro.md';

<LogsIntro/>

<Tabs
  className="unique-tabs"
  defaultValue="Windows"
  values={[
    {label: 'Windows', value: 'Windows'},
    {label: 'Chef', value: 'Chef'},
    {label: 'Ansible', value: 'Ansible'},
    {label: 'Puppet', value: 'Puppet'},
  ]}>

<TabItem value="Windows">

1. Copy the YAML file to `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine that needs to be monitored.
2. Restart the collector using:
  ```sh
  Restart-Service -Name OtelcolSumo
  ```

</TabItem>

<TabItem value="Chef">

import ChefNoEnv from '../../../reuse/apps/opentelemetry/chef-without-env.md';

<ChefNoEnv/>

</TabItem>

<TabItem value="Ansible">

import AnsibleNoEnv from '../../../reuse/apps/opentelemetry/ansible-without-env.md';

<AnsibleNoEnv/>

</TabItem>

<TabItem value="Puppet">

import PuppetNoEnv from '../../../reuse/apps/opentelemetry/puppet-without-env.md';

<PuppetNoEnv/>

</TabItem>
</Tabs>

import LogsOutro from '../../../reuse/apps/opentelemetry/send-logs-outro.md';

<LogsOutro/>

:::note
If you receive an error during installation that includes the message `failed to bind to address localhost`, change all instances of `localhost` to `127.0.0.1` in the YAML file. 
:::

## Sample log messages

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

## Sample metrics message

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

## Sample queries

This is a sample metrics query from the **CPU User Time** panel in the **Host Metric - CPU** dashboard.

```sql title="Metrics Query String"
sumo.datasource=windows host.name={{host.name}} cpu=cpu0  metric=system.cpu.utilization state=user | avg by host.name
```

This is a sample log query from the **System Restarts** panel in the **Windows - Overview** dashboard.

```sql title="Log Query String"
%"sumo.datasource"=windows  "\"channel\":\"Security\""
| json "event_id", "computer", "message", "channel" as event_id_obj, host.name, msg_summary, channel nodrop 
| json field=event_id_obj "id" as event_id
| parse regex field=msg_summary "(?<msg_summary>.*\.*)" nodrop
| where event_id = "4608" and channel = "Security" and host.name matches "{{host.name}}"
| count as Restarts
```

## Viewing the Windows event log based dashboards

All dashboards have a set of filters that you can apply to the entire dashboard. Use these filters to drill down and examine the data to a granular level.
- You can change the time range for a dashboard or panel by selecting a predefined interval from a drop-down list, choosing a recently used time range, or specifying custom dates and times. [Learn more](/docs/dashboards/set-custom-time-ranges/).
- You can use template variables to drill down and examine the data on a granular level. For more information, see [Filtering Dashboards with Template Variables](/docs/dashboards/filter-template-variables/).

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
- Monitor log levels (error, warning, and information) through trends and quick snapshots.
- Monitor various application-specific events happening through recent messages.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Windows-OpenTelemetry/Windows-Application.png' alt="Windows - Application" />

## Viewing the Windows host metric based dashboards

All dashboards have a set of filters that you can apply to the entire dashboard. Use these filters to drill down and examine the data to a granular level.
- You can change the time range for a dashboard or panel by selecting a predefined interval from a drop-down list, choosing a recently used time range, or specifying custom dates and times. [Learn more](/docs/dashboards/set-custom-time-ranges/).
- You can use template variables to drill down and examine the data on a granular level. For more information, see [Filtering Dashboards with Template Variables](/docs/dashboards/filter-template-variables/).

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

The **Process Metrics - Overview** dashboard gives you an at-a-glance view of all the processes by open file descriptors, CPU usage, memory usage, disk read/write operations, and thread count.

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

## Create monitors for Windows app

import CreateMonitors from '../../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Windows alerts

| Alert Name  | Alert Description and conditions | Alert Condition | Recover Condition |
|:--|:--|:--|:--|
| `Windows - High CPU Utilization Alert` | This alert gets triggered when cpu utilization exceeds threshold. | Count > 80 | Count < = 80 |
| `Windows - High FileSystem Utilization Alert` | This alert gets triggered when filesystem utilization exceeds threshold. | Count > 80 | Count < = 80 |
| `Windows - High Memory Utilization Alert` | This alert gets triggered when memory utilization exceeds threshold. | Count > 80 | Count < = 80 |