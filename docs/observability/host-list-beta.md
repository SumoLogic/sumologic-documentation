---
id: host-list-beta
title: Host List
description: Hosts List page allows Sumo Logic users to view all Hosts and their most important metrics on a single page, regardless of the host type, the collection method or the format of the collected data. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Closed Beta</span></a></p>

Hosts List page allows you to view all hosts and their most important metrics on a single page, regardless of the host type, the collection method, or the format of the collected data.

Hosts List makes it easier to compare different types of hosts without the need for building custom dashboards or switching between multiple existing visualizations and queries. Host List is available without additional configuration and displays all the hosts detected based on the signals ingested into the Sumo platform. Following sources are used to extract the hosts:

- Logs
- Metrics
- Spans

All the information in the Hosts List is extracted from the data that you have already sent to Sumo Logic. If you wish to add more hosts, follow the instructions on [sending data to Sumo Logic](/docs/send-data/). By default, all hosts are displayed as long as the related data available.

<img src={useBaseUrl('/img/observability/host_list.png')} alt="host_list" style={{border: '1px solid black'}} width="700"/>

Clicking on any of the rows brings up the **Entity Inspector** panel that provides more detailed information about each of the hosts and allows you to navigate to viewing logs, metrics, traces, alerts, and dashboards linked to this host in the Explore view.

<img src={useBaseUrl('/img/observability/host_list2.png')} alt="host_list2" style={{border: '1px solid black'}} width="500"/>

## Navigation

### Time range

The time range selector in the top-right corner of the page allows you to choose the time range for which the host's data is displayed. This setting impacts the number of hosts visible in the list as only active hosts during the selected time are displayed, and influences the values of some [Indicators](#indicators). 

By default, indicators perform the aggregation across the selected time, but it is possible to choose indicators that aggregate values using a time aggregation that overrides the time range selector. For example, CPU (-15min) will aggregate CPU usage for the past 15 minutes, regardless of the value selected using the time range selector. Hosts List can display the data for the last 24 hours and, by default, displays the data for last 60 minutes.

<img src={useBaseUrl('/img/observability/navigation_time_range.png')} alt="navigation_time_range" style={{border: '1px solid black'}} width="400"/>

### Environment

You can use the **Environment** dropdown to display hosts with a certain value of the **Environment** property. This dropdown is populated with all currently available values of the **Environment** attribute.

<img src={useBaseUrl('/img/observability/navigation_environment.png')} alt="navigation_environment" style={{border: '1px solid black'}} width="400"/>

### Group

You can use the **Group** dropdown to display only hosts with a certain value of **Group** property. This dropdown is populated with all currently available values of the **Group** attribute.

<img src={useBaseUrl('/img/observability/navigation_group.png')} alt="navigation_group" style={{border: '1px solid black'}} width="400"/>

### Host Name

You can search for any hosts using the free-text input field, and you can narrow down the list by substring matching.

<img src={useBaseUrl('/img/observability/navigation_host_name.png')} alt="navigation_host_name" style={{border: '1px solid black'}} width="400"/>

### OS type

You can narrow down the list of visible hosts by the type of detected Operating System (OS) running on a host. Hosts List can identify the following operating systems:

- Darwin (macOS)
- Linux
- Windows

<img src={useBaseUrl('/img/observability/navigation_OS_type.png')} alt="navigation_OS_type" style={{border: '1px solid black'}} width="400"/>

### Cloud Provider

You can narrow down the list of visible Hosts by the type of detected cloud provider (CP) running on a host. Hosts List can identify the following cloud providers:

- AWS
- Azure
- GCP

<img src={useBaseUrl('/img/observability/navigation_cloud_provider.png')} alt="navigation_cloud_provider" style={{border: '1px solid black'}} width="400"/>

### Alert Status

You can narrow down the list of visible hosts by the type of active alerts for a given host. Hosts List can filter based on the following alert statuses:

- Critical
- Warning
- Missing Data
- Normal

A Host is displayed in the list if at least one of the alerts is in the selected state.

<img src={useBaseUrl('/img/observability/navigation_alert_status.png')} alt="navigation_alert_status" style={{border: '1px solid black'}} width="400"/>

## Indicators and attributes

For each of your hosts, Sumo Logic will extract several types of data based on the signals ingested to the Sumo Logic platform. This information falls into three main categories:
- Attributes
- Indicators
- Alerts

Both attributes and indicators will work properly using one of the following collection methods:

- OpenTelemetry collection (recommended)
    - [Linux - OpenTelemetry Collector](/docs/integrations/hosts-operating-systems/opentelemetry/linux-opentelemetry/)
    - [macOS - OpenTelemetry Collector](/docs/integrations/hosts-operating-systems/opentelemetry/macos-opentelemetry/)
    - [Windows - OpenTelemetry Collector](/docs/integrations/hosts-operating-systems/opentelemetry/windows-opentelemetry/) 
- [Host Metrics Sumo Logic app](/docs/integrations/hosts-operating-systems/host-metrics/)
- [Host and Process Metrics](/docs/integrations/hosts-operating-systems/host-process-metrics/)

### Attributes

**Attributes** are generally extracted from metric dimensions or log fields. Attributes provide insight into the characteristics of a host, such as the operating system running on the host, the cloud provider, and more. 

Sumo Logic recommends using [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector/) to collect logs, metrics, and traces, as this method provides all of the required fields and dimensions without any additional configuration. However, if you like to keep using your current collection method, we recommend populating the relevant fields as described below. 

#### Host Name

The list of hosts is populated first by extracting all of the available hosts from the data ingested into the Sumo platform. A host will appear on the list if any of the following data is present:

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

**In metrics**
- Using the value of the **deployment.environment** dimension.
- Using the value of the **environment** dimension. 

**In logs**
- Using the value of the **deployment.environment** field.

#### Group

The **Group** attribute allows you to categorize your hosts based on your infrastructure setup. You can use this tag as a second dimension for grouping. For example, you can group your hosts based on the role, geographical location, type and more. 
You can use any value for this attribute. If no value is assigned or if the tag is missing, the value of the tag will be set to **default**. 

Group attribute is populated using:

* **In metrics**
    Using the value of the **host.group** dimension.

* **In logs**
    Using the value of the **host.group** field. 

#### OS Type

**OS type** information is extracted from the following metrics dimensions:
- sumo.datasource - directly included by default with [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector/)
- os.type - directly included by default with [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) 
- DevName - extracted based on the OS devices reported by [Installed Collectors](/docs/send-data/installed-collectors/)

If some of your hosts are missing the OS information we suggest [tagging your data set](/docs/send-data/installed-collectors/sources/host-metrics-source/#manuallyconfigure-a-host-metrics-source) with the correct value of **os.type** dimension or using [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector/). Contact your account team if you have already stored the information about the OS using some other tag name, and Sumo Logic will adjust how your data is displayed.

#### Cloud Provider

**Cloud Provider** information is extracted from the following metrics dimensions:
- cloud.provider - directly included by default with [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector/)
- instanceid - directly included by default with [Installed Collector](/docs/send-data/installed-collectors/) 
- DevName - extracted based on the OS devices reported by [Installed Collectors](/docs/send-data/installed-collectors/)

If some of your hosts are missing the Cloud Provider information we suggest [tagging your data set](/docs/send-data/installed-collectors/sources/host-metrics-source/#manuallyconfigure-a-host-metrics-source) with the correct value of **cloud.provider** dimension or using [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector/). Contact your account team if you have already stored the information about the Cloud Provider using some other tag name, and Sumo Logic will adjust how your data is displayed.

### Indicators

**Indicators** are values of a certain time series aggregated to a single value. Indicators aggregation is done using the selected time frame and follows aggregation methods such as average or percentile values. 

Currently Hosts List supports the following indicators:
- CPU
- Memory
- Load
- Memory Total
- Memory Used

Sumo Logic recommends using [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector/) to collect logs, metrics, and traces, as this method provides all of the required Indicators without any additional configuration. However, if you’d like to keep using your current collection method, we recommend populating the relevant metric names as described below.  

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

The value of the Memory Indicator is extracted using the following queries (depending on the collection method used):

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

**Alerts** in the Hosts List are displayed based on the configured [Monitors](/docs/alerts/monitors/overview/) in the Sumo Logic platform for a given host. 

<img src={useBaseUrl('/img/observability/alerts_host_list.png')} alt="alerts_host_list" style={{border: '1px solid black'}} width="400"/>

The Alert column will display the most severe alert status, even if there are active alerts of a different state.

The Alert count will display the sum of all active alerts. 

To view alert details, click on a row and view it in the right-hand-side panel.

## Column selector

The **Column selector** is accessed by clicking on the icon on the right-hand side of the screen. This feature allows you to configure the list of columns displayed in the Hosts List view. These settings are applied individually for each user and persist across sessions. 

<img src={useBaseUrl('/img/observability/column_selector.png')} alt="column_selector" style={{border: '1px solid black'}} width="400"/>

## Troubleshooting

### Hosts is not displayed in the Hosts List

Ensure that you have the data collection enabled for a given host. Sumo Logic recommends using [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector) to collect logs, metrics, and traces, as this method provides all of the functionality without any additional configuration. 

However, other collection methods are also supported, as described in the [Indicators](#indicators) and [Attributes](#attributes) section of this document. 

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

### Indicator values are missing for some hosts

Ensure that you have the metrics collection enabled for a given host. Sumo Logic recommends using [Sumo Logic OpenTelemetry Collector](/docs/send-data/opentelemetry-collector) to collect logs, metrics, and traces, as this method provides all of the functionality without any additional configuration. 

However, other collection methods are also supported, as described in the Indicators section of this document. 

Using the correct metric names, verify the relevant metrics reported.
