---
id: host-list-beta
title: Host List
description: The Host List page allows you to view all hosts and their most important metrics on a single page, regardless of the host type, the collection method or the format of the collected data.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Closed Beta</span></a></p>

The **Host List** gives you key insights about all hosts running in your infrastructure on a single page, regardless of the host type, the collection method, or the format of the collected data. You can compare these different types of hosts without having to build custom dashboards or switch between multiple existing visualizations and queries.

* Compare, filter, and search for hosts
* Configure key indicators via the display icon on the right side of the page
* Identify active alerts related to each host

## How it works

The Host List is available for you automatically - no additional configuration needed. It displays all hosts detected, based on the signals ingested into Sumo Logic. All information in the Host List is extracted from the following sources:

- Logs
- Metrics
- Spans

<img src={useBaseUrl('/img/observability/host_list.png')} alt="host_list" style={{border: '1px solid gray'}} width="800"/>

Clicking on any of the rows brings up the **Entity Inspector** panel, which provides more detailed information about each of the hosts and allows you to navigate to viewing logs, metrics, traces, alerts, and dashboards linked to this host in the [monitoring dashboards](/docs/dashboards/explore-view/).

<img src={useBaseUrl('/img/observability/host_list2.png')} alt="host_list2" style={{border: '1px solid gray'}} width="500"/>

If you wish to add more hosts, follow the instructions on [sending data to Sumo Logic](/docs/send-data/).

## Navigation

### Time range

The time range selector (in the top-right corner of the page) allows you to choose the time range for which the host's data is displayed. This setting impacts the number of hosts visible in the list, as only active hosts during the selected time range are displayed, and influences the values of some [Indicators](#indicators).

By default, indicators perform the aggregation across the selected time, but it is possible to choose indicators that aggregate values using a time aggregation that overrides the time range selector. For example, CPU (-15min) will aggregate CPU usage for the past 15 minutes, regardless of the value selected using the time range selector. The Host List can display the data for the last 24 hours and, by default, displays the data for last 60 minutes.

<img src={useBaseUrl('/img/observability/navigation_time_range.png')} alt="navigation_time_range" style={{border: '1px solid gray'}} width="350"/>

### Environment

You can use the **Environment** dropdown to display hosts with a certain value of the **Environment** property. This dropdown is populated with all currently available values of the **Environment** attribute.

<img src={useBaseUrl('/img/observability/navigation_environment.png')} alt="navigation_environment" style={{border: '1px solid gray'}} width="350"/>

### Group

You can use the **Group** dropdown to display only hosts with a certain value of **Group** property. This dropdown is populated with all currently available values of the **Group** attribute.

<img src={useBaseUrl('/img/observability/navigation_group.png')} alt="navigation_group" style={{border: '1px solid gray'}} width="350"/>

### Host Name

You can search for any hosts using the free-text input field, and narrow down the list by substring matching.

<img src={useBaseUrl('/img/observability/navigation_host_name.png')} alt="navigation_host_name" style={{border: '1px solid gray'}} width="350"/>

### OS Type

You can narrow down the list of visible hosts by the type of detected Operating System (OS) running on a host. The Host List can identify the following operating systems:

- Darwin (macOS)
- Linux
- Windows

<img src={useBaseUrl('/img/observability/navigation_OS_type.png')} alt="navigation_OS_type" style={{border: '1px solid gray'}} width="250"/>

### Cloud Provider

You can narrow down the list of visible hosts by the type of detected cloud provider (CP) running on a host. The Host List can identify the following cloud providers:

- AWS
- Azure
- GCP

<img src={useBaseUrl('/img/observability/navigation_cloud_provider.png')} alt="navigation_cloud_provider" style={{border: '1px solid gray'}} width="250"/>

### Alert Status

You can narrow down the list of visible hosts by the type of active alerts for a given host. The Host List can filter based on the following alert statuses:

- Critical
- Warning
- Missing Data
- Normal

A host will be displayed in the list if at least one of the alerts is in the selected state.

<img src={useBaseUrl('/img/observability/navigation_alert_status.png')} alt="navigation_alert_status" style={{border: '1px solid gray'}} width="250"/>

## Attributes and indicators

For each of your hosts, Sumo Logic will extract several types of data based on the signals ingested to Sumo Logic. This information falls into three main categories: attributes, indicators, and alerts.

Both attributes and indicators will work properly using one of the following collection methods:

- OpenTelemetry collection (recommended)
    - [Linux - OpenTelemetry Collector](/docs/integrations/hosts-operating-systems/opentelemetry/linux-opentelemetry/)
    - [macOS - OpenTelemetry Collector](/docs/integrations/hosts-operating-systems/opentelemetry/macos-opentelemetry/)
    - [Windows - OpenTelemetry Collector](/docs/integrations/hosts-operating-systems/opentelemetry/windows-opentelemetry/)
- [Host Metrics Sumo Logic app](/docs/integrations/hosts-operating-systems/host-metrics/)
- [Host and Process Metrics](/docs/integrations/hosts-operating-systems/host-process-metrics/)

### Attributes

**Attributes** are generally extracted from metric dimensions or log fields. Attributes provide insight into the characteristics of a host, such as the operating system running on the host, the cloud provider, and more.

We recommend using the [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector/) to collect logs, metrics, and traces, as this method provides all of the required fields and dimensions without any additional configuration. However, if you like to keep using your current collection method, we recommend populating the relevant fields as described below.

#### Host Name

The list of hosts is populated first by extracting all of the available hosts from the data ingested into Sumo Logic. A host will appear on the list if any of the following data is present:

* **Logs**
    * `_sourceHost` field
    * `host.name` field
* **Metrics**
    * `_sourceHost` dimension
    * `host.name` dimension
* **Tracing**
    * `host.name` field

#### Environment

The **Environment** attribute is one of the built-in tags that allows you to categorize your hosts into arbitrary environments. You can use this tag to identify which of your hosts are part of your production environment and which work as part of your development or test environments.

You can use any value for this attribute. If no value is assigned or if the tag is missing, the value of the tag will be set to **default**.

Environment attribute is populated:

* **In metrics**
    - Using the value of the `deployment.environment` dimension.
    - Using the value of the `environment` dimension.
* **In logs**
    - Using the value of the `deployment.environment` field.

#### Group

The **Group** attribute allows you to categorize your hosts based on your infrastructure setup. You can use this tag as a second dimension for grouping. For example, you can group your hosts based on the role, geographical location, type and more.
You can use any value for this attribute. If no value is assigned or if the tag is missing, the value of the tag will be set to **default**.

Group attribute is populated using:

* **In metrics**. Using the value of the `host.group` dimension.
* **In logs**. Using the value of the `host.group` field.

#### OS Type

**OS type** information is extracted from the following metrics dimensions:

- `sumo.datasource`. Directly included by default with the [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector/).
- `os.type`. Directly included by default with the [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/).
- `DevName`. Extracted based on the OS devices reported by [Installed Collectors](/docs/send-data/installed-collectors/).

If some of your hosts are missing, the OS information we suggest [tagging your data set](/docs/send-data/installed-collectors/sources/host-metrics-source/#manuallyconfigure-a-host-metrics-source) with the correct value of **os.type** dimension or using [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector/). Contact your account team if you have already stored the information about the OS using some other tag name, and Sumo Logic will adjust how your data is displayed.

#### Cloud Provider

**Cloud Provider** information is extracted from the following metrics dimensions:

- `cloud.provider`. Directly included by default with the [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector/).
- `instanceid`. Directly included by default with an [Installed Collector](/docs/send-data/installed-collectors/).
- `DevName`. Extracted based on the OS devices reported by [Installed Collectors](/docs/send-data/installed-collectors/).

If some of your hosts are missing, the Cloud Provider information we suggest [tagging your data set](/docs/send-data/installed-collectors/sources/host-metrics-source/#manuallyconfigure-a-host-metrics-source) with the correct value of **cloud.provider** dimension or using the [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector/). Contact your account team if you have already stored the information about the Cloud Provider using some other tag name, and Sumo Logic will adjust how your data is displayed.

### Indicators

**Indicators** are values of a certain time series aggregated to a single value. Indicators aggregation is done using the selected time frame and follows aggregation methods such as average or percentile values.

Currently Host List supports the following indicators:
- CPU
- Memory
- Load
- Memory Total
- Memory Used

We recommend using the [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector/) to collect logs, metrics, and traces, as this method provides all of the required indicators without any additional configuration. However, if you’d like to keep using your current collection method, we recommend populating the relevant metric names as described below.  

#### CPU

The **CPU** indicator returns the total CPU utilization expressed in percentages. Currently, the CPU utilization can be calculated for the last 15 minutes or inherit the aggregation time period from the time range selector.

CPU utilization is expressed using one of the following aggregation methods:
- Average
- 50th percentile
- 90th percentile
- 95th percentile
- 99th percentile

The value of the CPU indicator is extracted using the following queries (depending on the collection method used):

```sql
metric=system.cpu.utilization host.name=* state=(user OR system OR wait OR steal OR softirq OR interrupt OR nice) | eval(_value*100) | sum by deployment.environment, host.group, host.name, cpu | avg by deployment.environment, host.group, host.name
cpu=cpu-total metric=host_cpu host.name=* field=(usage_user OR usage_system OR usage_iowait OR usage_steal OR usage_softirq OR usage_irq OR usage_nice) | sum by host.name
metric=CPU_Total _sourceHost=* | avg by _sourceHost
```

#### Memory

The **Memory** indicator returns the total memory utilization expressed in percentages. Currently, the memory can be calculated for the last 15 minutes or inherit the aggregation time period from the time range selector.

Memory is expressed using one of the following aggregation methods:
- Average
- 50th percentile
- 90th percentile
- 95th percentile
- 99th percentile

The value of the Memory indicator is extracted using the following queries (depending on the collection method used):

```sql
metric=system.memory.utilization state=used host.name=* | eval(_value*100) | sum by deployment.environment, host.group, host.name
metric=host_mem host.name=* field=used_percent | sum by host.name
metric=Mem_UsedPercent _sourceHost=* | avg by _sourceHost
```

#### Load

The **Load** indicator returns the CPU load utilization. Currently, the CPU load can be calculated for the last 15 minutes.

Load is expressed using the **Average** aggregation method.

The value of the Load indicator is extracted using the following queries (depending on the collection method used):

```sql
metric=system.cpu.load_average.15m host.name=* | sum by deployment.environment, host.group, host.name
metric=host_system field=load15 host.name=* | sum by host.name
metric=CPU_LoadAvg_15min _sourceHost=* | avg by _sourceHost
```

#### Memory Total

The **Memory Total** indicator returns the total memory available expressed in GiB. Currently, the total memory can be displayed for the last 15 minutes.

Total memory can be expressed using the **Average** aggregation method (although the value of this metric should remain the same, unless you modify your host’s specification).

The value of the Memory Total indicator is extracted using the following queries (depending on the collection method used):

```sql
metric=system.memory.usage state=* host.name=* | eval _value / (1024*1024*1024) | sum by deployment.environment, host.group, host.name
metric=host_mem field=total host.name=* | eval _value / (1024*1024*1024) | avg by host.name
metric=Mem_Total _sourceHost=* | eval _value / (1024*1024*1024) | avg by _sourceHost
```

#### Memory Used

The **Memory Used** indicator returns the total memory usage expressed in GiB. Currently, the memory used can be displayed for the last 15 minutes.

Used memory can be expressed using the **Average** aggregation method.

The value of the Memory Used indicator is extracted using the following queries (depending on the collection method used):

```sql
metric=system.memory.usage state=used host.name=* | eval _value / (1024*1024*1024) | sum by deployment.environment, host.group, host.name
metric=host_mem field=used host.name=* | eval _value / (1024*1024*1024) | sum by host.name
metric=Mem_ActualUsed _sourceHost=* | eval _value / (1024*1024*1024) | avg by _sourceHost
```

### Alerts

**Alerts** in the Host List are displayed based on the configured [Monitors](/docs/alerts/monitors/overview/) in Sumo Logic for a given host.

<img src={useBaseUrl('/img/observability/alerts_host_list.png')} alt="alerts_host_list" style={{border: '1px solid gray'}} width="350"/>

The **Alerts** column will display the most severe alert status, even if there are active alerts of a different state. The Alert count will display the sum of all active alerts.

To view alert details, click on a row and view it in the right-hand-side panel.

## Columns Display Settings

You can access the **Columns Display Settings** by clicking the icon on the right-hand side of the screen. This feature allows you to configure the list of columns displayed in the Host List view. These settings are applied individually for each user and persist across sessions.

<img src={useBaseUrl('/img/observability/column_selector.png')} alt="column_selector" style={{border: '1px solid gray'}} width="325"/>

## Troubleshooting

### Host not displayed in the Host List

If a host is missing from your list, ensure that you have enabled the data collection for that given host.

We recommend using the [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector) to collect logs, metrics, and traces, as this method provides all of the functionality without any additional configuration. Other collection methods are also supported, as described in the [indicators](#indicators) and [attributes](#attributes) section of this document.

If the data collection is already enabled, verify that your host has any of the required tags:

* **For logs**
    * `_sourceHost` field
    * `host.name` field
* **For metrics**
    * `_sourceHost` dimension
    *  `host.name` dimension

If the tags are missing, do any one of the following:
- Set up a new OpenTelemetry Collector.
- Try manually adding a Field to a Metrics Source.
- Add a custom tag using your current collection method.

### Indicator values missing for some hosts

Ensure that you have enabled metrics collection for a given host.

We recommend using the [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector) to collect logs, metrics, and traces, as this method provides all of the functionality without any additional configuration. Other collection methods are also supported, as described in the [indicators](#indicators) section of this document.

Using the correct metric names, verify the relevant metrics reported.
