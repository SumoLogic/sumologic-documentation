---
id: jmx
title: Java Management Extensions (JMX)
sidebar_label: JMX
description: The Sumo Logic App for Java Management Extensions (JMX) allows you to analyze and gain insights about Java applications.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/app-development/jmx.png')} alt="Thumbnail icon" width="50"/>

Java Management Extensions (JMX) is a standard component of the Java Platform. JMX gives developers a standard and simple way to manage resources, including services, devices, and applications. JMX is dynamic, so you can manage and monitor resources as soon as they are created, implemented, or installed.

The Sumo Logic App for **JMX** allows you to analyze and gain insights about Java applications. The dashboards provide a quick glance at various deployment metrics like memory, CPU, GC performance, and thread behavior, so you can troubleshoot unexpected behavior in your Java environment and the applications running in it.


## Metric Types

The Sumo Logic App for JMX collects Prometheus metrics from Java applications, via the [Jolokia Plugin for telegraf.](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2)

The following types of metrics are collected from JMX:

* CPU Metrics
* Garbage Collection
* Memory
* Memory Pool
* Compilation
* Threads
* ClassLoader


### Sample Query

This query sample is from the **CPU Load Vs Current Threads** panel of **JMX - Overview** dashboard.

```sql
_sourceCategory=Labs/jmx/metrics
metric=java_lang_OperatingSystem_TotalMemorySize jolokia_agent_url={{Server}} | eval (_value / 1024 / 1024 / 1024) | sum
```


## Collecting Metrics for JMX

This section explains how to collect metrics from JMX and ingest them into Sumo Logic to use with the predefined dashboards and searches in the JMX app.

You can collect JMX metrics using the Jolokia Plugin for telegraf. You can configure the metrics in the Jolokia Plugin configuration and these metrics are exposed on a URL.

These metrics are then forwarded to Sumo Logic HTTP Source. The collection starts at the current time.

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="non-k8s"
  values={[
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
    {label: 'Kubernetes environments', value: 'k8s'},
  ]}>

<TabItem value="non-k8s">

### Step 1: Metric Collection in Non-Kubernetes Environment

This section provides instructions for configuring metrics collection for the Sumo Logic App for JMX. Follow the below instructions to set up the metric collection.
1. **Configure metrics for JMX**. To configure JMX metrics using Jolokia, do the following:
   * Download the latest Jolokia JVM agent from [Jolokia](https://jolokia.org/download.html).
   * You can attach the Jolokia JVM agent jar as a Java Agent to your application.
   * Replace parameter `agentContext` with a value as per your environment or jmx instance.
    ```bash
    java ... -javaagent:jolokia-jvm-1.6.2-agent.jar=port=8778,host=localhost,agentContext=/${agentContext} ...
    ```
   * Alternatively, you can also attach process to the Jolokia JVM agent.
   ```bash
   # List available applications
   java -jar ./jolokia-jvm-1.6.2-agent.jar list
   # 156   ./jolokia-jvm-1.6.2-agent.jar list
   # 6   org.apache.catalina.startup.Bootstrap start
   # Attach to the application which should be monitored
   java -jar ./jolokia-jvm-1.6.2-agent.jar --agentContext /${agentContext} start 6
   #Jolokia is already attached to PID 723#http://127.0.0.1:8778/${agentContext}/
   ```
   More information can be found using a [JVM agent](https://jolokia.org/reference/html/agents.html#agents-jvm). Make a note of the URL that will be used in telegraf configuration.
2. **Configure a Hosted Collector**. To create a new Sumo Logic hosted collector, perform the steps in the [Configure a Hosted Collector ](/docs/send-data/hosted-collectors/configure-hosted-collector)section of the Sumo Logic documentation
3. **Configure a HTTP Logs and Metrics Source**. Create a new HTTP Logs and Metrics Source in the hosted collector created above by following[ these instructions. ](/docs/send-data/hosted-collectors/http-source/logs-metrics)
   * Make a note of **HTTP Source URL**.
4. **Install Telegraf**. Use the [following steps](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf.md) to install Telegraf.
5. **Configure and start Telegraf**. Create a file called telegraf.conf and add the appropriate configuration. The following is a basic example:

Metrics filtering is done by whitelisting the metrics we want through name/mbean/paths configuration.

```sql
[agent]
  interval = "60s"
[[inputs.jolokia2_agent]]
  urls = ["<Jolokia URL from Step 1>"]
   [[inputs.jolokia2_agent.metric]]
name  = "java_lang_ClassLoading"
mbean = "java.lang:type=ClassLoading"
paths = ["LoadedClassCount", "TotalLoadedClassCount", "UnloadedClassCount"]
  [[inputs.jolokia2_agent.metric]]
name  = "java_lang_Compilation"
mbean = "java.lang:type=Compilation"
paths = ["TotalCompilationTime"]
  [[inputs.jolokia2_agent.metric]]
name  = "java_lang_GarbageCollector"
mbean = "java.lang:name=*,type=GarbageCollector"
paths = ["CollectionCount", "CollectionTime", "LastGcInfo"]
tag_keys = ["name"]
  [[inputs.jolokia2_agent.metric]]
name  = "java_lang_MemoryPool"
mbean = "java.lang:name=*,type=MemoryPool"
paths = ["CollectionUsage", "CollectionUsageThresholdSupported", "PeakUsage", "Usage", "UsageThresholdSupported"]
tag_keys = ["name"]
  [[inputs.jolokia2_agent.metric]]
name  = "java_lang_Memory"
mbean = "java.lang:type=Memory"
paths = ["HeapMemoryUsage", "NonHeapMemoryUsage", "ObjectPendingFinalizationCount"]
  [[inputs.jolokia2_agent.metric]]
name  = "java_lang_OperatingSystem"
mbean = "java.lang:type=OperatingSystem"
paths = ["AvailableProcessors", "CommittedVirtualMemorySize", "FreePhysicalMemorySize", "FreeSwapSpaceSize", "MaxFileDescriptorCount", "OpenFileDescriptorCount", "ProcessCpuLoad", "ProcessCpuTime", "SystemCpuLoad", "SystemLoadAverage", "TotalPhysicalMemorySize", "TotalSwapSpaceSize"]
  [[inputs.jolokia2_agent.metric]]
name  = "java_lang_Runtime"
mbean = "java.lang:type=Runtime"
paths = ["BootClassPathSupported", "StartTime", "Uptime"]
  [[inputs.jolokia2_agent.metric]]
name  = "java_lang_Threading"
mbean = "java.lang:type=Threading"
paths = ["CurrentThreadCpuTime", "CurrentThreadUserTime", "DaemonThreadCount", "ObjectMonitorUsageSupported", "PeakThreadCount", "SynchronizerUsageSupported", "ThreadContentionMonitoringEnabled", "ThreadContentionMonitoringSupported", "ThreadCount", "ThreadCpuTimeEnabled", "ThreadCpuTimeSupported", "TotalStartedThreadCount"]
  -- Metrics which are unavailable for some of the jvm implementations
  -- Added in jdk14
  [[inputs.jolokia2_agent.metric]]
name  = "java_lang_OperatingSystem"
mbean = "java.lang:type=OperatingSystem"
paths = ["FreeMemorySize", "TotalMemorySize"]
  -- not available for jdk8
  [[inputs.jolokia2_agent.metric]]
name  = "java_lang_Runtime"
mbean = "java.lang:type=Runtime"
paths = ["Pid"]
  ## Added in jdk14
  [[inputs.jolokia2_agent.metric]]
name  = "java_lang_Threading"
mbean = "java.lang:type=Threading"
paths = ["CurrentThreadAllocatedBytes"]
  -- Not available for adoptopenjdk-openj9
  [[inputs.jolokia2_agent.metric]]
name  = "java_lang_Threading"
mbean = "java.lang:type=Threading"
paths = ["ThreadAllocatedMemoryEnabled", "ThreadAllocatedMemorySupported"]
-- The processor regex converts url like http://127.0.0.1:8778/${agentContext} to agentContext
[[processors.regex]]
  [[processors.regex.tags]]
    key = "jolokia_agent_url"
    pattern = '.*?([a-zA-Z0-9-_]+)[\/]?$'
    replacement = "${1}"    
[[outputs.sumologic]]
  url = "<URL Created in Step 3>"
  data_format = "prometheus"  
```

* `interval`. This is the frequency to send data to Sumo Logic, in this example, we will send the metrics every 60 seconds. Please refer to [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf#Configuring-Telegraf) for more parameters that can be configured in the Telegraf agent globally.
* `urls`. The url to the Jolokia server. This can be a comma-separated list to connect to multiple Jolokia servers. Please refer [to this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2) for more information on configuring the Jolokia input plugin for Telegraf.
* `url`. This is the HTTP source URL created in step 3. Refer [to this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/configure-telegraf-output-plugin.md) for more information on configuring the Sumo Logic Telegraf output plugin.
* `data_format`. The format to use when sending data to Sumo Logic. Please refer [to this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/configure-telegraf-output-plugin.md) for more information on configuring the Sumo Logic Telegraf output plugin.

After you have finalized your telegraf.conf file, you can run the following command to start telegraf.
```bash
telegraf --config /path/to/telegraf.conf
```

</TabItem>
<TabItem value="k8s">

### Step 2: Metric Collection in Kubernetes Environment

The following steps assume you are collecting JMX metrics from a Kubernetes environment. In Kubernetes environments, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about this [here](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/telegraf-collection-architecture).

1. [Set up Kubernetes Collection with the Telegraf Operator.](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf.md)
2. On your Pods, add the following annotations to configure Telegraf.

Ensure that Prometheus passes all metrics to Sumo Logic. If you use the below annotations to configure Telegraf, it should work correctly, otherwise, refer to this [doc](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/collecting-application-metrics.md).

```sql
annotations:
        telegraf.influxdata.com/inputs: |+
          [[inputs.jolokia2_agent]]
            urls = ["http://127.0.0.1:8778/jolokia"]
            [[inputs.jolokia2_agent.metric]]
              name  = "java_lang_ClassLoading"
              mbean = "java.lang:type=ClassLoading"
              paths = ["LoadedClassCount", "TotalLoadedClassCount", "UnloadedClassCount"]
            [[inputs.jolokia2_agent.metric]]
              name  = "java_lang_Compilation"
              mbean = "java.lang:type=Compilation"
              paths = ["TotalCompilationTime"]
            [[inputs.jolokia2_agent.metric]]
              name  = "java_lang_GarbageCollector"
              mbean = "java.lang:name=*,type=GarbageCollector"
              paths = ["CollectionCount", "CollectionTime", "LastGcInfo"]
              tag_keys = ["name"]
            [[inputs.jolokia2_agent.metric]]
              name  = "java_lang_MemoryPool"
              mbean = "java.lang:name=*,type=MemoryPool"
              paths = ["CollectionUsage", "CollectionUsageThresholdSupported", "PeakUsage", "Usage", "UsageThresholdSupported"]
              tag_keys = ["name"]
            [[inputs.jolokia2_agent.metric]]
              name  = "java_lang_Memory"
              mbean = "java.lang:type=Memory"
              paths = ["HeapMemoryUsage", "NonHeapMemoryUsage", "ObjectPendingFinalizationCount"]
            [[inputs.jolokia2_agent.metric]]
              name  = "java_lang_OperatingSystem"
              mbean = "java.lang:type=OperatingSystem"
              paths = ["AvailableProcessors", "CommittedVirtualMemorySize", "FreePhysicalMemorySize", "FreeSwapSpaceSize", "MaxFileDescriptorCount", "OpenFileDescriptorCount", "ProcessCpuLoad", "ProcessCpuTime", "SystemCpuLoad", "SystemLoadAverage", "TotalPhysicalMemorySize", "TotalSwapSpaceSize"]
            [[inputs.jolokia2_agent.metric]]
              name  = "java_lang_Runtime"
              mbean = "java.lang:type=Runtime"
              paths = ["BootClassPathSupported", "StartTime", "Uptime"]
            [[inputs.jolokia2_agent.metric]]
              name  = "java_lang_Threading"
              mbean = "java.lang:type=Threading"
              paths = ["CurrentThreadCpuTime", "CurrentThreadUserTime", "DaemonThreadCount", "ObjectMonitorUsageSupported", "PeakThreadCount", "SynchronizerUsageSupported", "ThreadContentionMonitoringEnabled", "ThreadContentionMonitoringSupported", "ThreadCount", "ThreadCpuTimeEnabled", "ThreadCpuTimeSupported", "TotalStartedThreadCount"]
            -- Metrics which are unavailable for some of the jvm implementations
            -- Added in jdk14
            [[inputs.jolokia2_agent.metric]]
              name  = "java_lang_OperatingSystem"
              mbean = "java.lang:type=OperatingSystem"
              paths = ["FreeMemorySize", "TotalMemorySize"]
            -- not available for jdk8
            [[inputs.jolokia2_agent.metric]]
              name  = "java_lang_Runtime"
              mbean = "java.lang:type=Runtime"
              paths = ["Pid"]
            -- Added in jdk14
            [[inputs.jolokia2_agent.metric]]
              name  = "java_lang_Threading"
              mbean = "java.lang:type=Threading"
              paths = ["CurrentThreadAllocatedBytes"]
            -- Not available for adoptopenjdk-openj9
            [[inputs.jolokia2_agent.metric]]
              name  = "java_lang_Threading"
              mbean = "java.lang:type=Threading"
              paths = ["ThreadAllocatedMemoryEnabled", "ThreadAllocatedMemorySupported"]
        -- The processor regex converts url like http://127.0.0.1:8778/jolokia to hostname
          [[processors.override]]
            [processors.override.tags]
              jolokia_agent_url = "$HOSTNAME"
          telegraf.influxdata.com/class: sumologic-prometheus
          telegraf.influxdata.com/limits-cpu: '750m'
          prometheus.io/scrape: "true"
          prometheus.io/port: "9273"
```

* `telegraf.influxdata.com/inputs` - This contains the required configuration for the Telegraf Jolokia Input plugin. Please refer [to this doc ](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2)for more information on configuring the Jolokia input plugin for Telegraf. Note: As telegraf will be run as a sidecar, the host should always be localhost.
* `telegraf.influxdata.com/class: sumologic-prometheus` - This instructs the Telegraf operator what output to use. This should not be changed.
* `prometheus.io/scrape: "true"` - This ensures our Prometheus will scrape the metrics.
* `prometheus.io/port: "9273"` - This tells Prometheus what ports to scrape on. This should not be changed.

</TabItem>
</Tabs>



### Sample Metric Names

<table>
  <tr>
   <td>Metric Type
   </td>
   <td>Sample
   </td>
  </tr>
  <tr>
   <td>CPU
   </td>
   <td>java_lang_OperatingSystem_ProcessCpuLoad
   </td>
  </tr>
  <tr>
   <td>GC
   </td>
   <td>java_lang_GarbageCollector_LastGcInfo_duration
   </td>
  </tr>
  <tr>
   <td>Memory
   </td>
   <td>java_lang_Memory_NonHeapMemoryUsage_committed
   </td>
  </tr>
  <tr>
   <td>Threads
   </td>
   <td>java_lang_Threading_ThreadCount
   </td>
  </tr>
  <tr>
   <td>ClassLoader
   </td>
   <td>java_lang_ClassLoading_LoadedClassCount
   </td>
  </tr>
</table>


## Install the JMX App

This section has instructions for installing the Sumo App for JMX.

{@import ../../reuse/app-install.md}

## Viewing JMX Dashboards

:::tip Filter with template variables    
Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause. You can use template variables to drill down and examine the data on a granular level. For more information, see [Filter with template variables](/docs/dashboards-new/filter-template-variables.md).
:::

### Overview

The **JMX - Overview** dashboard provides a quick summary of CPU and memory usage by different deployments. It also shows key statistics like JVM uptime, process versus system CPU load, committed versus used memory, objects collected by GC, and time taken by the last GC run server-wise.

Use this dashboard to:
* Understand the overall health of your java virtual machine.
* Monitor the number of open file descriptors. If the number of open file descriptors reaches maximum file descriptor, it can cause IOException: Too many files opens.
* Gain insight into Garbage collection and its impact on CPU usage and memory.
* Understand the dynamic behavior of threads.
* Understand the behavior of class count. If class count keeps on increasing, you may have a problem with the same classes loaded by multiple classloaders.

<img src={useBaseUrl('img/integrations/app-development/JMX_Overview.png')} alt="jmx dashboard" />


### Memory

The **JMX - Memory** dashboard shows the percentage of the heap and non-heap memory used, physical and swap memory usage of your java virtual machine.

Use this dashboard to:
* Gain insights into Heap and Non-Heap memory usage.
* Review Physical and swap memory usage.
* Review pending object finalization count which when high can lead to excessive memory usage.

<img src={useBaseUrl('img/integrations/app-development/JMX_Memory.png')} alt="jmx dashboard" />



### CPU

The **JMX - CPU** dashboard shows the process and system CPU usage. It also shows the operating system information of your java virtual machine.

Use this dashboard to:
* Gain insights into the process and system CPU load.
* Review the CPU processing time.

<img src={useBaseUrl('img/integrations/app-development/JMX_CPU.png')} alt="jmx dashboard" />


### Garbage Collector

The **JMX - Garbage Collector** dashboard shows key Garbage Collector statistics like the duration of the last GC run, objects collected, threads used, and memory cleared in the last GC run of your java virtual machine.

Use this dashboard to:
* Understand the garbage collection time. If the time keeps on increasing, you may have more CPU usage.
* Understand the amount of memory cleared by garbage collectors across memory pools and its impact on the Heap memory.

<img src={useBaseUrl('img/integrations/app-development/JMX_GarbageCollector.png')} alt="jmx dashboard" />



### Thread

The **JMX - Thread** dashboard shows key information about the number and type of threads deadlocked, peak, and GC threads of your java virtual machine running on the deployment.

Use this dashboard to:
* Understand the dynamic behavior of the system using Peak, Daemon, and current threads.
* Gain insights into the memory and CPU time of the last executed thread.

<img src={useBaseUrl('img/integrations/app-development/JMX_Thread.png')} alt="jmx dashboard" />


### Memory Pool

The **JMX - Memory Pool **dashboard provides key information about the memory pool usage, peak usage, collection usage, garbage collection across various memory pools of your Java virtual machine.

Use this dashboard to:
* Gain insights into memory usage across different memory pools.
* Gain insights into garbage collection impact on different memory pools.
* Understand Peak usage and collection usage of different memory pools.

<img src={useBaseUrl('img/integrations/app-development/JMX_MemoryPool.png')} alt="jmx dashboard" />

### Class Loading and Compilation

The **JMX - Class Loading and Compilation** dashboard shows key information about the rate of total loaded class, compilation time, unloaded classes of your java virtual machine.

Use this dashboard to:
* Gain insights into the behavior of class count. If class count keeps on increasing, you may have a problem with the same classes loaded by multiple classloaders.
* Gain insights into time spent by java virtual machines in the compilation.

<img src={useBaseUrl('img/integrations/app-development/JMX_ClassLoadingCompilation.png')} alt="jmx dashboard" />
