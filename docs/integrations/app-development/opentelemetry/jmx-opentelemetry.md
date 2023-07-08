---
id: jmx-opentelemetry
title: Java Management Extensions (JMX) - OpenTelemetry Collector
sidebar_label: JMX - OTel Collector
description: The Sumo Logic App for Java Management Extensions (JMX) allows you to analyze and gain insights about Java applications.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/app-development/jmx.png')} alt="Thumbnail icon" width="50"/>

Java Management Extensions (JMX) is a standard component of the Java Platform. JMX gives developers a standard and simple way to manage resources, including services, devices, and applications. JMX is dynamic, so you can manage and monitor resources as soon as they are created, implemented, or installed.

The Sumo Logic App for JMX allows you to analyze and gain insights about Java applications. The dashboards provide a quick glance at various deployment metrics like memory, GC performance, and thread behavior, so you can troubleshoot unexpected behavior in your Java environment and the applications running in it.


## Metrics types

The Sumo Logic App for JMX collects metrics from Java applications via the [JMX Receiver for OpenTelemetry](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/jmxreceiver).

The following types of metrics are collected from JMX:

* Garbage Collection
* Memory
* Memory Pool
* Threads
* ClassLoader

For more information on different metrics collected, refer to the [JMX receiver docs](https://github.com/open-telemetry/opentelemetry-java-contrib/blob/main/jmx-metrics/docs/target-systems/jvm.md).

### Sample query

```sql
sumo.datasource=jmx metric=jvm.memory.heap.used
```

## Fields creation in Sumo Logic for JMX

* `sumo.datasource`. Has fixed value of `jmx`.
* `jmx.endpoint`. The endpoint in the form of `localhost:port` used by JMX Metric Gatherer.

## Prerequisites

The JMX Receiver uses the OpenTelemetry JMX Metric Gatherer. For more details, [see their docs](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/jmxreceiver#details).

* Download the jar from [releases](https://github.com/open-telemetry/opentelemetry-java-contrib/releases) and place it in `/opt/` or in `C:\ProgramData`. Remember the path of the jar, which you'll use to configure the JMX app.
* Make sure the see the `opentelemetry-java-contrib-jmx-metrics` version is supported in the OpenTelemetry version you are using by going through the [releases](https://github.com/open-telemetry/opentelemetry-collector-contrib/releases) section and searching for jmxreceiver in that page. You can also check [supported jars code](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/jmxreceiver/supported_jars.go#L33).
* JMX Metric Gatherer metric extension supports Java 8+, though SASL is only supported where `com.sun.security.sasl.Provider` is available.
* Configure your java application to enable JMX. In most cases, you'll need to set below system variables in your applications's startup script.
  ```sh
  -Dcom.sun.management.jmxremote.port=11099
  -Dcom.sun.management.jmxremote.authenticate=false
  ```
* If you want to set up authentication, set the below system variables:
  ```sh
  -Dcom.sun.management.jmxremote.authenticate=true
  -Dcom.sun.management.jmxremote.password.file=<application conf directory>/jmx.password
  -Dcom.sun.management.jmxremote.access.file=<application conf directory>/jmx.access
  ```

:::info
Below are docs for popular Java applications:
* [Active MQ](https://activemq.apache.org/jmx)
* [Kafka](https://kafka.apache.org/documentation/#remote_jmx)
* [Apache Tomcat](https://tomcat.apache.org/tomcat-9.0-doc/monitoring.html#Enabling_JMX_Remote)
* [Cassandra](https://cassandra.apache.org/doc/4.1/cassandra/operating/security.html#jmx-access)
* [HBase](https://hbase.apache.org/metrics.html)
* [Solr](https://solr.apache.org/guide/8_3/using-jmx-with-solr.html#configuring-jmx)
* [Zookeeper](https://zookeeper.apache.org/doc/r3.4.2/zookeeperJMX.html#ch_starting)
:::

## Collecting Metrics and Installing the JMX App

The process to set up collection for JMX Metrics is done through the following steps.

### Step 1: Set up OpenTelemetry Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Kafka-OpenTelemetry/Kafka-Collector.png' alt="Collector" />

### Step 2: Configure integration

In this step, we'll configure the yaml required for JMX Collection.

Below is the input required:

- **JMX Endpoint**. Enter the value in `host:port` form which will be used to construct the Service URL, the Metric Gatherer's JMX client should use.
- **JMX Gatherer file path**. Enter the path to the OpenTelemetry JMX Metric Gatherer file configured in the prerequisites section.
- **Enable password authentication**. Toggle this if you are using password based jmx authentication.
- **Username**. Username for JMX authentication, if applicable.
- **Password**. Password for JMX authentication, if applicable.

Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/JMX-OpenTelemetry/JMX-OTEL-YAML.png' alt="YAML" />

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

1. Copy the yaml to the`/etc/otelcol-sumo/conf.d/` folder for the Java application which needs to be monitored.
2. Restart the collector using:
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

</TabItem>
<TabItem value="Windows">

1. Copy the yaml to the `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine that needs to be monitored.
2. Restart the collector using:
  ```sh
  Restart-Service -Name OtelcolSumo
  ```

</TabItem>
<TabItem value="macOS">

1. Copy the yaml to the `/etc/otelcol-sumo/conf.d/` folder in the Java application which needs to be monitored.
2. Restart the otelcol-sumo process using the below command:
  ```sh
  otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
  ```

</TabItem>
</Tabs>

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}


## Viewing JMX Dashboards

:::tip Filter with template variables    
Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause. You can use template variables to drill down and examine the data on a granular level. For more information, see [Filter with template variables](/docs/dashboards-new/filter-template-variables.md).
:::

### Overview

The **JMX - Overview** dashboard provides a quick summary of Heap Memory, Memory Pool and Garbage Collection time by different java processes.

Use this dashboard to:
* Identify the java processes using maximum heap memory and memory pool.
* Monitor the Percentage Heap Usage and Percentage Memory Pool Usage to avoid OOM errors.
* Compare the Heap Memory, Memory Pool and Garbage Collection time with last week's trends.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/JMX-OpenTelemetry/JMX-Overview.png' alt="Overview" />

### Memory

The **JMX - Memory** dashboard shows the percentage of the heap and non-heap memory used, physical and swap memory usage of your java virtual machine.

Use this dashboard to:
* Gain insights into Heap and Non-Heap memory usage.
* Identify the Max Heap and Initial Heap size configured for your application to set the appropriate memory switches.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/JMX-OpenTelemetry/JMX-Memory.png' alt="Memory" />


### Garbage Collector

The **JMX - Garbage Collector** dashboard shows key Garbage Collector statistics like the duration of the last GC run, objects collected, threads used, and memory cleared in the last GC run of your java virtual machine.

Use this dashboard to:
* Understand the garbage collection time. If the time keeps on increasing, you may have more CPU usage.
* Understand the number of objects collected across memory pools and its impact on the Heap memory.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/JMX-OpenTelemetry/JMX-Garbage-Collector.png' alt="Garbage Collector" />

### Class Loading and Threads

The **JMX - Class Loading and Threads** dashboard shows key information about the number and type of threads deadlocked, peak, and GC threads of your java virtual machine running on the deployment.

Use this dashboard to:
* Identify abnormal spikes in Threads and Loaded Classes

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/JMX-OpenTelemetry/JMX-Class-Loading-and-Threads.png' alt="Class Loading and Threads" />


### Memory Pool

The **JMX - Memory Pool **dashboard provides key information about the memory pool usage, peak usage, collection usage, garbage collection across various memory pools of your Java virtual machine.

Use this dashboard to:
* Gain insights into memory usage across different memory pools.
* Gain insights into garbage collection impact on different memory pools.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/JMX-OpenTelemetry/JMX-Memory-Pool.png' alt="Memory Pool" />
